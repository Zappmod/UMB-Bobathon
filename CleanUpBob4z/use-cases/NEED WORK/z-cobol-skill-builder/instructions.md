# Use Case: Z COBOL Skill Builder — Standards, Generation & Validation

> **Prerequisites:** Complete `building-labs/00-lab-setup.md` before starting this use case.
> **Code Set:** `code sets/cics-banking-sample-application/`
> **Modes:** Z Architect (Exercise 1), Z Code (Exercises 2–4)
> **Duration:** 60 minutes
> **Difficulty:** Intermediate

## Learning Objectives

By the end of this lab, you will be able to:

- Analyze existing COBOL programs to extract and formalize coding standards
- Use the Bob Skill Builder to create a custom automation skill
- Understand the structure of a Bob skill (`skill.yaml`, `skill.py`, templates)
- Invoke a custom skill to generate a CICS COBOL program from a natural language request
- Use Z Open Editor integration to validate generated COBOL syntax automatically
- Have Bob auto-correct syntax errors detected during validation

## Prerequisites

- **Z Open Editor** extension installed in VS Code (required for Exercises 3 and 4)
- Basic understanding of COBOL program structure and CICS concepts

## Setup

### Step 1: Open the CBSA Workspace and Run Lab Setup

1. Open VS Code → **File → Open Folder** → select `code sets/cics-banking-sample-application/`
2. Confirm the Z Open Editor extension is active (Extensions panel → `IBM Z Open Editor`)
3. Complete all steps in `building-labs/00-lab-setup.md` (scan, Agent.md, data dictionary)

### Step 2: Identify Existing Programs to Analyze

The CBSA COBOL programs are in `src/base/cobol_src/`. The representative programs for this use case are:
- `BNKMENU.cbl` — Main menu (presentation)
- `BNK1CAC.cbl` — Account creation screen
- `CREACC.cbl` — Account creation service
- `ABNDPROC.cbl` — Error/abend handling
- `BANKDATA.cbl` — Batch data initialization

For your own project, choose 4–5 programs that represent different types (menu, service, batch, error handler).

---

## Exercise 1: Define COBOL Coding Standards (15 minutes)

### What You'll Learn

Bob can read multiple existing COBOL programs and distill their patterns into a formal, reusable coding standards document. This document becomes the governance reference for all future code generation in your project.

### Bob Mode to Use

**📐 Z Architect**

Switch to Z Architect mode using the mode selector at the bottom of the chat window.

### Instructions

1. **Request standards derivation:**
   ```
   Define COBOL coding standards by analyzing existing COBOL programs.
   ```

2. Bob will analyze `BNKMENU`, `BNK1CAC`, `CREACC`, `ABNDPROC`, and `BANKDATA` (or the programs in your workspace) and extract patterns across:
   - Program structure and division layout
   - Naming conventions for variables, paragraphs, and conditions
   - Copybook usage patterns
   - CICS command patterns and error handling
   - SQL/DB2 integration patterns
   - Abend handling and validation approaches
   - Data access patterns

3. Approve tool requests as they appear.

4. When complete, preview the generated file.

### Expected Results

- ✅ `docs/GLOBAL-docu-standards-cobol.md` created
- ✅ Standards derived from analysis of at least 4 representative programs
- ✅ Document includes all of the following sections:

**Program Structure:**
- Required division layout order
- Working-Storage conventions
- Linkage Section patterns

**Naming Conventions:**

| Element | Convention | Example |
|---|---|---|
| WS Variables | `WS-` + descriptive name | `WS-CUSTOMER-ID` |
| Paragraphs | Verb + object | `PROCESS-CUSTOMER-RECORD` |
| Condition names | Descriptive state | `VALID-CUSTOMER` |
| Constants | Uppercase + hyphens | `MAX-RECORDS` |

**CICS Command Standard:**
Every CICS command must follow this error-handling pattern:
```cobol
EXEC CICS [COMMAND]
    [PARAMETERS]
    RESP(WS-CICS-RESP)
    RESP2(WS-CICS-RESP2)
END-EXEC.

IF WS-CICS-RESP NOT = DFHRESP(NORMAL)
    MOVE '[OPERATION]' TO WS-ERROR-OPERATION
    PERFORM HANDLE-CICS-ERROR
END-IF.
```

**Compilation Directives:**
- CICS-only: `PROCESS CICS,NODYNAM,NSYMBOL(NATIONAL),TRUNC(STD)`
- CICS + DB2: add `CBL SQL`
- CICS + DLI: `CBL CICS('SP,EDF,DLI')`

