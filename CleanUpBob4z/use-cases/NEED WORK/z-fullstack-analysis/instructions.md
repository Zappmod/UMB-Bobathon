# Use Case: Z Full-Stack Analysis — COBOL + Frontend

> **Prerequisites:** Complete `building-labs/00-lab-setup.md` with the CBSA code set before starting this use case.
> **Code Set:** `code sets/cics-banking-sample-application/`
> **Mode:** Z Code (primary), Z Architect (architecture review)
> **Duration:** 2–3 hours
> **Difficulty:** Intermediate

## Learning Objectives

By the end of this lab, you will be able to:

- Retrieve and integrate a frontend codebase into a Bob workspace using natural language
- Initialize AGENTS.md to give Bob full context across backend and frontend
- Generate separate inventories for COBOL programs and frontend components
- Create global and detailed architecture diagrams covering all layers
- Trace a business transaction end-to-end across COBOL and Java/React code
- Generate a user-facing guide for a specific feature
- Conduct a technical deep-dive into an asynchronous CICS/Java pattern

## Prerequisites

- Z Open Editor extension installed in VS Code
- Basic familiarity with COBOL and REST API concepts

## Setup

### Step 1: Open the CBSA Workspace and Run Lab Setup

1. Open VS Code → **File → Open Folder** → select `code sets/cics-banking-sample-application/`
2. Complete all steps in `building-labs/00-lab-setup.md` (scan, Agent.md, data dictionary)

### Step 2: Verify the Workspace Structure

Confirm you can see both layers before proceeding:

- `src/base/cobol_src/` — 29 COBOL programs (BNKMENU, CREACC, XFRFUN, etc.)
- `src/bank-application-frontend/` — React/Carbon frontend
- `src/webui/` — Web UI
- `src/Z-OS-Connect-Customer-Services-Interface/` — z/OS Connect interfaces
- `src/Z-OS-Connect-Payment-Interface/` — z/OS Connect payment interface
- `src/zosconnect_artefacts/` — z/OS Connect artifacts

---

## Exercise 1: Initialize AGENTS.md (10 minutes)

### What You'll Learn

AGENTS.md is Bob's central reference for your project. With a multi-language workspace (COBOL + Java + React), initializing it correctly ensures Bob understands the full stack for every subsequent prompt.

### Bob Mode to Use

**🧰 Z Code**

### Instructions

1. In the chat, type:
   ```
   /init
   ```

2. Bob will scan the full workspace and detect all languages, build commands, and key directories. Approve any tool requests as they appear.

3. When complete, click **Preview** on the generated AGENTS.md to review it.

### Expected Results

- ✅ `AGENTS.md` created at the project root
- ✅ Detected languages listed (COBOL, JCL, BMS, Java 17, React/JavaScript)
- ✅ Build commands documented (Maven, shell scripts)
- ✅ Directory structure captured with key paths
- ✅ Data dictionary location noted (`bobz/DD.json`)
- ✅ COBOL program → documentation mapping table present

### Bob Differentiators in Action

- Bob detects and reconciles multiple languages in one workspace without manual configuration
- The AGENTS.md it generates can be version-controlled and reused across sessions

---

## Exercise 2: Generate a Data Dictionary (15 minutes)

### What You'll Learn

Create a data dictionary for a key COBOL program. This gives Bob (and your team) semantic business-language descriptions of technical COBOL variables.

### Bob Mode to Use

**🧰 Z Code**

### Instructions

1. In the chat, enter:
   ```
   Create a data dictionary for the BNKMENU program
   ```

2. Bob will scan `BNKMENU.cbl`, extract the top variables, generate descriptions, and save the dictionary.

3. Approve tool requests as prompted. When done, click **Preview** on `bobz/DD.json`.

4. Also verify that AGENTS.md has been updated with the dictionary location.

### Expected Results

- ✅ `bobz/DD.json` created with at least 15 documented variables
- ✅ Each entry includes a short description and detailed business explanation
- ✅ Scope field references `BNKMENU`
- ✅ AGENTS.md updated with the dictionary location

