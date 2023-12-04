import React, { memo } from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { Button, Card, TouchableRipple } from "react-native-paper";
import { useMainStore } from "../stores/mainStore";
import { StyleSheet, View } from "react-native";

function MoodButton({ toJournal, navigation }) {
  const moodsRating = useMainStore((state) => state.moodsRating);
  const selectedMood = useMainStore((state) => state.selectedMood);
  const toggleMoodsRating = useMainStore((state) => state.toggleMoodsRating);
  const seletedMood = useMainStore((state) => state.selectedMood);
  return (
    <Card style={styles.card}>
      <View style={styles.iconContainer}>
        {moodsRating.map((el, index) => {
          return (
            <TouchableRipple
              // contentStyle={{ width: 50, height: 50, alignSelf: "center" }}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: 50,
                height: 50,
                marginVertical: 1,
                // backgroundColor: "red",
              }}
              rippleColor='rgba(255, 255, 255, 0.32)'
              onPress={() => {
                toggleMoodsRating(index);
                if (toJournal) {
                  navigation.navigate("JournalPage");
                }
              }}
              key={index + "journal"}
              // icon={({ color, size }) => (
              //   )}
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
            </TouchableRipple>
          );
        })}
      </View>
    </Card>
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
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 13,
    alignItems: "center",
  },
});

export default memo(MoodButton);
