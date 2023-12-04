import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moodsRatingInitial from "../data/moodsRatingInitial";
import emotions from "../data/emotions.json";

const serverUrl = "https://movies.gjuniarto.com";

export const useMainStore = create((set) => ({
  serverUrl: "https://movies.gjuniarto.com",
  loading: false,
  chatLoading: false,
  headers: [],
  quote: [],
  records: [],
  recordDetail: {},
  recordChart: [],
  responseDetail: {
    response: "Waiting for response...",
  },
  journalResponse: {},
  userDetail: {},
  moodsRating: moodsRatingInitial,
  selectedMood: {
    emote: "emoticon-cool-outline",
    rating: 6,
    color: "#52a0a6",
    pressed: false,
    colorWhenPressed: "#52a0a6",
    topText: "How are you feeling today?",
  },
  chipsData: emotions,
  chatLogs: [],
  toggleChips: (rating, chip) => {
    set((state) => {
      const newChipsData = { ...state.chipsData };
      newChipsData[rating][chip] = !newChipsData[rating][chip];
      return { chipsData: newChipsData };
    });
  },
  specialSetter: (key, payload) => {
    set((state) => {
      return { [key]: payload };
    });
  },
  toggleMoodsRating: (idx) => {
    set((state) => {
      const newMoodsRating = state.moodsRating.map((mood, index) => {
        if (idx === index) {
          mood.pressed = !mood.pressed;
        } else {
          mood.pressed = false;
        }
        return mood;
      });
      return { moodsRating: newMoodsRating, selectedMood: newMoodsRating[idx] };
    });
  },
  getQuote: async () => {
    try {
      const { data: response } = await axios({
        url: `${serverUrl}/quotes`,
        method: "GET",
        headers: {
          access_token: await AsyncStorage.getItem("token"),
        },
      });
      console.log(response);
      set({ quote: response });
    } catch (error) {
      throw error;
    }
  },

  login: async ({ email, password }) => {
    try {
      set({ loading: true });
      console.log(email, password);
      const { data: response } = await axios.post(`${serverUrl}/login`, {
        email,
        password,
      });

      await AsyncStorage.setItem("token", response.access_token);
    } catch (error) {
      console.log(error.response, "register main store");
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  loadHomepage: async () => {
    try {
      const { data: records } = await axios.get(`${serverUrl}/records`, {
        headers: { access_token: await AsyncStorage.getItem("token") },
      });
      console.log(records, "getRecord Log");
      set({ records, recordChart: records.map((el) => el.rateMood) });

      const moods = records.length ? records[0].moods : 0;
      console.log(moods, "ini moods");
      const { data: quotes } = await axios({
        url: `${serverUrl}/quotes`,
        method: "post",
        data: {
          moods,
        },
        headers: {
          access_token: await AsyncStorage.getItem("token"),
        },
      });
      console.log(quotes, "ini quotes");
      set({ quote: [quotes] });
      let journalResponse;
      if (records.length !== 0) {
        console.log(journal_content, "ini Journal content");
        const journal_content = records[0].Journal[0].content;
        const { data } = await axios({
          method: "post",
          url: `${serverUrl}/journalResponse`,
          data: {
            journal_content,
          },
          headers: { access_token: await AsyncStorage.getItem("token") },
        });
        journalResponse = data;
        set({ journalResponse });
      }
      set({ headers: [quotes, journalResponse] });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  register: async (data) => {
    try {
      const res = await axios.post(`${serverUrl}/register`, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });
      console.log(res);
    } catch (error) {
      console.log(error.response, "register main store");
      throw error;
    }
  },
  postJournal: async (data) => {
    try {
      await axios.post(`${serverUrl}/records`, data, {
        headers: { access_token: await AsyncStorage.getItem("token") },
      });
      console.log("success post data");
    } catch (error) {
      throw error;
    }
  },
  getRecords: async () => {
    try {
      const { data: response } = await axios.get(`${serverUrl}/records`, {
        headers: { access_token: await AsyncStorage.getItem("token") },
      });
      console.log(response, "getRecord Log");
      set({
        records: response,
        recordChart: response.map((el) => el.rateMood),
      });
    } catch (error) {
      throw error;
    }
  },
  getJournalResponse: async (journal_content) => {
    try {
      const { data: journalResponse } = await axios({
        method: "post",
        url: `${serverUrl}/journalResponse`,
        data: {
          journal_content,
        },
        headers: { access_token: await AsyncStorage.getItem("token") },
      });
      set({ journalResponse });
    } catch (error) {
      console.log(error.response.data);
      throw error;
    }
  },
  getChatLogs: async () => {
    try {
      set({ chatLoading: true });
      const { data: chatLogs } = await axios.get(`${serverUrl}/chatLogs`, {
        headers: { access_token: await AsyncStorage.getItem("token") },
      });
      set({ chatLogs });
    } catch (error) {
      console.log(error);
    } finally {
      set({ chatLoading: false });
    }
  },
  postChatLogs: async (chat) => {
    try {
      const { data: chatLogs } = await axios.post(
        `${serverUrl}/chatLogs`,
        { chat },
        { headers: { access_token: await AsyncStorage.getItem("token") } }
      );
      set({ chatLogs });
    } catch (error) {
      console.log(error);
    }
  },

  getRecordDetail: async (id) => {
    try {
      const { data: recordDetail } = await axios.get(
        `${serverUrl}/records/${id}`,
        { headers: { access_token: await AsyncStorage.getItem("token") } }
      );
      console.log(recordDetail);
      set({ recordDetail });

      const { data: responseDetail } = await axios({
        method: "post",
        url: `${serverUrl}/journalResponse`,
        data: {
          journal_content: recordDetail.Journal.content,
        },
        headers: { access_token: await AsyncStorage.getItem("token") },
      });
      set({ responseDetail });
    } catch (error) {
      console.log(error);
    }
  },

  getUserDetail: async () => {
    try {
      const { data: userDetail } = await axios.get(`${serverUrl}/users`, {
        headers: { access_token: await AsyncStorage.getItem("token") },
      });
      set({ userDetail });
    } catch (error) {
      console.log(error);
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem("token");
    } catch (error) {
      console.log(error);
    }
  },
}));
