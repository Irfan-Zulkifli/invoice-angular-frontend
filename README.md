# Frontend Application

A Angular-based frontend application designed to work with a Laravel backend API for invoice management and data processing.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

* **Node.js:** v22.22.3 or v24.15.0 or v26.0.0
* **npm:** v10 or higher
* **Angular CLI:** (Optional but recommended)

## Installation & Setup

### 1. Clone and Install

Clone this repository to your local machine, navigate into the project directory, and install the necessary dependencies:

```bash
npm install
```

### 2. Configure the API Connection

By default, this frontend expects the Laravel API to be running at `http://localhost:8000/api`.

If your backend is running on a different port or using a local domain (e.g., Laravel Herd/Valet like `http://assessment.test`), please update the `baseUrl` inside the environment file before running the application:

**File:** `src/environments/environment.development.ts`

```typescript
export const environment = {
  production: false,
  baseUrl: 'http://localhost:8000/api'
};
```

### 3. Start the Development Server

```bash
npm start
```

### 4. View the Application

Open your browser and navigate to: `http://localhost:4200/`

## Core Architecture

* **`src/app/core/models/`** - Contains TypeScript interfaces (`Invoice`, `InvoiceItem`, `PaginatedResponse`) ensuring strict type-safety across the application.
* **`src/app/services/`** - Houses the `InvoiceService` which centralizes all API calls and handles `HttpParams` for pagination and sorting.
* **`environments/`** - Separates development and production API URLs for easy deployment.

## Testing Note

The application relies on the backend API for persistent data storage. Ensure the Laravel backend migrations and seeders have been executed before testing the frontend functionality.

---

Developed by Muhammad Irfan Bin Zulkifli
