import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { TextInput, Button, ActivityIndicator } from "react-native-paper";
import ChatAi from "./ChatAi";
import ChatUser from "./ChatUser";
import { useMainStore } from "../stores/mainStore";

export default function ChatFromAi() {
  //const chatLog = [{question: "How do you do?", answer: "You like me and i like you"}, {question: "Bagaimana bisa ku lupakan?", answer: "anda bisa melupakan dengan cinta"}]
  const chatLog = useMainStore((state) => state.chatLogs);
  const getChatLogs = useMainStore((state) => state.getChatLogs);
  const postChatLogs = useMainStore((state) => state.postChatLogs);
  const [textInput, setTextInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatLoading = useMainStore((state) => state.chatLoading);

  const handleInput = async () => {
    try {
      setLoading(true);
      await postChatLogs(textInput);
      setTextInput("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChatLogs();
  }, []);
  const scrollViewRef = useRef();
  return (
    <KeyboardAvoidingView style={styles.container} behavior="adjustPan">
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View style={{ alignItems: "center" }}>
            {/* TITLE */}
            <Text style={styles.title}>Conseling With AI</Text>

            <ScrollView
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef.current.scrollToEnd({ animated: true })
              }
              style={{ height: "77%", width: "100%" }}
            >
              <View style={{ flexDirection: "column", padding: 10 }}>
                {chatLog.map((el, index) => {
                  return (
                    <View key={index}>
                      <ChatUser text={el.question} />
                      <ChatAi text={el.answer} />
                    </View>
                  );
                })}
              </View>
              {chatLoading && (
                <>
                  <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    hidesWhenStopped={true}
                    animating={chatLoading}
                    style={{ marginBottom: 20 }}
                  />
                </>
              )}
            </ScrollView>
          </View>

          {/* FOOTER */}
          <View style={{ marginBottom: 10, paddingHorizontal: 20 }}>
            <TextInput
              style={styles.input}
              value={textInput}
              mode="outlined"
              onChangeText={(text) => setTextInput(text)}
              placeholder="Ask me anything"
              placeholderTextColor="#a0a0a0"
              returnKeyType="send"
              returnKeyLabel="Send"
              onSubmitEditing={handleInput}
            />
            <Button
              style={styles.button}
              loading={loading}
              disabled={loading}
              onPress={handleInput}
            >
              <Text style={styles.buttonText}>Send Message</Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 20,
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 20,
  },
  input: {
    width: "100%",
    height: 35,
    marginBottom: 10,
    padding: 8,
  },
  button: {
    backgroundColor: "#FFF",
    width: "100%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  bot: {
    fontSize: 16,
  },
});
