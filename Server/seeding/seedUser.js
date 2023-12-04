const { MongoClient, ObjectId } = require("mongodb");
const Helper = require("../helper/helper");

const uri = "mongodb://127.0.0.1:27017/";

const client = new MongoClient(uri);

let database = {};

async function connectDB() {
    try {
        await client.connect();
        database = client.db("MeTimer");
        console.log("Database connected successfully");
        const isExist = await database.collection("Users").find().toArray();
        if (isExist.length) {
            return console.log("Database already has users in it");
        }
        const users = require("./users.json").map((user) => {
            user._id = new ObjectId(user._id.$oid);
            user.createdAt = new Date(user.createdAt.$date);
            user.updatedAt = new Date(user.updatedAt.$date);
            user.password = Helper.hashPassword(user.password);
            return user;
        });
        await database.collection("Users").insertMany(users);
        console.log("Users inserted successfully");
        return database;
    } catch (err) {
        console.log("Error connecting to database", err);
    } finally {
        await client.close();
    }
}

connectDB();
