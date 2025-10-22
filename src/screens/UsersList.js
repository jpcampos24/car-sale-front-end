import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, Alert } from "react-native";
import client from "../api/client";

export default function UsersList() {
  const [users, setUsers] = useState([]);

  const load = async () => {
    try {
      const res = await client.get("/user");
      setUsers(res.data || []);
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    await client.delete(`/user/${id}`);
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Crear Usuario" onPress={async () => {
        await client.post("/user", { username: "nuevo", password: "1234" });
        load();
      }} />
      <FlatList
        data={users}
        keyExtractor={(u) => String(u.id)}
        renderItem={({ item }) => (
          <View style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 8 }}>
            <Text>{item.username}</Text>
            <Button title="Eliminar" color="red" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
