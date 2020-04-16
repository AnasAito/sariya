import React, { useState } from "react";
import { StyleSheet, View, AsyncStorage, Image } from "react-native";
import {
  TextInput,
  Surface,
  Title,
  Text,
  Button,
  Snackbar
} from "react-native-paper";
import { ActivityIndicator } from "react-native-paper";
import { Portal, Dialog } from "react-native-paper";
import mutations from "./api/mutations";
import { useMutation } from "@apollo/react-hooks";
import queries from "./api/queries";
import { useQuery } from "@apollo/react-hooks";
export default function Login({ navigation }) {
  const [phone, setPhone] = useState("");
  const [mdp, setMdp] = useState("");
  const [skip, setSkip] = useState(true);
  const [snack, setSnack] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [screen, setscreen] = useState(false);
  const { loading, data } = useQuery(queries.login, {
    variables: { phone: phone, mdp: mdp },
    fetchPolicy: "cache-first",
    skip: mdp === "" ? true : false
  });
  const { loading: loadingj, data: dataj } = useQuery(queries.staticData);
  const [create, { bagdata }] = useMutation(mutations.createUserBag);
  console.log(data);
  return (
    <>
      {!screen ? (
        <View style={styles.container}>
          <Image
            style={{ height: 90 }}
            source={{ uri: "https://i.ibb.co/zZc0D4d/1-YHCCWs-Q7-Ezc.png" }}
          />

          <TextInput
            style={{ marginTop: 50 }}
            label="رقم الهاتف"
            keyboardType="numeric"
            value={phone}
            onChangeText={text => setPhone(text)}
          />
          <TextInput
            style={{ marginTop: 10 }}
            label="كلمه السر"
            secureTextEntry={true}
            password={true}
            value={mdp}
            onChangeText={text => setMdp(text)}
          />
          <Button
            mode="contained"
            color="#EF8B0C"
            style={{ marginTop: 30, alignSelf: "center" }}
            onPress={async () => {
              if (mdp) {
                if (phone) {
                  setscreen(true);
                  if (!loading) {
                    console.log(data);

                    if (data.users && data.users.length) {
                      await AsyncStorage.setItem("userToken", data.users[0].id);
                      await create({
                        variables: {
                          user: data.users[0].id
                        }
                      }).then(async data => {
                        console.log(data.data.createUserBag.id);
                        await AsyncStorage.setItem(
                          "bagId",
                          data.data.createUserBag.id
                        );
                      });
                      navigation.navigate("App");
                    } else {
                      console.log("false cred");
                      setscreen(false);
                      setSnack(true);
                    }
                  }
                }
              }

              // await AsyncStorage.setItem("userToken", "abc");
              //navigation.navigate("App");
            }}
          >
            تسجيل الدخول
          </Button>
          <Button style={{ marginTop: 20 }} onPress={() => setDialog(true)}>
            هل نسيت كلمة المرور الخاصة بك ؟
          </Button>

          <Portal>
            <Dialog
              style={{ direction: "rtl" }}
              visible={snack}
              onDismiss={() => setSnack(false)}
            >
              <Dialog.Content>
                <Text> كلمة المرور أو رقم الهاتف غير صحيح</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setSnack(false)}>إلغاء</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog
              style={{ direction: "rtl" }}
              visible={dialog}
              onDismiss={() => setDialog(false)}
            >
              <Dialog.Content>
                <Text>
                  يرجى الاتصال بهذا الرقم لاسترداد كلمة المرور الخاصة بك!
                </Text>
                <Text style={{ marginTop: 20 }}>
                  {!loadingj ? dataj.user.phone : ""}
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setDialog(false)}>إلغاء</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      ) : (
        <>
          <ActivityIndicator
            style={{ justifyContent: "center", alignSelf: "center" }}
            size={"large"}
            animating={true}
            color={"#EF8B0C"}
          />
        </>
      )}
    </>
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
