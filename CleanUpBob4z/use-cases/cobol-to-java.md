# Use Case: Z COBOL to Java — Policy Update Service Modernization

> **Source Program:** `Sample Code/zOS Cobol/LGUPDB01.cbl`
> **Mode:** Z Code (Steps 1–2), Agent (Steps 3–5)
> **Duration:** 30–45 minutes
> **Difficulty:** Intermediate

## Learning Objectives

By the end of this lab, you will be able to:

- Use Bob to deeply analyze a CICS/DB2 insurance policy update program and surface all business rules
- Convert LGUPDB01 to a modern distributed Java 21 service with correct data type mapping
- Generate a JUnit 5 test suite that validates conversion accuracy for all three policy types
- Wrap the business logic in a Spring Boot REST API that replaces the CICS COMMAREA interface
- Explain the key COBOL → Java conversion patterns to a modernization audience

## Prerequisites

- **Java 21** (OpenJDK) installed — see **Appendix: Environment Setup** if needed
- **Apache Maven 3.6+** installed

Verify before starting:

```bash
java -version   # should show OpenJDK 21.x.x
mvn -version    # should show Maven 3.6+
```

> ⚠️ **Java version note:** The generated `pom.xml` targets Java 21. If your local JDK is a
> newer version (22+), Maven will still compile and test successfully — but Mockito's
> inline mock maker uses Byte Buddy, which requires two extra JVM flags when running on
> Java versions beyond its supported range. The Bob-generated project already includes
> these flags in the Surefire plugin configuration, so no manual action is needed.
>
> If you see a Byte Buddy error like *"Java 2X is not supported"* during `mvn test`,
> confirm the Surefire `<argLine>` in `pom.xml` contains both flags:
>
> ```xml
> <argLine>-XX:+EnableDynamicAgentLoading -Dnet.bytebuddy.experimental=true</argLine>
> ```

If not installed, see the **Appendix: Environment Setup** at the end of this use case.

---

## Setup

### Step 1: Open the Source Program

1. Open VS Code → **File → Open Folder** → select the workspace root
2. Open `Sample Code/zOS Cobol/LGUPDB01.cbl`

![Alt text](../../images/transform-01.png)

### Step 2: Understand LGUPDB01

`LGUPDB01` is a CICS-invoked DB2 policy update program for an insurance back-end system. It:

| Responsibility | Detail |
|---|---|
| Entry point | Invoked by CICS with a COMMAREA (no direct user input) |
| Data source | IBM DB2 — tables: `POLICY`, `ENDOWMENT`, `HOUSE`, `MOTOR` |
| Policy types handled | Endowment (`01UEND`), House (`01UHOU`), Motor (`01UMOT`) |
| Optimistic locking | Compares `LASTCHANGED` timestamp before writing |
| Downstream call | Links to `LGUPVS01` via `EXEC CICS LINK` after DB2 update |
| Error reporting | Writes structured error messages to TD Queue via `LGSTSQ` |

Key paragraphs:

| Paragraph | Role |
|---|---|
| `MAINLINE` | Validates COMMAREA, dispatches to `UPDATE-POLICY-DB2-INFO` |
| `UPDATE-POLICY-DB2-INFO` | Opens cursor, fetches row, routes to policy-type handler |
| `UPDATE-ENDOW-DB2-INFO` | Updates `ENDOWMENT` table (with optional VARCHAR padding) |
| `UPDATE-HOUSE-DB2-INFO` | Updates `HOUSE` table |
| `UPDATE-MOTOR-DB2-INFO` | Calculates accident-based premium surcharge, updates `MOTOR` table |
| `CLOSE-PCURSOR` | Closes the `POLICY_CURSOR` with SQLCODE handling |
| `WRITE-ERROR-MESSAGE` | Formats and enqueues error messages via CICS TDQ |

---

## Step 1: Analyze the COBOL Code (5 minutes)

### What You'll Learn

Before converting any legacy code, you need to fully understand its business logic, data structures, and non-obvious patterns. This step shows Bob performing deep technical analysis of a production-style CICS/DB2 program.

### Bob Mode to Use

**🧰 Z Code**

### Bob Prompt

