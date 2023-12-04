import { Avatar, Card, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

export default function ChatAi({ text }) {
  return (
    <>
      <View style={styles.aiContainer}>
        <Avatar.Image
          size={35}
          source={require("../assets/images/jisoo.jpg")}
        />
        <Text style={{ textAlign: "right", marginLeft: 8 }}>Counsellor</Text>
      </View>
      <Card style={styles.aiCard}>
        <Card.Content>
          <Text>{text}</Text>
        </Card.Content>
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  aiCard: {
    backgroundColor: "#daf7a6",
    borderRadius: 10,
    // margin: 10,
    marginBottom: 10,
    maxWidth: "70%",
    alignSelf: "flex-start",
  },
  aiContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },
});
