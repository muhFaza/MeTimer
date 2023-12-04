import React, { useState, memo } from "react";
import { Chip } from "react-native-paper";
import { useMainStore } from "../stores/mainStore";
import { StyleSheet, View } from "react-native";

const MemoizedChip = memo(Chip);

export default function MoodChips() {
  const chipsData = useMainStore((state) => state.chipsData);
  const selectedMood = useMainStore((state) => state.selectedMood);
  const toggleChips = useMainStore((state) => state.toggleChips);
  const [selectedStates, setSelectedStates] = useState(
    Object.fromEntries(Object.entries(chipsData).map(([key]) => [key, false]))
  );

  return (
    <View style={styles.chipWrapper}>
      {Object.keys(chipsData[selectedMood.rating]).map((chip, index) => (
        <MemoizedChip
          key={index + 'chip'}
          style={chipsData[selectedMood.rating][chip] ? styles.chipSelected : styles.chip}
          mode="outlined"
          onPress={() => {
            toggleChips(selectedMood.rating, chip)
          }}
        >
          {chip}
        </MemoizedChip>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  chipWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
  },
  chip: {
    minWidth: 10,
    alignSelf: "flex-start",
  },
  chipSelected: {
    minWidth: 10,
    alignSelf: "flex-start",
    backgroundColor: "#d18ef0",
  },
});