import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Post({navigation},) {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log('create post ka token',token);
    try {
      const body= {
        "title": title,
        "content": content
      }
      const auth={
            headers:{
          Authorization: `Bearer ${token} `
            }
      }
      const response = await axios.post(
        "https://bloggler-backend.vercel.app/api/post",body,auth);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      Alert.alert("Something went wrong!");
    }
  };

  

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.label}>Title</Text>
        <TextInput 
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Content</Text>
        <TextInput
          style={styles.input}
          value={content}
          onChangeText={setContent}
          multiline
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSubmit()}  
        >
          <Text style={styles.buttonText}>Publish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d4c7eb",
    padding: 8,
    justifyContent:'center',
  },
  cardContainer: {
    margin: 10,
  },
  card: {
    backgroundColor: "#FEFEFE",
    borderRadius: 10,
    padding: 15,
    elevation: 3, // for Android shadow
    shadowColor: "#000", // for iOS shadow
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  label: {
    margin: 10,
    marginBottom: 2,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  input: {
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 15,
    padding: 5,
    opacity: 0.8,
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
  buttonText: {
    color: "white",
  },
  back: {
    width: 30,
    height: 25,
    padding: 15,
    left:0,
    right:0,
    top:0,
    bottom:1,

  },
});
