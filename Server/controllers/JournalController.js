const Journal = require("../model/Journal");

class JournalController {
  static async findById(req, res, next) {
    const { id } = req.params;
    try {
      const journal = await Journal.findById(id);
      res.json(journal);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = JournalController;
