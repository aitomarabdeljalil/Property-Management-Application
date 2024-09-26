
# Property Management API

This is a RESTful API built with **Node.js** and **Express** for managing properties, tenants, rental payments, and notifications. The API includes JWT-based authentication, filtering and sorting capabilities for properties, and automated notifications for due payments. Data is stored using **SQLite** or any relational database of your choice, and unit tests are implemented using **Jest** and **Supertest**.

## Features

- **CRUD operations** for properties and tenants.
- **Rental Payments Monitoring**: Manage payments with the ability to track settled or unsettled payments.
- **Property Filtering & Sorting**: Filter and sort properties by location, rental price, and type.
- **Automated Due Payment Notifications**: Mock email notifications for overdue rental payments.
- **JWT Authentication**: Secure API endpoints with JSON Web Tokens.
- **Data Persistence**: Stores data in SQLite (or any other relational database).
- **Unit Testing**: Tests for critical parts of the API using Jest and Supertest.

---

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/property-management-api.git
   ```

2. Navigate into the project directory:

   ```bash
   cd property-management-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create an `.env` file in the root directory and add your environment variables (see [Environment Variables](#environment-variables) section).

---

## Environment Variables

Create a `.env` file in the root directory of your project with the following variables:

```bash
# JWT Secret Key
SECRET_KEY=your_jwt_secret

# Optional database configuration (use SQLite or other relational DB)
DATABASE_URL=sqlite:./database.sqlite
```

---

## Database Setup

The API uses **SQLite** for local development by default. If you wish to use another relational database (e.g., PostgreSQL or MySQL), configure the `DATABASE_URL` in the `.env` file.

1. **Migrate Database**:

   ```bash
   npx sequelize-cli db:migrate
   ```

2. **Sync Database** (automatically creates tables):

   In `app.js`, the database is synchronized with the following line:

   ```javascript
   sequelize.sync();
   ```

---

## API Documentation

### 1. **Properties**

- **Create Property**: `POST /properties`
  
  Request body:

  ```json
  {
    "name": "Sunset Apartments",
    "address": "123 Sunshine Ave",
    "type": "Apartment",
    "numberOfUnits": 10,
    "rentalCost": 1200
  }
  ```

- **Get Properties (with filtering and sorting)**: `GET /properties`

  Query parameters:
  - `location`: Filter by address.
  - `minPrice` and `maxPrice`: Filter by rental price range.
  - `type`: Filter by property type (e.g., apartment or house).
  - `sortBy`: Field to sort by (e.g., `rentalCost`).
  - `order`: Sorting order (`ASC` or `DESC`).

- **Update Property**: `PUT /properties/:id`

- **Delete Property**: `DELETE /properties/:id`

### 2. **Tenants**

- **Create Tenant**: `POST /tenants`

  Request body:

  ```json
  {
    "name": "John Doe",
    "contactDetails": "john@example.com",
    "propertyId": 1,
    "unit": "A-101"
  }
  ```

- **Update Tenant**: `PUT /tenants/:id`

- **Delete Tenant**: `DELETE /tenants/:id`

### 3. **Payments**

- **Create Payment**: `POST /payments`

  Request body:

  ```json
  {
    "tenantId": 1,
    "amount": 1200,
    "datePaid": "2024-09-15",
    "isSettled": true
  }
  ```

- **Check for Due Payments and Send Notifications**: `POST /payments/check-due-payments`

---

## Authentication

The API is secured using **JWT (JSON Web Tokens)**. To perform any CRUD operations, users must be authenticated.

1. **Register User**: `POST /auth/register`
  
   Request body:

   ```json
   {
     "username": "admin",
     "password": "securePassword"
   }
   ```

2. **Login User**: `POST /auth/login`

   Request body:

   ```json
   {
     "username": "admin",
     "password": "securePassword"
   }
   ```

   On successful login, a token will be returned. Use this token in the `Authorization` header for further requests:

   ```
   Authorization: Bearer your_jwt_token
   ```

---

## Testing

Unit tests are implemented using **Jest** and **Supertest** to test API endpoints and critical logic.

1. To run the tests, execute:

   ```bash
   npm test
   ```

2. Example test for properties route (`tests/propertyRoutes.test.js`):

   ```javascript
   const request = require('supertest');
   const app = require('../app');

   describe('Property API', () => {
     it('should fetch all properties', async () => {
       const response = await request(app).get('/properties');
       expect(response.statusCode).toBe(200);
       expect(response.body).toBeInstanceOf(Array);
     });
   });
   ```

---

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **Express** for the server framework.
- **Sequelize** ORM for database management.
- **Jest** and **Supertest** for testing.

---

This `README.md` file is designed to be a helpful guide for understanding and contributing to the project, as well as using the API effectively. You can customize the sections according to your exact setup.