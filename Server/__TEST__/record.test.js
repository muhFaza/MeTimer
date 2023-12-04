const request = require('supertest');
const app = require('../app'); 
const { Record } = require('../model');
const { getDB, connectDB } = require("../config/mongodb.config");
const { ObjectId } = require('mongodb');


let token, recordId;
beforeAll(async () => {
  await connectDB()
  await getDB().collection('Records').deleteMany({});
  
  // register user
  await request(app).post('/register').send({
    firstName: 'Test',
    lastName: 'User',
    email: 'example@mail.com',
    password: 'password123',
  });

  const resp = await request(app).post('/login').send({
    email: 'example@mail.com',
    password: 'password123',
  });
  
  token = resp.body.access_token;
});

describe('POST /records', () => {
  it('should create a record and return acknowledgement', async () => {
    const response = await request(app)
      .post('/records')
      .set('access_token', token)
      .send({
        "rateMood": 5,
        "moods": ["Happy"],
        "title": "Meet a girl of my life",
        "content": "Today i meet a girl of my life and i get to know her better :)."
      });
    
      recordId = response.body.insertedId;
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      "acknowledged": true,
      "insertedId": expect.any(String)
    });
  });
});

describe('GET /records', () => {
  it('should return a list of records', async () => {
    const response = await request(app)
      .get('/records')
      .set('access_token', token);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        "_id": expect.any(String),
        "rateMood": expect.any(Number),
        "moods": expect.arrayContaining([expect.any(String)]),
        "journalId": expect.any(String),
        "date": expect.any(String),
        "userId": expect.any(String),
        "Journal": expect.arrayContaining([
          expect.objectContaining({
            "_id": expect.any(String),
            "title": expect.any(String),
            "content": expect.any(String)
          })
        ])
      })
    ]));
  });
});

describe('GET /records/:recordId', () => {
  it('should return a specific record', async () => {
    const response = await request(app)
      .get(`/records/${recordId}`)
      .set('access_token', token);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      "_id": expect.any(String),
      "rateMood": expect.any(Number),
      "moods": expect.arrayContaining([expect.any(String)]),
      "journalId": expect.any(String),
      "date": expect.any(String),
      "userId": expect.any(String),
      "Journal": expect.objectContaining({
        "_id": expect.any(String),
        "title": expect.any(String),
        "content": expect.any(String)
      })
    });
  });
});