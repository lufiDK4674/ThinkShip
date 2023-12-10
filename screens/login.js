import React, { useState, useEffect } from "react";
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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    checkForToken();
  }, []);
  const [initialRoute, setInitialRoute] = useState("Login");
  const checkForToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log("token- ", token);
      // Setting the initial route based on token existence
      const initialRoute = token ? "Home" : "Login";

      navigation.navigate(initialRoute); // Navigate to the initial route
    } catch (error) {
      console.error('Error retrieving token:', error);
      navigation.navigate('Login'); // Navigate to Login in case of error
    }
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://bloggler-backend.vercel.app/api/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log("token- ", response.data.access_token);
      if (response.data.access_token) {
        await AsyncStorage.setItem("token", response.data.access_token);
        console.log("async storage token- ", AsyncStorage.getItem("token"));
        Alert.alert("Login Successful ✔");
        navigation.navigate("Home");
      } else {
        Alert.alert("Login Failed: No token received");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message); // Log the error response or message
      Alert.alert("Something went wrong!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <Header  isDarkTheme={false} />
      </View>
      <Text style={styles.titleText}>Welcome Back</Text>

      <View style={styles.subContainer}>
        <Text style={styles.Text}>LOGIN</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="email"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TouchableOpacity style={{ flexDirection: 'row-reverse' }} >
          <Text style={{ color: "blue", fontFamily: "comic sans ms", margin: 3, }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={{ color: "white", fontFamily: "sans serif" }}>
            Login
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'center', margin: 1, }}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={{ color: 'blue', fontFamily: 'comic sans ms' }}>SignUp</Text>
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
    padding: 8,
    justifyContent: "center",
  },
  subContainer: {
    backgroundColor: "#F3F1EB",
    padding: 15,
    marginHorizontal: 30,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    width: 260,
    height: 250,
    alignSelf: 'center',
    justifyContent: 'space-evenly'
  },
  title: {
    backgroundColor: "#671d83",
    padding: 10,
    marginBottom: 10,
    justifyContent: 'center',
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
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "#E0F4FF",
    textDecorationLine: "underline",
    fontFamily: "comic sans ms",
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
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
  back: {
    width: 30,
    height: 25,
    padding: 15,
  },
});
