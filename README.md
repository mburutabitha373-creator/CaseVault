# CaseVault

CaseVault is a full-stack case management application for tracking investigations, evidence, and case relationships. The project includes a Flask REST API backend and a React/Vite frontend.

## Features
- Manage cases and evidence
- Track case-evidence relationships
- View dashboard statistics
- Register and authenticate users

## Project Structure
- client/: React frontend
- server/: Flask backend and database models

## Installation

### Backend
```bash
cd server
pipenv install
pipenv run python app.py
```

### Frontend
```bash
cd client
npm install
npm run dev
```

## API
The backend runs on http://127.0.0.1:5555 and serves endpoints such as:
- GET /cases
- GET /evidence
- POST /register

## Notes
- The frontend uses Vite and proxies API requests through /api to the Flask backend during development.
