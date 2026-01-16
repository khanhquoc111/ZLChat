import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../api/supabase';
import { styles } from './HomeScreen.styles';

export default function HomeScreen({ navigation, route }) {
  const { user } = route.params;
  const [searchUsername, setSearchUsername] = useState('');
  const [foundUser, setFoundUser] = useState(null);

  // 1. Tìm kiếm người dùng qua username
  const handleSearch = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', searchUsername)
      .single();

    if (error || !data) {
      Alert.alert('Thông báo', 'Không tìm thấy người dùng này');
      setFoundUser(null);
    } else {
      setFoundUser(data);
    }
  };

  // 2. Logic Tạo phòng hoặc Vào phòng đã có
  const startChat = async () => {
    if (!foundUser) return;

    // Tìm xem đã có phòng chat 1-1 giữa 2 người chưa
    const { data: existingRooms, error: roomError } = await supabase
      .rpc('get_private_room_between_users', { 
        user1_id: user.id, 
        user2_id: foundUser.id 
      });

    let roomId;

    if (existingRooms && existingRooms.length > 0) {
      roomId = existingRooms[0].room_id;
    } else {
      // Nếu chưa có, tạo phòng mới
      const { data: newRoom, error: createError } = await supabase
        .from('rooms')
        .insert([{ is_group: false, created_by: user.id }])
        .select()
        .single();
      
      roomId = newRoom.id;

      // Thêm cả 2 vào room_members
      await supabase.from('room_members').insert([
        { room_id: roomId, user_id: user.id },
        { room_id: roomId, user_id: foundUser.id }
      ]);
    }

    // Chuyển sang màn hình Chat
    navigation.navigate('Chat', { roomId, user, partnerName: foundUser.username });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Tìm bạn bè</Text>
      
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Nhập username..." 
          value={searchUsername}
          onChangeText={setSearchUsername}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={{ color: '#fff' }}>Tìm</Text>
        </TouchableOpacity>
      </View>

      {foundUser && (
        <View style={styles.resultCard}>
          <Text style={styles.usernameText}>{foundUser.username}</Text>
          <TouchableOpacity style={styles.chatButton} onPress={startChat}>
            <Text style={{ color: '#fff' }}>Nhắn tin</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={() => supabase.auth.signOut()}>
        <Text style={{ color: 'red' }}>Đăng xuất</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}