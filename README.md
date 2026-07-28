# Invoice Frontend (Angular) Assessment

This is the frontend for the Invoice Management assessment.

## Prerequisites
- Node.js (vv22.22.3 or v24.15.0 or v26.0.0)
- Angular CLI

## Installation & Setup

**1. Clone the repository**
```bash
git clone <your-repository-url>
cd <your-project-folder>

**2. Install dependencies**
```bash
npm install

2. Configure the API Connection

By default, this frontend expects the Laravel API to be running at http://localhost:8000/api.

If your backend is running on a different port or using a local domain (e.g., Laravel Herd/Valet like http://assessment.test), please update the baseUrl inside the environment file before running the application:

File: src/environments/environment.development.ts

typescript
export const environment = {
  production: false,
  baseUrl: 'http://localhost:8000/api'
};

Note: Please ensure CORS is properly configured on the Laravel backend to accept requests from http://localhost:4200.

3. Start the Development Server
bash
npm start
4. View the Application

Open your browser and navigate to: http://localhost:4200/

Architecture
src/app/core/models/ - Contains TypeScript interfaces (Invoice, InvoiceItem, PaginatedResponse) ensuring strict type-safety across the application.
src/app/services/ - Houses the InvoiceService which centralizes all API calls and handles HttpParams for pagination and sorting.
environments/ - Separates development and production API URLs for easy deployment.

Testing Note

The application relies on the backend API for persistent data storage. Ensure the Laravel backend migrations and seeders have been executed before testing the frontend functionality.
