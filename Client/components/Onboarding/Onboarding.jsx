import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  TouchableOpacity,
} from "react-native";

import OnboardingItem from "./OnboardingItem";
import Pagination from "./Pagination";
import slides from "./slides";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default Onboarding = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [endPage, setEndPage] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);

    // IF IT REACHED THE END OF THE SLIDES
    if (viewableItems[0].index === slides.length - 1) {
      setEndPage(true);
    } else {
      setEndPage(false);
    }
  }).current;

  function skip () {
    // Token Cemonk
    // AsyncStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWI2OGYwNTg0YmFkZDYxMzhmYjcwYyIsImVtYWlsIjoiY21ua0BtYWlsLmNvbSIsImlhdCI6MTcwMDQ4OTQ3M30.VqXwCYx7AyeZBZUpiCQJG_vWH-OD991_y-VGMmss0UE");

    // Token Gery
    AsyncStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWI0MDM0NTg0YmFkZDYxMzQ3MGNiZCIsImVtYWlsIjoiZ2VyeWp1bmlhcnRvQGdtYWlsLmNvbSIsImlhdCI6MTcwMDU1MDI3NX0.psIfsv_TT7-FNZi_GfaXHS68Q8OJwfDNl8dOwIXHQPk");
    navigation.replace("LandingPageTabs")
  }

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.85 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>

      {/* FOOTER */}
      <View style={(styles.footerContainer, { borderColor: "blue" })}>
        <View style={styles.pagination}>

          {/* PRESS PAGINATION TO SKIP */}
          <TouchableOpacity onPress={skip}>
            <Pagination data={slides} scrollX={scrollX} />
          </TouchableOpacity>
        </View>
        <Button
          mode="contained"
          onPress={() => {
            if (endPage) {
              return navigation.navigate("SignupPage");
            }
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
          }}
          style={styles.button}
          labelStyle={styles.text}
          //   disabled={!endPage}
        >
          Next
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 16,
  },
  button: {
    paddingHorizontal: 0,
    // marginLeft: 250,
    marginLeft: "70%",
  },
  pagination: {
    position: "absolute",
    top: 13,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
