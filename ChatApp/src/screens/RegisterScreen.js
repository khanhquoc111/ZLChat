import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { supabase } from '../api/supabase';
import { styles } from './RegisterScreen.styles';

export default function RegisterScreen({ onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Thêm state mới
  const [fullName, setFullName] = useState('');

  async function handleRegister() {
    if (!username || !email || !password) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { 
        data: { 
          username: username, // Gửi username lên metadata
          full_name: fullName 
        } 
      }
    });

    if (error) {
      Alert.alert('Lỗi', error.message);
    } else {
      Alert.alert('Thành công', 'Tài khoản đã được tạo. Bạn có thể đăng nhập ngay!');
      onSwitch(); // Chuyển sang màn hình đăng nhập
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tạo tài khoản</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Username" 
        value={username} 
        onChangeText={setUsername} 
        autoCapitalize="none"
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Họ và tên" 
        value={fullName} 
        onChangeText={setFullName} 
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        autoCapitalize="none" 
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Mật khẩu" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSwitch}>
        <Text style={styles.linkText}>Đã có tài khoản? Đăng nhập ngay</Text>
      </TouchableOpacity>
    </View>
  );
}