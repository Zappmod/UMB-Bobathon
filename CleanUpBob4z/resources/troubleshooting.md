# Bob Premium for Z - Troubleshooting Guide

## 🔧 Common Issues and Solutions

### Installation & Setup Issues

#### Issue: Bob Premium for Z Not Showing in VS Code

**Symptoms:**

- Bob icon not visible in sidebar
- Z modes not available in mode selector

**Solutions:**

1. Verify Bob Premium for Z is installed:
   - Open VS Code Extensions
   - Search for "Bob Premium for Z"
   - Ensure it's installed and enabled

2. Reload VS Code:
   - Press `Cmd/Ctrl + Shift + P`
   - Type "Reload Window"
   - Press Enter

3. Check license:
   - Ensure you have a valid Bob Premium for Z license
   - Contact your administrator if license is missing

#### Issue: Z Architect or Z Code Modes Not Available

**Symptoms:**

- Only see standard Bob modes
- Z-specific modes missing from selector

**Solutions:**

1. Verify Bob Premium for Z package:
   - Check that Premium for Z extension is active
   - Not just standard Bob

2. Check workspace type:
   - Z modes activate when COBOL files detected
   - Ensure workspace contains mainframe code

3. Restart VS Code:
   - Close and reopen VS Code
   - Modes should appear after restart

### Workspace Scanning Issues

#### Issue: Workspace Scan Fails or Times Out

**Symptoms:**

- Scan starts but never completes
- Error message during scan
- Timeout after several minutes

**Solutions:**

1. Check workspace size:

   ```
   Scan only the src/ directory instead of entire workspace
   ```

2. Verify file permissions:
   - Ensure VS Code has read access to all files
   - Check for locked or protected files

3. Check network connectivity:
   - If scanning remote z/OS files, verify connection
   - Test VPN or network access

4. Reduce scope:

   ```
   Scan the COBOL programs directory only, excluding JCL and data files
   ```

5. Clear cache and retry:
   - Close VS Code
   - Delete `.bob/cache` directory
   - Reopen and scan again

#### Issue: Scan Completes But Metadata Incomplete

**Symptoms:**

- Some programs not found in analysis
- Missing dependencies
- Incomplete program inventory

**Solutions:**

1. Verify all source files in workspace:

   ```
   List all COBOL programs in the workspace
   ```

2. Check file extensions:
   - Ensure COBOL files have recognized extensions (.cbl, .cob, .cobol)
   - Copybooks should be .cpy or in Copy/ directory

3. Re-scan with verbose output:

   ```
   Scan the workspace again and show detailed progress
   ```

4. Check for excluded directories:
   - Review `.gitignore` or `.bobignore`
   - Ensure source directories not excluded

### Analysis Issues

#### Issue: Agent.md Creation Fails

**Symptoms:**

- `/init` command doesn't create file
- Error during Agent.md generation
- File created but empty

**Solutions:**

1. Ensure workspace scan completed:

   ```
   Check if workspace scan completed successfully
   ```

2. Verify write permissions:
   - Check workspace directory is writable
   - Try creating a test file manually

3. Clear existing Agent.md:
   - Delete existing Agent.md if present
   - Run `/init` again

4. Provide more context:
   ```
   /init
   Workspace type: COBOL/CICS application
   Main programs in: src/cobol/
   Copybooks in: src/copy/
   ```

#### Issue: Data Dictionary Generation Incomplete

**Symptoms:**

- Some copybooks missing from dictionary
- Field descriptions incomplete
- Dictionary doesn't include all variables

**Solutions:**

1. Verify copybook locations:

   ```
   List all copybooks in the workspace
   ```

2. Check copybook syntax:
   - Ensure copybooks compile without errors
   - Fix any COBOL syntax issues

3. Regenerate for specific copybooks:

   ```
   Create a data dictionary specifically for the LGPOLICY copybook
   ```

4. Check for COPY statements:
   - Ensure nested copybooks are in workspace
   - Verify COPY paths are correct

#### Issue: Impact Analysis Misses Dependencies

**Symptoms:**

- Not all affected programs identified
- Missing database impacts
- Incomplete dependency list

**Solutions:**

1. Re-scan workspace:

   ```
   Scan the local workspace again to refresh metadata
   ```

