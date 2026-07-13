# Use Case: Z COBOL to Java — Full Language Modernization

> **Prerequisites:** Complete `building-labs/00-lab-setup.md` before starting this use case.
> **Code Set:** `code sets/cobol-financial-calculator/`
> **Mode:** Z Code (Steps 1–2), Agent (Steps 3–5)
> **Duration:** 30–45 minutes
> **Difficulty:** Intermediate

## Learning Objectives

By the end of this lab, you will be able to:

- Use Bob to deeply analyze legacy COBOL idioms and financial patterns
- Convert COBOL programs to modern Java with correct data type mapping
- Generate a JUnit 5 test suite that validates conversion accuracy against the original COBOL output
- Build an interactive Java UI replacing hardcoded COBOL test data
- Wrap business logic in a Spring Boot REST API with Swagger documentation
- Explain the key COBOL → Java conversion patterns to a client

## Prerequisites

- **Java 21** (OpenJDK) installed
- **Apache Maven 3.6+** installed

Verify before starting:
```bash
java -version   # should show OpenJDK 21.x.x
mvn -version    # should show Maven 3.6+
```
If not installed, see the **Appendix: Environment Setup** at the end of this use case.

## Setup

### Step 1: Open the Code Set and Run Lab Setup

1. Open VS Code → **File → Open Folder** → select `code sets/cobol-financial-calculator/`
2. Complete all steps in `building-labs/00-lab-setup.md` (scan, Agent.md, data dictionary)

### Step 2: Understand the Source Programs

You have three COBOL programs:

| Program | Role | What It Calculates |
|---|---|---|
| `COBCALC.cbl` | Main controller | Orchestrates the two subprograms; reads input and routes to LOAN or PVALUE |
| `COBLOAN.cbl` | Loan subprogram | Monthly loan payment using the ANNUITY intrinsic function |
| `COBVALU.cbl` | Present value subprogram | Net present value of a series of cash flows |

These are IBM sample programs from the Debug for z/OS documentation — representative of real financial calculation logic found in banking and insurance mainframe systems.

---

## Step 1: Analyze the COBOL Code (5 minutes)

### What You'll Learn

Before converting any legacy code, you need to fully understand its business logic, data structures, and non-obvious patterns. This step shows Bob performing deep technical analysis across multiple interdependent programs simultaneously.

### Bob Mode to Use

**🧰 Z Code**

### Bob Prompt

```
Analyze the COBOL financial calculator codebase and provide a comprehensive
explanation of its functionality. Describe:

1. The overall program structure and flow
2. How COBCALC orchestrates the subprograms
3. The financial calculations performed (loan payments and present value)
4. Non-obvious COBOL patterns used (REDEFINES arrays, UNSTRING delimiters,
   underscore placeholder technique)
5. Data type usage (COMP vs DISPLAY, PIC clauses)
6. The LINKAGE SECTION feedback mechanism

Create a Mermaid architecture diagram showing:
- Program relationships and CALL flow
- Data structures and their transformations
- Key methods and their purposes
- The calculation pipeline from input to output
```

### Expected Results

Bob identifies and explains all of the following — if any are missing, ask Bob to dig deeper:

- ✅ **Hardcoded test data pattern** — `COBCALC` uses `BUFFER-DATA` with fixed inputs; not production-ready
- ✅ **REDEFINES for array simulation** — `BUFFER-ARRAY REDEFINES BUFFER-DATA OCCURS 4 TIMES` is a classic COBOL array idiom
- ✅ **Monthly rate conversion** — annual interest must be divided by 12 before passing to ANNUITY
- ✅ **Two-character feedback mechanism** — `CALL-FEEDBACK PIC XX` returns `"OK"` or `"NO"` from subprograms
- ✅ **Underscore placeholder formatting** — `PAYMENT-OUT PIC $$$$,$$$,$$9.99` uses currency picture clauses
- ✅ **Case-insensitive input** — `FUNCTION UPPER-CASE` normalizes `"pvalue"` and `"PVALUE"` to the same path
- ✅ Mermaid architecture diagram generated showing CALL flow

### Key COBOL Concepts Bob Will Surface