### Bob Differentiators in Action

- Bob reads multiple programs simultaneously and surfaces patterns a human reviewer would need days to extract
- The output is immediately usable as a governance document for code reviews and new development

---

## Exercise 2: Build the COBOL Generator Skill (15 minutes)

### What You'll Learn

Use the Bob Skill Builder to create a custom, persistent skill that any team member can invoke. The skill takes a natural language COBOL program request and produces a standards-compliant, Z Open Editor-validated result automatically.

### Bob Mode to Use

**🧰 Z Code**

Switch to Z Code mode using the mode selector.

### Instructions

1. **Request skill creation:**
   ```
   Create a Bob Premium for Z skill, using the skill builder, that allows to:
   - generate a COBOL program that respects the coding standards defined in docs/GLOBAL-docu-standards-cobol.md
   - then verify using Z Open Editor, the syntax and standard of the generated COBOL. Syntax errors must be corrected by Bob.
   ```

2. Bob uses its built-in `coding-standards-skill-builder` to scaffold the new skill. Approve tool requests as they appear.

3. When complete, review the generated files.

### Expected Results

Bob creates the skill at `.bob/skills/cobol-generator-validator/`:

| File | Purpose |
|---|---|
| `skill.yaml` | Skill configuration — name, trigger phrases, description |
| `skill.py` | Core logic — orchestrates generation, validation, and correction |
| `templates/` | COBOL code templates used during generation |
| `requirements.txt` | Python dependencies |

- ✅ All four files/directories created under `.bob/skills/cobol-generator-validator/`
- ✅ `skill.yaml` contains trigger phrases (see Exercise 3)
- ✅ `skill.py` includes Z Open Editor validation call
- ✅ Templates reflect the CICS error-handling pattern from your standards doc

### Understanding the Skill Structure

Open `skill.yaml` and review how trigger phrases are defined. Open `skill.py` to see the three-step orchestration:
1. Parse the natural language request
2. Generate COBOL using the standards doc and templates
3. Pass the output to Z Open Editor; if errors are found, loop back and correct

---

## Exercise 3: Generate a Simple CICS Program (15 minutes)

### What You'll Learn

Invoke the new skill with a business-level request and observe it produce a complete, validated COBOL program — no manual standards-checking required.

### Bob Mode to Use

**🧰 Z Code** (the skill activates automatically from trigger phrases)

### Trigger Phrases

The skill activates when your prompt includes any of:
- "Generate a COBOL program"
- "Create a COBOL"
- "Validate COBOL"
- "Bob Premium for Z"

### Instructions

1. **Request a program generation:**
   ```
   Generate a COBOL program that allows finding a customer's account
   from their phone number
   ```

2. Watch Bob's process — it will:
   1. Analyze the requirements for a phone-number search program
   2. Check the CUSTOMER copybook to find the phone field structure
   3. Generate a COBOL program compliant with your `GLOBAL-docu-standards-cobol.md`
   4. Pass the output to Z Open Editor for syntax validation
   5. Correct any detected errors before presenting the final result

3. Review the generated program in the editor. Open the file and note:
   - Variable naming follows the `WS-` convention
   - All CICS commands include `RESP`/`RESP2` and the error-handling paragraph
   - Compilation directives match your standards

### Expected Results

- ✅ A new `.cbl` file created (e.g., `SRCHPHN.cbl`)
- ✅ Program uses `WS-` naming convention throughout
- ✅ All CICS commands have the mandatory RESP/RESP2 error-handling pattern
- ✅ Correct compilation directive for CICS-only program
- ✅ Z Open Editor reports no syntax errors
- ✅ If errors were found during generation, Bob corrected them before delivering the file

---

## Exercise 4: Generate a Complex CICS Program with BMS Map (15 minutes)

### What You'll Learn

Request a more complex CICS program that uses a pseudo-conversational pattern and a BMS map. This tests the skill's ability to handle multi-pattern requirements while still enforcing all standards.

### Bob Mode to Use

**🧰 Z Code**

### Instructions

1. **Request a more complex program:**
   ```
   Create a COBOL program with Bob Premium for Z that uses a BMS map
   to display and update bank account information.
   The program should be called UPDTACCT and use a pseudo-conversational pattern.
   ```

2. Bob generates a complete program. Watch for the same 5-step process as Exercise 3.

