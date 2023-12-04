const { ObjectId } = require("mongodb");
const getDB = require("../config/mongodb.config").getDB;

class User {
    static async create(user) {
        try {
            return await getDB().collection("Users").insertOne(user);
        } catch (err) {
            throw err;
        }
    }

    static async findAll() {
        try {
            return await getDB().collection("Users").find().toArray();
        } catch (err) {
            throw err;
        }
    }

    static async findByPk(id) {
        try {
            return await getDB()
                .collection("Users")
                .findOne({ _id: new ObjectId(id) });
        } catch (err) {
            throw err;
        }
    }

    static async findByEmail(email) {
        try {
            return await getDB().collection("Users").findOne({ email });
        } catch (err) {
            throw err;
        }
    }

    static async findById(id) {
        try {
            return await getDB()
                .collection("Users")
                .findOne({ _id: new ObjectId(id) });
        } catch (error) {
            throw error;
        }
    }

    static async findOrCreate(email, data) {
        try {
            const result = await getDB().collection("Users").findOneAndUpdate(
                { email }, // find a document with that email OR username
                { $setOnInsert: data }, // use $setOnInsert operator to insert data only on creation
                { upsert: true, returnOriginal: false }
            );

            // INTINYA: Kalo user udh ada, return bakalan null. maka dari itu di find lagi biar bisa return id nya
            // Kalo belum ada, return nya bakal object user nya yg ketemu, maka aku return 0
            // Biar kyk sequelize
            if (result === null) {
                const newUser = await getDB().collection("Users").findOne({ email });
                return newUser._id;
            } else {
                return 0;
            }
        } catch (err) {
            console.log("An error occurred:", err);
            throw err;
        }
    }

    static async update(id, user) {
        try {
            return await getDB()
                .collection("Users")
                .updateOne({ _id: new ObjectId(id) }, { $set: user });
        } catch (err) {
            throw err;
        }
    }

    static async destroy(id) {
        try {
            return await getDB()
                .collection("Users")
                .deleteOne({ _id: new ObjectId(id) });
        } catch (err) {
            throw err;
        }
    }
}

module.exports = User;
