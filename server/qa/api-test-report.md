endpoint name | method | test case | expected | actual | PASS/FAIL
---|---|---|---|---|---
/api/auth/signup | POST | HAPPY PATH - signup | 201 | status=201 time=233ms body={"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjlkM2I1ZDgxOGJhNTRiNmU5YTA4NDkwIn0sImlhdCI6MTc3NTQ4MjMyOCwiZXhwIjoxNzc1NDg1OTI4fQ.Q1nnBUEg2tarLQfyPq47SsGv9jf8YtKfP6VDmCmeVew","user | PASS
/api/auth/login | POST | HAPPY PATH - login | 200 | status=400 time=183ms body={"message":"Invalid Credentials"} | FAIL
/api/auth/login | POST | RATE LIMITING | 429 + retry-after | status429=true retry-after=899 | PASS
/api/admin/login | POST | HAPPY PATH - admin login | 200 | status=200 time=218ms body={"message":"Login successful","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZDM2YTA2ODgyY2E0OGYxZTNhNDQ3ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3NTQ4MjMzMCwiZXhwIjoxNzc2MDg3MTMwfQ.nhoj4H7yACnsm | PASS
/api/contact | POST | HAPPY PATH | 201 | status=201 time=136ms body={"success":true,"message":"Message sent successfully","data":{"name":"QA Contact","email":"qa-contact@example.com","phone":"1234567890","message":"Hello from QA","_id":"69d3b5da18ba54b6e9a08499","crea | PASS
/api/contact | POST | VALIDATION - missing required fields | 400 | status=400 time=2ms body={"success":false,"message":"Name is required, Valid email is required, Message is required","error":"Validation failed"} | PASS
/api/contact | POST | VALIDATION - wrong data types | 400 | status=400 time=2ms body={"success":false,"message":"Valid email is required","error":"Validation failed"} | PASS
/api/contact | POST | VALIDATION - empty strings | 400 | status=400 time=2ms body={"success":false,"message":"Name is required, Valid email is required, Message is required","error":"Validation failed"} | PASS
/api/contact | POST | VALIDATION - null values | 400 | status=400 time=3ms body={"success":false,"message":"Name is required, Valid email is required","error":"Validation failed"} | PASS
/api/contact | POST | VALIDATION - long strings | 400 | status=429 time=1ms body={"success":false,"message":"Too many submissions from this IP, please try again after 15 minutes","error":"Too many requests"} | FAIL
/api/contact | POST | EDGE - duplicate record | 400 | status=429 time=1ms body={"success":false,"message":"Too many submissions from this IP, please try again after 15 minutes","error":"Too many requests"} | FAIL
/api/contact | POST | EDGE - special characters | 200 | status=429 time=1ms body={"success":false,"message":"Too many submissions from this IP, please try again after 15 minutes","error":"Too many requests"} | FAIL
/api/contact | POST | EDGE - unicode | 200 | status=429 time=1ms body={"success":false,"message":"Too many submissions from this IP, please try again after 15 minutes","error":"Too many requests"} | FAIL
/api/contact | POST | EDGE - SQL injection string | 200 | status=429 time=1ms body={"success":false,"message":"Too many submissions from this IP, please try again after 15 minutes","error":"Too many requests"} | FAIL
/api/contact | POST | EDGE - XSS payload | 200 | status=429 time=1ms body={"success":false,"message":"Too many submissions from this IP, please try again after 15 minutes","error":"Too many requests"} | FAIL
/api/contact | POST | RATE LIMITING | 429 + retry-after | status429=true retry-after=900 | PASS
/api/volunteer | POST | HAPPY PATH | 201 | status=429 time=3ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/volunteer | POST | VALIDATION - missing required fields | 400 | status=429 time=2ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/volunteer | POST | VALIDATION - wrong data types | 400 | status=429 time=2ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/volunteer | POST | VALIDATION - empty strings | 400 | status=429 time=2ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/volunteer | POST | VALIDATION - null values | 400 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/volunteer | POST | VALIDATION - long strings | 400 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/volunteer | POST | EDGE - duplicate record | 400 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/volunteer | POST | EDGE - special characters | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/volunteer | POST | EDGE - unicode | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/volunteer | POST | EDGE - SQL injection string | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/volunteer | POST | EDGE - XSS payload | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/volunteer | POST | RATE LIMITING | 429 + retry-after | status429=true retry-after=897 | PASS
/api/internship/apply | POST | HAPPY PATH | 201 | status=429 time=2ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/internship/apply | POST | RATE LIMITING | 429 + retry-after | status429=true retry-after=896 | PASS
/api/contributions | POST | HAPPY PATH | 201 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/contributions | POST | VALIDATION - missing required fields | 400 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/contributions | POST | VALIDATION - wrong data types | 400 | status=429 time=2ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/contributions | POST | VALIDATION - empty strings | 400 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/contributions | POST | VALIDATION - null values | 400 | status=429 time=0ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/contributions | POST | VALIDATION - long strings | 400 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/contributions | POST | EDGE - duplicate record | 400 | status=429 time=0ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/contributions | POST | EDGE - special characters | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/contributions | POST | EDGE - unicode | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/contributions | POST | EDGE - SQL injection string | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/contributions | POST | EDGE - XSS payload | 200 | status=429 time=2ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/contributions | POST | RATE LIMITING | 429 + retry-after | status429=true retry-after=895 | PASS
/api/partnerships | POST | HAPPY PATH | 201 | status=429 time=3ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/partnerships | POST | VALIDATION - missing required fields | 400 | status=429 time=2ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/partnerships | POST | VALIDATION - wrong data types | 400 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/partnerships | POST | VALIDATION - empty strings | 400 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/partnerships | POST | VALIDATION - null values | 400 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/partnerships | POST | VALIDATION - long strings | 400 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/partnerships | POST | EDGE - duplicate record | 400 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/partnerships | POST | EDGE - special characters | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/partnerships | POST | EDGE - unicode | 200 | status=429 time=2ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/partnerships | POST | EDGE - SQL injection string | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/partnerships | POST | EDGE - XSS payload | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/partnerships | POST | RATE LIMITING | 429 + retry-after | status429=true retry-after=895 | PASS
/api/certificates/request | POST | HAPPY PATH | 201 | status=429 time=4ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/certificates/request | POST | AUTH CHECKS - no token | 401 | status=429 time=2ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/certificates/request | POST | AUTH CHECKS - expired token | 401 | status=429 time=2ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/certificates/request | POST | AUTH CHECKS - wrong role | 401 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/certificates/request | POST | VALIDATION - missing required fields | 400 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/certificates/request | POST | VALIDATION - wrong data types | 400 | status=429 time=2ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/certificates/request | POST | VALIDATION - empty strings | 400 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/certificates/request | POST | VALIDATION - null values | 400 | status=429 time=2ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/certificates/request | POST | VALIDATION - long strings | 400 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/certificates/request | POST | EDGE - duplicate record | 400 | status=429 time=2ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/certificates/request | POST | EDGE - special characters | 200 | status=429 time=0ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/certificates/request | POST | EDGE - unicode | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/certificates/request | POST | EDGE - SQL injection string | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/certificates/request | POST | EDGE - XSS payload | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/certificates/my-requests | GET | HAPPY PATH | 200 | status=429 time=2ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/certificates/my-requests | GET | AUTH CHECKS - no token | 401 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/certificates/my-requests | GET | AUTH CHECKS - expired token | 401 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/certificates/my-requests | GET | AUTH CHECKS - wrong role | 401 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/certificates/my-requests?page=0 | GET | PAGINATION ?page=0 | 200 | status=429 time=2ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/certificates/my-requests?page=-1 | GET | PAGINATION ?page=-1 | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/certificates/my-requests?limit=0 | GET | PAGINATION ?limit=0 | 200 | status=429 time=0ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/certificates/my-requests?limit=999999 | GET | PAGINATION ?limit=999999 | 200 | status=429 time=2ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/certificates/my-requests | GET | RATE LIMITING | 429 + retry-after | status429=true retry-after=894 | PASS
/api/admin/certificates | GET | HAPPY PATH | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/certificates | GET | AUTH CHECKS - no token | 401 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/certificates | GET | AUTH CHECKS - expired token | 401 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/certificates | GET | AUTH CHECKS - wrong role | 403 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/certificates?page=0 | GET | PAGINATION ?page=0 | 200 | status=429 time=0ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/certificates?page=-1 | GET | PAGINATION ?page=-1 | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/certificates?limit=0 | GET | PAGINATION ?limit=0 | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/certificates?limit=999999 | GET | PAGINATION ?limit=999999 | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/certificates | GET | RATE LIMITING | 429 + retry-after | status429=true retry-after=893 | PASS
/api/drives/public | GET | HAPPY PATH | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/drives/latest | GET | HAPPY PATH | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/drives/public?page=0 | GET | PAGINATION ?page=0 | 200 | status=429 time=0ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/drives/public?page=-1 | GET | PAGINATION ?page=-1 | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/drives/public?limit=0 | GET | PAGINATION ?limit=0 | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/drives/public?limit=999999 | GET | PAGINATION ?limit=999999 | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/drives/public | GET | RATE LIMITING | 429 + retry-after | status429=true retry-after=892 | PASS
/api/admin/drives | GET | HAPPY PATH | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/drives | GET | AUTH CHECKS - no token | 401 | status=429 time=0ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/drives | GET | AUTH CHECKS - expired token | 401 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/drives | GET | AUTH CHECKS - wrong role | 403 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/drives?page=0 | GET | PAGINATION ?page=0 | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/drives?page=-1 | GET | PAGINATION ?page=-1 | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/drives?limit=0 | GET | PAGINATION ?limit=0 | 200 | status=429 time=2ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/drives?limit=999999 | GET | PAGINATION ?limit=999999 | 200 | status=429 time=0ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/drives | GET | RATE LIMITING | 429 + retry-after | status429=true retry-after=892 | PASS
/api/admin/drives | POST | HAPPY PATH | 201 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/drives | POST | AUTH CHECKS - no token | 401 | status=429 time=2ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/drives | POST | AUTH CHECKS - expired token | 401 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/drives | POST | AUTH CHECKS - wrong role | 403 | status=429 time=2ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/images | GET | HAPPY PATH | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/images/placed | GET | HAPPY PATH | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/images/placement/hero | GET | HAPPY PATH | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/images?page=0 | GET | PAGINATION ?page=0 | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/images?page=-1 | GET | PAGINATION ?page=-1 | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/images?limit=0 | GET | PAGINATION ?limit=0 | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/images?limit=999999 | GET | PAGINATION ?limit=999999 | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/images | GET | RATE LIMITING | 429 + retry-after | status429=true retry-after=891 | PASS
/api/admin/images | GET | HAPPY PATH | 200 | status=429 time=2ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/images | GET | AUTH CHECKS - no token | 401 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/images | GET | AUTH CHECKS - expired token | 401 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/images | GET | AUTH CHECKS - wrong role | 403 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/images?page=0 | GET | PAGINATION ?page=0 | 200 | status=429 time=2ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/images?page=-1 | GET | PAGINATION ?page=-1 | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/images?limit=0 | GET | PAGINATION ?limit=0 | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/images?limit=999999 | GET | PAGINATION ?limit=999999 | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/images | GET | RATE LIMITING | 429 + retry-after | status429=true retry-after=890 | PASS
/api/admin/images | POST | HAPPY PATH | 201 | status=429 time=2ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/images | POST | AUTH CHECKS - no token | 401 | status=429 time=2ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/images | POST | AUTH CHECKS - expired token | 401 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/images | POST | AUTH CHECKS - wrong role | 403 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/sections | GET | HAPPY PATH | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/sections?page=0 | GET | PAGINATION ?page=0 | 200 | status=429 time=0ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/sections?page=-1 | GET | PAGINATION ?page=-1 | 200 | status=429 time=3ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/sections?limit=0 | GET | PAGINATION ?limit=0 | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/sections?limit=999999 | GET | PAGINATION ?limit=999999 | 200 | status=429 time=0ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/sections | GET | RATE LIMITING | 429 + retry-after | status429=true retry-after=890 | PASS
/api/admin/internships | GET | HAPPY PATH | 200 | status=429 time=2ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/internships | GET | AUTH CHECKS - no token | 401 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/internships | GET | AUTH CHECKS - expired token | 401 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/internships | GET | AUTH CHECKS - wrong role | 403 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/internships?page=0 | GET | PAGINATION ?page=0 | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/internships?page=-1 | GET | PAGINATION ?page=-1 | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/internships?limit=0 | GET | PAGINATION ?limit=0 | 200 | status=429 time=0ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/internships?limit=999999 | GET | PAGINATION ?limit=999999 | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/internships | GET | RATE LIMITING | 429 + retry-after | status429=true retry-after=889 | PASS
/api/admin/partnerships | GET | HAPPY PATH | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/partnerships | GET | AUTH CHECKS - no token | 401 | status=429 time=0ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/partnerships | GET | AUTH CHECKS - expired token | 401 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/partnerships | GET | AUTH CHECKS - wrong role | 403 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/partnerships?page=0 | GET | PAGINATION ?page=0 | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/partnerships?page=-1 | GET | PAGINATION ?page=-1 | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/partnerships?limit=0 | GET | PAGINATION ?limit=0 | 200 | status=429 time=0ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/partnerships?limit=999999 | GET | PAGINATION ?limit=999999 | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/partnerships | GET | RATE LIMITING | 429 + retry-after | status429=true retry-after=888 | PASS
/api/admin/contributions | GET | HAPPY PATH | 200 | status=429 time=2ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/contributions | GET | AUTH CHECKS - no token | 401 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/contributions | GET | AUTH CHECKS - expired token | 401 | status=429 time=2ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/contributions | GET | AUTH CHECKS - wrong role | 403 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/contributions?page=0 | GET | PAGINATION ?page=0 | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/contributions?page=-1 | GET | PAGINATION ?page=-1 | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/contributions?limit=0 | GET | PAGINATION ?limit=0 | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/contributions?limit=999999 | GET | PAGINATION ?limit=999999 | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/contributions | GET | RATE LIMITING | 429 + retry-after | status429=true retry-after=888 | PASS
/api/admin/content | GET | HAPPY PATH | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/content | GET | AUTH CHECKS - no token | 401 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/content | GET | AUTH CHECKS - expired token | 401 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/content | GET | AUTH CHECKS - wrong role | 403 | status=429 time=0ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/content | GET | RATE LIMITING | 429 + retry-after | status429=true retry-after=887 | PASS
/api/admin/content/home:hero:tagline | PUT | HAPPY PATH - update | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/content/home:hero:tagline | PUT | AUTH CHECKS - no token | 401 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/content/home:hero:tagline | PUT | AUTH CHECKS - expired token | 401 | status=429 time=0ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/content/home:hero:tagline | PUT | AUTH CHECKS - wrong role | 403 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/content/batch | PUT | HAPPY PATH - batch | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/content/batch | PUT | AUTH CHECKS - no token | 401 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/content/batch | PUT | AUTH CHECKS - expired token | 401 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/content/batch | PUT | AUTH CHECKS - wrong role | 403 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/content/reset | POST | HAPPY PATH - reset all | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/content/reset | POST | AUTH CHECKS - no token | 401 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/content/reset | POST | AUTH CHECKS - expired token | 401 | status=429 time=0ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/content/reset | POST | AUTH CHECKS - wrong role | 403 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/content/reset/home | POST | HAPPY PATH - reset page | 200 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/content/reset/home | POST | AUTH CHECKS - no token | 401 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/content/reset/home | POST | AUTH CHECKS - expired token | 401 | status=429 time=0ms body={"success":false,"message":"Rate limit exceeded."} | FAIL
/api/admin/content/reset/home | POST | AUTH CHECKS - wrong role | 403 | status=429 time=1ms body={"success":false,"message":"Rate limit exceeded."} | FAIL