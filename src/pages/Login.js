import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  Platform,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

import api from "../services/api";
import logo from "../assets/logo.png";
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("user").then(user => {
      if (user) {
        navigation.navigate("List");
      }
    });
  }, []);

  async function handleSubmit() {
    const response = await api.post("/sessions", { email });

    const { _id } = response.data;
    console.log(_id);
    await AsyncStorage.setItem("user", _id);
    await AsyncStorage.setItem("techs", techs);

    navigation.navigate("List"); //assim como na rota
  }

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === "ios"}
      style={styles.container}
    >
      <Image source={logo} />
      <View style={styles.form}>
        <Text style={styles.label}>SEU E-MAIL *</Text>
        <TextInput
          placeholder="Seu e-mail"
          placeholderTextColor="#999"
          style={styles.input}
          keyboardType="email-address"
          keyboardAppearance="light"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={text => setEmail(text)}
        ></TextInput>
        <Text style={styles.label}>TECNOLOGIAS *</Text>
        <TextInput
          placeholder="Tecnologias de interesse"
          placeholderTextColor="#999"
          style={styles.input}
          keyboardAppearance="light"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        ></TextInput>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Encontrar spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30
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
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
    textAlign: "center"
  }
});
