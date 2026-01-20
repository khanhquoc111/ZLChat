import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, SectionList, 
  ActivityIndicator, Alert, ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../api/supabase';
import BottomTabs from '../components/BottomTabs';
import { styles } from './FriendsScreen.styles';

export default function FriendsScreen({ navigation }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [friendSections, setFriendSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setCurrentUser(user);
      fetchFriends(user.id);
      fetchPendingRequests(user.id);
    }
  };

  // --- LOGIC 1: TÌM KIẾM NGƯỜI DÙNG ---
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username, full_name')
      .eq('username', searchQuery.trim())
      .single();

    if (error || !data) {
      Alert.alert('Thông báo', 'Không tìm thấy người dùng');
      setSearchResult(null);
    } else {
      setSearchResult(data);
    }
    setLoading(false);
  };

  const sendRequest = async () => {
    const { error } = await supabase
      .from('friendships')
      .insert([{ sender_id: currentUser.id, receiver_id: searchResult.id, status: 'pending' }]);
    
    if (error) Alert.alert('Lỗi', 'Có thể bạn đã gửi lời mời trước đó');
    else {
      Alert.alert('Thành công', 'Đã gửi lời mời!');
      setSearchResult(null);
      setSearchQuery('');
    }
  };

  // --- LOGIC 2: LẤY DANH SÁCH LỜI MỜI ĐANG CHỜ ---
  const fetchPendingRequests = async (userId) => {
    const { data, error } = await supabase
      .from('friendships')
      .select(`
        id,
        sender:profiles!friendships_sender_id_fkey(id, username, full_name)
      `)
      .eq('receiver_id', userId)
      .eq('status', 'pending');

    if (!error) setPendingRequests(data);
  };

  const acceptRequest = async (requestId) => {
    const { error } = await supabase
      .from('friendships')
      .update({ status: 'accepted' })
      .eq('id', requestId);

    if (!error) {
      fetchInitialData(); // Load lại toàn bộ
    }
  };

  // --- LOGIC 3: LẤY DANH SÁCH BẠN BÈ (ACCEPTED) ---
  const fetchFriends = async (userId) => {
    const { data, error } = await supabase
      .from('friendships')
      .select(`
        sender:profiles!friendships_sender_id_fkey(id, username, full_name),
        receiver:profiles!friendships_receiver_id_fkey(id, username, full_name)
      `)
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .eq('status', 'accepted');

    if (!error) {
      // Lọc lấy thông tin người kia (không phải mình)
      const formattedFriends = data.map(item => {
        return item.sender.id === userId ? item.receiver : item.sender;
      });
      groupFriends(formattedFriends);
    }
  };

  // Hàm nhóm bạn bè theo chữ cái đầu
  const groupFriends = (friendsList) => {
    const groups = friendsList.reduce((acc, friend) => {
      const firstLetter = friend.username[0].toUpperCase();
      if (!acc[firstLetter]) acc[firstLetter] = [];
      acc[firstLetter].push(friend);
      return acc;
    }, {});

    const sections = Object.keys(groups).sort().map(letter => ({
      title: letter,
      data: groups[letter].sort((a, b) => a.username.localeCompare(b.username))
    }));
    setFriendSections(sections);
  };

  // --- RENDER UI ---

  const ListHeader = () => (
    <View>
      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#6C7A92" />
          <TextInput 
            style={styles.searchInput}
            placeholder="Tìm bạn qua username..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
        </View>
      </View>

      {/* Kết quả tìm kiếm */}
      {searchResult && (
        <View style={[styles.contactItem, { backgroundColor: '#E8F0FE', marginHorizontal: 20, borderRadius: 15, marginBottom: 15 }]}>
          <View style={styles.avatarContainer}>
             <Text style={styles.initialsText}>{searchResult.username[0].toUpperCase()}</Text>
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>{searchResult.username}</Text>
          </View>
          <TouchableOpacity onPress={sendRequest} style={styles.addIcon}>
            <Ionicons name="person-add" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>
      )}

      {/* Danh sách lời mời đang chờ */}
      {pendingRequests.length > 0 && (
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.sectionHeader}>LỜI MỜI KẾT BẠN ({pendingRequests.length})</Text>
          {pendingRequests.map(req => (
            <View key={req.id} style={styles.contactItem}>
              <View style={[styles.avatarContainer, { backgroundColor: '#FFD700' }]}>
                <Text style={styles.initialsText}>{req.sender.username[0].toUpperCase()}</Text>
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactName}>{req.sender.username}</Text>
                <Text style={styles.contactStatus}>Muốn kết bạn với bạn</Text>
              </View>
              <TouchableOpacity onPress={() => acceptRequest(req.id)} style={[styles.addIcon, { backgroundColor: '#34C759' }]}>
                <Ionicons name="checkmark" size={18} color="#FFF" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
      
      {friendSections.length > 0 && <Text style={styles.sectionHeader}>BẠN BÈ</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity><Ionicons name="settings-sharp" size={24} color="#1A1C1E" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Bạn bè</Text>
        <View style={{ width: 24 }} />
      </View>

      <SectionList
        sections={friendSections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => navigation.navigate('Chat', { user: currentUser, partnerName: item.username })}
          >
            <View style={styles.avatarContainer}>
              <Text style={styles.initialsText}>{item.username[0].toUpperCase()}</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{item.username}</Text>
              <Text style={styles.contactStatus}>{item.full_name}</Text>
            </View>
            <Ionicons name="chatbubble-ellipses" size={22} color="#3577F1" />
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        ListHeaderComponent={ListHeader}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        onRefresh={() => fetchInitialData()}
        refreshing={refreshing}
      />


    </SafeAreaView>
  );
}