```
Analyze LGUPDB01.cbl and provide a comprehensive explanation of its functionality. Describe:

1. The overall program structure and CICS execution flow (COMMAREA → DB2 → LINK)
2. The optimistic locking strategy using LASTCHANGED timestamps
3. The three policy-type update branches (Endowment, House, Motor) and what each updates
4. The motor premium surcharge calculation based on accident count tiers
5. The DB2 cursor pattern used (DECLARE / OPEN / FETCH / UPDATE WHERE CURRENT OF / CLOSE)
6. Non-obvious COBOL patterns:
   - Host variable integer conversion (CA-* fields moved to DB2-*-INT before SQL)
   - INDICATOR variables for nullable DB2 columns (IND-BROKERID, IND-BROKERSREF, IND-PAYMENT)
   - VARCHAR handling for ENDOWMENT.PADDINGDATA using WS-VARY-FIELD
   - WS-COMMAREA-LENGTHS for minimum COMMAREA length validation
7. Error handling: SQLCODE evaluation, EXEC CICS RETURN paths, WRITE-ERROR-MESSAGE

Create a Mermaid sequence diagram showing:
- CICS → LGUPDB01 → DB2 interaction
- The optimistic lock check (timestamp comparison)
- The three policy-type branches
- The downstream EXEC CICS LINK to LGUPVS01
```

![Alt text](../../images/transform-02.png)

### Expected Results

Bob identifies and explains all of the following — if any are missing, ask Bob to dig deeper:

- ✅ **COMMAREA-driven entry** — no screen, no file; all input arrives in `DFHCOMMAREA` via `EXEC CICS LINK`
- ✅ **Optimistic locking** — `CA-LASTCHANGED` vs `DB2-LASTCHANGED` comparison; returns `02` on mismatch
- ✅ **Cursor FOR UPDATE pattern** — `POLICY_CURSOR` locks the row; `UPDATE ... WHERE CURRENT OF` releases it
- ✅ **Policy-type routing** — `CA-REQUEST-ID` values `01UEND` / `01UHOU` / `01UMOT` drive the EVALUATE
- ✅ **Motor accident tiers** — ≤2 = ×1.0, 3–5 = ×1.20, 6–8 = ×1.50, >8 = ×2.0
- ✅ **Host variable conversion** — all numeric COMMAREA fields moved to `DB2-*-INT` before SQL use
- ✅ **INDICATOR variables** — nullable columns (BROKERID, BROKERSREF, PAYMENT) use `IND-*` variables
- ✅ **VARCHAR padding path** — `WS-VARY-LEN > 0` triggers the longer ENDOWMENT UPDATE including `PADDINGDATA`
- ✅ **CICS RETURN paths** — multiple early return points on SQL errors (-913 on open, non-0 on update)
- ✅ Mermaid sequence diagram generated

### Key COBOL Concepts Bob Will Surface

| COBOL Pattern | What It Does | Java Equivalent |
|---|---|---|
| `EXEC CICS LINK … COMMAREA` | Synchronous program-to-program call via CICS | REST call / service method invocation |
| `EXEC SQL DECLARE CURSOR FOR UPDATE` | Row-level DB lock via scrollable cursor | JPA `@Lock(PESSIMISTIC_WRITE)` / JDBC `FOR UPDATE` |
| `UPDATE … WHERE CURRENT OF cursor` | Updates the locked row by cursor position | `UPDATE … WHERE id = ?` after fetch |
| `PIC S9(9) COMP` host variable | Packed integer for DB2 bind | Java `int` / `Integer` |
| `PIC S9(4) COMP` INDICATOR | Null indicator for nullable column | `Integer` nullable field / `Optional<Integer>` |
| `EVALUATE CA-REQUEST-ID` | Policy-type dispatch | `switch` on enum / strategy pattern |
| `EXEC CICS RETURN` (error path) | Terminate transaction on failure | `throw` exception / return error response |

Please review the generated content within the chat window.

![Alt text](../../images/transform-03.png)

---

## Step 2: Convert to Java 21 (10 minutes)

### What You'll Learn

Generate the complete Java 21 port of LGUPDB01 as a distributed service, replacing CICS COMMAREA exchange with a REST API, DB2 JDBC calls with Spring Data JPA (or plain JDBC), and EXEC CICS LINK with a downstream service call.

