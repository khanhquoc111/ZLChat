import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { socket } from "./src/api/socket";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const MY_ID = "41ce4b27-b91f-426c-acb3-5b1d15d5d2ba";

  useEffect(() => {
    socket.connect();
    socket.on("receive_message", (newMessage) => {
      setMessages((prev) => [newMessage, ...prev]);
    });
    return () => {
      socket.off("receive_message");
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (text.trim().length === 0) return;
    const messageData = {
      room_id: "568318b6-79f3-4c79-b95a-b23c9304c857",
      sender_id: MY_ID,
      text_content: text,
      message_type: "text",
    };
    socket.emit("send_message", messageData);
    setText("");
  };

  const renderItem = ({ item }) => {
    const isMine = item.sender_id === MY_ID;
    return (
      <View
        style={[
          styles.messageBox,
          isMine ? styles.myMessage : styles.theirMessage,
        ]}
      >
        <Text style={isMine ? styles.myText : styles.theirText}>
          {item.text_content}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["right", "left", "top"]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            inverted
            contentContainerStyle={{ padding: 10 }}
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={text}
              onChangeText={setText}
              placeholder="Nhập tin nhắn..."
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Gửi</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: "center",
  },
  messageBox: {
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
    maxWidth: "80%",
  },
  myMessage: { alignSelf: "flex-end", backgroundColor: "#007AFF" },
  theirMessage: { alignSelf: "flex-start", backgroundColor: "#e5e5ea" },
  myText: { color: "#fff" },
  theirText: { color: "#000" },
});
