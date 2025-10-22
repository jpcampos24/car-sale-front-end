import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet
} from "react-native";
import client from "../api/client";
import { AuthContext } from "../context/AuthContext";

export default function OtpLoginScreen({ navigation }) {
  const [channel, setChannel] = useState("whatsapp");
  const [destination, setDestination] = useState("");
  const [code, setCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const { loginWithOtp } = useContext(AuthContext);

  // Enviar código OTP
  const sendOtp = async () => {
    try {
      await client.post("/api/v1/notifications/dispatch", {
        channel,
        destination
      });
      setOtpSent(true);
      Alert.alert("Código enviado", `Revisa tu ${channel}`);
    } catch (e) {
      console.error(e);
      Alert.alert("Error", e.response?.data?.message || e.message);
    }
  };

  // Verificar código OTP
  const verifyOtp = async () => {
    try {
      await loginWithOtp({ otpCode: code });
      navigation.replace("Products");
    } catch (e) {
      console.error(e);
      Alert.alert("Error", e.response?.data?.message || e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión con OTP</Text>

      {!otpSent && (
        <>
          <Text style={styles.label}>Canal (email / sms / whatsapp)</Text>
          <TextInput
            placeholder="whatsapp"
            value={channel}
            onChangeText={setChannel}
            style={styles.input}
          />

          <TextInput
            placeholder={
              channel === "email"
                ? "Correo electrónico"
                : "Teléfono (+57...)"
            }
            value={destination}
            onChangeText={setDestination}
            style={styles.input}
          />

          <Button title="Enviar código OTP" onPress={sendOtp} />
        </>
      )}

      {otpSent && (
        <>
          <TextInput
            placeholder="Código recibido"
            value={code}
            onChangeText={setCode}
            style={styles.input}
          />
          <Button title="Verificar código" onPress={verifyOtp} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
  title: { fontSize: 22, marginBottom: 16, textAlign: "center" },
  label: { fontWeight: "bold", marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 10,
    borderRadius: 6
  }
});