### Bob Mode to Use

**🧰 Z Code**

### Bob Prompt

```
Convert LGUPDB01.cbl to a Java 21 distributed service with the following requirements:

Architecture:
- Spring Boot 3 application (replaces CICS container)
- Spring Data JPA + DB2 dialect (replaces embedded EXEC SQL)
- REST endpoint replaces the CICS COMMAREA interface
- Downstream LGUPVS01 call replaced by an injected ValidationService interface

Data model and logic requirements:
1. Use BigDecimal for all monetary fields (PREMIUM, VALUE, SUMASSURED, PAYMENT)
2. Implement optimistic locking using @Version on the Policy entity (maps LASTCHANGED timestamp)
3. Create a PolicyUpdateRequest record that maps all COMMAREA fields
4. Implement the three update branches as separate @Transactional service methods:
   - EndowmentUpdateService (handles VARCHAR padding via optional String field)
   - HouseUpdateService
   - MotorUpdateService — implement the accident-tier premium surcharge exactly:
       ≤2 accidents  → premium × 1.0
       3–5 accidents → premium × 1.20
       6–8 accidents → premium × 1.50
       >8 accidents  → premium × 2.0
5. Map all COBOL return codes to HTTP status:
   - "00" → 200 OK
   - "01" → 404 Not Found (row not found, SQLCODE 100)
   - "02" → 409 Conflict (timestamp mismatch / optimistic lock failure)
   - "90" → 500 Internal Server Error

Package structure:
- com.insurance.policy.update
  ├── controller/PolicyUpdateController.java
  ├── service/PolicyUpdateService.java
  ├── service/EndowmentUpdateService.java
  ├── service/HouseUpdateService.java
  ├── service/MotorUpdateService.java
  ├── service/ValidationService.java  (interface, replaces LGUPVS01 LINK)
  ├── service/NoOpValidationService.java  (lab stub — implements ValidationService with no-op)
  ├── model/ (Policy, Endowment, House, Motor JPA entities)
  ├── dto/PolicyUpdateRequest.java
  ├── dto/PolicyUpdateResponse.java
  └── exception/ (OptimisticLockException, PolicyNotFoundException)

Provide complete source code for all classes, pom.xml with Spring Boot 3 + DB2 JDBC + JUnit 5,
and application.properties with DB2 datasource placeholders.

Important — pom.xml must include:
- <byte-buddy.version>1.15.11</byte-buddy.version> and <mockito.version>5.14.2</mockito.version>
  in <properties> to support JDK 22+
- A maven-surefire-plugin entry with:
  <argLine>-XX:+EnableDynamicAgentLoading -Dnet.bytebuddy.experimental=true</argLine>

Important — application.properties must include:
- spring.jpa.hibernate.ddl-auto=none
- spring.jpa.defer-datasource-initialization=true
- spring.datasource.hikari.initialization-fail-timeout=-1
so the app starts without a live DB2 connection in the lab environment.
```

![Alt text](../../images/transform-04.png)

### Expected Deliverables

Bob generates a complete Maven project:

```
src/
├── main/java/com/insurance/policy/update/
│   ├── controller/
│   │   ├── PolicyUpdateController.java      ← PUT /api/v1/policies/{policyNumber}, replaces CICS entry
│   │   └── GlobalExceptionHandler.java      ← @ControllerAdvice, maps exceptions → HTTP codes
│   ├── service/
│   │   ├── PolicyUpdateService.java         ← orchestration, replaces MAINLINE + UPDATE-POLICY-DB2-INFO
│   │   ├── EndowmentUpdateService.java      ← replaces UPDATE-ENDOW-DB2-INFO
│   │   ├── HouseUpdateService.java          ← replaces UPDATE-HOUSE-DB2-INFO
│   │   ├── MotorUpdateService.java          ← replaces UPDATE-MOTOR-DB2-INFO (with premium tiers)
│   │   ├── ValidationService.java           ← interface replacing EXEC CICS LINK LGUPVS01
│   │   ├── NoOpValidationService.java       ← lab stub implementing ValidationService
│   │   └── LabDataSeeder.java               ← seeds one Policy + Motor row into H2 on startup
│   ├── model/
│   │   ├── Policy.java                      ← @Entity with @Version for optimistic lock
│   │   ├── Endowment.java
│   │   ├── House.java
│   │   └── Motor.java
│   ├── dto/
│   │   ├── PolicyUpdateRequest.java         ← replaces DFHCOMMAREA
│   │   └── PolicyUpdateResponse.java
│   └── exception/
│       ├── PolicyOptimisticLockException.java
│       └── PolicyNotFoundException.java
├── main/resources/
│   ├── application.properties               ← DB2 placeholders + lab profile activation
│   └── application-lab.properties           ← H2 datasource override for lab use
pom.xml
```

