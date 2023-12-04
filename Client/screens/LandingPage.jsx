import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Platform,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useMainStore } from "../stores/mainStore";
import MyCard from "../components/CardPage";
import MoodButton from "../components/MoodButton";
import CardHistory from "../components/CardHistory";
import Chart from "../components/Chart";
import MoodButtonNew from "../components/MoodButtonNew";

export default function LandingPage({ navigation }) {
  const loadHomepage = useMainStore((state) => state.loadHomepage);
  const records = useMainStore((state) => state.records);
  const headers = useMainStore((state) => state.headers);

  // mendapatkan records setelah itu baru quote dan journalResponse dari records index ke 0

  useEffect(() => {
    loadHomepage();
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadHomepage().then(() => setRefreshing(false));
  }, []);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.contentContainer}>
          {/* TOP TITLE */}
          <Text
            style={[
              Platform.OS === "ios" ? styles.iosText : styles.androidText,
              { paddingVertical: 15, fontWeight: "bold" },
            ]}
          >
            Me Timer
          </Text>

          {/* DATE */}
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{formattedDate}</Text>
          </View>

          {/* MOOD TITLE */}
          <Text
            style={Platform.OS === "ios" ? styles.iosText : styles.androidText}
          >
            How are you feeling today?
          </Text>

          {/* MOOD EMOTE BUTTONS */}
          {/* <MoodButton toJournal={true} navigation={navigation} /> */}
          <MoodButtonNew toJournal={true} navigation={navigation} />

          {/* QUOTES HORIZONTAL */}
          <FlatList
            style={{ paddingTop: 10 }}
            data={headers || []}
            renderItem={({ item, index }) => (
              <MyCard item={item} index={index} />
            )}
            horizontal={true}
            contentContainerStyle={styles.flatListContainer}
            pagingEnabled={true}
          />
          {headers.length == 0 && (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              hidesWhenStopped={true}
              animating={headers.length === 0}
              style={{ marginBottom: 20 }}
            />
          )}

          {/* CHART */}
          <Chart />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 25,
    width: "100%",
    marginLeft: 7,
  },
  contentContainer: {
    marginHorizontal: 16,
  },
  flatListContainer: {
    // paddingRight: 16,
  },
  iosText: {
    paddingTop: 15,
    paddingLeft: 13,
    fontFamily: "Helvetica",
    fontSize: 22,
    fontWeight: "bold",
  },
  androidText: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "bold",
  },
  dateContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
  },
});
