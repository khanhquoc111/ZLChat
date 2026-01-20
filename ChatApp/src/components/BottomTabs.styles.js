import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingBottom: 20,
    position: 'absolute', // Đảm bảo luôn nằm dưới cùng
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  activeTabLabel: {
    color: '#3577F1',
  },
});