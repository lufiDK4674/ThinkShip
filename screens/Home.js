import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import Header from "./components/header";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import Post from "./post";

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const apiLink = "https://bloggler-backend.vercel.app/api/post";
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);



  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    // Check if token exists and perform actions accordingly
    if (token) {
      console.log("Token exists:", token);
      // You can set some state or perform further actions if needed
    } else {
      console.log("Token does not exist.");
      // Handle cases where the token is not available
    }
  };
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  }
  const handleLike = () => {

  }
  const handlecomment = () => {

  }
  const deleteToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
      console.log('Token deleted successfully');
      // You can perform additional actions or state updates here after token deletion
    } catch (error) {
      console.error('Error deleting token:', error);
      // Handle errors, show alerts, or perform other actions if deletion fails
    }
    Alert.alert("Logout Successful");
    navigation.navigate("Login");
  };


  useEffect(() => {
    fetchData();
    getToken();
  }, []);

  const fetchData = async () => {
    console.log("fetchdata Called");
    try {
      const response = await axios.get(`${apiLink}?limit=${limit}&offset=${offset}`);
      if (offset === 0) {
        setPosts(response.data.data);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...response.data.data]);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      Alert.alert("Something went wrong!");
    }
  };
  const fetchMore = async () => {
    console.log("FetchMore Called");
    setOffset(offset + 10);
    await fetchData();
  };
  const Item = ({ item }) => {

    const [profileSource, setProfileSource] = useState(item.createdBy.imageUrl);

    const handleImageError = () => {
      // Handle image load errors by setting a default image
      setProfileSource(
        isDarkTheme
          ? require("./assets/images/avatarW.png")
          : require("./assets/images/avatarB.png")
      );
    };

    return (

      <SafeAreaView style={[styles.post, themeStyles.post]}>
        <View style={styles.item}>
          <View style={styles.user}>
            {profileSource ? (
              <Image
                style={styles.icon}
                source={{ uri: profileSource }}
                onError={handleImageError}
              />
            ) : (
              <Image
                style={styles.icon}
                source={
                  isDarkTheme
                    ? require("./assets/images/avatarW.png")
                    : require("./assets/images/avatarB.png")
                }
              />
            )}
            <Text style={styles.userName}>{item.createdBy.userName}</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={[styles.title, themeStyles.title]}>
              {item.title.length > 30 ? item.title.substring(0, 30) + "..." : item.title}
            </Text>
            <Text style={[styles.content, themeStyles.content]} numberOfLines={5}>
              {item.content}
            </Text>
          </View>
        </View>
        <View style={styles.LikeComment}>
          <TouchableOpacity onPress={handleLike}>
            <Image
              source={
                isDarkTheme
                  ? require("./assets/images/likeW.png")
                  : require("./assets/images/likeD.png")
              }
              style={styles.icon1}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlecomment}>
            <Image
              source={
                isDarkTheme
                  ? require("./assets/images/CommentW.png")
                  : require("./assets/images/CommentB.png")
              }
              style={styles.icon1}
            />
          </TouchableOpacity>
          <TouchableOpacity >
            <Image
              source={
                isDarkTheme
                  ? require("./assets/images/shareW.png")
                  : require("./assets/images/shareB.png")
              }
              style={styles.icon1}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  const themeStyles = StyleSheet.create({
    container: {
      backgroundColor: isDarkTheme ? "#222" : "#F5EFE7"
    },
    post: {
      backgroundColor: isDarkTheme ? "#6b6b6b" : "white"
    },
    title: {
      color: isDarkTheme ? "#C5FFF8" : "black"
    },
    content: {
      color: isDarkTheme ? "#C5FFF8" : "black"
    }
  });
  return (

    <View style={[styles.container, themeStyles.container]}>
      <Header isDarkTheme={isDarkTheme} />
      <View >
        <View style={styles.headingDesign}>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsModalVisible(true)}>
            <Image
              source={
                isDarkTheme
                  ? require("./assets/images/addW.png")
                  : require("./assets/images/addB.png")
              }
              style={styles.icon1}
            />
          </TouchableOpacity>
          <TextInput style={styles.headingText} placeholder="Search " />
          <TouchableOpacity onPress={toggleTheme}>
            <Image
              source={
                isDarkTheme
                  ? require("./assets/images/sun.png")
                  : require("./assets/images/moon.png")
              }
              style={styles.icon1}
            />
          </TouchableOpacity>


          <TouchableOpacity
            onPress={deleteToken}>
            <Image
              source={
                isDarkTheme
                  ? require("./assets/images/profile_white.png")
                  : require("./assets/images/profile_black.png")
              }
              style={styles.icon1}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          data={posts}
          renderItem={({ item }) => (<Item key={item._id} item={item} />)}
          keyExtractor={(item) => item._id.toString()}
          onEndReached={() => fetchMore()}
          onEndReachedThreshold={0.7}
        />

      </View>
      <Modal visible={isModalVisible}
        animationType="slide"
        animationIn={'slideInUp'}
        animationInTiming={500}
        animationOut={'slideOutDown'}
        animationOutTiming={500}
        avoidKeyboard={true}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => setIsModalVisible(false)}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Close</Text>
          </TouchableOpacity>

          {/* Render the Post component inside the modal */}
          <Post navigation={navigation} />
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "white",
    padding: 8,
  },
 
  headingDesign: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  headingText: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    borderWidth: 1,
  },
  post: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    margin: 8,
    paddingBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  item: {
    overflow: 'hidden',
    width: '96%',
    flex:1,
    flexDirection:'column',
    justifyContent:'space-between',
  },
  cardContent: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    paddingVertical:5,
  },
  icon: {
    marginHorizontal: 5,
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  icon1: {
    width: 30,
    height: 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    margin:5,
  },
  content: {
    fontSize: 16,
    margin:5,
    padding:10,
  },
  LikeComment: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-evenly'
  },
  containerSeparator: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  header: {
    margin: 5,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 50,
    borderRadius: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
    marginLeft: 10,
  },
  user: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  modalContent: {
    backgroundColor: '#454545',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
  }
});