| COBOL Pattern | What It Does | Java Equivalent |
|---|---|---|
| `PIC S9(9)V99 COMP` | Signed packed-decimal number | `BigDecimal` |
| `FUNCTION ANNUITY` | Built-in loan annuity formula | Custom annuity method |
| `FUNCTION PRESENT-VALUE` | NPV calculation | Loop with discount formula |
| `UNSTRING ... DELIMITED BY` | String splitting on delimiter | `String.split()` |
| `INSPECT REPLACING` | String character substitution | `String.replace()` |
| `CALL ... USING` + `LINKAGE SECTION` | Subprogram parameter passing | Method arguments + return object |

---

## Step 2: Convert to Java (10 minutes)

### What You'll Learn

Generate the complete Java port of the COBOL programs, with correct data type mapping, proper class design, and Maven project structure.

### Bob Mode to Use

**🧰 Z Code**

### Bob Prompt

```
Convert the COBOL financial calculator to Java with the following requirements:

1. Use BigDecimal for all financial calculations (avoid floating-point errors)
2. Create separate classes for each calculator (LoanCalculator, PresentValueCalculator)
3. Implement a CalculationResult class to replace the LINKAGE SECTION feedback mechanism
4. Preserve the original calculation logic exactly
5. Handle edge cases (zero interest, negative values, empty arrays)
6. Create a Main class that mimics COBCALC's orchestration
7. Use Maven for build management with JUnit 5 dependencies

Provide:
- Complete Java source code for all classes
- Maven pom.xml configuration
- Package structure (com.financial.calculator)
- Proper error handling and validation
```

### Expected Deliverables

Bob generates a complete Maven project:

```
src/
├── main/java/com/financial/calculator/
│   ├── Main.java                   ← replaces COBCALC orchestration
│   ├── CalculationResult.java      ← replaces LINKAGE SECTION feedback (OK/NO)
│   ├── LoanCalculator.java         ← replaces COBLOAN
│   └── PresentValueCalculator.java ← replaces COBVALU
pom.xml
```

- ✅ `BigDecimal` used for all monetary values (no `double` or `float`)
- ✅ `CalculationResult` wraps both a value and a success/failure status string
- ✅ Annuity formula implemented correctly (monthly rate = annual rate / 12)
- ✅ Present value loop matches COBVALU's logic
- ✅ `pom.xml` includes JUnit 5 dependency

### Verify the Build Compiles

```bash
mvn clean compile
```

Expected: `BUILD SUCCESS` with no errors.

---

## Step 3: Create a Validation Test Suite (8 minutes)

### What You'll Learn

The JUnit test suite is the proof of correctness — it validates that the Java output matches the original COBOL output for the same inputs. This is the key artifact that makes a client comfortable approving a modernization.

### Bob Mode to Use

**💻 Agent** (or Z Code)

### Bob Prompt

```
Create a comprehensive JUnit 5 test suite for the financial calculators:

1. Test with the original COBOL hardcoded test data to verify conversion accuracy
2. Test edge cases:
   - Zero interest rates
   - Single period loans
   - Negative cash flows
   - Empty input arrays
   - Very large numbers
3. Test error conditions:
   - Negative loan amounts
   - Invalid discount rates (≤ -1)
   - Zero or negative periods
4. Verify message formatting matches COBOL output
5. Test currency formatting ($X,XXX.XX)

Provide:
- LoanCalculatorTest.java with 8+ test cases
- PresentValueCalculatorTest.java with 10+ test cases
- Clear test names describing what is being tested
- Assertions that validate both values and messages
```

### Expected Deliverables

```
src/test/java/com/financial/calculator/
├── LoanCalculatorTest.java         ← 8+ tests
└── PresentValueCalculatorTest.java ← 10+ tests
```

**Test categories covered:**

| Category | What It Validates |
|---|---|
| Accuracy | Java output matches COBOL hardcoded test data exactly |
| Edge Cases | Zero interest, single cash flow, large numbers |
| Validation | Reject negative amounts, invalid rates, zero periods |
| Formatting | Currency output format `$XX,XXX.XX` matches COBOL picture clause |
| Boundary | Extreme values don't cause overflow or precision loss |

### Run the Tests

```bash
mvn test
```

Expected output:
```
Tests run: 19, Failures: 0, Errors: 0, Skipped: 0
BUILD SUCCESS
```

