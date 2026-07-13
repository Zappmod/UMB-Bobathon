# Use Case: Z Bobshell Automation — Batch Documentation Generation

> **Prerequisites:** Complete `00-lab-setup.md` before starting this use case.
> **Code Set:** `Sample Code` (or any COBOL workspace)
> **Duration:** 45 minutes
> **Difficulty:** Beginner–Intermediate

## Learning Objectives

By the end of this lab, you will be able to:

- Explain what Bobshell is and when to use it
- Prompt Bob to create a Bobshell script from a natural language description
- Read and understand the generated Bobshell YAML structure
- Execute a Bobshell and monitor its progress
- Review and validate the generated documentation output
- Customize a Bobshell script for different documentation requirements

## Setup

### Step 1: Open the Workspace and Run Lab Setup

1. Open VS Code → **File → Open Folder** → select `Sample Code`
2. Complete all steps in `00-lab-setup.md` (scan, Agent.md, data dictionary)
3. Switch to **💻 Code** mode using the mode selector at the bottom of the chat window

### Step 2: Note Your COBOL Source Directory

The COBOL programs are at `/zOS Cobol`. You'll reference this path in Exercise 2.

For your own project, substitute the path to your `.cbl` files and a `docs/` output directory of your choice.

---

## Exercise 1: What Is a Bobshell? (5 minutes)

### What You'll Learn

Bobshells are YAML-defined automation scripts that instruct Bob to execute a sequence of tasks — file scanning, program analysis, documentation generation, writing outputs — in a single repeatable run. Unlike a single chat prompt, a Bobshell:

- Iterates over all files matching a pattern (e.g., every `.cbl` in a directory)
- Applies the same analysis and documentation template to each
- Produces a consistent, standardized output for every item
- Can be re-executed any time the codebase changes
- Can be version-controlled alongside your code

### When to Use a Bobshell

| Scenario | Use Bobshell? |
|---|---|
| Document one specific program | No — use a direct Bob prompt |
| Document all programs in a workspace | ✅ Yes |
| Regenerate docs after a sprint | ✅ Yes |
| Run the same analysis on 50+ programs | ✅ Yes |
| One-off architectural question | No — use Ask or Z Architect mode |

### Bobshell Structure

A Bobshell has four main sections:

```yaml
name: "Script name"
version: "1.0"
mode: "z-code"        # Bob mode to use for each step

config:               # Configurable parameters (paths, patterns)
  source_dir: "..."
  output_dir: "..."

steps:                # Ordered sequence of actions
  - name: "Step name"
    action: "..."     # Built-in action type
    params: ...

report:               # What to include in the execution summary
  summary: true
  statistics: true
  errors: true
```

**Built-in action types include:** `list_files`, `for_each`, `analyze_program`, `generate_doc`, `write_file`, `generate_index`

---

## Exercise 2: Create the Documentation Bobshell (10 minutes)

### What You'll Learn

Describe what you want to automate in plain English and let Bob generate the complete Bobshell script. You provide the requirements; Bob produces the YAML.

### Bob Mode to Use

**💻 Code**

### Instructions

1. In the chat, enter the following prompt (adjust paths if your project differs):

   ```
   Create a Bobshell that automatically generates technical documentation
   for each COBOL program in base/cobol_src/. For each program, the
   documentation must include:
   - Program description
   - Business objective
   - Copybooks used
   - Files accessed
   - Programs called
   - Code structure (sections and paragraphs)
   - Main variables
   - Identified business rules

   Store each documentation in docs/ with naming format:
   [PROGRAM]-docu-technique.md
   ```

2. Bob will generate the Bobshell file. Approve tool requests as they appear.

3. When complete, the script will be saved at `tools/generate-program-docs.bobshell`.

### Expected Result

Bob creates `tools/generate-program-docs.bobshell`:

