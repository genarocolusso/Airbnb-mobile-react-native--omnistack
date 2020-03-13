import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from "react-native";

import api from "../services/api";

export default function Book({ navigation }) {
  const [date, setDate] = useState("");
  const id = navigation.getParam("id");

  async function handlesubmit() {
    const user_id = await AsyncStorage.getItem("user");

    await api.post(
      `/spots/${id}/bookings`,
      {
        date
      },
      { headers: { user_id: user_id } }
    );

    Alert.alert("Solicitação de reserva enviada.");
    navigation.navigate("List");
  }

  function handleCancel() {
    navigation.navigate("List");
  }

  return (
    <SafeAreaView style={[styles.safearea, styles.container]}>
      <Text style={styles.label}>DATA DE INTERESSE *</Text>
      <TextInput
        placeholder="Qual data você quer reservar?"
        placeholderTextColor="#999"
        style={styles.input}
        keyboardAppearance="light"
        autoCapitalize="words"
        autoCorrect={false}
        value={date}
        onChangeText={setDate}
      ></TextInput>
      <TouchableOpacity style={styles.button} onPress={handlesubmit}>
        <Text style={styles.buttonText}>Solicitar Reserva</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        onPress={handleCancel}
      >
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30
  },
  safearea: {
    paddingTop: Platform.OS === "android" ? 25 : 0
  },
  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8,
    marginTop: 20
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 4
  },
  button: {
    backgroundColor: "#f05a5b",
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    flexDirection: "row"
  },
  cancelButton: {
    backgroundColor: "#ccc",
    marginTop: 10
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
    textAlign: "center"
  }
});