2. Check for dynamic calls:
   - Dynamic CALL statements may not be detected
   - Manually verify dynamic dependencies

3. Verify database schema in workspace:
   - Include DB2 DDL files
   - Ensure table definitions available

4. Provide additional context:
   ```
   Analyze impact of changing DB2-LASTNAME field. Also check programs
   in the batch/ directory and any programs that call LGPOLICY.
   ```

### Code Generation Issues

#### Issue: Generated COBOL Code Won't Compile

**Symptoms:**

- Syntax errors in generated code
- Compilation fails
- Undefined variables or copybooks

**Solutions:**

1. Specify COBOL version:

   ```
   Generate COBOL code compatible with Enterprise COBOL 6.3
   ```

2. Check copybook availability:
   - Ensure all referenced copybooks in workspace
   - Verify COPY statements have correct paths

3. Review generated code:
   - Check for placeholder comments
   - Verify all variables declared
   - Ensure proper section structure

4. Request fixes:
   ```
   The generated code has compilation errors. Please fix the syntax
   and ensure all variables are properly declared.
   ```

#### Issue: Generated REST API Doesn't Work

**Symptoms:**

- API endpoints return errors
- CICS integration fails
- Connection issues

**Solutions:**

1. Verify CICS configuration:
   - Check CICS connection settings
   - Verify transaction definitions
   - Test CICS connectivity

2. Check integration method:

   ```
   What integration method are you using for CICS?
   (Web Services, CTG, JNI)
   ```

3. Review error logs:
   - Check Spring Boot logs
   - Review CICS logs
   - Look for connection errors

4. Test with simple endpoint:
   ```
   Create a simple test endpoint that just returns "Hello" to verify
   the API framework is working
   ```

#### Issue: Generated UI Components Don't Render

**Symptoms:**

- React/Angular components show errors
- UI doesn't display correctly
- Missing dependencies

**Solutions:**

1. Check dependencies installed:

   ```bash
   npm install
   ```

2. Verify framework version:

   ```
   What version of React/Angular are you using?
   ```

3. Check for TypeScript errors:
   - Review console for errors
   - Fix type definitions

4. Request framework-specific code:
   ```
   Generate React components using React 18 and TypeScript
   ```

### Mode-Specific Issues

#### Issue: Wrong Mode for Task

**Symptoms:**

- Bob says it can't perform the task
- Unexpected results
- Mode restrictions prevent action

**Solutions:**

1. Switch to appropriate mode:
   - **Analysis tasks** → Z Architect
   - **Implementation tasks** → Z Code

2. Check mode indicator:
   - Look at bottom of chat window
   - Verify correct mode active

3. Understand mode capabilities:
   - Z Architect: Read-only analysis
   - Z Code: Code generation and modification

#### Issue: Can't Edit Files in Z Architect Mode

**Symptoms:**

- Bob won't modify code
- Says it can only analyze
- File edit requests rejected

**Solution:**
Switch to Z Code mode:

1. Click mode selector
2. Choose "☕ Z Code"
3. Retry the edit request

### Performance Issues

#### Issue: Bob Responses Very Slow

**Symptoms:**

- Long wait times for responses
- Timeouts
- Incomplete responses

**Solutions:**

1. Reduce context size:
   - Clear unnecessary context
   - Add only relevant code

2. Break down requests:
   - Instead of "analyze entire application"
   - Try "analyze the LGPOLICY program"

3. Check network:
   - Verify internet connection
   - Test with simple query

4. Restart VS Code:
   - Close and reopen
   - Clear cache if needed

#### Issue: Workspace Scan Takes Too Long

**Symptoms:**

- Scan runs for 10+ minutes
- Never completes
- VS Code becomes unresponsive

**Solutions:**

1. Scan incrementally:

   ```
   Scan only the src/cobol/ directory
   ```

2. Exclude unnecessary files:
   - Add `.bobignore` file
   - Exclude test data, logs, etc.

3. Check file count:

   ```bash
   find . -name "*.cbl" | wc -l
   ```

   - If >1000 files, consider subsetting

4. Increase timeout:
   - Check Bob settings
   - Increase scan timeout if available

### Integration Issues

#### Issue: Can't Connect to z/OS System

**Symptoms:**

- Network errors
- Authentication failures
- Timeout connecting to mainframe

