const { ObjectId } = require("mongodb");
const { getDB } = require("../config/mongodb.config");
const Journal = require("./Journal");

class Record {
    static async create(data, userId) {
        const { rateMood, moods, title, content } = data;
        try {
            const journalId = await Journal.create(title, content);
            const record = await getDB()
                  .collection("Records")
                .insertOne({ rateMood, moods, journalId: new ObjectId(journalId), date: new Date(), userId: new ObjectId(userId) });
            return record;
        } catch (error) {
            throw error;
        }
    }

    static async findAll(id) {
        try {
            const records = await getDB()
                .collection("Records")
                .aggregate([
                    {
                        $match: {
                            userId: new ObjectId(id)
                        }
                    },
                    {
                        $lookup: {
                            from: "Journals",
                            localField: "journalId",
                            foreignField: "_id",
                            as: "Journal"
                        }
                    },
                    {
                        $sort: {
                            date: -1
                        }
                    }
                ]);
            return await records.toArray();
        } catch (error) {
            throw error;
        }
    }

    static async findById(recordId) {
        try {
            const record = await getDB()
                .collection("Records")
                .findOne({ _id: new ObjectId(recordId) });

            const journal = await Journal.findById(record.journalId);
            record.Journal = journal;
            return record;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Record;
