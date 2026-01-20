import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
  },
  // --- Header ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1C1E',
  },
  addIcon: {
    backgroundColor: '#3577F1',
    padding: 8,
    borderRadius: 12,
  },
  // --- Search Bar ---
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9EEF5',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#1A1C1E',
  },
  // --- Section Headers ---
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 13,
    fontWeight: '700',
    color: '#6C7A92',
    letterSpacing: 1,
  },
  // --- Contact Item ---
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#F8FAFF',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1E8F5',
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  initialsAvatar: {
    backgroundColor: '#6366F1', // Màu tím cho avatar chữ cái
  },
  initialsText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
  onlineDot: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#F8FAFF',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 15,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1C1E',
  },
  contactStatus: {
    fontSize: 13,
    color: '#6C7A92',
    marginTop: 2,
  },
  // --- Alphabet Sidebar ---
  alphabetBar: {
    position: 'absolute',
    right: 5,
    top: 150,
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alphabetLetter: {
    fontSize: 11,
    fontWeight: '700',
    color: '#3577F1',
    paddingVertical: 2,
  },
});