```yaml
# Bobshell Premium Z - Automatic Program Documentation
# Version: 1.0
# Description: Generates technical documentation for all COBOL programs

name: "CBSA Automatic Documentation"
version: "1.0"
mode: "z-code"

config:
  source_dir: "src/base/cobol_src"
  output_dir: "docs"
  file_pattern: "*.cbl"
  naming_convention: "{PROGRAM}-docu-technique.md"

steps:
  - name: "Program scan"
    action: "list_files"
    params:
      directory: "${source_dir}"
      pattern: "${file_pattern}"
    output: "program_list"

  - name: "Documentation for each program"
    action: "for_each"
    items: "${program_list}"
    steps:
      - name: "Program analysis"
        action: "analyze_program"
        params:
          program: "${item}"
          analysis_type: "complete"
        output: "program_analysis"

      - name: "Documentation generation"
        action: "generate_doc"
        params:
          template: "technical_doc"
          data: "${program_analysis}"
          sections:
            - "description"
            - "business_objective"
            - "copybooks"
            - "files_accessed"
            - "programs_called"
            - "code_structure"
            - "main_variables"
            - "business_rules"
        output: "documentation"

      - name: "Documentation save"
        action: "write_file"
        params:
          path: "${output_dir}/${item.name}-docu-technique.md"
          content: "${documentation}"

  - name: "Index generation"
    action: "generate_index"
    params:
      title: "CBSA Documentation Index"
      output: "${output_dir}/CBSA-inv-documentation.md"
      items: "${program_list}"

report:
  summary: true
  statistics: true
  errors: true
```

- ✅ `tools/generate-program-docs.bobshell` file created
- ✅ Config section has correct source and output directories
- ✅ `for_each` loop iterates over all `.cbl` files
- ✅ All 8 requested documentation sections are listed
- ✅ Index generation step is present

---

## Exercise 3: Understand the Generated Script (5 minutes)

### What You'll Learn

Before executing, review the script to understand what it will do — and confirm it matches your intent.

### Instructions

1. Open `tools/generate-program-docs.bobshell` in the VS Code editor.

2. Walk through each section:

   **`config` block** — These are your variables. Changing `source_dir` or `output_dir` here adapts the script to a different project without touching the logic.

   **Step 1: `list_files`** — Bob scans `src/base/cobol_src/` for all `*.cbl` files and stores the list as `program_list`. For CBSA this will find 28 programs.

   **Step 2: `for_each` loop** — For each program in `program_list`, Bob runs two sub-steps:
   - `analyze_program` — reads the `.cbl` file and extracts metadata
   - `generate_doc` — formats the metadata into a markdown document with all 8 sections

   **Step 3: `generate_index`** — After all programs are documented, Bob creates a single master index file with links to every program's documentation.

   **`report` block** — After execution, Bob will print a summary showing how many files were processed, how many lines of documentation were generated, and any errors.

3. If your workspace uses a different source path (e.g., `src/cobol/`), update `source_dir` in the `config` block now before executing.

---

## Exercise 4: Execute the Bobshell (10 minutes)

### What You'll Learn

Run the Bobshell and observe Bob process all programs systematically, producing documentation in real time.

### Bob Mode to Use

**💻 Code**

### Instructions

1. In the chat, enter:
   ```
   Execute the generate-program-docs.bobshell Bobshell
   ```

2. Bob will execute all steps in sequence. You'll see a console-style progress display:

