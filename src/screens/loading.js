import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  StatusBar,
  Text,
  AsyncStorage
} from "react-native";

export default function AuthLoadingScreen({ navigation }) {
  useEffect(() => {
    // Create an scoped async function in the hook
    async function loadUsername() {
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      navigation.navigate(userToken ? "App" : "Auth");
    }
    // Execute the created function directly
    loadUsername();
  }, []);
  console.log("loading");
  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
