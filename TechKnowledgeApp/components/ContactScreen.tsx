import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, FlatList } from "react-native";

export default function ContactScreen() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;
    setMessages((prev) => [...prev, input]);
    setInput("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact Us / Chat</Text>

      <FlatList
        data={messages}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => <Text style={styles.msg}>• {item}</Text>}
        style={{ marginBottom: 12 }}
      />

      <TextInput
        style={styles.input}
        placeholder="Type your message..."
        value={input}
        onChangeText={setInput}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f4f6f8" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  input: { backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 8 },
  msg: { fontSize: 14, paddingVertical: 2 },
});
