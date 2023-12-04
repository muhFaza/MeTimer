const request = require("supertest");
const app = require("../app.js");
const { getDB, connectDB } = require("../config/mongodb.config");

let token;

beforeAll(async () => {
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

describe("POST /quotes", () => {
  it("should return quotes", async () => {
    const response = await request(app)
      .post("/quotes")
      .set("access_token", token)
      .send({
        mood: ["Depressed", "Lonely", "Hurt"],
      });
    console.log(response.body, "ini response.body");
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      "quote": expect.any(String),
      "voiceFile": expect.any(String),
      "_id": expect.any(String)
    });
  });
});