Conversion mapping verified:

| COBOL element | Java equivalent |
|---|---|
| `DFHCOMMAREA` | `PolicyUpdateRequest` record |
| `POLICY_CURSOR … FOR UPDATE` | JPA `@Lock(PESSIMISTIC_WRITE)` or `SELECT … FOR UPDATE` JDBC query |
| `UPDATE … WHERE CURRENT OF` | JPA `save()` / JDBC parameterized UPDATE by ID |
| `CA-LASTCHANGED` + `DB2-LASTCHANGED` | JPA `@Version` → `OptimisticLockException` on mismatch |
| `EVALUATE CA-REQUEST-ID` | `switch` on `PolicyType` enum |
| Motor accident tiers | `PremiumCalculator.calculate(premium, accidents)` |
| `EXEC CICS LINK LGUPVS01` | `validationService.validate(request)` |
| `CA-RETURN-CODE "90"` | HTTP 500 via `@ExceptionHandler` |

View the generated code on the left, and feel free to explore the content within the chat window on the right.

![Alt text](../../images/transform-05.png)

### Verify the Build Compiles

Open a terminal window and run:

```bash
mvn clean compile
```

![Alt text](../../images/transform-06.png)

Expected: `BUILD SUCCESS` with no errors.

![Alt text](../../images/transform-07.png)

---

## Step 3: Create a Validation Test Suite (8 minutes)

### What You'll Learn

The JUnit 5 test suite is the proof of correctness — it validates that the Java service reproduces every COBOL business rule: the three policy-type update paths, the motor premium tiers, the optimistic lock conflict response, and the not-found path.

### Bob Mode to Use

**Java Modernization** (or Z Code)

### Bob Prompt

```
Create a comprehensive JUnit 5 test suite for the LGUPDB01 Java service:

1. Unit tests for MotorUpdateService.calculatePremium():
   - 0 accidents → premium unchanged (×1.0)
   - 2 accidents → premium unchanged (×1.0, boundary)
   - 3 accidents → premium × 1.20
   - 5 accidents → premium × 1.20 (boundary)
   - 6 accidents → premium × 1.50
   - 8 accidents → premium × 1.50 (boundary)
   - 9 accidents → premium × 2.0
   - 100 accidents → premium × 2.0 (extreme)

2. Unit tests for PolicyUpdateService (mock JPA repositories):
   - Successful Endowment update (CA-REQUEST-ID = "01UEND") → returns 200
   - Successful House update (CA-REQUEST-ID = "01UHOU") → returns 200
   - Successful Motor update (CA-REQUEST-ID = "01UMOT") → returns 200
   - Timestamp mismatch → returns 409 Conflict
   - Policy not found (SQLCODE 100 equivalent) → returns 404
   - DB error → returns 500

3. Integration tests for PolicyUpdateController (MockMvc):
   - PUT /api/v1/policies/{policyNumber} with valid Motor request → 200
   - PUT /api/v1/policies/{policyNumber} with path/body policyNumber mismatch → 400
   - PUT /api/v1/policies/{policyNumber} with optimistic lock conflict → 409

4. Test the VARCHAR padding behaviour:
   - EndowmentUpdateService with non-null paddingData → SQL includes PADDINGDATA column
   - EndowmentUpdateService with null paddingData → SQL omits PADDINGDATA column

Provide:
- PremiumCalculatorTest.java (8 test cases)
- PolicyUpdateServiceTest.java (6 test cases, Mockito mocks for repos)
- PolicyUpdateControllerTest.java (3 MockMvc integration tests)
- Clear @DisplayName annotations on all tests
```

