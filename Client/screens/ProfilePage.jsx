import React from "react";
import { View, Text, Image, SafeAreaView, StyleSheet } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { useMainStore } from "../stores/mainStore";

export default function ProfilePage({ navigation }) {
  const logout = useMainStore((state) => state.logout)
  const userData = {
    profilePicture: require("../assets/images/bagasTercinta.jpeg"),
    email: "bagas@gmail.com",
    firstName: "Bagas",
    lastName: "Ganteng",
  };

  const handleLogout = async () => {
    try {
        logout()
        navigation.replace("LoginPage")
    } catch (error) {
        console.log(error)
    }
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Avatar.Image size={150} source={userData.profilePicture} />
        <Text style={styles.userName}>{`${userData.firstName} ${userData.lastName}`}</Text>
        <Text style={styles.userEmail}>Email: {userData.email}</Text>
        <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>
          Logout
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    alignItems: "center",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  logoutButton: {
    marginTop: 10,
  },
});