---

## Exercise 3: COBOL Programs Inventory (20 minutes)

### What You'll Learn

Generate a complete structured inventory of every COBOL program — their types, copybooks, database/file dependencies, and call relationships.

### Bob Mode to Use

**🧰 Z Code**

### Instructions

1. In the chat, enter:
   ```
   Make an inventory of all COBOL programs
   ```

2. Bob scans all 29 programs, analyzes dependencies, classifies them by type, and produces the inventory document.

3. When complete, preview `docs/COBOL_INVENTORY.md`.

### Expected Results

- ✅ `docs/COBOL_INVENTORY.md` created
- ✅ All 29 programs listed and classified:
  - BMS programs (11), Service programs (13), Utility programs (4), Batch program (1)
- ✅ Copybooks, Db2 tables (READ/WRITE), VSAM files, and called programs documented per program
- ✅ Dependency matrices and dependency tree included

---

## Exercise 4: Frontend Inventory (20 minutes)

### What You'll Learn

Document the complete frontend architecture — REST API endpoints, JSON models, data access classes, and the Java interfaces that bridge the frontend to COBOL backend programs.

### Bob Mode to Use

**🧰 Z Code**

### Instructions

1. In the chat, enter:
   ```
   make an inventory of the front end
   ```

2. Bob analyzes the JAX-RS REST resources, JSON models, data access layer, and COBOL interface classes.

3. Preview the generated `docs/FRONTEND_INVENTORY.md`.

### Expected Results

- ✅ `docs/FRONTEND_INVENTORY.md` created
- ✅ **5 REST Resources** documented with all HTTP endpoints:
  - AccountsResource (5 endpoints), CustomerResource (5), ProcessedTransactionResource (3), CompanyNameResource (1), SortCodeResource (1)
- ✅ **13 JSON Models** listed with attributes
- ✅ **8 Data Access classes** documented (Account.java, Customer.java, etc.)
- ✅ **8 COBOL Interface classes** listed (CRECUST.java, CUSTOMER.java, etc.)

### Bob Differentiators in Action

- Bob reads Java and COBOL simultaneously and links them — surfacing which Java classes call which COBOL programs
- This cross-layer insight would take a developer days to produce manually

---

## Exercise 5: Architecture Diagrams (25 minutes)

### What You'll Learn

Generate professional Draw.io diagrams that make the full-stack architecture visible — one global overview and one detailed frontend diagram.

### Bob Mode to Use

**🧰 Z Code**

### Exercise 5A: Global Architecture Diagram

**Bob Prompt:**
```
generate a global diagram (in draw.io) integrating the front-end and backend
by distinguishing the different layers of the application
```

**Expected Result — `docs/CBSA_Architecture_Diagram.drawio`:**

5 distinct color-coded layers:
1. **Presentation Layer** (Blue): BMS 3270, Carbon React UI, Spring Boot UI, Mobile
2. **REST API Layer** (Yellow): 5 JAX-RS resources, z/OS Connect
3. **Business Logic Layer** (Pink): 29 COBOL programs
4. **Data Access Layer** (Purple): Db2, VSAM, COBOL Interfaces
5. **Storage Layer** (Green): Db2 Tables, VSAM Files, BMS Maps

- ✅ File opens correctly in Draw.io (install the Draw.io Integration VS Code extension if needed)
- ✅ 5 layers visible and distinct with arrows showing data flows
- ✅ Legend present and complete

### Exercise 5B: Detailed Frontend Diagram

**Bob Prompt:**
```
make a detailed diagram of the front end part
```

**Expected Result — `docs/CBSA_Frontend_Detailed_Diagram.drawio`:**

- All REST endpoints listed per resource
- 13 JSON model classes with attributes
- 8 data access classes with methods
- HTTP/REST, JCICS LINK, SQL/VSAM communication flows labeled
- Technologies used (JAX-RS, JCICS, Carbon Design System) annotated