![Alt text](../../images/transform-08.png)

### Expected Deliverables

```
src/test/java/com/insurance/policy/update/
├── service/MotorUpdateServiceSurchargeTest.java  ← 14 tests (all premium tier boundaries)
├── service/EndowmentUpdateServiceTest.java       ← 3 tests
├── service/PolicyUpdateServiceTest.java          ← 5 tests (routing, lock, not-found)
└── controller/PolicyUpdateControllerTest.java    ← 5 tests (HTTP status code mapping)
```

![Alt text](../../images/transform-09.png)

**Test categories covered:**

| Category | What It Validates |
|---|---|
| Premium tiers | All 4 accident-count bands produce the correct multiplier exactly |
| Policy routing | All three CA-REQUEST-ID values dispatch to the correct service |
| Optimistic lock | Timestamp mismatch maps to HTTP 409 |
| Not found | Missing policy maps to HTTP 404 |
| VARCHAR path | Padding data presence/absence controls which SQL variant runs |
| Input validation | Missing required fields rejected before service is called |

### Run the Tests

```bash
cd <path to java location>
mvn test
```

![Alt text](../../images/transform-10.png)

Expected output:

```
Tests run: 27, Failures: 0, Errors: 0, Skipped: 0
BUILD SUCCESS
```

- ✅ All 27 tests pass
- ✅ Premium multipliers match COBOL tier logic exactly
- ✅ All HTTP status code mappings validated
- ✅ No precision loss in BigDecimal premium calculations

![Alt text](../../images/transform-11.png)

---

## Step 4: Add a REST API (7 minutes)

### What You'll Learn

Finalize the REST API with Swagger/OpenAPI documentation, input validation annotations, and `curl` examples. The CICS COMMAREA is fully replaced by a self-documenting JSON contract.

### Bob Mode to Use

**Java Modernization**

### Bob Prompt

```
Finalize the Spring Boot REST API for the LGUPDB01 policy update service:

1. Endpoint:
   PUT /api/v1/policies/{policyNumber}
   Request body (JSON) — all fields are top-level (flat structure, no nested objects):
   {
     "customerNumber": 1000012,
     "policyNumber": 1,
     "requestId": "01UMOT",
     "lastChanged": "2024-01-15T10:30:00.000000",
     "issueDate": "2020-01-15",
     "expiryDate": "2025-01-15",
     "brokerId": 1,
     "brokersReference": "BROK001",
     "make": "Toyota",
     "model": "Corolla",
     "motorValue": 15000,
     "regNumber": "AB12CDE",
     "colour": "Blue",
     "engineCc": 1600,
     "yearOfManufacture": 2019,
     "premium": 500.00,
     "accidents": 3
   }

   Success response (200):
   { "returnCode": "00", "lastChanged": "2024-01-15T10:30:01.123456" }

   Conflict response (409):
   { "returnCode": "02", "message": "Policy record has been modified by another user" }

2. Add Bean Validation (@NotNull, @Size, @Pattern) on PolicyUpdateRequest fields
3. Add Swagger/OpenAPI 3 annotations (@Operation, @ApiResponse) on the controller
4. Add CORS configuration for web clients
5. Handle all exception types from service layer with @ControllerAdvice

Provide:
- Finalized PolicyUpdateController.java with full Swagger annotations
- GlobalExceptionHandler.java (@ControllerAdvice)
- Updated application.properties (port 8080, DB2 datasource template, springdoc path)
- curl examples for all three policy types (Endowment, House, Motor)
- Instructions to view Swagger UI
```

![Alt text](../../images/transform-12.png)

### Expected Deliverables

```
src/main/java/com/insurance/policy/update/
├── controller/
│   ├── PolicyUpdateController.java     ← full @Operation annotations
│   └── GlobalExceptionHandler.java     ← maps exceptions → HTTP codes
src/main/resources/
└── application.properties
```

![Alt text](../../images/transform-13.png)

### Test the API

Start the server:

```bash
cd <path-to-java-location>
mvn spring-boot:run
```

![Alt text](../../images/transform-14.png)

`LabDataSeeder` seeds a fixed policy row at startup with `lastChanged: "2024-01-15T10:30:00"`. Use that value directly — no copy-paste required:

