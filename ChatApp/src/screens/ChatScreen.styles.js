import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: { fontSize: 16, fontWeight: "bold", color: "#007AFF" },
  logoutText: { color: "red", fontWeight: "bold" },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: "center",
  },
  messageBox: {
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
    maxWidth: "80%",
  },
  myMessage: { alignSelf: "flex-end", backgroundColor: "#007AFF" },
  theirMessage: { alignSelf: "flex-start", backgroundColor: "#e5e5ea" },
  myText: { color: "#fff" },
  theirText: { color: "#000" },
});
