import React, { useState } from "react";
import { StyleSheet, View, AsyncStorage } from "react-native";
import { TextInput, Surface, Title, Text, Button } from "react-native-paper";
import mutations from "./api/mutations";
import { useMutation } from "@apollo/react-hooks";
export default function SignInScreen({ navigation }) {
  // Sign up user with AWS Amplify Auth
  console.log("SignIn");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [mutation] = useMutation(mutations.createUser);
  const [create, { bagdata }] = useMutation(mutations.createUserBag);
  return (
    <View style={styles.container}>
      <Surface
        style={{ alignItems: "center", padding: 10, alignSelf: "center" }}
      >
        <Title style={{ fontSize: 60, paddingTop: 40, paddingLeft: 15 }}>
          الصايرة{" "}
        </Title>
        <Text style={{ fontSize: 25, color: "#FC6C03", fontWeight: "600" }}>
          Shopping
        </Text>
      </Surface>
      <TextInput
        style={{ marginTop: 50 }}
        label="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={{ marginTop: 10 }}
        label="Phone number"
        value={phone}
        onChangeText={text => setPhone(text)}
      />
      <Button
        mode="contained"
        color="#FC6C03"
        style={{ marginTop: 30, alignSelf: "center" }}
        onPress={async () => {
          if (username) {
            if (phone) {
              await mutation({
                variables: { name: username, phone: phone }
              }).then(async ({ data }) => {
                //  console.log(data.createUser.id);
                await AsyncStorage.setItem("userToken", data.createUser.id);
                await create({
                  variables: {
                    user: data.createUser.id
                  }
                }).then(async data => {
                  console.log(data.data.createUserBag.id);
                  await AsyncStorage.setItem(
                    "bagId",
                    data.data.createUserBag.id
                  );
                });
                navigation.navigate("App");
              });
            }
          }

          // await AsyncStorage.setItem("userToken", "abc");
          //navigation.navigate("App");
        }}
      >
        Sign In
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    // justifyContent: "center",
    // alignItems: "center",
    flexDirection: "column"
  }
});
