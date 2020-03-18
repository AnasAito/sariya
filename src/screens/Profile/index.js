import React, { useState, useEffect } from "react";
import { View, AsyncStorage, StyleSheet, Image } from "react-native";
import { Title, Text, Surface, FAB, Divider } from "react-native-paper";
import { Portal, Button, Dialog, TextInput } from "react-native-paper";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { ActivityIndicator } from "react-native-paper";
import mutations from "../api/mutations";
import { useMutation, useQuery } from "@apollo/react-hooks";
import queries from "../api/queries";
export default function ProfileScreen({ navigation }) {
  const [hasLocationPermissions, setHasLocationPermissions] = useState(false);
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    // Create an scoped async function in the hook
    async function loadUsername() {
      //const bagId = await AsyncStorage.getItem("bagId");
      const UserId = await AsyncStorage.getItem("userToken");
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.

      setUserId(UserId);
    }
    // Execute the created function directly
    loadUsername();
  }, []);
  const [locationResult, setLocationResult] = useState(null);
  const [mutation] = useMutation(mutations.createLocation);
  const { loading, data } = useQuery(queries.user, {
    variables: { id: userId }
  });
  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      setLocationResult("Permission to access location was denied");
    } else {
      setHasLocationPermissions(true);
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocationResult(JSON.stringify(location));
  };
  const addLocal = async () => {
    await mutation({
      variables: {
        user: userId,
        lat: String(JSON.parse(locationResult).coords.latitude),
        long: String(JSON.parse(locationResult).coords.longitude),
        name: text
      }
    });
    setVisible(false);
    setText("");
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 50 }}>
        <Image
          style={{ height: 50 }}
          source={{
            uri:
              "https://firebasestorage.googleapis.com/v0/b/application-upload.appspot.com/o/import%2Flogo%20(1).png?alt=media&token=05ca8b43-1969-4fd6-905e-a190eb1ed208"
          }}
        />
      </View>

      {loading ? (
        <ActivityIndicator
          style={{ marginTop: 20 }}
          size={"large"}
          animating={true}
          color={"#FC6C03"}
        />
      ) : (
        <View style={{ marginTop: 50 }}>
          <Divider />
          <View
            style={{
              margin: 20,
              marginLeft: 20,
              flexDirection: "row"
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "400", color: "gray" }}>
              اسم المستخدم :{" "}
            </Text>

            <Text style={{ fontSize: 25, fontWeight: "400" }}>
              {data.user.name}
            </Text>
          </View>
          <Divider />
          <View
            style={{
              margin: 20,
              marginLeft: 20,
              flexDirection: "row"
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "400", color: "gray" }}>
              رقم الهاتف :{" "}
            </Text>

            <Text style={{ fontSize: 25, fontWeight: "400" }}>
              {data.user.phone}
            </Text>
          </View>
        </View>
      )}
      <Divider />
      <View>
        <Text
          style={{
            marginTop: 10,
            marginLeft: 20,
            fontSize: 25,
            fontWeight: "400",
            color: "gray"
          }}
        >
          المواقع الجغرافية الخاصة بي :
        </Text>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          {!loading ? (
            data.user.locations.map(loc => <Text>{loc.name}</Text>)
          ) : (
            <></>
          )}
        </View>
      </View>

      {/*  <Button
    style={{ alignSelf: "center", marginTop: 50 }}
        mode="contained"
        onPress={() => navigation.navigate("SignIn")}
      >
        sign out
    </Button>*/}
      <FAB
        style={styles.fab}
        small
        label="إضافة موقع جغرافي جديد"
        icon="plus"
        onPress={async () => {
          await getLocationAsync();
          //console.log(locationResult);
          // console.log(JSON.parse(locationResult).coords);
          setVisible(true);
        }}
      />
      <Portal>
        <Dialog
          style={{ direction: "rtl" }}
          visible={visible}
          onDismiss={() => setVisible(false)}
        >
          <Dialog.Title>أدخل اسمًا لموقعك الجديد</Dialog.Title>
          <Dialog.Content>
            <Text style={{ marginBottom: 10 }}>
              ملاحظة: يرجي أن تتأكدوا من وجودكم فالمنزل لأننا ستسجل موقعكم
              باستخدام ال GPS لنسهل عملية التوصيل .
            </Text>
            <TextInput
              type="outlined"
              label="اسم الموقع"
              value={text}
              onChangeText={text => setText(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => addLocal()}>حفظ</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    direction: "rtl",
    alignContent: "center"
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#FC6C03"
  }
});
