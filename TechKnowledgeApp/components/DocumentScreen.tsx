import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TextInput, Button } from "react-native";
import { fetchDocuments } from "../services/api";

export default function DocumentScreen() {
  const [documents, setDocuments] = useState([]);
  const [comments, setComments] = useState<{ [key: string]: string[] }>({});
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchDocuments().then(setDocuments);
  }, []);

  const addComment = (docId: string) => {
    if (!newComment) return;
    setComments((prev) => ({
      ...prev,
      [docId]: prev[docId] ? [...prev[docId], newComment] : [newComment],
    }));
    setNewComment("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Documents</Text>
      <FlatList
        data={documents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.docCard}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.summary}>{item.summary}</Text>

            <FlatList
              data={comments[item.id] || []}
              keyExtractor={(_, idx) => idx.toString()}
              renderItem={({ item: comment }) => (
                <Text style={styles.comment}>- {comment}</Text>
              )}
            />

            <TextInput
              style={styles.input}
              placeholder="Add comment..."
              value={newComment}
              onChangeText={setNewComment}
            />
            <Button title="Submit" onPress={() => addComment(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f4f6f8" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  docCard: { backgroundColor: "#fff", padding: 16, marginBottom: 12, borderRadius: 12 },
  title: { fontSize: 18, fontWeight: "bold" },
  summary: { fontSize: 14, color: "#555", marginBottom: 8 },
  comment: { fontSize: 12, color: "#333", marginLeft: 8 },
  input: { backgroundColor: "#eee", padding: 8, borderRadius: 8, marginBottom: 8 },
});
