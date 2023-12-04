import { SafeAreaView } from "react-native-safe-area-context";

import CardHistory from "../components/CardHistory";
import { useMainStore } from "../stores/mainStore";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function HistoryPage() {
  const records = useMainStore((state) => state.records);

  console.log(records, "ini records historypage");
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.text} variant='titleLarge'>Journals</Text>
          {/* CARD HISTORY */}
          {records?.map((el, index) => (
            <CardHistory key={index + "cardpage"} data={el} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    marginHorizontal: 16,
  },
  text: {
    marginBottom: 15,
    marginTop: 20,
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "bold",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  iosText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  androidText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
});
