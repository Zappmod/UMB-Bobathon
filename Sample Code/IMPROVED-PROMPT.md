# Improved Prompt for COBOL to React + Spring Boot Modernization

Use this enhanced prompt to ensure correct generation on the first run:

---

## Modernize COBOL Greenscreen Program to React + Spring Boot

**COBOL PROGRAM**: LGACUS01 (Customer Inquiry)  
**BMS Screen**: SSMAPC1  
**Purpose**: Search and display customer details (read-only inquiry)  
**Why this program**: Lowest risk (read-only), high usage, foundation for other screens, ~400 LOC

### Current Tech Stack
- **Platform**: z/OS CICS
- **Language**: COBOL
- **Database**: Mainframe database CUSTOMER table
- **Screen**: BMS 80x24 greenscreen

### Target Tech Stack
- **Backend**: Spring Boot 3.2 + Java 17 + Hibernate
- **Frontend**: React 18 + TypeScript + Vite
- **Database**: H2 in-memory database
- **Ports**: Backend 8083, Frontend 3000

### Data Model (from Copy/LGPOLICY)

CUSTOMER table fields:
- CUSTOMERNUMBER (PK, 10 digits)
- FIRSTNAME (10 chars)
- LASTNAME (20 chars)
- DATEOFBIRTH (date, yyyy-mm-dd)
- HOUSENAME (20 chars)
- HOUSENUMBER (4 chars)
- POSTCODE (8 chars)
- PHONEMOBILE (20 chars)
- PHONEHOME (20 chars)
- EMAILADDRESS (100 chars)

---

## Spring Boot Backend Requirements

### 1. Project Structure
```
backend/
├── pom.xml
├── src/main/java/com/insurance/customer/
│   ├── CustomerInquiryApplication.java
│   ├── entity/Customer.java
│   ├── dto/CustomerDTO.java
│   ├── repository/CustomerRepository.java
│   ├── service/CustomerService.java
│   ├── controller/CustomerController.java
│   ├── exception/
│   │   ├── CustomerNotFoundException.java
│   │   └── GlobalExceptionHandler.java
│   └── config/
│       ├── CorsConfig.java
│       └── SampleDataLoader.java
└── src/main/resources/
    └── application.yml (H2 config)
```

### 2. Critical Implementation Rules

**⚠️ NO LOMBOK ANNOTATIONS** - Use standard Java patterns:
- ❌ NO `@Data`, `@Builder`, `@Slf4j`, `@AllArgsConstructor`, `@NoArgsConstructor`
- ✅ YES: Manual constructors, getters, setters
- ✅ YES: `LoggerFactory.getLogger(ClassName.class)` for logging

**Example Entity Pattern**:
```java
public class Customer {
    private String customerNumber;
    private String firstName;
    // ... other fields
    
    // Default constructor
    public Customer() {}
    
    // Full constructor
    public Customer(String customerNumber, String firstName, ...) {
        this.customerNumber = customerNumber;
        this.firstName = firstName;
        // ...
    }
    
    // Getters and setters
    public String getCustomerNumber() { return customerNumber; }
    public void setCustomerNumber(String customerNumber) { this.customerNumber = customerNumber; }
    // ... etc
}
```

### 3. Database Configuration

**application.yml** (H2 in-memory database):
```yaml
spring:
  datasource:
    url: jdbc:h2:mem:customerdb;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE
    username: sa
    password:
    driver-class-name: org.h2.Driver
  h2:
    console:
      enabled: true
      path: /h2-console
  jpa:
    database-platform: org.hibernate.dialect.H2Dialect
    hibernate:
      ddl-auto: create-drop
```

### 4. Maven Dependencies (pom.xml)

**Critical**: H2 must have `runtime` scope (not `test`):
```xml
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>  <!-- NOT test -->
</dependency>
```

**Note**: No DB2 JDBC driver needed - using H2 in-memory database only.

### 5. Sample Data Loader

**MUST include** `SampleDataLoader.java` that:
- Implements `CommandLineRunner`
- Loads 20 sample customers on startup
- Only runs if database is empty
- Provides realistic UK customer data
- Logs customer numbers for testing

### 6. REST API Endpoints

```java
@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {
    
    @GetMapping("/{customerNumber}")
    public ResponseEntity<CustomerDTO> getCustomer(@PathVariable String customerNumber)
    
    @GetMapping("/search")
    public ResponseEntity<List<CustomerDTO>> searchCustomers(@RequestParam String q)
}
```

### 7. Exception Handling