```bash
curl -s -X PUT http://localhost:8080/api/v1/policies/1 \
  -H "Content-Type: application/json" \
  -d '{
    "customerNumber": 1000012,
    "policyNumber": 1,
    "requestId": "01UMOT",
    "lastChanged": "2024-01-15T10:30:00",
    "issueDate": "2020-01-15",
    "expiryDate": "2025-01-15",
    "brokerId": 1,
    "brokersReference": "BROK001",
    "make": "Toyota",
    "model": "Corolla",
    "motorValue": 15000,
    "regNumber": "AB12CDE",
    "colour": "Blue",
    "engineCc": 1600,
    "yearOfManufacture": 2019,
    "premium": 500.00,
    "accidents": 3
  }'
```

Expected response:

```json
{ "returnCode": "00", "lastChanged": "2024-01-15T10:30:00", "message": "Policy updated successfully" }
```
![Alt text](../../images/transform-15.png)

> ℹ️ Running the same `curl` a second time returns HTTP 409 Conflict — the
> `lastChanged` token was updated by the first write, so the old value no
> longer matches. This demonstrates the optimistic-lock behaviour from LGUPDB01.

View the H2 console (lab only): open `http://localhost:8080/h2-console`
— JDBC URL: `jdbc:h2:mem:policydb`, username: `sa`, password: *(empty)*

- ✅ `returnCode: "00"` — full success path exercised end-to-end
- ✅ Re-running the same curl returns HTTP 409 — optimistic lock demonstrated
- ✅ Invalid input returns HTTP 400 with field-level validation messages

---

## Step 5 (Optional): Generate Documentation (5 minutes)

### Bob Prompt

```
Generate comprehensive documentation for the LGUPDB01 Java modernization:

1. JavaDoc comments for all public methods in all service and controller classes
2. A Mermaid class diagram showing entity relationships (Policy → Endowment/House/Motor)
3. A migration guide documenting every COBOL → Java mapping decision:
   - COMMAREA fields → DTO fields (with data types)
   - EXEC SQL statements → JPA repository methods
   - EXEC CICS RETURN (error) → HTTP status codes
   - EXEC CICS LINK LGUPVS01 → ValidationService interface
4. README.md with build/run instructions, DB2 datasource configuration, and API usage examples

Generate using Maven site plugin and provide instructions to view.
```

---

## Key Takeaways

### What You've Accomplished

1. ✅ Analyzed LGUPDB01 — CICS/DB2 idioms, optimistic locking, and all three policy-type branches explained
2. ✅ Converted to Java 21 Spring Boot with correct data type mapping and JPA optimistic lock
3. ✅ Created a 27-test JUnit suite proving all business rules are preserved
4. ✅ Wrapped business logic in a documented REST API replacing the CICS COMMAREA interface

### Key COBOL → Java Patterns

| Pattern | COBOL (LGUPDB01) | Java |
|---|---|---|
| Program entry | `EXEC CICS LINK … COMMAREA` | `@PutMapping` REST endpoint |
| DB row lock | `DECLARE CURSOR … FOR UPDATE` | JPA `@Lock(PESSIMISTIC_WRITE)` |
| Optimistic lock | `CA-LASTCHANGED = DB2-LASTCHANGED` | JPA `@Version` on entity |
| Policy dispatch | `EVALUATE CA-REQUEST-ID WHEN '01UMOT'` | `switch` on `PolicyType` enum |
| Motor surcharge | Multi-IF accident-tier COMPUTE | `PremiumCalculator.calculate(BigDecimal, int)` |
| Host variables | `MOVE CA-PAYMENT TO DB2-PAYMENT-INT` | JDBC parameter binding / JPA field mapping |
| Nullable columns | `INDICATOR :IND-BROKERID` | `Optional<Integer>` / nullable `Integer` |
| Error termination | `EXEC CICS RETURN` | `throw` → `@ControllerAdvice` HTTP response |

### Time Savings

| Task | Manual Estimate | With Bob |
|---|---|---|
| CICS/DB2 COBOL analysis + sequence diagram | 4–8 hours | 5 minutes |
| Java 21 conversion (entities, services, controller) | 3–5 days | 10 minutes |
| JUnit test suite (27 tests) | 4–8 hours | 8 minutes |
| REST API + Swagger + CORS | 4–8 hours | 7 minutes |

