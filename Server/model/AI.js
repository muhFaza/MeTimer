const path = require("path");
const fs = require("fs");
const { getDB } = require("../config/mongodb.config");
const openai = require("../config/openai.config");
const { ObjectId } = require("mongodb");

class AI {
    static async generateQuote(mood = "mindfulness") {
        try {
            mood = mood === "mindfulness" ?? mood.join(", ");

            const prompt = `write me a a motivational quotes when in ${mood} moods.`;

            const response = await openai.completions.create({
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 2048,
                temperature: 1
            });

            const quoteResponse = response.choices[0].text.replace(/\n\n/, "");

            // mencari quote apakah ada di database jika ada return hasil di database
            const findQuote = await getDB().collection("Quotes").findOne({ quote: quoteResponse });
            if (findQuote) return findQuote;

            const voiceResponse = await openai.audio.speech.create({
                model: "tts-1",
                voice: "alloy",
                input: quoteResponse
            });

            // create mp3 file to public static path
            const fileVoiceName = `${quoteResponse.split(" ")[0].replace('"', "")}-${quoteResponse.split(" ")[1]}-${
                quoteResponse.split(" ")[2]
            }-${new Date().getTime()}.mp3`;
            const pathVoiceName = path.join(__dirname + "/../public/music/" + fileVoiceName);
            const bufferVoice = Buffer.from(await voiceResponse.arrayBuffer());
            await fs.promises.writeFile(pathVoiceName, bufferVoice);

            // create data in database
            const insertData = { quote: quoteResponse, voiceFile: fileVoiceName };
            await getDB().collection("Quotes").insertOne(insertData);

            return insertData;
        } catch (error) {
            throw { name: "RateLimitError", message: "Limit Error", error };
        }
    }

    static async journalResponse(journalContent) {
        try {
            const prompt = `give me a 1 or 2 sentence motivational human response about this journal "${journalContent}".`;

            const response = await openai.completions.create({
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 2048,
                temperature: 1
            });
            const journalResponse = response.choices[0].text.replace(/\n\n/, "");
            return journalResponse;
        } catch (error) {
            throw { name: "RateLimitError", message: "Limit Error", error };
        }
    }

    static async responseChatAI(chat, id) {
        try {
            const prompt = `I want you to act a psychologist. i will provide you my thoughts. i want you to give me scientific suggestions that will make me feel better.  i want you to give response maximum 4 sentences. my thought "${chat}"`;
            const response = await openai.completions.create({
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 2048,
                temperature: 1
            });
            const chatResponse = response.choices[0].text.replace(/\n\n/, "");
            await getDB()
                .collection("ChatLogs")
                .insertOne({ question: chat, answer: chatResponse, userId: new ObjectId(id), date: new Date() });
            const chatLogs = await getDB()
                .collection("ChatLogs")
                .find({ userId: new ObjectId(id) })
                .sort({ date: 1 })
                .toArray();
            return chatLogs;
        } catch (error) {
            throw { name: "RateLimitError", message: "Limit Error", error };
        }
    }

    static async getChatAI(id) {
        try {
            const chatLogs = await getDB()
                .collection("ChatLogs")
                .find({ userId: new ObjectId(id) })
                .sort({ date: 1 })
                .toArray();
            return chatLogs;
        } catch (error) {
            throw { name: "RateLimitError", message: "Limit Error", error };
        }
    }
}

module.exports = AI;