Include `GlobalExceptionHandler` with:
- `@ControllerAdvice`
- Handles `CustomerNotFoundException`
- Returns proper HTTP status codes
- Provides user-friendly error messages

### 8. CORS Configuration

```java
@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        // Allow http://localhost:3000 and http://localhost:3001
    }
}
```

---

## React Frontend Requirements

### 1. Project Structure
```
frontend/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── index.html
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── App.css
│   ├── types/Customer.ts
│   ├── services/customerService.ts
│   ├── components/
│   │   ├── CustomerSearch.tsx
│   │   ├── CustomerSearch.css
│   │   ├── CustomerDetail.tsx
│   │   └── CustomerDetail.css
│   └── index.css
└── .gitignore
```

### 2. TypeScript Types

**MUST define** complete interfaces:
```typescript
export interface Customer {
  customerNumber: string;
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: string;
  houseName: string;
  houseNumber: string;
  postcode: string;
  formattedAddress: string;
  phoneMobile: string;
  phoneHome: string;
  emailAddress: string;
  policyCount: number;
}

export interface ErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}
```

### 3. API Service Layer

```typescript
const API_BASE_URL = 'http://localhost:8083/api/v1';

export const customerService = {
  searchCustomers: async (query: string): Promise<Customer[]>
  getCustomer: async (customerNumber: string): Promise<Customer>
};
```

### 4. Component Requirements

**CustomerSearch**:
- Debounced search input (300ms)
- Autocomplete dropdown
- Loading spinner
- Error handling
- Keyboard navigation (Enter to select)

**CustomerDetail**:
- Card-based layout
- All customer fields displayed
- Formatted address
- Formatted phone numbers
- Back button to search
- Loading state
- Error handling

### 5. Styling

- Modern card-based design (NOT greenscreen style)
- Responsive (mobile-first)
- CSS Grid/Flexbox
- Accessible (WCAG 2.1 AA)
- Loading spinners
- Error states

---

## Documentation Requirements

### 1. README.md
Must include:
- Architecture overview
- Technology stack
- Project structure
- Setup instructions
- Running the application
- API endpoints
- Testing instructions
- Deployment guide

### 2. QUICKSTART.md
5-minute setup guide:
```bash
# Backend
cd backend
mvn spring-boot:run

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

### 3. TROUBLESHOOTING.md
Common issues and solutions:
- Backend not starting
- Database connection errors
- CORS errors
- Port conflicts
- Compilation errors

### 4. .gitignore Files
- Backend: `target/`, `.mvn/`, `*.log`
- Frontend: `node_modules/`, `dist/`, `.env`

---

## Business Logic to Preserve

From COBOL LGACUS01:
- Customer number validation (exactly 10 digits)
- Date format validation (yyyy-MM-dd)
- UK postcode format validation
- Email format validation
- Case-insensitive search
- Trim whitespace from inputs

---

## Success Criteria

✅ Backend compiles: `mvn clean install` (no errors)  
✅ Backend runs: `mvn spring-boot:run`
✅ Frontend installs: `npm install` (warnings OK, no errors)  
✅ Frontend runs: `npm run dev`  
✅ API responds: `curl http://localhost:8083/api/v1/customers/search?q=Smith`  
✅ Frontend loads: http://localhost:3000 or http://localhost:3001  
✅ Search works: Type "Smith" → See results  
✅ Detail view works: Click customer → See full details  
✅ Response time < 500ms  
✅ Mobile responsive  
✅ No console errors  

---

## Startup Commands

**Backend**:
```bash
cd backend
mvn spring-boot:run
```

**Frontend**:
```bash
cd frontend
npm install
npm run dev
```

---

## Key Lessons Learned

1. **NO Lombok**: Causes compilation issues - use standard Java
2. **H2 scope**: Must be `runtime`, not `test`
3. **H2 database**: Using in-memory H2 for simplicity and portability
4. **Sample data**: Include SampleDataLoader for immediate testing
5. **CORS**: Configure for both port 3000 and 3001
6. **Error handling**: Comprehensive exception handling
7. **TypeScript**: Complete type definitions
8. **Documentation**: README, QUICKSTART, TROUBLESHOOTING
9. **Testing**: Provide sample search terms in docs
10. **Validation**: Preserve all COBOL business rules

---

## Expected Output

After generation, user should be able to:
1. Run `mvn clean install` → SUCCESS
2. Run `mvn spring-boot:run` → Backend starts on 8083 with H2
3. Run `npm install && npm run dev` → Frontend starts on 3000/3001
4. Open browser → See search interface
5. Search "Smith" → See John Smith
6. Click customer → See full details
7. All features work without errors

---

**Made with Bob** 🤖