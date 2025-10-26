# ELIO Installation Guide

This guide covers installation and environment setup for development and production.

## System Requirements

- OS: Windows 10+, macOS 11+, or Linux (Ubuntu 20.04+)
- Node.js: v18.0.0+
- npm: v9.0.0+
- RAM: 4GB minimum (8GB recommended)
- Disk space: 2GB free

## Clone the Repository

```bash
git clone https://github.com/your-repo/your-fold.git
cd your-fold
```

## Backend Setup

```bash
cd server
npm install
npm run test
```

## Frontend Setup

```bash
cd ui
npm install
npm run build
```

## Environment Configuration

### Backend (.env in `server/`)

```env
PORT=10000
NODE_ENV=development
CORS_ORIGIN=http://localhost:4200
GEMINI_API_KEY=your_gemini_api_key_here
SWAGGER_BASE_URL=/api/docs
LOG_LEVEL=info
```

### Frontend (Angular env files)

Edit `ui/src/environments/environment.ts` and `environment.prod.ts` as needed.

## Running the Application

### Development

- Backend: `npm run dev` (http://localhost:10000)
- Frontend: `npm start` (http://localhost:4200)

### Production

- Backend: `npm start`
- Frontend: `npm run build && npm run serve:ssr:ui`

## Troubleshooting

- Port conflicts: kill processes using the port
- Module errors: reinstall dependencies
- Compilation issues: run `npm run build`

## Getting Help

- [API Reference](API_REFERENCE.md)
- [Architecture Guide](ARCHITECTURE.md)
- Open an issue for support

---
