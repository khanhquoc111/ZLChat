import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { socket } from "../api/socket";
import { supabase } from "../api/supabase";
import { styles } from "./ChatScreen.styles";

export default function ChatScreen({ route, navigation }) {
  const { user, roomId, partnerName } = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.connect();
    socket.emit("join_room", roomId);

    socket.on("receive_message", (newMessage) => {
      if (newMessage.room_id === roomId) {
        setMessages((prevMessages) => [newMessage, ...prevMessages]);
      }
    });

    return () => {
      socket.off("receive_message");
      socket.disconnect();
    };
  }, [roomId]);

  const sendMessage = () => {
    if (text.trim().length === 0) return;
    socket.emit("send_message", {
      room_id: roomId,
      sender_id: user.id,
      text_content: text,
      message_type: "text",
    });
    setText("");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        {/* Quay lại trang chủ */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: "#007AFF" }}>Trở về</Text>
        </TouchableOpacity>

        {/* Hiển thị tên người đang nhắn tin cùng thay vì email của mình */}
        <Text style={styles.userInfo}>Đang chat với: {partnerName}</Text>

        <View style={{ width: 50 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <FlatList
          data={messages}
          renderItem={({ item }) => {
            const isMine = item.sender_id === user.id;
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
          }}
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
  );
}
