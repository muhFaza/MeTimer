import { SafeAreaView, View, Text, StyleSheet } from "react-native";

export default function PracticeMindfulness() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 15 }}>
        <Text style={styles.titleContent}>How to Practice Mindfulness</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>
            - Mindful Breathing Exercises:
          </Text>
          <Text style={styles.contentDescription}>
            Take a few minutes each day to focus on your breath. Sit or lie down
            comfortably, close your eyes, and pay attention to your breath as
            you inhale and exhale. This simple exercise can help calm the mind
            and increase awareness of the present moment.
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>- Guided Meditation Apps:</Text>
          <Text style={styles.contentDescription}>
            Explore mindfulness meditation apps that offer guided sessions. Apps
            like Headspace, Calm, or Insight Timer provide a variety of guided
            meditations for different purposes, such as stress reduction, better
            sleep, or increased focus.
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>- Body Scan Meditation:</Text>
          <Text style={styles.contentDescription}>
            Practice body scan meditations to bring awareness to different parts
            of your body. Lie down or sit comfortably, and slowly focus on each
            part of your body, paying attention to sensations without judgment.
            This can help release tension and promote relaxation.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    marginTop: 80,
  },
  titleContent: {
    fontSize: 24,
    fontWeight: "500",
    letterSpacing: 0.8,
    marginTop: 30,
  },
  content: {
    fontSize: 16,
    lineHeight: 21,
    marginTop: 5,
  },
  contentContainer: {
    marginTop: 20,
  },
  contentDescription: {
    fontSize: 16,
    lineHeight: 21,
    marginTop: 5,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
});
