require("dotenv").config();
const { getDB, connectDB } = require("../config/mongodb.config");
const { ObjectId } = require("mongodb");
const {Journal} = require('../model');
const JournalController = require('../controllers/JournalController');

let RecordId, token, JournalId;

beforeAll(async () => {
  await connectDB()
  
  await getDB().collection('Journals').deleteMany({});
  await getDB().collection('Users').deleteMany({});
  await getDB().collection('Records').deleteMany({});


  // Register a user
  const registerResponse = await request(app)
    .post('/register')
    .send({ email: 'test@example.com', password: 'password123' });

    console.log(registerResponse.body, 'ini registerResponse.body');
  // Login the user
  const loginResponse = await request(app)
    .post('/login')
    .send({ email: 'test@example.com', password: 'password123' });

  token = loginResponse.body.access_token;

  // Create a record
  const recordResponse = await request(app)
    .post('/records')
    .set('access_token', loginResponse.body.access_token)
    .send({
      rateMood: 4,
      moods: ["Happy"],
      title: "Meet a lady of my life",
      content: "Today im very happy because i met her"
    });

  RecordId = recordResponse.body.insertedId;
  console.log(recordResponse.body, 'ini recordResponse.body');
  console.log(RecordId, token, 'ini RecordId dan token');

  // Get journalId from record
  const getRecord = await request(app)
    .get('/records')
    .set('access_token', loginResponse.body.access_token);
  
  JournalId = getRecord.body[0].journalId
  console.log(JournalId, 'ini JournalId');
}, 10000);


const request = require('supertest');
const app = require('../app.js'); // adjust this path to your Express app file

describe('GET /journals/:id', () => {
  it('should return a journal with _id, title, and content', async () => {

    const response = await request(app)
      .get(`/journals/${JournalId}`)
      .set('Authorization', `Bearer ${token}`)
      .set('access_token', token);

      console.log(response.body, 'ini response.body dari test');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(typeof response.body._id).toBe('string');
    expect(response.body).toHaveProperty('title');
    expect(typeof response.body.title).toBe('string');
    expect(response.body).toHaveProperty('content');
    expect(typeof response.body.content).toBe('string');
  }, 20000);

  // it should return 404 and null when journal is not found

  it('should return 404 and null when journal is not found', async () => {
    const response = await request(app)
      .get(`/journals/655d910a3b231e3453469999`)
      .set('access_token', token);

    expect(response.body).toBe(null);
  });
});

describe('POST /journalResponse', () => {
  it('should return an object with a response key', async () => {
    const response = await request(app)
      .post('/journalResponse')
      .set('access_token', token)

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('response');
    expect(typeof response.body.response).toBe('string');
  });
});