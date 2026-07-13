# Bob Premium for Z - Quick Reference Cheat Sheet

## 🎯 Z-Specific Modes

### Switching Modes

Click the mode selector at the bottom of the chat window and choose:

- **🔀 Z Architect** - Analysis, documentation, planning
- **☕ Z Code** - Implementation, refactoring, modernization

### When to Use Each Mode

| Task                   | Mode        | Why                        |
| ---------------------- | ----------- | -------------------------- |
| Analyze application    | Z Architect | Specialized for analysis   |
| Generate documentation | Z Architect | Creates comprehensive docs |
| Impact analysis        | Z Architect | Dependency tracking        |
| Refactor code          | Z Code      | Code generation focus      |
| Extract services       | Z Code      | Modernization patterns     |
| Create APIs            | Z Code      | Implementation expertise   |

## 📋 Common Commands

### Z Architect Mode

#### Workspace Analysis

```
Scan the local workspace
```

Builds metadata database for the entire application.

#### Initialize Agent.md

```
/init
```

Creates Agent.md file with workspace context.

#### Generate Data Dictionary

```
Create a Data Dictionary for this application
```

Generates comprehensive data dictionary from copybooks.

#### Create Technical Documentation

```
Create a comprehensive technical design document for a COBOL application.
Include program inventory, processing logic, and system architecture with
Mermaid diagrams.
```

#### Impact Analysis

```
What would be the impact of changing this field to [new size/type]?
```

Analyzes ripple effects of field changes.

### Z Code Mode

#### Identify Business Rules

```
Identify the business rules functionality in this COBOL program that
could be extracted into a separate service.
```

#### Check Dependencies

```
Check all dependencies for this code section. What copybooks, variables,
database tables, and other programs does it depend on?
```

#### Extract Service

```
Refactor this business logic into a separate COBOL service program.
Create a clean interface with input and output parameters.
```

#### Create REST API

```
Create a Java REST API wrapper for this COBOL service using Spring Boot.
```

#### Modernize UI

```
Design a modern web UI for this CICS screen. Create a responsive layout
that works on desktop and mobile.
```

#### Generate Components

```
Generate React components for this UI design. Include form validation,
API integration, and error handling.
```

## 🔧 Working with Context

### Add Code to Context

1. Highlight the code in the editor
2. Right-click
3. Select **IBM BOB → Add to Context**
4. Code appears in chat with file path and line numbers

### Add Files to Context

```
@filename.cbl
```

References a specific file in your prompt.

### Clear Context

Click the "Clear Context" button in the chat window.

## 📊 Analysis Workflows

### Complete Application Analysis

1. Switch to Z Architect mode
2. `Scan the local workspace`
3. `/init` to create Agent.md
4. `Create a Data Dictionary for this application`
5. `Create a comprehensive technical design document`

### Impact Analysis Workflow

1. Switch to Z Architect mode
2. Open copybook file
3. Highlight field to analyze
4. Add to context (right-click)
5. `What would be the impact of changing this field to [specification]?`
6. Review impact report
7. `Create a detailed implementation plan for this change`

## 🔄 Modernization Workflows

### Service Extraction Workflow

1. Switch to Z Code mode
2. `Identify business rules functionality in [program name]`
3. Highlight target code section
4. Add to context
5. `Check all dependencies for this code section`
6. `Refactor this business logic into a separate service`
7. `Update the main program to call the extracted service`

### UI Modernization Workflow

1. Switch to Z Code mode
2. Open BMS map file
3. `Analyze the CICS insurance application screens`
4. Add BMS map to context
5. `Design a modern web UI for this CICS screen`
6. `Generate React components for this UI design`
7. `Create REST APIs for this screen`

## 💡 Pro Tips

### Efficient Prompting

- **Be Specific:** Include file names, line numbers, and exact requirements
- **Use Context:** Add relevant code to context before asking
- **Iterate:** Start broad, then refine with follow-up questions
- **Combine Tasks:** Ask for multiple related items in one prompt

### Example Good Prompts

```
Analyze the LGPOLICY.cbl program and identify all business rules related
to premium calculation. For each rule, explain the logic and suggest how
it could be extracted into a reusable service.
```

```
Generate a Spring Boot REST API for the policy inquiry functionality in
POLQRY.cbl. Include endpoints for search and retrieve, with proper error
handling and OpenAPI documentation.
```

### Example Poor Prompts

```
Fix this code
```

❌ Too vague, no context

```
Make it better
```

❌ No specific requirements

## 🎨 Documentation Generation

### Quick Documentation

```
Explain what this program does
```

