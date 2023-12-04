import { useEffect, useState, useRef } from "react";
import { StyleSheet, ScrollView, View, Alert, Platform } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Calendar from "expo-calendar";
import MoodButton from "../components/MoodButton";
import { useMainStore } from "../stores/mainStore";
import MoodChips from "../components/MoodChips";
import MoodButtonNew from "../components/MoodButtonNew";

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

async function createCalendar(playdate, teamname, location, diaryEntry) {
  console.log(playdate, teamname, location, diaryEntry, "<<<<<<<");

  const defaultCalendarSource =
    Platform.OS === "ios"
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: "CalendarName" };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: "CalendarName",
    color: "red",
    timeZone: "GMT+1",
    status: Calendar.EventStatus.CONFIRMED,
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: "internalCalendarName",
    ownerAccount: "personal",
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });

  console.log(`Your new calendar ID is: ${newCalendarID}`);
  Alert.alert(`Your text in your diary.`);

  await Calendar.createEventAsync(newCalendarID, {
    title: "Todo or Reminder Title",
    startDate: new Date(playdate),
    endDate: new Date(playdate),
    timeZone: "GMT+1",
    location: location,
    alarms: [{ relativeOffset: -15 }],
    status: Calendar.EventStatus.CONFIRMED,
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
}

export default function CalendarPage({ navigation }) {
  const [diaryTitle, setDiaryTitle] = useState("");
  const [diaryEntry, setDiaryEntry] = useState("");
  const [diaryEntries, setDiaryEntries] = useState([]);
  const selectedMood = useMainStore((state) => state.selectedMood);
  const chipsData = useMainStore((state) => state.chipsData);
  const postJournal = useMainStore((state) => state.postJournal);
  const loadHomepage = useMainStore((state) => state.loadHomepage);
  const [isLoading, setIsLoading] = useState(false);

  const journalContent = useRef();

  useEffect(() => {
    async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        console.log("calendar access granted");
      }
    };
  }, []);

  const saveDiaryEntry = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    setDiaryEntries([
      ...diaryEntries,
      { date: formattedDate, entry: diaryEntry },
    ]);

    // createCalendar(currentDate, "Team Name", "Indonesia", diaryEntry);
    Alert.alert(`mantap mas`);
    setDiaryEntry("");
  };

  async function submitJournal() {
    try {
      setIsLoading(true);
      const rateMood = selectedMood.rating;
      const moods = Object.keys(chipsData[rateMood]).filter(
        (key) => chipsData[rateMood][key] === true
      );
      const title = diaryTitle;
      const content = diaryEntry;
      const data = { rateMood, moods, title, content };

      await postJournal(data);
      await loadHomepage();
      navigation.navigate("LandingPageTabs");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        {/* TOP TEXT */}
        <View style={styles.topTextContainer}>
          <Text style={styles.topText}>{selectedMood.topText}</Text>
        </View>

        {/* MOOD EMOTE BUTTONS */}
        <MoodButtonNew toJournal={false} navigation={navigation} />

        {/* MOOD CHIPS */}
        <MoodChips />

        <Text style={{ marginBottom: 5, fontSize: 16, marginTop: 20 }}>
          Describe what happened today..
        </Text>

        {/* JOURNAL TITLE */}
        <TextInput
          style={[styles.input]}
          placeholder="The day I met my best friend"
          numberOfLine={1}
          returnKeyType="next"
          value={diaryTitle}
          mode="outlined"
          onChangeText={(text) => setDiaryTitle(text)}
          onSubmitEditing={() => journalContent.current.focus()}
          blurOnSubmit={false}
          label="Title"
          placeholderTextColor="#a0a0a0"
        />

        {/* JOURNAL CONTENT */}
        <TextInput
          ref={journalContent}
          style={[styles.input]}
          multiline
          numberOfLines={6}
          placeholder="What's happening today?"
          returnKeyType="default"
          value={diaryEntry}
          mode="outlined"
          onChangeText={(text) => setDiaryEntry(text)}
          label="Journal Entry"
          placeholderTextColor="#a0a0a0"
        />

        <Button mode="contained" onPress={submitJournal} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save to Diary"}
        </Button>

        {diaryEntries.map((entry) => (
          <View key={entry.date} style={styles.diaryEntry}>
            <Text>{entry.date}</Text>
            <Text>{entry.entry}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 15,
  },
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 10,
  },
  input: {
    minHeight: Platform.OS === "ios" ? 150 : 0,
    maxHeight: Platform.OS === "ios" ? 150 : null,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    color: "white",
    padding: 10,
    textAlign: "center",
    marginBottom: 10,
  },
  diaryEntry: {
    marginBottom: 10,
  },
  chipWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  chip: {
    minWidth: 10,
    alignSelf: "flex-start",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 25,
    width: "100%",
    marginLeft: 7,
    marginBottom: 20,
  },
});
