import React from "react";
import { StyleSheet, View, Button, AsyncStorage } from "react-native";

export default function SignInScreen({ navigation }) {
  // Sign up user with AWS Amplify Auth
  console.log("SignIn");

  return (
    <View style={styles.container}>
      <Button
        title="Sign in!"
        onPress={async () => {
          await AsyncStorage.setItem("userToken", "abc");
          navigation.navigate("App");
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }
});