- ✅ All endpoints and models represented
- ✅ Communication flows are clear and labeled

---

## Exercise 6: Functional Analysis — Local Transfer Transaction (15 minutes)

### What You'll Learn

Trace a single business transaction (local funds transfer) across every layer — from REST API call through Java, into COBOL business logic, and back. This is the core skill for understanding any multi-tier mainframe application.

### Bob Mode to Use

**🧰 Z Code**

### Instructions

1. In the chat, enter:
   ```
   what does the Transfer local transaction consist of?
   ```

2. Bob reads `TransferLocalJSON.java`, `BNK1TFN.cbl`, and `XFRFUN.cbl` together and explains the complete flow.

### Expected Results

Bob's response will cover:

**Components Involved:**
- `TransferLocalJSON.java` — REST API model
- `BNK1TFN.cbl` — BMS presentation layer
- `XFRFUN.cbl` — COBOL business logic

**Transaction Flow:**
1. Initial validation (amount > 0, accounts must differ)
2. Update order determined (deadlock prevention strategy)
3. Source account debited
4. Destination account credited
5. Audit record written to PROCTRAN

**Error Codes Explained:**
- Code `1`: Source account not found
- Code `2`: Destination account not found
- Code `3`: Unexpected error
- Code `4`: Invalid amount

**Security Mechanisms:**
- ACID transaction guarantee
- SYNCPOINT ROLLBACK on failure
- Deadlock prevention through account ordering
- Complete audit trail

- ✅ All 3 components explained
- ✅ Transaction flow detailed step by step
- ✅ All 4 error codes documented
- ✅ Security and deadlock mechanisms explained

---

## Exercise 7: User Guide Generation (20 minutes)

### What You'll Learn

Generate a complete, polished user guide for the local transfer feature — the kind of document a business analyst or support team would actually use. Bob produces this from code, not from manual documentation effort.

### Bob Mode to Use

**🧰 Z Code**

### Instructions

1. In the chat, enter:
   ```
   Make me a user guide for local transfer.
   ```

2. Bob creates a structured guide covering all three access interfaces (BMS 3270, Web, REST API).

3. Preview `docs/USER_GUIDE_LOCAL_TRANSFER.md`.

### Expected Results

- ✅ `docs/USER_GUIDE_LOCAL_TRANSFER.md` created (~500 lines)
- ✅ **3 interfaces documented**: BMS 3270 terminal, Web UI, REST API
- ✅ **Step-by-step transfer procedure** (4 detailed steps)
- ✅ **6 error messages** explained with solutions
- ✅ **3 practical examples** with sample data
- ✅ **FAQ** with at least 8 questions answered
- ✅ Security tips section included
- ✅ Simulated BMS screenshots and REST API examples included

---

## Exercise 8: Technical Deep-Dive — Credit Scoring System (20 minutes)

### What You'll Learn

Understand a sophisticated asynchronous CICS/Java pattern used in the credit scoring system. This exercise demonstrates Bob's ability to explain advanced technical patterns across COBOL and Java simultaneously.

### Bob Mode to Use

**🧰 Z Code**

### Exercise 8A: General Operation

**Bob Prompt:**
```
what does the Credit Score function do?
```

**Expected Result:**

Bob explains the 3-tier credit scoring architecture:
- `CreditScore.java` — REST entry point
- `CreditScoreCICS540.java` — Advanced async implementation using JCICS API
- `CRDTAGY1-5.cbl` — 5 simulated credit agency COBOL programs

**Process flow:**
1. 5 asynchronous CICS transactions launched in parallel
2. Each agency generates a score (1–999) with a random 0–3 second delay
3. Results collected using `getAny()`
4. Final score = average of 5 agency scores
5. Fallback mode activates if CICS version < 5.4

**Key characteristics:** Parallelism, resilience, fallback, 3-second max vs. 15-second sequential

### Exercise 8B: Value Scale

