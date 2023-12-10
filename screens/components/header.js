import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Header = ({ isDarkTheme }) => {
  return (
    <View style={styles.header}>
      <Image
        source={
          isDarkTheme
            ? require("../assets/images/logo-white.png")
            : require("../assets/images/logo-black.png")
        }
        style={styles.logo}
      />
      <Image
        style={styles.image}
        source={require("../assets/images/logo.png")}
      />
      {/* Add other header elements here */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    margin: 5,
    padding: 5,
    flexDirection: "row",
    justifyContent: "center",
    
  },
  logo: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  image: {
    width: 150,
    height: 50,
    borderRadius: 10,
  },
  // Add styles for other header elements here
});

export default Header;
