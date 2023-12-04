const Record = require("../model/Record");

class RecordController {
  static async createRecord(req, res, next) {
    try {
      const data = req.body;
      const { id } = req.user;
      const response = await Record.create(data, id);
      res.status(201).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  static async getRecords(req, res, next) {
    const { id } = req.user;
    try {
      const records = await Record.findAll(id);
      res.json(records);
    } catch (error) {
      console.log(error);
    }
  }
  static async getRecordById(req, res, next) {
    const { recordId } = req.params;
    try {
      const record = await Record.findById(recordId);
      res.send(record);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = RecordController;