```
╔════════════════════════════════════════════════════════════╗
║  BOBSHELL PREMIUM Z - Execution in progress                ║
╠════════════════════════════════════════════════════════════╣
║  Script: generate-program-docs.bobshell                    ║
║  Mode  : z-code                                            ╠
╚════════════════════════════════════════════════════════════╝

[1/4] Program scan...
      ✓ 28 COBOL programs detected in src/base/cobol_src/

[2/4] Documentation for each program...
      ✓ ABNDPROC.cbl    → docs/ABNDPROC-docu-technique.md
      ✓ BANKDATA.cbl    → docs/BANKDATA-docu-technique.md
      ✓ BNK1CAC.cbl     → docs/BNK1CAC-docu-technique.md
      ... (28 programs total)

[3/4] Index generation...
      ✓ docs/CBSA-inv-documentation.md created

[4/4] Final report...

╔════════════════════════════════════════════════════════════╗
║  BOBSHELL PREMIUM Z - Execution completed                  ║
╠════════════════════════════════════════════════════════════╣
║  Status   : ✅ SUCCESS                                     ║
║  Duration : 3 minutes 42 seconds                          ║
║  Files    : 29 documents generated                        ║
║  Lines    : ~18,000 lines of documentation                ║
║  Errors   : 0                                             ║
╚════════════════════════════════════════════════════════════╝
```

3. When execution finishes, open the `docs/` directory in the VS Code file explorer.

### Expected Results

- ✅ One `.md` file created per COBOL program (e.g., `docs/BNKMENU-docu-technique.md`)
- ✅ Master index created at `docs/CBSA-inv-documentation.md`
- ✅ Execution summary shows 0 errors
- ✅ All 28 programs documented in under 5 minutes

---

## Exercise 5: Review the Documentation Output (10 minutes)

### What You'll Learn

Inspect the generated documentation to understand its structure, quality, and how the 8 requested sections are represented.

### Instructions

1. Open `docs/BNKMENU-docu-technique.md`. You should see a document structured like this:

```markdown
# Technical Documentation - BNKMENU

**Program**: BNKMENU.cbl
**Type**: CICS presentation program
**Author**: Generated by Bob Premium for Z

## Description
BNKMENU is the main menu program of the CBSA application...

## Business Objective
- Display main menu to users
- Capture user choice
- Route to appropriate transaction
- Handle input errors

## Copybooks Used
| Copybook    | Description          | Usage        |
|-------------|----------------------|--------------|
| BANKMAP.cpy | BMS map definition   | Menu screen  |
| RESPSTR.cpy | Response codes       | Error handling|

## Files Accessed
No files directly accessed (routing program).

## Programs Called
No programs directly called. Uses CICS RETURN TRANSID for routing.

## Code Structure
### Main Sections
1. MAIN-PROCESSING — Program entry point
2. SEND-MENU — Send map to screen
3. RECEIVE-MENU — Receive user input
4. PROCESS-CHOICE — Route to transaction
5. SEND-ERROR — Display error messages

## Main Variables
| Variable       | Type     | Description              |
|----------------|----------|--------------------------|
| WS-MENU-OPTION | PIC X    | User choice (1-9)        |
| WS-TRANSID     | PIC X(4) | Target transaction code  |
| EIBAID         | CICS     | Key pressed              |

## Business Rules
1. Choice must be between 1 and 9
2. Each option maps to a CICS TRANSID
3. PF3 terminates the session
4. CLEAR redisplays the menu
```

2. Open `docs/CBSA-inv-documentation.md` — the master index. It organizes all programs by category:
   - **Presentation Programs (UI):** BNKMENU, BNK1CAC, BNK1CCA, etc.
   - **Service Programs (Business Logic):** CREACC, CRECUST, DBCRFUN, etc.
   - **Utility Programs:** ABNDPROC, GETCOMPY, GETSCODE
   - **Batch Programs:** BANKDATA
   - **External Programs:** CRDTAGY1–5

3. Click a few links in the index to verify they navigate correctly to the individual program docs.

### Validation Checklist

- ✅ Every program has its own `.md` file
- ✅ All 8 documentation sections are present in each file
- ✅ Copybook table has `Copybook`, `Description`, and `Usage` columns
- ✅ Business rules section lists actionable rules (not generic statements)
- ✅ Index is organized by program category with working links

---

## Exercise 6: Customize the Bobshell (5 minutes)

### What You'll Learn

Adapt the script for different use cases without starting from scratch — by changing the `config` block and the `sections` list.

### Common Customizations