3. Open the generated file and verify each of the structural elements below.

### Expected Results

Bob generates `UPDTACCT.cbl` containing:

**Pseudo-Conversational Pattern:**
- COMMAREA used to pass state between screen interactions
- CICS RETURN TRANSID at the end of each interaction

**BMS Map Management:**
- EXEC CICS SEND MAP for display
- EXEC CICS RECEIVE MAP for input
- MAPFAIL condition handled explicitly

**User Input Validation:**
- Field-level validation before any update
- Clear error messages sent back to screen

**Structure:**
- `DISPLAY-MODE` section for read-only view
- `UPDATE-MODE` section for edit/save

**Validation Checklist:**
- ✅ COMMAREA defined in Linkage Section
- ✅ CICS SEND/RECEIVE MAP commands present with RESP/RESP2
- ✅ MAPFAIL handled with a graceful error message
- ✅ Input validation performed before any DB2/VSAM write
- ✅ Compilation directive includes CICS
- ✅ Z Open Editor reports zero syntax errors
- ✅ Naming conventions match `GLOBAL-docu-standards-cobol.md`

---

## Key Takeaways

### What You've Learned

1. ✅ How to derive formal COBOL coding standards from existing programs
2. ✅ Creating a custom Bob skill using the Skill Builder
3. ✅ Understanding the `skill.yaml` / `skill.py` / templates structure
4. ✅ Invoking a skill to generate standards-compliant COBOL from natural language
5. ✅ Using Z Open Editor integration for automatic syntax validation
6. ✅ The self-correcting generation loop (generate → validate → fix)

### The Skill as a Team Asset

Once created, the `cobol-generator-validator` skill lives in `.bob/skills/` and can be:
- **Version-controlled** alongside your code — every developer gets it automatically
- **Updated** by re-running the Skill Builder with an updated standards doc
- **Shared** with other projects by copying the skill folder
- **Extended** to cover additional patterns (IMS, MQ, batch) by adding templates

### Time Savings

| Task | Manual Approach | With This Skill |
|---|---|---|
| Define coding standards | 2–4 days (team review) | 15 minutes |
| Write standards-compliant CICS program | 4–8 hours | 5 minutes |
| Syntax validation pass | 30–60 minutes | Automatic |
| Standards review pass | 1–2 hours | Automatic |

### Bob Premium for Z Capabilities Demonstrated

- **Standards extraction:** Reads multiple programs and produces a governance document
- **Skill Builder:** Creates custom reusable automation from a natural language description
- **Z Open Editor integration:** Closes the generate → validate → correct loop automatically
- **Template-driven generation:** Produces production-ready code, not just boilerplate

## Troubleshooting

**Issue:** `docs/GLOBAL-docu-standards-cobol.md` is sparse or incomplete  
**Solution:** Name specific programs in your Exercise 1 prompt (e.g., "analyzing BNKMENU, CREACC, ABNDPROC, and BANKDATA")

**Issue:** Skill Builder doesn't create `.bob/skills/` directory  
**Solution:** Ensure you are in Z Code mode, not Ask or Plan mode

**Issue:** Generated COBOL has syntax errors that Bob does not fix  
**Solution:** Confirm Z Open Editor is installed and active; ask Bob explicitly: "Validate this file with Z Open Editor and fix any errors"

**Issue:** Trigger phrases don't activate the skill  
**Solution:** Open `.bob/skills/cobol-generator-validator/skill.yaml` and verify trigger phrases match what you typed; reload Bob if recently modified

**Issue:** Generated program doesn't match standards  
**Solution:** Add "following the coding standards in docs/GLOBAL-docu-standards-cobol.md" explicitly to your generation prompt

## Resources

- [Bob Premium for Z Documentation](https://bob.ibm.com/docs/z)
- [Z Open Editor / zCodeScan Linting Rules](https://www.ibm.com/docs/en/developer-for-zos/17.0.x?topic=overview-linting-zcodescan)
- [Z Code Mode Guide](https://bob.ibm.com/docs/modes/z-code)
- [Bob Skill Builder Guide](https://bob.ibm.com/docs/z/skill-builder)

### Support

- Slack: #bob-premium-z
- Email: bob-z-support@ibm.com

---

**Z COBOL Skill Builder Complete!** 🎉

You now have a custom Bob skill checked into your workspace that generates and validates standards-compliant CICS COBOL on demand — a reusable team asset for every future development session.
