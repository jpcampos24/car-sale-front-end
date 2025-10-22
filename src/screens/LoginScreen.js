import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity  } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const { loginWithEmail, loginWithDocument } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [document, setDocument] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleEmailLogin = async () => {
    try {
      await loginWithEmail({ email, password });
      navigation.replace("Products");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleDocumentLogin = async () => {
    try {
      await loginWithDocument({ document, password });
      navigation.replace("Products");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Documento" value={document} onChangeText={setDocument} />
      <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title="Entrar con Email" onPress={handleEmailLogin} />
      <Button title="Entrar con Documento" onPress={handleDocumentLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('OtpLogin')} style={{ marginTop: 20 }}>
        <Text style={{ color: 'blue', textAlign: 'center' }}>Iniciar sesión con OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 6 },
  error: { color: "red", textAlign: "center", marginBottom: 10 },
});
