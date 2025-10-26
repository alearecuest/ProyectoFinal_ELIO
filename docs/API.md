# ELIO API Reference

This document describes the main REST API endpoints available in ELIO's backend.

## Base URLs

- Development: `http://localhost:10000`
- Production: `<your-production-url>`

---

## Authentication

Currently, endpoints do not require authentication for demo purposes.  
If enabled, authentication would use session or JWT tokens.

---

## Endpoints

### Health Check

- **GET /health**
  - Check if API server is running.
  - **Response:**
    ```json
    {
      "status": "ok",
      "timestamp": "<ISO8601>",
      "uptime": <seconds>
    }
    ```

---

### Start Consultation

- **POST /start**
  - Initiates a new consultation.
  - **Request:**
    ```json
    {
      "motivo_consulta": "Pain in right knee",
      "edad": 50,
      "sexo": "m"
    }
    ```
  - **Response:**
    ```json
    {
      "patientID": "uuid",
      "pasoActual": "antecedentes",
      "opciones": [
        { "label": "Diabetes", "checked": false },
        { "label": "Hypertension", "checked": false }
      ]
    }
    ```

---

### Step Endpoints (Antecedents, Allergies, Drugs, etc.)

For each intake step, there is a dedicated route in `server/src/routes/`.  
See [Architecture Guide](ARCHITECTURE.md) for route folder list.

- **POST /api/collect**
  - Collects selected options for current step.
  - **Request:**
    ```json
    {
      "patientID": "uuid",
      "opciones": ["Diabetes", "Hypertension"],
      "additional": "Any notes"
    }
    ```
  - **Response:**
    ```json
    {
      "status": "ok",
      "nextStep": "alergias",
      "opciones": [
        { "label": "Penicillin allergy", "checked": false }
      ]
    }
    ```

---

### Other Step Endpoints

- **POST /api/antecedents**
- **POST /api/allergies**
- **POST /api/drugs**
- ... (see `server/src/routes/` for full list)

Each expects:
```json
{
  "patientID": "uuid",
  "opciones": ["option1", "option2"],
  "additional": "notes"
}
```

Each responds with next step name and options.

---

### API Documentation (Swagger)

Interactive docs at:  
`http://localhost:10000/api/docs` (when backend running)

---

## Error Handling

All errors return:
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Description",
    "timestamp": "<ISO8601>"
  }
}
```

Common codes: `VALIDATION_ERROR`, `NOT_FOUND`, `INTERNAL_ERROR`

---

## Rate Limiting

Default: 100 requests per minute per IP.

---

## CORS

Origins allowed by `CORS_ORIGIN` in backend `.env`.

---
