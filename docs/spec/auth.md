# Auth

## Authentication

- should have 2 custom endpoints:
  - [ ] register
    - [ ] registers a user and sends an email
  - [ ] reset
    - [ ] resets a password and sends an email
- should have 3 pages:
  - [ ] signup
  - [ ] login
  - [ ] verify-account
    - [ ] should handle signup as well as password reset
- should handle workflow mostly with postgres procedures
  - [ ] registerPerson
  - [ ] verifyPerson
  - [ ] resetPassword
  - [ ] changePassword
- [ ] should handle errors
  
