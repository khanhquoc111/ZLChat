import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF', // Màu nền xanh cực nhạt giống trang Login
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#E8F0FE',
    borderRadius: 40, // Bo tròn hoàn toàn thành hình tròn
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#7C7C7C',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  card: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F0F0F0',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
    backgroundColor: '#FAFAFA',
  },
  input: {
    flex: 1,
    color: '#1A1A1A',
    fontSize: 15,
  },
  registerButton: {
    backgroundColor: '#3577F1', // Màu xanh Royal Blue đồng bộ
    flexDirection: 'row',
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  footerText: {
    color: '#7C7C7C',
    fontSize: 14,
  },
  loginText: {
    color: '#3577F1',
    fontSize: 14,
    fontWeight: '700',
  },
});