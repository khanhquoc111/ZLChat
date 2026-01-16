import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  searchContainer: { flexDirection: "row", marginBottom: 20 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
  },
  searchButton: {
    backgroundColor: "#007AFF",
    marginLeft: 10,
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
  },
  resultCard: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  usernameText: { fontSize: 18, fontWeight: "500" },
  chatButton: { backgroundColor: "#34C759", padding: 10, borderRadius: 8 },
  logoutButton: { marginTop: "auto", alignSelf: "center", padding: 15 },
});
