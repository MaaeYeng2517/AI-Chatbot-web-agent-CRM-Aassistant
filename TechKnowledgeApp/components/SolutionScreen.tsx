import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TextInput } from "react-native";
import { Card } from "../components/Card";
import { fetchSolutions } from "../services/api";

export default function SolutionScreen() {
  const [solutions, setSolutions] = useState([]);
  const [filteredSolutions, setFilteredSolutions] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchSolutions().then((data) => {
      setSolutions(data);
      setFilteredSolutions(data);
    });
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = solutions.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSolutions(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Solutions</Text>
      <TextInput
        style={styles.search}
        placeholder="Search solutions..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredSolutions}
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
  search: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
});
