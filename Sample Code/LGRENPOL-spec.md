# Program Specification — LGRENPOL
## Renew Insurance Policy

**Application:** IBM General Insurance Application (GenApp)  
**Program ID:** LGRENPOL  
**Type:** CICS service program  
**Transaction:** LREN  
**Author:** GenApp Development Team  
**Version:** 1.0  

---

## 1. Business Purpose

LGRENPOL handles the renewal of an existing insurance policy. When a policy approaches or passes its expiry date, this program calculates a new expiry date, optionally adjusts the premium, and updates the policy record in DB2. A renewal audit entry is written to the existing TSQ logging facility.

This program fills a gap in the current GenApp suite: Add (LGAPDB01), Update (LGUPDB01), and Delete (LGDPDB01) all exist — but there is no dedicated renewal flow.

---

## 2. Inputs

The program receives a COMMAREA conforming to the existing `LGCMAREA` copybook structure.

| Field | Source | Value |
|---|---|---|
| `CA-REQUEST-ID` | Caller | `'01RENW'` to trigger renewal |
| `CA-CUSTOMER-NUM` | Caller | 10-digit customer number |
| `CA-POLICY-NUM` | Caller | 10-digit policy number to renew |
| `CA-ISSUE-DATE` | Caller | New issue date (YYYY-MM-DD) |
| `CA-EXPIRY-DATE` | Caller | New expiry date (YYYY-MM-DD) |
| `CA-PAYMENT` | Caller | Renewed annual premium amount (6 digits) |
| `CA-BROKERID` | Caller | Broker ID authorizing the renewal (10 digits) |
| `CA-BROKERSREF` | Caller | Broker's reference for this renewal (10 chars) |

---

## 3. Outputs

On successful completion, the COMMAREA is returned with:

| Field | Value on Success | Value on Failure |
|---|---|---|
| `CA-RETURN-CODE` | `00` | `01`–`99` (see Section 6) |
| `CA-POLICY-NUM` | Unchanged | Unchanged |
| `CA-ISSUE-DATE` | Updated value | Unchanged |
| `CA-EXPIRY-DATE` | Updated value | Unchanged |
| `CA-LASTCHANGED` | Timestamp of renewal | Unchanged |
| `CA-PAYMENT` | Updated premium | Unchanged |

---

## 4. Processing Logic

### Step 1 — COMMAREA Validation
- If `EIBCALEN = 0`, ABEND with code `LGCA` (no COMMAREA received)
- If `EIBCALEN < WS-CA-HEADER-LEN` (28 bytes), set `CA-RETURN-CODE = '98'` and return
- If `CA-REQUEST-ID ≠ '01RENW'`, set `CA-RETURN-CODE = '97'` and return

### Step 2 — Input Field Validation
- `CA-CUSTOMER-NUM` must be numeric and non-zero → error code `01`
- `CA-POLICY-NUM` must be numeric and non-zero → error code `02`
- `CA-ISSUE-DATE` must be a valid date in `YYYY-MM-DD` format → error code `03`
- `CA-EXPIRY-DATE` must be after `CA-ISSUE-DATE` → error code `04`
- `CA-PAYMENT` must be numeric and greater than zero → error code `05`

### Step 3 — Policy Existence Check
- Issue a direct DB2 `SELECT` against the `POLICY` table using `CA-CUSTOMER-NUM` and `CA-POLICY-NUM` as predicates
- If no row is found (`SQLCODE = +100`), return error code `10`
- Verify that the retrieved policy row's customer number matches `CA-CUSTOMER-NUM` → error code `11` if mismatch

### Step 4 — Renewal Update
- Set `CA-ISSUE-DATE` to the provided new issue date
- Set `CA-EXPIRY-DATE` to the provided new expiry date
- Set `CA-LASTCHANGED` using `EXEC CICS ASKTIME` + `EXEC CICS FORMATTIME`
- Set `CA-PAYMENT` to the provided renewed premium
- Call [`LGUPDB01`](zOS%20Cobol/LGUPDB01.cbl) (Update Policy DB2) via `EXEC CICS LINK` to persist the changes
- If `CA-RETURN-CODE > 0` after the update call, return error code `20`

### Step 5 — Audit Logging
- Format an audit message containing: program name, customer number, policy number, new expiry date, new premium, timestamp
- Call `LGSTSQ` via `EXEC CICS LINK` to write the audit entry to the TSQ log
- Audit logging failure is non-fatal — log the error but continue

### Step 6 — Return
- Set `CA-RETURN-CODE = '00'`
- `EXEC CICS RETURN`

---

## 5. Program Structure

```
PROCEDURE DIVISION
  MAINLINE SECTION
    ├── Validate COMMAREA presence and length
    ├── Validate request ID
    └── PERFORM RENEW-POLICY

  RENEW-POLICY
    ├── PERFORM VALIDATE-INPUT-FIELDS
    ├── PERFORM CHECK-POLICY-EXISTS
    ├── PERFORM APPLY-RENEWAL
    └── PERFORM WRITE-AUDIT-MESSAGE

  VALIDATE-INPUT-FIELDS
  CHECK-POLICY-EXISTS
  APPLY-RENEWAL
  WRITE-AUDIT-MESSAGE
  WRITE-ERROR-MESSAGE         ← reuse existing pattern from LGAPDB01
  MAINLINE-EXIT
```

---

## 6. Return Codes

| Code | Meaning |
|---|---|
| `00` | Success — policy renewed |
| `01` | Invalid customer number |
| `02` | Invalid policy number |
| `03` | Invalid issue date format |
| `04` | Expiry date is not after issue date |
| `05` | Invalid premium amount |
| `10` | Policy not found |
| `11` | Policy does not belong to specified customer |
| `20` | DB2 update failed |
| `97` | Invalid request ID |
| `98` | COMMAREA too short |

---

## 7. Copybooks Used

| Copybook | Purpose |
|---|---|
| `LGCMAREA.cpy` | COMMAREA structure — all input/output fields |
| `LGPOLICY.cpy` | DB2 table declarations and working storage structures |

---

## 8. Programs Called

| Program | Call Method | Purpose |
|---|---|---|
| [`LGUPDB01`](zOS%20Cobol/LGUPDB01.cbl) | `EXEC CICS LINK` | Update policy record in DB2 |
| `LGSTSQ` | `EXEC CICS LINK` | Write audit/error messages to TSQ |

---

## 9. Coding Standards

Follow the conventions established in the existing GenApp programs:

- Working storage header block: `WS-HEADER` with eyecatcher `'LGRENPOL------WS'`
- CICS commands must include `RESP` and `RESP2` — check response after every command
- Error messages written via `WRITE-ERROR-MESSAGE` paragraph calling `LGSTSQ`
- Variable naming: `WS-` prefix for working storage, `CA-` prefix for COMMAREA fields
- ABEND code for missing COMMAREA: `LGCA`
- All paragraphs end with `EXIT`

---

## 10. Test Scenarios

| Scenario | Expected Result |
|---|---|
| Valid renewal with future expiry date | `CA-RETURN-CODE = '00'`, DB2 record updated |
| Policy number not found in DB2 | `CA-RETURN-CODE = '10'` |
| Policy belongs to different customer | `CA-RETURN-CODE = '11'` |
| Expiry date before issue date | `CA-RETURN-CODE = '04'` |
| Zero premium amount | `CA-RETURN-CODE = '05'` |
| No COMMAREA | ABEND `LGCA` |
| Wrong request ID | `CA-RETURN-CODE = '97'` |
