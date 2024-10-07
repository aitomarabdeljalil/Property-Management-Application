const app = require("../app.js");
const request = require("supertest");
const sequelize = require("../db.js");

// jest.setup.js
const dotenv = require("dotenv");

const result = dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});
if (result.error) {
  throw result.error;
}

let token = "";

beforeAll(async () => {
  try {
    // Sync the database before running tests
    await sequelize.sync({ force: true }); // Reset the database
    require("dotenv").config();
    console.log("Database & tables created!");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
});

afterAll(async () => {
  try {
    // Close the database connection after tests are done
    await sequelize.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error closing database connection:", error);
  }
});

test("should have JWT_SECRET defined", () => {
  expect(process.env.SECRET_KEY).toBeDefined();
});

describe("Auth", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "testuser",
      password: "testpassword",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "User created successfully");
  });

  it("should login successfully", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: "testuser",
      password: "testpassword",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });
});

describe("Properties", () => {
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

describe("Tenants", () => {
  const newTenant = {
    name: "John Dada",
    contact: "john@dada.com",
    sectionOccupied: "A1",
    propertyId: 1,
  };

  it("should create a new tenant", async () => {
    const res = await request(app)
      .post("/api/tenants")
      .set("Authorization", `Bearer ${token}`)
      .send(newTenant);
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
  });

  const newTenantData = {
    name: "John Dada",
    contact: "john@dada.com",
    sectionOccupied: "A1",
    propertyId: 1,
  };

  const updatedTenantData = {
    name: "Jane Dada",
    contact_details: "jane@dada.com",
    sectionOccupied: "B2",
    propertyId: 1,
  };

  it("should update tenant details", async () => {
    const rest = await request(app)
      .post("/api/tenants")
      .set("Authorization", `Bearer ${token}`)
      .send(newTenantData);

    const tenantId = rest.body.id;

    const res = await request(app)
      .put(`/api/tenants/${tenantId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedTenantData);
    expect(res.statusCode).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
    await request(app)
      .delete(`/tenants/${tenantId}`)
      .set("Authorization", `Bearer ${token}`);
  });

  it("should faild updating the tenant that dosent existe", async () => {
    const res = await request(app)
      .put(`/api/tenants/10000`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedTenantData);
    expect(res.statusCode).toBe(404);
    expect(res.body).toBeInstanceOf(Object);
  });

  it("should fails updating becouse of invalid data", async () => {
    const rest = await request(app)
      .post("/api/tenants")
      .set("Authorization", `Bearer ${token}`)
      .send(newTenantData);

    const tenantId = rest.body.id;
    const res = await resquest(app)
      .put(`/api/tenants/${tenantId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "",
        contact_details: "not-an-email",
        unit: "B1",
      });
  });
});