**Solutions:**

1. Verify VPN connection:
   - Ensure VPN is active
   - Test with ping or telnet

2. Check credentials:
   - Verify username/password
   - Check for expired passwords

3. Test with other tools:
   - Try connecting with Wazi
   - Verify z/OS system is accessible

4. Contact system administrator:
   - Verify firewall rules
   - Check z/OS system status

#### Issue: DB2 Queries Fail

**Symptoms:**

- Database connection errors
- SQL errors
- Authentication issues

**Solutions:**

1. Verify DB2 connection:
   - Check connection string
   - Verify credentials
   - Test with DB2 client

2. Check SQL syntax:
   - Ensure SQL is DB2-compatible
   - Verify table names correct

3. Review permissions:
   - Ensure user has SELECT access
   - Check table permissions

### Documentation Issues

#### Issue: Generated Documentation Incomplete

**Symptoms:**

- Missing sections
- Placeholder text remains
- Diagrams not generated

**Solutions:**

1. Provide more specific requirements:

   ```
   Create comprehensive documentation including:
   - Program purpose
   - Input/output specifications
   - Business logic
   - Dependencies
   - Mermaid architecture diagram
   ```

2. Generate sections separately:

   ```
   First, create the program overview section
   ```

   Then:

   ```
   Now create the business logic section
   ```

3. Request diagram explicitly:
   ```
   Create a Mermaid diagram showing the program flow
   ```

#### Issue: Mermaid Diagrams Don't Render

**Symptoms:**

- Diagram code shown but not rendered
- Syntax errors in Mermaid
- Diagram doesn't display

**Solutions:**

1. Check Mermaid syntax:
   - Copy diagram code
   - Test in Mermaid live editor

2. Request diagram fix:

   ```
   The Mermaid diagram has syntax errors. Please fix it.
   ```

3. Use simpler diagram:
   ```
   Create a simpler flowchart diagram
   ```

## 🆘 Getting Additional Help

### Before Contacting Support

1. **Check this guide** for your specific issue
2. **Review error messages** carefully
3. **Try basic troubleshooting**:
   - Restart VS Code
   - Clear cache
   - Re-scan workspace
4. **Gather information**:
   - Error messages
   - Steps to reproduce
   - VS Code version
   - Bob Premium for Z version

### Support Channels

#### Slack

- **Channel:** #bob-premium-z
- **Best for:** Quick questions, community help
- **Response time:** Usually within hours

#### Email

- **Address:** bob-z-support@ibm.com
- **Best for:** Detailed issues, bug reports
- **Response time:** 1-2 business days

#### Office Hours

- **When:** Tuesdays 2-3pm EST
- **Best for:** Live troubleshooting, demos
- **How:** Join via Slack announcement

#### Documentation

- **URL:** https://bob.ibm.com/docs/z
- **Best for:** Learning, reference
- **Updated:** Weekly

### What to Include in Support Requests

1. **Issue Description:**
   - What you were trying to do
   - What happened instead
   - Error messages (exact text)

2. **Environment:**
   - VS Code version
   - Bob Premium for Z version
   - Operating system
   - Mainframe environment (z/OS version, etc.)

3. **Steps to Reproduce:**
   - Numbered steps
   - Include prompts used
   - Mention mode (Z Architect or Z Code)

4. **Screenshots:**
   - Error messages
   - Unexpected behavior
   - Configuration screens

5. **Logs:**
   - VS Code console logs
   - Bob error logs
   - Relevant system logs

## 📚 Additional Resources

### Documentation

- [Bob Premium for Z User Guide](https://bob.ibm.com/docs/z)
- [Z Architect Mode Reference](https://bob.ibm.com/docs/modes/z-architect)
- [Z Code Mode Reference](https://bob.ibm.com/docs/modes/z-code)
- [Troubleshooting FAQ](https://bob.ibm.com/docs/z/faq)

### Training

- Z Bobathon workshops
- Video tutorials
- Hands-on labs
- Case studies

### Community

- Slack workspace
- User forums
- Monthly webinars
- User group meetings

---

**Remember:** Most issues can be resolved by:

1. Restarting VS Code
2. Re-scanning the workspace
3. Switching to the correct mode
4. Providing more specific prompts

**Made with Bob Premium for Z** ☕
