import React from "react";
import { StyleSheet, View, Button, AsyncStorage } from "react-native";

export default function HomeScreen({ navigation }) {
  console.log("Home");
  return (
    <View style={styles.container}>
      <Button
        title="Show me more of the app"
        onPress={() => {
          navigation.navigate("Other");
        }}
      />
      <Button
        title="Actually, sign me out :)"
        onPress={async () => {
          await AsyncStorage.clear();
          navigation.navigate("Auth");
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
