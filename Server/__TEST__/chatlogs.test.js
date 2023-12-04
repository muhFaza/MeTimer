const request = require("supertest");
const app = require("../app.js");
const { getDB, connectDB } = require("../config/mongodb.config");

let token;

beforeAll(async () => {
  // await request(app).delete("/deleteAll/record");
  // await request(app).delete("/deleteAll/user");
  // await request(app).delete("/deleteAll/journal");
  await connectDB()
  await getDB().collection('Users').deleteMany({});

  // Register a user
  const registerResponse = await request(app)
    .post("/register")
    .send({ email: "test@example.com", password: "password123" });

  // Login the user
  const loginResponse = await request(app)
    .post("/login")
    .send({ email: "test@example.com", password: "password123" });

  token = loginResponse.body.access_token;
}, 10000);

describe("POST /chatLogs", () => {
  it("should return chat logs", async () => {
    const response = await request(app)
      .post("/chatLogs")
      .set("access_token", token)
      .send({ chat: "I feel good, give only 1 sentence respond" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          question: expect.any(String),
          answer: expect.any(String),
          userId: expect.any(String),
          date: expect.any(String),
        }),
      ])
    );
  });
});

describe("GET /chatLogs", () => {
  it("should return chat logs", async () => {
    const response = await request(app)
      .get("/chatLogs")
      .set("access_token", token);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.any(String),
          question: expect.any(String),
          answer: expect.any(String),
          userId: expect.any(String),
          date: expect.any(String),
        }),
      ])
    );
  });
});
