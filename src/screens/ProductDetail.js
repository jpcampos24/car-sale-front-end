import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import client from "../api/client";

export default function ProductDetail({ route }) {
  const { id } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await client.get(`/products/${id}`);
      setProduct(res.data);
    };
    load();
  }, [id]);

  if (!product) return <ActivityIndicator />;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>{product.name}</Text>
      <Text>{product.description}</Text>
    </View>
  );
}