- ✅ All 19 tests pass
- ✅ No precision differences between COBOL and Java output
- ✅ Error conditions handled with meaningful messages

---

## Step 4: Build an Interactive UI (10 minutes)

### What You'll Learn

The COBOL programs use hardcoded test data — there's no way for a user to enter their own values. This step replaces that with an interactive desktop UI, demonstrating how Bob bridges from legacy batch to modern interactive applications.

### Bob Mode to Use

**💻 Agent**

### Bob Prompt

```
Create a JavaFX or Swing GUI for the financial calculator with:

1. Tabbed interface with two tabs:
   - "Loan Calculator" tab
   - "Present Value Calculator" tab

2. Loan Calculator tab:
   - Input fields: Loan Amount, Annual Interest Rate (%), Number of Months
   - Calculate button
   - Results display area showing monthly payment
   - Input validation with error messages

3. Present Value Calculator tab:
   - Input fields: Discount Rate (%), Number of Periods
   - Dynamic cash flow input fields (add/remove capability)
   - Calculate button
   - Results display area showing present value
   - Input validation

4. Features:
   - Clear/Reset buttons
   - Currency formatting in results
   - Enter key triggers calculation
   - Error dialogs for invalid inputs

Provide complete source code and instructions to run the GUI.
```

### Expected Deliverables

- `FinancialCalculatorGUI.java` — complete tabbed GUI class
- Updated `pom.xml` with JavaFX or Swing dependencies
- Run instruction: `mvn javafx:run` or `mvn exec:java`

- ✅ Two tabs — one per calculator
- ✅ All input fields present with labels
- ✅ Validation prevents calculation with empty or invalid inputs
- ✅ Results display with `$X,XXX.XX` currency formatting
- ✅ Reset button clears all fields

### Bob Differentiators in Action

This step turns a batch COBOL program with no user interface into a modern interactive application — in a single prompt. The business logic (from Step 2) is reused unchanged; Bob only adds the presentation layer on top.

---

## Step 5: Add a REST API (7 minutes)

### What You'll Learn

Wrap the calculators in a Spring Boot REST API, making them consumable by any modern web or mobile application. This is the microservice wrapper pattern for COBOL modernization.

### Bob Mode to Use

**💻 Agent**

### Bob Prompt

```
Create a Spring Boot REST API for the financial calculators:

1. Endpoints:
   - POST /api/loan/calculate
     Request:  { "loanAmount": 30000, "annualRate": 0.09, "periods": 24 }
     Response: { "monthlyPayment": 1370.54, "message": "..." }

   - POST /api/presentvalue/calculate
     Request:  { "discountRate": 0.12, "cashFlows": [50, 69, 83, 75, 44] }
     Response: { "presentValue": 231.36, "message": "..." }

2. Features:
   - Input validation with proper HTTP status codes
   - JSON request/response bodies
   - Error handling with meaningful messages
   - CORS configuration for web clients
   - Swagger/OpenAPI documentation

3. Provide:
   - REST controller classes
   - Request/Response DTOs
   - Updated pom.xml with Spring Boot dependencies
   - application.properties configuration
   - curl examples to test the API
```

### Expected Deliverables

```
src/main/java/com/financial/calculator/
└── controllers/
    ├── LoanCalculatorController.java
    ├── PresentValueCalculatorController.java
    ├── LoanRequest.java / LoanResponse.java
    └── PresentValueRequest.java / PresentValueResponse.java
src/main/resources/
└── application.properties
```

### Test the API

Start the server:
```bash
mvn spring-boot:run
```

Test loan calculation:
```bash
curl -X POST http://localhost:8080/api/loan/calculate \
  -H "Content-Type: application/json" \
  -d '{"loanAmount": 30000, "annualRate": 0.09, "periods": 24}'
```

Expected response:
```json
{ "monthlyPayment": 1370.54, "message": "Monthly payment: $1,370.54" }
```

View API documentation: open `http://localhost:8080/swagger-ui.html`

- ✅ Both endpoints return correct values
- ✅ Invalid inputs return HTTP 400 with a meaningful error message
- ✅ Swagger UI accessible and shows both endpoints

---

## Step 6 (Optional): Performance Benchmark (5 minutes)

