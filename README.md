# Arv Foundation

This repository contains the source for the Arv Foundation website — a full-stack application with a public site and an admin dashboard for managing the foundation's activities. This README intentionally avoids any sensitive credentials or connection strings. Use environment variables for secrets.

## Overview

- Public-facing site with pages for Initiatives, Work, About, Partners, Gallery, and Contact
- Admin dashboard to manage drives, gallery images, content, contributions, partnerships, and internship applications

## Quick Start (Developer)

1. Clone the repository and install dependencies

```bash
git clone <repository-url>
cd arv-foundation
npm install
cd server
npm install
```

2. Create environment variables

Create a `.env` file inside the `server` directory. Do NOT commit this file. Use placeholders only:

```env
# Database connection (example placeholder, DO NOT put real credentials here)
DATABASE_URL=your_database_connection_string_here

# Auth and app settings
JWT_SECRET=your_jwt_secret_here
PORT=5000

# Optional: email and cloud providers
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

3. Start development servers

Backend (from `server`):

```bash
npm run dev
```

Frontend (from project root, in a separate terminal):

```bash
npm run dev
```

The frontend typically runs on `http://localhost:5173` and the backend on `http://localhost:5000` by default. Adjust ports in your `.env` as needed.

## Important Security Notes

- Never commit real credentials, secrets, or database URIs into the repository.
- If any secret has been committed, rotate/revoke it immediately and scrub the repository history using a tool such as `git-filter-repo` or the `BFG Repo-Cleaner`.
- Add `.env` to `.gitignore` (this repo already includes common `.env` patterns). Verify your `.gitignore` contains `.env`.

## Project Structure

```
arv-foundation/
├── public/
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── src/            # React frontend
├── package.json
└── README.md
```

## Running Tests & Linting

```bash
# Run linting
npm run lint

# Build frontend for production
npm run build
```

## Contributing

1. Fork the repository
2. Create a topic branch
3. Commit changes with clear messages
4. Open a pull request and describe your changes

## Contact

If you need to reach the maintainers, use the project issue tracker. Do not post secrets in issues or PRs.

---

This README was updated to remove any hard-coded credentials and sensitive data. Always use environment variables for secrets and rotate any exposed keys immediately.