### Bob Premium for Z Capabilities Demonstrated

- **CICS/DB2 semantic understanding:** Explains FOR UPDATE cursors, COMMAREA mechanics, and INDICATOR variables in plain English
- **Distributed transformation:** Produces a runnable Spring Boot 3 + JPA service from a batch CICS program
- **Business rule fidelity:** Motor accident-tier logic preserved exactly — no rounding, no missed boundaries
- **Full-stack generation:** COBOL → Java entities + services + REST API + tests in one session

---

## Troubleshooting

**Issue:** `mvn clean compile` fails with Java version error

**Solution:** Confirm `JAVA_HOME` points to JDK 21, not a JRE; run `java -version` to verify.

---

**Issue:** `mvn test` fails with *"constructor PolicyUpdateRequest cannot be applied to given types; reason: actual and formal argument lists differ in length"*

**Solution:** The `PolicyUpdateRequest` record has 32 fields — all three policy-type groups (endowment, house, motor) must be passed even when they are not relevant to the request being tested. Each unused group must be filled with `null` values. The house section contains 6 fields (`propertyType`, `bedrooms`, `houseValue`, `houseName`, `houseNumber`, `postcode`); a common mistake is passing only 5 nulls and omitting `postcode`. Ask Bob to regenerate the test constructors, or manually ensure the motor test fixture passes `null` for all 6 house fields before the motor fields begin.

---

**Issue:** `mvn test` fails with *"Byte Buddy could not instrument … Java 2X is not supported"* or *"Could not initialize inline Byte Buddy mock maker"*

**Solution:** This occurs when the local JDK is newer than what Byte Buddy officially supports. Two fixes are needed in `pom.xml`:

1. Override the Byte Buddy and Mockito versions in `<properties>` — use the exact Spring Boot BOM property name `byte-buddy.version`:

   ```xml
   <properties>
       <byte-buddy.version>1.15.11</byte-buddy.version>
       <mockito.version>5.14.2</mockito.version>
   </properties>
   ```

2. Add JVM flags to the Surefire plugin so the forked test JVM allows agent loading and Byte Buddy experimental mode:

   ```xml
   <plugin>
       <groupId>org.apache.maven.plugins</groupId>
       <artifactId>maven-surefire-plugin</artifactId>
       <configuration>
           <argLine>-XX:+EnableDynamicAgentLoading -Dnet.bytebuddy.experimental=true</argLine>
       </configuration>
   </plugin>
   ```

---

**Issue:** `mvn test` reports *"Optimistic lock conflict for policyNumber=%d"* — the policy number is not substituted in the exception message

**Solution:** The `PolicyOptimisticLockException` constructor builds its message by string concatenation; `.formatted(policyNumber)` must be called on the entire concatenated string, not just the last literal. The correct form uses outer parentheses:

```java
super(("Optimistic lock conflict for policyNumber=%d: "
        + "LASTCHANGED timestamp in request does not match ...").formatted(policyNumber));
```

Without the outer parentheses, `.formatted()` is called only on the final fragment, leaving `%d` unsubstituted. Ask Bob to fix `PolicyOptimisticLockException.java` if this occurs.

---

**Issue:** `mvn spring-boot:run` fails with *"Invalid database URL syntax: jdbc:db2://\<DB2\_HOST\>:\<DB2\_PORT\>/\<DB2\_DATABASE\>"*

**Solution:** The generated `application.properties` contains placeholder datasource values that Spring Boot tries to connect to at startup. Add these three properties so the app starts without a live DB2 instance:

```properties
spring.jpa.hibernate.ddl-auto=none
spring.jpa.defer-datasource-initialization=true
spring.datasource.hikari.initialization-fail-timeout=-1
```

These are already set in the provided `application.properties`. If Bob regenerates the file and omits them, add them back. When a real DB2 datasource is configured, change `ddl-auto` back to `validate`.

---

**Issue:** `mvn spring-boot:run` fails with *"No qualifying bean of type 'ValidationService' available"*

