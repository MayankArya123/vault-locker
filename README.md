# Secure Vault Application

A client-side secure vault application built with React that allows users to store secrets securely using encryption. The application ensures sensitive data is never stored in plaintext and encryption keys are never persisted.

---

## Setup Instructions

1. Clone the repository:
```bash
git clone <repo-url>
cd <project-folder>

then npm start 


Architectural Decisions

React (Create React App)
Chosen for simplicity and rapid development of UI components.

Client-side encryption
Secrets are encrypted in memory before storage to ensure security.

Derived encryption key
The encryption key is derived at runtime from the master password and is never persisted.

State-based vault locking
Locking the vault clears the encryption key from memory, requiring re-authentication.

Separation of concerns

LockScreen handles authentication

Vault manages decrypted secrets

SecretForm handles secret creation and validation
