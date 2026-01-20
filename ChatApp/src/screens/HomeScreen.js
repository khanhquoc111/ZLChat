import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./HomeScreen.styles";
import BottomTabs from "../components/BottomTabs";

// Dữ liệu mẫu
const ACTIVE_USERS = [
  { id: "1", name: "You", isMe: true },
  { id: "2", name: "Alex" },
  { id: "3", name: "Jordan" },
  { id: "4", name: "Taylor" },
  { id: "5", name: "Casey" },
];

const RECENT_CHATS = [
  {
    id: "1",
    name: "Alex",
    lastMsg: "See you at 8! 🍕",
    time: "2m ago",
    unread: 2,
  },
  {
    id: "2",
    name: "Jordan",
    lastMsg: "Sent a photo",
    time: "1h ago",
    unread: 0,
  },
  {
    id: "3",
    name: "Taylor",
    lastMsg: "The project is done. I will send it...",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: "4",
    name: "Casey",
    lastMsg: "Can you hop on a quick call?",
    time: "Tue",
    unread: 0,
  },
  {
    id: "5",
    name: "Morgan",
    lastMsg: "That's hilarious! 😂",
    time: "Mon",
    unread: 0,
  },
];

export default function HomeScreen({ navigation, route }) {
  const { user } = route.params;
  const [searchText, setSearchText] = useState("");

  // Render từng item trong danh sách hội thoại
  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>
        navigation.navigate("Chat", { user, partnerName: item.name })
      }
    >
      <View style={styles.chatAvatar}>
        <Ionicons name="person" size={30} color="#BDC3C7" />
        {item.unread > 0 && <View style={styles.onlineDot} />}
      </View>
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <View style={styles.chatFooter}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMsg}
          </Text>
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="grid-outline" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      {/* 2. Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* 3. Horizontal Stories (Active Users) */}
      <View style={styles.storiesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {ACTIVE_USERS.map((item) => (
            <View key={item.id} style={styles.storyItem}>
              <View
                style={[
                  styles.avatarContainer,
                  {
                    borderColor: item.isMe ? "#D1D5DB" : "#3577F1",
                    borderStyle: item.isMe ? "dashed" : "solid",
                  },
                ]}
              >
                <View style={styles.avatar}>
                  <Ionicons
                    name={item.isMe ? "add" : "person"}
                    size={item.isMe ? 30 : 25}
                    color={item.isMe ? "#3577F1" : "#BDC3C7"}
                  />
                </View>
                {!item.isMe && <View style={styles.onlineDot} />}
              </View>
              <Text style={styles.storyName}>{item.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* 4. Conversation List */}
      <FlatList
        data={RECENT_CHATS}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        style={styles.chatList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* 5. Bottom Navigation Bar */}
      {/* <BottomTabs navigation={navigation} currentRoute="Home" /> */}
    </SafeAreaView>
  );
}
