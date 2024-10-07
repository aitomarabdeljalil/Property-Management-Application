
# Property Management API

This is a RESTful API built with **Node.js** and **Express** for managing properties, tenants, rental payments, and notifications. The API includes JWT-based authentication, filtering and sorting capabilities for properties, and automated notifications for due payments. Data is stored using **SQLite** or any relational database of your choice.

## Features

- **CRUD operations** for properties and tenants.
- **Rental Payments Monitoring**: Manage payments with the ability to track settled or unsettled payments.
- **JWT Authentication**: Secure API endpoints with JSON Web Tokens.
- **Data Persistence**: Stores data in SQLite.

---

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aitomarabdeljalil/Property-Management-Application.git
   ```

2. Navigate into the project directory:

   ```bash
   cd Property-Management-Application
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
# JWT Secret Key (you can generate a key using require('crypto').randomBytes(64).toString('hex'))
SECRET_KEY=your_jwt_secret

# Optional database configuration (use SQLite)
DATABASE_URL=sqlite:./database.sqlite

# PORT
PORT=3000
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

- **Create Property**: `POST /api/properties`
  
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

- **Get Properties**: `GET /api/properties`

### 2. **Tenants**

- **Create Tenant**: `POST /api/tenants`

  Request body:

  ```json
  {
    "name": "John Doe",
    "contact": "john@example.com",
    "sectionOccupied": "A-101",
    "propertyId": 1
  }
  ```

- **Update Tenant**: `PUT /api/tenants/:id`

- **Delete Tenant**: `DELETE /api/tenants/:id`

### 3. **Payments**

- **Create Payment**: `POST /api/tenants/:tenantId/paymants`

  Request body:

  ```json
  {
    "tenantId": 1,
    "amount": 1200,
    "datePaid": "2024-09-15",
    "isSettled": true
  }
  ```

- **Update Payment**: `PUT /api/tenants/:tenantId/paymants`

---

## Authentication

The API is secured using **JWT (JSON Web Tokens)**. To perform any CRUD operations, users must be authenticated.

1. **Register User**: `POST /api/auth/register`
  
   Request body:

   ```json
   {
     "username": "admin",
     "password": "securePassword"
   }
   ```

2. **Login User**: `POST /api/auth/login`

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

Unit tests are implemented using Jest and Supertest to test API endpoints and critical logic.

1. To run the tests, execute:

```bash
npm test
```

2. Example test for properties route (`tests/api.test.js`):

```javascript
const request = require('supertest');
const app = require('../app');

describe("Property API", () => {
  it("should return a list of properties", async () => {
    const res = await request(app)
      .get("/api/properties")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should create a new property", async () => {
    const res = await request(app)
      .post("/api/properties")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test property",
        address: "123 Sunshine Ave",
        type: "Apartment",
        numberOfUnits: 10,
        rentalCost: 1200,
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("name", "test property");
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

---

This `README.md` file is designed to be a helpful guide for understanding and contributing to the project, as well as using the API effectively. You can customize the sections according to your exact setup.