### Comprehensive Documentation

```
Create comprehensive documentation for this program including:
- Purpose and overview
- Input/output specifications
- Business logic explanation
- Dependencies
- Error handling
- Usage examples
```

### Architecture Diagrams

```
Create a Mermaid diagram showing the architecture of this application
```

### Data Flow Diagrams

```
Create a data flow diagram for the [process name] workflow
```

## 🔍 Code Analysis

### Understand Code

```
Explain this COBOL code in plain English
```

### Find Issues

```
Analyze this code for potential issues, security vulnerabilities,
and performance problems
```

### Suggest Improvements

```
Suggest improvements to this code following modern best practices
```

## 🚀 Quick Wins

### 5-Minute Tasks

- Generate data dictionary for a copybook
- Explain a COBOL paragraph
- Create documentation for a program
- Analyze a BMS map

### 15-Minute Tasks

- Complete workspace scan
- Impact analysis for a field change
- Extract a simple business rule
- Generate REST API for a service

### 30-Minute Tasks

- Full application documentation
- Service extraction with integration
- UI modernization for a screen
- Comprehensive impact analysis

## ⚙️ Settings & Configuration

### Auto-Approve

Enable for faster workflows:

1. Click settings icon in chat
2. Toggle auto-approve options
3. Select which operations to auto-approve

**Recommended Settings:**

- ✅ File reads
- ✅ Search operations
- ⚠️ File writes (review first)
- ⚠️ Code generation (review first)

### Context Window

- Bob automatically manages context
- Add only relevant code to context
- Clear context when switching tasks

## 🐛 Troubleshooting

### Scan Fails

```
Verify workspace structure and try: Scan the local workspace again
```

### Missing Dependencies

```
List all copybooks in the workspace
```

### Incomplete Analysis

```
Re-scan the workspace and ensure all source files are included
```

### Code Won't Compile

```
Check the generated code for syntax errors and verify COBOL version compatibility
```

## 📚 Learning Resources

### Getting Started

1. Complete Z Analysis & Documentation
2. Practice workspace scanning
3. Generate documentation for familiar programs

### Intermediate

1. Complete Refactoring & Service Extraction
2. Practice dependency analysis
3. Extract simple services

### Advanced

1. Complete Labs 3 & 4: UI Modernization & Impact Analysis
2. Work on real modernization projects
3. Combine multiple techniques

## 🆘 Getting Help

### In-Chat Help

```
How do I [task description]?
```

### Documentation

- https://bob.ibm.com/docs/z
- https://bob.ibm.com/docs/modes/z-architect
- https://bob.ibm.com/docs/modes/z-code

### Support Channels

- **Slack:** #bob-premium-z
- **Email:** bob-z-support@ibm.com
- **Office Hours:** Tuesdays 2-3pm EST

## 🎯 Common Use Cases

### Daily Tasks

- Understand unfamiliar code
- Generate documentation
- Analyze dependencies
- Create test cases

### Weekly Tasks

- Refactor legacy code
- Extract services
- Modernize interfaces
- Impact analysis for changes

### Project Tasks

- Application analysis
- Modernization planning
- Service architecture design
- UI transformation

## ⌨️ Keyboard Shortcuts

### VS Code with Bob

- **Cmd/Ctrl + Shift + P:** Command palette
- **Cmd/Ctrl + K:** Open Bob chat
- **Cmd/Ctrl + L:** Clear chat
- **Cmd/Ctrl + Enter:** Send message

### Context Management

- **Right-click → Add to Context:** Add selection
- **@filename:** Reference file
- **Clear button:** Remove all context

## 📝 Best Practices

### Do's ✅

- Scan workspace before starting
- Use appropriate mode for task
- Add relevant context
- Review generated code
- Test incrementally
- Document changes

### Don'ts ❌

- Don't skip workspace scan
- Don't use wrong mode
- Don't provide too much context
- Don't skip code review
- Don't deploy untested code
- Don't forget documentation

---

**Quick Reference Card**

| Need to...      | Use Mode    | Command                            |
| --------------- | ----------- | ---------------------------------- |
| Analyze app     | Z Architect | `Scan the local workspace`         |
| Create docs     | Z Architect | `Create technical design document` |
| Impact analysis | Z Architect | `What would be the impact of...`   |
| Refactor code   | Z Code      | `Refactor this business logic...`  |
| Create API      | Z Code      | `Create a REST API for...`         |
| Modernize UI    | Z Code      | `Design a modern web UI for...`    |

---

**Made with Bob Premium for Z** ☕

**Print this page for quick reference during your Z Bobathon!**
