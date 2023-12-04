import { Avatar, Card, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
export default function ChatUser({ text }) {
  return (
    <>
      <View style={styles.userContainer}>
        <Text style={{ textAlign: "right", marginRight: 10 }}>You</Text>
        <Avatar.Image
          size={35}
          source={require("../assets/images/bagasTercinta.jpeg")}
        />
      </View>
      <Card style={styles.userCard}>
        <Card.Content>
          <Text>{text}</Text>
        </Card.Content>
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  userCard: {
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    // margin: 10,
    marginBottom: 10,
    maxWidth: "70%",
    alignSelf: "flex-end",
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },
});