**Bob Prompt:**
```
What is the credit score value scale?
```

**Expected Result:**

| Range | Rating |
|---|---|
| 1–199 | Very Low |
| 200–399 | Low |
| 400–599 | Average |
| 600–799 | Good |
| 800–999 | Excellent |

- Calculation formula: `Final Score = (Score1 + Score2 + Score3 + Score4 + Score5) / 5`
- Comparison with real-world systems: FICO (300–850), Experian (0–999)

**Validation:**
- ✅ 3-tier architecture explained
- ✅ Async process (JCICS API) detailed
- ✅ 1–999 scale documented with interpretation
- ✅ Calculation formula provided
- ✅ Comparison with real systems included

---

## Key Takeaways

### What You've Learned

1. ✅ How to set up a full-stack Bob workspace (COBOL + Java + React)
2. ✅ Generating inventories for both backend and frontend layers
3. ✅ Creating cross-layer architecture diagrams with Draw.io
4. ✅ Tracing a business transaction across multiple technologies
5. ✅ Producing user guides and technical analysis from code — not manual effort
6. ✅ Understanding asynchronous CICS/Java patterns

### Deliverables Produced

| File | Description |
|---|---|
| `AGENTS.md` | Full-stack project context (~150 lines) |
| `bobz/DD.json` | Data dictionary (15+ entries) |
| `docs/COBOL_INVENTORY.md` | 29 COBOL programs inventoried (~800 lines) |
| `docs/FRONTEND_INVENTORY.md` | REST APIs, models, data access documented (~600 lines) |
| `docs/CBSA_Architecture_Diagram.drawio` | Global 5-layer architecture diagram |
| `docs/CBSA_Frontend_Detailed_Diagram.drawio` | Detailed frontend diagram |
| `docs/USER_GUIDE_LOCAL_TRANSFER.md` | Complete user guide (~500 lines) |

### Time Savings

| Task | Manual Estimate | With Bob |
|---|---|---|
| Frontend + backend inventory | 3–5 days | 35 minutes |
| Architecture diagrams | 1–2 days | 25 minutes |
| Transaction flow analysis | 4–8 hours | 15 minutes |
| User guide authoring | 1–2 days | 20 minutes |

### Bob Premium for Z Capabilities Demonstrated

- **Multi-language workspace:** COBOL, Java, React analyzed together in one session
- **Cross-layer tracing:** Business transactions followed from REST API through to COBOL
- **Professional documentation generation:** User guides, inventories, architecture diagrams from code
- **Advanced pattern recognition:** Async CICS/Java patterns explained in plain language

## Troubleshooting

**Issue:** Bob doesn't find frontend files after setup  
**Solution:** Confirm the `src/` directories were created successfully; re-run the retrieval prompt

**Issue:** AGENTS.md doesn't include Java/React in detected languages  
**Solution:** Run `/init` again after frontend directories are in place

**Issue:** Draw.io diagram won't open  
**Solution:** Install the **Draw.io Integration** extension in VS Code (`hediet.vscode-drawio`)

**Issue:** Inventory seems incomplete  
**Solution:** Confirm workspace scan completed first; try narrowing the prompt (e.g., "Make an inventory of all REST endpoints in src/bank-application-frontend")

**Issue:** Bob responds in French  
**Solution:** Add "Please respond in English" to your prompt

## Resources

- [CBSA Architecture Guide](https://github.com/cicsdev/cics-banking-sample-application-cbsa) — Official CBSA GitHub repository
- [Bob Premium for Z Documentation](https://bob.ibm.com/docs/z)
- [Z Code Mode Guide](https://bob.ibm.com/docs/modes/z-code)
- [Draw.io VS Code Extension](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio)

### Support

- Slack: #bob-premium-z
- Email: bob-z-support@ibm.com

---

**Z Full-Stack Analysis Complete!** 🎉

You now have a complete picture of your application across every layer — backend COBOL, REST APIs, JSON models, and frontend components — all produced in a single Bob session.
