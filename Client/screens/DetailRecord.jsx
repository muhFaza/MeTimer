import React, { useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Card, Chip, Title, Paragraph, Button } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { useMainStore } from "../stores/mainStore";

export default function DetailRecord({ navigation }) {
  const { id } = useRoute().params;
  const recordDetail = useMainStore((state) => state.recordDetail);
  const responseDetail = useMainStore((state) => state.responseDetail);

  const getRecordDetail = useMainStore((state) => state.getRecordDetail);

  useEffect(() => {
    console.log(id, "ini id params");
    getRecordDetail(id);
  }, []);

  function formatISODateToRegularDate(isoDate) {
    const date = new Date(isoDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  function toMindfulness() {
    navigation.navigate("HowToMindfulness");
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ marginBottom: 10, alignSelf: "center" }}>
          <Text style={styles.topTitleContent}>Your Journal Detail</Text>
        </View>
        <Card>
          <Card.Content>
            <Title style={{ fontWeight: "bold" }}>
              {recordDetail?.Journal?.title}
            </Title>
            <Paragraph>{recordDetail?.Journal?.content}</Paragraph>
            <View style={styles.moodContainer}>
              <Text style={[styles.dateText, { marginLeft: "auto" }]}>
                {formatISODateToRegularDate(recordDetail?.date)}
              </Text>
            </View>
          </Card.Content>
        </Card>
        <View style={styles.chipContainer}>
          {recordDetail?.moods?.map((mood, index) => (
            <Chip key={index} style={styles.chip}>
              {mood}
            </Chip>
          ))}
        </View>
        <Card style={{ marginTop: 20 }}>
          <Card.Content>
            <Paragraph style={{ fontStyle: "italic" }}>
              {responseDetail.response ? (
                `" ${responseDetail.response} "`
              ) : (
                <ActivityIndicator color="gray" />
              )}
            </Paragraph>
          </Card.Content>
        </Card>
        <Card style={{ marginTop: 20 }}>
          <Card.Content>
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{ fontWeight: "bold", marginBottom: 5, fontSize: 21 }}
              >
                Did you have a less than an enjoyable day?
              </Text>
              <Text style={{ marginTop: 10 }}>Have a nice day!</Text>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <View>
                  <Button
                    mode="contained"
                    color="#8E24AA"
                    onPress={() => toMindfulness()}
                    style={styles.nextButton}
                  >
                    Next
                  </Button>
                </View>

                <View>
                  <Card.Cover
                    source={require("../assets/images/meditation2.png")}
                    style={styles.image}
                  />
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    marginTop: 80,
  },
  moodContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  dateText: {
    color: "#666",
  },
  chipContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-end",
  },
  chip: {
    marginRight: 5,
  },
  card: {
    marginTop: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 21,
    marginTop: 5,
  },
  topTitleContent: {
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    width: 140,
    height: 140,
    marginRight: 20,
    borderRadius: 10,
  },
  nextButton: {
    alignSelf: "flex-start",
    position: "absolute",
    right: -80,
    bottom: 10,
  },
});
