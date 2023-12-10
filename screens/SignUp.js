import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Header from "./components/header";

export default function Signup({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://bloggler-backend.vercel.app/api/user/signup",
        {
          userName: username,
          email: email,
          password: password,
        }
      );
      console.log("token- ", response.data.access_token);
      if (response.data.access_token) {
        await AsyncStorage.setItem("token", response.data.access_token);
        Alert.alert("! Sign Up Successful ✔ !");
        navigation.navigate("Login");
      } else {
        Alert.alert("Signup Failed: No token received");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      Alert.alert("Something went wrong!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
        <Header isDarkTheme={false} />
      </View>
        <Text style={styles.titleText}>Welcome to ThinkShip</Text>
      <View style={styles.subContainer}>
        <Text style={styles.Text}>SIGN UP</Text>
        <Text style={{ textAlign: "center", marginBottom: 3, fontSize: 10 }}>
          Create an account
        </Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={true}
        />
        <Text style={{ marginBottom: 10, fontSize: 10, textAlign: "center" }}>
          I've read and Agree with all the terms and conditions
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={{ color: "white", fontFamily: "sans serif", fontWeight: 'bold' }}>
            Sign Up
          </Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row', justifyContent:'center', margin:1,}}>
          <Text>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={{color:'blue', fontFamily:'comic sans ms'}}> Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#454545",
    justifyContent:'center',
    padding: 8,
  },
  subContainer: {
    backgroundColor: "#F3F1EB",
    padding: 15,
    marginHorizontal: 30,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    width:260,
    height:300,
    alignSelf:'center',
    justifyContent:'space-evenly',
  },
  title: {
    backgroundColor: "#671d83",
    padding: 25,
    marginBottom: 10,
    justifyContent:'center',

  },
  Text: {
    margin: 10,
    marginBottom: 2,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  titleText: {
    margin: 5,
    marginBottom:10,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "#E0F4FF",
    textDecorationLine: "underline",
    fontFamily: "comic sans ms",
    position:'absolute',
    top:100,
    alignSelf:'center',
  },
  input: {
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 15,
    padding: 5,
    opacity: 0.8,
    fontFamily: "comic sans ms",
    backgroundColor: "#FEFEFE",
  },
  button: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 100,
    backgroundColor: "#8338ec",
    borderRadius: 50,
    alignSelf: "center",
  },
  logo: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  header: {
    position: 'absolute',
    top: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  image: {
    width: 150,
    height: 50,
    borderRadius: 10,
  },
});
