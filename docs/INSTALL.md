# ELIO Installation Guide

This guide explains how to set up ELIO for development and production environments.

## Requirements

- OS: Windows 10+, macOS 11+, or Linux (Ubuntu 20.04+)
- Node.js: v18.x or higher
- npm: v9.x or higher

## Cloning the Repository

```bash
git clone https://github.com/your-name/ProyectoFinal_ELIO.git
cd ProyectoFinal_ELIO
```

## Backend Setup

```bash
cd server
npm install
npm run test
```

## Frontend Setup

```bash
cd client
npm install
npm run build
```

## Environment Configuration

### Backend

Create a `.env` file in `server/`:

```env
PORT=10000
NODE_ENV=development
CORS_ORIGIN=http://localhost:4200
GEMINI_API_KEY=your_gemini_api_key_here
SWAGGER_BASE_URL=/api/docs
LOG_LEVEL=info
```

### Frontend

Edit environment files in `client/src/environments/` as needed.

## Running the Application

### Development

- Backend: `npm run dev` (http://localhost:10000)
- Frontend: `npm start` (http://localhost:4200)

### Production

- Backend: `npm start`
- Frontend: `npm run build && npm run serve:ssr:client`

## Troubleshooting

- Port conflicts: kill processes using the port.
- Dependency errors: reinstall node_modules.

## Need Help?

See [docs/API.md](API.md), [docs/ARCHITECTURE.md](ARCHITECTURE.md), or open an issue.

---
