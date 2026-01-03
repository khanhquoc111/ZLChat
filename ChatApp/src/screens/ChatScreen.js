import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { socket } from '../api/socket';
import { supabase } from '../api/supabase';
import { styles } from './ChatScreen.styles';

export default function ChatScreen({ user }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    socket.connect();
    socket.on('receive_message', (newMessage) => {
      setMessages((prev) => [newMessage, ...prev]);
    });
    return () => {
      socket.off('receive_message');
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (text.trim().length === 0) return;
    socket.emit('send_message', {
      room_id: "777610be-096d-472e-8367-1725b79313f8",
      sender_id: user.id,
      text_content: text,
      message_type: 'text'
    });
    setText('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.userInfo}>Chào, {user.email}</Text>
        <TouchableOpacity onPress={() => supabase.auth.signOut()}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <FlatList
          data={messages}
          renderItem={({ item }) => {
            const isMine = item.sender_id === user.id;
            return (
              <View style={[styles.messageBox, isMine ? styles.myMessage : styles.theirMessage]}>
                <Text style={isMine ? styles.myText : styles.theirText}>{item.text_content}</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          inverted
          contentContainerStyle={{ padding: 10 }}
        />
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} value={text} onChangeText={setText} placeholder="Nhập tin nhắn..." />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Gửi</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}