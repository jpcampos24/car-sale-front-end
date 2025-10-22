import React, { useEffect, useState, useContext } from "react";
import { View, Text, Button, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
import client from "../api/client";
import { AuthContext } from "../context/AuthContext";

export default function ProductsList({ navigation }) {
  const [products, setProducts] = useState([]);
  const { logout } = useContext(AuthContext);

  const loadProducts = async () => {
    try {
      const res = await client.get("/api/v1/products");
      setProducts(res.data || []);
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  useEffect(() => { loadProducts(); }, []);

  const handleDelete = async (id) => {
    await client.delete(`/products/${id}`);
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <View style={styles.container}>
      <Button title="Nuevo Producto" onPress={() => navigation.navigate("ProductForm")} />
      <Button title="Cerrar Sesión" onPress={() => {
          logout();
          navigation.replace("Login");
        }} />
      <FlatList
        data={products}
        keyExtractor={p => String(p.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("ProductDetail", { id: item.id })}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Button title="Eliminar" color="red" onPress={() => handleDelete(item.id)} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 6, marginBottom: 8 },
  name: { fontWeight: "bold" },
});
