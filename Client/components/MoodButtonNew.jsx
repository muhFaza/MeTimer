import React, { memo } from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { Card } from "react-native-paper";
import { useMainStore } from "../stores/mainStore";
import { StyleSheet, View, Text } from "react-native";

function MoodButtonNew({ toJournal, navigation }) {
  const moodsRating = useMainStore((state) => state.moodsRating);
  const selectedMood = useMainStore((state) => state.selectedMood);
  const toggleMoodsRating = useMainStore((state) => state.toggleMoodsRating);
  const seletedMood = useMainStore((state) => state.selectedMood);
  return (
    <>
      <View style={styles.iconContainer}>
        {moodsRating.map((el, index) => {
          return (
            <Card
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: 70, // increased from 50
                height: 85, // increased from 65
                marginVertical: 1,
                backgroundColor:
                  moodsRating[index].rating == seletedMood.rating
                    ? "#e1e1e1"
                    : "#ffffff",
              }}
              rippleColor="rgba(255, 255, 255, 0.32)"
              onPress={() => {
                toggleMoodsRating(index);
                if (toJournal) {
                  navigation.navigate("JournalPage");
                }
              }}
              key={index + "journal"}
            >
              <MaterialCommunityIcons
                name={moodsRating[index].emote}
                size={50}
                color={
                  moodsRating[index].rating == seletedMood.rating
                    ? selectedMood.colorWhenPressed
                    : moodsRating[index].color
                }
              />
              <Text style={{ color: "black", textAlign: 'center', fontWeight: 'bold', fontSize: 11 }}>{moodsRating[index].name}</Text>
            </Card>
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  card: {
    marginVertical: 10,
    backgroundColor: "#1d1d1d",
  },
  iconContainer: {
    flex: 1,
    gap: 4,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 13,
    alignItems: "center",
    width: "100%",
  },
});

export default memo(MoodButtonNew);
