import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Card } from "../components/Card";
import { fetchResources } from "../services/api";
import { BookmarkButton } from "../components/BookmarkButton";

export default function ResourceScreen() {
  const [resources, setResources] = useState([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    fetchResources().then(setResources);
  }, []);

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Resources</Text>
      <FlatList
        data={resources}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            description={item.summary}
            onPress={() => toggleBookmark(item.id)}
          >
            <BookmarkButton
              isBookmarked={bookmarks.includes(item.id)}
              onPress={() => toggleBookmark(item.id)}
            />
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f4f6f8" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
});
