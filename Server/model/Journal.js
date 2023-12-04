const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongodb.config");

class Journal {
    static async create(title, content) {
        try {
            const { insertedId: journalId } = await getDB().collection("Journals").insertOne({ title, content });
            return journalId;
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        try {
            const journal = await getDB()
                .collection("Journals")
                .findOne({ _id: new ObjectId(id) });
            return journal;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Journal;
