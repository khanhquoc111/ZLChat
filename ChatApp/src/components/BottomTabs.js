import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './BottomTabs.styles';

const BottomTabs = ({ state, descriptors, navigation }) => {
  const iconMap = {
    Home: 'chatbubble',
    Friends: 'people',
    Calls: 'call',
    Settings: 'settings',
  };

  const labelMap = {
    Home: 'Chats',
    Friends: 'Friends',
    Calls: 'Calls',
    Settings: 'Settings',
  };

  return (
    <View style={styles.bottomTab}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        // Xử lý sự kiện khi nhấn vào Tab
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
            activeOpacity={0.6} // Giảm xuống để có phản hồi thị giác ngay lập tức
          >
            <Ionicons
              name={isFocused ? iconMap[route.name] : `${iconMap[route.name]}-outline`}
              size={26}
              color={isFocused ? '#3577F1' : '#9CA3AF'}
            />
            <Text style={[
              styles.tabLabel, 
              isFocused && styles.activeTabLabel
            ]}>
              {labelMap[route.name] || route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomTabs;