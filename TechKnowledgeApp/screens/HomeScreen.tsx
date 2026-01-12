import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Card } from "../components/Card";
import { fetchSolutions } from "../services/api";

export default function HomeScreen() {
  const [solutions, setSolutions] = useState([]);

  useEffect(() => {
    fetchSolutions().then(setSolutions);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trending Solutions</Text>
      <FlatList
        data={solutions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card title={item.title} description={item.summary} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f4f6f8" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
});