**Solution:** `ValidationService` is an interface (the stand-in for LGUPVS01) with no `@Service` implementation, so Spring cannot wire it into `PolicyUpdateService`. The project includes `NoOpValidationService.java` — a `@Service` class that satisfies the dependency with a no-op implementation for the lab. If Bob regenerates the service layer and omits this class, ask Bob:

> *"Add a `NoOpValidationService` that implements `ValidationService` with an empty `validate()` method and annotate it `@Service`."*

---

**Issue:** JPA `@Version` throws `OptimisticLockException` unexpectedly

**Solution:** Ask Bob: *"The optimistic lock is firing on every update — check that the `lastChanged` field in PolicyUpdateRequest is being correctly bound to the `@Version` column before the merge."*

---

**Issue:** Premium calculation test fails on boundary (e.g., 5 accidents)

**Solution:** Ask Bob: *"The premium tier for 5 accidents should be ×1.20 — verify the range condition is `accidents >= 3 && accidents <= 5`, not strictly less than."*

---

**Issue:** `curl` returns `{"returnCode":"90","message":"Internal error: No static resource api/policy/update."}` or a 404/405

**Solution:** The endpoint is `PUT /api/v1/policies/{policyNumber}` — not `POST /api/policy/update`. The request body is a **flat JSON object**; there is no nested `motor`, `house`, or `endowment` sub-object. The seed `lastChanged` is the fixed value `"2024-01-15T10:30:00"` — use it exactly as shown:

```bash
curl -s -X PUT http://localhost:8080/api/v1/policies/1 \
  -H "Content-Type: application/json" \
  -d '{
    "customerNumber": 1000012,
    "policyNumber": 1,
    "requestId": "01UMOT",
    "lastChanged": "2024-01-15T10:30:00",
    "issueDate": "2020-01-15",
    "expiryDate": "2025-01-15",
    "make": "Toyota",
    "model": "Corolla",
    "motorValue": 15000,
    "regNumber": "AB12CDE",
    "colour": "Blue",
    "engineCc": 1600,
    "yearOfManufacture": 2019,
    "premium": 500.00,
    "accidents": 3
  }'
```

The path variable (`/1`) must match `policyNumber` in the body; a mismatch returns HTTP 400.

---

**Issue:** DB2 JDBC driver not found

**Solution:** Add the IBM DB2 JDBC driver to your local Maven repository or use the `com.ibm.db2:jcc` artifact from Maven Central; ask Bob to update the `pom.xml` dependency.

---

**Issue:** Spring Boot port 8080 already in use

**Solution:** Add `server.port=8081` to `application.properties` and retry.

---

## Appendix: Environment Setup

### macOS

```bash
brew install openjdk@21
brew install maven
export JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home
# Make permanent:
echo 'export JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home' >> ~/.zshrc
source ~/.zshrc
```

### Windows

1. Download OpenJDK 21 from https://adoptium.net/temurin/releases/?version=21 — run installer, select "Add to PATH"
2. Download Maven from https://maven.apache.org/download.cgi — extract to `C:\Program Files\Maven`, add `bin\` to PATH
3. Set System Variable: `JAVA_HOME` = `C:\Program Files\Eclipse Adoptium\jdk-21.x.x`

### Linux (Ubuntu/Debian)

```bash
sudo apt update && sudo apt install openjdk-21-jdk maven
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk
echo 'export JAVA_HOME=/usr/lib/jvm/java-21-openjdk' >> ~/.bashrc && source ~/.bashrc
```

---

## Resources

- [IBM CICS Transaction Server for z/OS Documentation](https://www.ibm.com/docs/en/cics-ts)
- [IBM Db2 for z/OS Documentation](https://www.ibm.com/docs/en/db2-for-zos)
- [Spring Boot 3 Reference](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [Spring Data JPA — Locking](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.locking)
- [JUnit 5 Documentation](https://junit.org/junit5/docs/current/user-guide/)

### Support

- Slack: #bob-premium-z
- Email: bob-z-support@ibm.com

---

**LGUPDB01 Modernization Complete!** 🎉

You now have a fully modernized Java 21 distributed service — tested, API-ready, and production-deployable — built from a legacy CICS/DB2 COBOL program in under 45 minutes.
