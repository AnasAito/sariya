import React, { useState } from "react";
import { StyleSheet, View, AsyncStorage, Image } from "react-native";
import { TextInput, Surface, Title, Text, Button } from "react-native-paper";
import mutations from "./api/mutations";
import { useMutation } from "@apollo/react-hooks";
import queries from "./api/queries";
import { useQuery } from "@apollo/react-hooks";
export default function SignInScreen({ navigation }) {
  // Sign up user with AWS Amplify Auth
  console.log("SignIn");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [mdp, setMdp] = useState("");
  const [mutation] = useMutation(mutations.createUser);
  const [create, { bagdata }] = useMutation(mutations.createUserBag);

  return (
    <View style={styles.container}>
      <Image
        style={{ height: 90 }}
        source={{ uri: "https://i.ibb.co/zZc0D4d/1-YHCCWs-Q7-Ezc.png" }}
      />
      <TextInput
        style={{ marginTop: 50 }}
        label="اسم المستخدم"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={{ marginTop: 10 }}
        label="رقم الهاتف"
        keyboardType="numeric"
        value={phone}
        onChangeText={text => setPhone(text)}
      />
      <TextInput
        style={{
          marginTop: 10
          // flexDirection: "row"
        }}
        label="كلمه السر"
        value={mdp}
        secureTextEntry={true}
        password={true}
        onChangeText={text => setMdp(text)}
      />
      <Button
        mode="contained"
        color="#EF8B0C"
        style={{ marginTop: 30, alignSelf: "center" }}
        onPress={async () => {
          if (username) {
            if (phone) {
              await mutation({
                variables: { name: username, phone: phone, mdp: mdp }
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
      <Button
        style={{ marginTop: 20 }}
        onPress={() => navigation.navigate("LogIn")}
      >
        هل لديك حساب ؟
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
    flexDirection: "column",
    direction: "rtl"
  }
});
