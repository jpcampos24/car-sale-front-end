import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import client from "../api/client";

export default function ProductForm({ route, navigation }) {
  const product = route.params?.product;
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");

  const handleSave = async () => {
    try {
      if (product) {
        await client.put(`/products/${product.id}`, { ...product, name, description });
      } else {
        await client.post("/api/v1/products", { name, description });
      }
      navigation.goBack();
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput placeholder="Nombre" value={name} onChangeText={setName} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
      <TextInput placeholder="Descripción" value={description} onChangeText={setDescription} style={{ borderWidth: 1, padding: 8, marginBottom: 8 }} />
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
}