**1. Target a specific program type only:**
```yaml
config:
  source_dir: "src/base/cobol_src"
  output_dir: "docs"
  file_pattern: "BNK*.cbl"    # Only BMS/screen programs
```

**2. Add custom documentation sections:**
```yaml
sections:
  - "description"
  - "business_objective"
  - "copybooks"
  - "files_accessed"
  - "programs_called"
  - "code_structure"
  - "main_variables"
  - "business_rules"
  - "performance_metrics"       # ← new
  - "security_considerations"   # ← new
```

**3. Change the output format:**
```yaml
config:
  output_format: "html"   # or "markdown" (default), "pdf", "docx"
```

**4. Exclude test or stub programs:**
```yaml
config:
  filter:
    include_pattern: "*.cbl"
    exclude_pattern: "TEST*.cbl"
```

### Instructions

1. Open `tools/generate-program-docs.bobshell`
2. Make one customization (e.g., add `performance_metrics` to the sections list)
3. Run the Bobshell again:
   ```
   Execute the generate-program-docs.bobshell Bobshell
   ```
4. Open one of the regenerated docs and confirm the new section appears

---

## Key Takeaways

### What You've Learned

1. ✅ What a Bobshell is and how it differs from a single chat prompt
2. ✅ How to describe an automation task in plain English and have Bob generate the script
3. ✅ The YAML structure of a Bobshell (config, steps, for_each, report)
4. ✅ How to execute a Bobshell and interpret the progress output
5. ✅ How to review and validate the generated documentation
6. ✅ How to customize the script for different projects and requirements

### The Bobshell as a Team Asset

The `.bobshell` file lives in your repository and can be:
- **Re-executed** after any code change to regenerate docs automatically
- **Modified** to add new sections as documentation needs evolve
- **Shared** across projects — change the `config.source_dir` and it works on any workspace
- **Scheduled** as part of a CI/CD pipeline to keep documentation perpetually current

### Time Savings

| Approach | 28 Programs | 100 Programs | 500 Programs |
|---|---|---|---|
| Manual documentation | 2–3 weeks | 6–8 weeks | 6+ months |
| Bobshell | ~4 minutes | ~12 minutes | ~60 minutes |

**Reduction: ~99%** — and the Bobshell can be re-run at zero incremental cost.

### Bob Premium for Z Capabilities Demonstrated

- **Bobshell automation:** Batch processing of arbitrary numbers of programs
- **Standardized output:** Every program documented with the same structure and quality
- **Configurable scripts:** Single change to `config` block adapts to any project
- **Reusable artifacts:** Scripts are version-controlled assets, not throwaway work

## Troubleshooting

**Issue:** Bobshell execution finds 0 programs  
**Solution:** Verify `source_dir` in the `config` block matches your actual COBOL directory path; check the path is relative to your workspace root

**Issue:** Some programs are missing from the output  
**Solution:** Check if file naming is consistent (e.g., `.cbl` vs `.CBL`); update `file_pattern` accordingly

**Issue:** Generated documentation sections are empty  
**Solution:** Ensure the workspace scan has completed (run `Scan the local workspace` in Z Code mode first if needed)

**Issue:** Index file has broken links  
**Solution:** Confirm all output files were created successfully before the index step ran; look for errors in the execution report

**Issue:** Bobshell file is not recognized when you ask Bob to execute it  
**Solution:** Provide the full relative path: `Execute the Bobshell at tools/generate-program-docs.bobshell`

## Resources

- [Bob Premium for Z Documentation](https://bob.ibm.com/docs/z)
- [Bobshell Reference Guide](https://bob.ibm.com/docs/z/bobshell)
- [Z Code Mode Guide](https://bob.ibm.com/docs/modes/z-code)

### Support

- Slack: #bob-premium-z
- Email: bob-z-support@ibm.com

---

**Z Bobshell Automation Complete!** 🎉

You now have a reusable automation script that can document your entire COBOL codebase on demand — in minutes instead of weeks. Commit it to your repository and share it with your team.