### Bob Prompt

```
Create a performance benchmark comparing the Java implementation:

1. Create a benchmark harness that:
   - Runs 100,000 loan calculations
   - Runs 100,000 present value calculations
   - Measures execution time and memory usage
   - Compares BigDecimal vs double precision

2. Provide benchmark code using JMH (Java Microbenchmark Harness)
3. Include analysis of results and optimization recommendations
```

---

## Step 7 (Optional): Generate Documentation (5 minutes)

### Bob Prompt

```
Generate comprehensive documentation for the Java financial calculator:

1. JavaDoc comments for all public methods
2. Architecture diagram showing class relationships and data flow
3. Migration guide documenting COBOL to Java mapping decisions and known differences
4. User guide with build/run instructions and API usage examples

Generate using Maven site plugin and provide instructions to view.
```

---

## Key Takeaways

### What You've Accomplished

1. ✅ Analyzed legacy COBOL financial software — all idioms explained
2. ✅ Converted to modern Java with correct data type mapping
3. ✅ Created a 19-test JUnit suite proving conversion accuracy
4. ✅ Built an interactive UI replacing hardcoded COBOL test data
5. ✅ Wrapped business logic in a REST API for modern system integration

### Key COBOL → Java Patterns

| Pattern | COBOL | Java |
|---|---|---|
| Financial precision | `PIC S9(9)V99 COMP` | `BigDecimal` with scale |
| Subprogram results | `LINKAGE SECTION` + `PIC XX` feedback | Return object with status field |
| Array simulation | `REDEFINES ... OCCURS` | `List<BigDecimal>` or array |
| String splitting | `UNSTRING ... DELIMITED BY` | `String.split()` |
| Character substitution | `INSPECT REPLACING` | `String.replace()` |
| Built-in finance | `FUNCTION ANNUITY` | Custom annuity formula |

### Time Savings

| Task | Manual Estimate | With Bob |
|---|---|---|
| COBOL analysis + architecture diagram | 4–8 hours | 5 minutes |
| Java conversion (3 programs) | 2–3 days | 10 minutes |
| JUnit test suite (19 tests) | 4–8 hours | 8 minutes |
| Interactive UI | 1–2 days | 10 minutes |
| REST API + Swagger | 4–8 hours | 7 minutes |

### Bob Premium for Z Capabilities Demonstrated

- **Multi-program analysis:** Reads interdependent COBOL programs together, not in isolation
- **Semantic understanding:** Explains COBOL idioms in plain English — REDEFINES, UNSTRING, COMP types
- **Full-stack generation:** COBOL → Java → tests → UI → REST API in one session
- **Accuracy-first conversion:** JUnit tests against original COBOL data are generated as part of the workflow

## Troubleshooting

**Issue:** `mvn clean compile` fails with Java version error  
**Solution:** Confirm `JAVA_HOME` points to JDK 21, not a JRE; run `java -version` to verify

**Issue:** Tests fail on precision (e.g., expected `1370.54` got `1370.5399...`)  
**Solution:** Ask Bob: "The loan calculation has a precision mismatch — adjust BigDecimal scale and rounding mode to match the COBOL COMP output"

**Issue:** JavaFX GUI won't launch  
**Solution:** Run `mvn exec:java` instead of `mvn javafx:run`; or ask Bob to switch to Swing which has no extra dependencies

**Issue:** Spring Boot port 8080 already in use  
**Solution:** Add `server.port=8081` to `application.properties` and retry

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

- [IBM Debug for z/OS Sample Programs](https://www.ibm.com/docs/en/debug-for-zos/16.0.x?topic=mode-example-sample-cobol-program-debugging) — original COBOL source reference
- [Bob Premium for Z Documentation](https://bob.ibm.com/docs/z)
- [JUnit 5 Documentation](https://junit.org/junit5/docs/current/user-guide/)
- [Spring Boot Reference](https://docs.spring.io/spring-boot/docs/current/reference/html/)

### Support

- Slack: #bob-premium-z
- Email: bob-z-support@ibm.com

---

**Z COBOL to Java Complete!** 🎉

You now have a fully modernized Java application — tested, interactive, and API-ready — built from legacy COBOL in under 45 minutes.
