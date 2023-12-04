const { AI } = require("../model");

class AIController {
    static async generateQuote(req, res, next) {
        const { mood } = req.body;
        try {
            const quote = await AI.generateQuote(mood);
            res.status(201).json(quote);
        } catch (error) {
            next(error);
        }
    }

    static async journalResponse(req, res, next) {
        const { journal_content } = req.body;
        try {
            const journalResponse = await AI.journalResponse(journal_content);
            res.status(200).json({ response: journalResponse });
        } catch (error) {
            next(error);
        }
    }

    static async postChatAI(req, res, next) {
        const { id } = req.user;
        const { chat } = req.body;
        try {
            const chatLogs = await AI.responseChatAI(chat, id);
            res.status(201).json(chatLogs);
        } catch (error) {
            next(error);
        }
    }

    static async getChatLogs(req, res, next) {
        const { id } = req.user;
        try {
            const chatLogs = await AI.getChatAI(id);
            res.send(chatLogs);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AIController;
