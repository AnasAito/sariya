import React, { useState, useEffect } from "react";
import { View, AsyncStorage, StyleSheet, Image } from "react-native";
import { Title, Text, Surface, FAB, Divider } from "react-native-paper";
import { Chip } from "react-native-paper";
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
  const { loading, data, refetch } = useQuery(queries.user, {
    variables: { id: userId },
    fetchPolicy: "network-only"
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
    refetch({ variables: { id: userId } });
    setText("");
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ height: 100, padding: 30 }}
        source={{ uri: "https://i.ibb.co/zZc0D4d/1-YHCCWs-Q7-Ezc.png" }}
      />

      {loading ? (
        <ActivityIndicator
          style={{ marginTop: 20 }}
          size={"large"}
          animating={true}
          color={"#EF8B0C"}
        />
      ) : (
        <View style={{ marginTop: 50 }}>
          <Divider />
          <View
            style={{
              margin: 20,
              marginLeft: 20,
              flexDirection: "row-reverse"
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
              flexDirection: "row-reverse"
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: "400",
                color: "gray",
                direction: "rtl"
              }}
            >
              رقم الهاتف :{" "}
            </Text>

            <Text style={{ fontSize: 25, fontWeight: "400" }}>
              {data.user.phone}
            </Text>
          </View>
        </View>
      )}
      <Divider />
      <View style={{ flexDirection: "row-reverse", marginLeft: 20 }}>
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
      </View>
      <View
        style={{ flexDirection: "row-reverse", marginTop: 10, marginLeft: 20 }}
      >
        {!loading ? (
          data.user.locations.map(loc => (
            <Chip style={{ marginLeft: 10, backgroundColor: "#EF8B0C" }}>
              <Text style={{ fontWeight: "bold" }}>{loc.name}</Text>
            </Chip>
          ))
        ) : (
          <></>
        )}
      </View>

      {}
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
    marginTop: 80,
    direction: "rtl",
    alignContent: "center"
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#EF8B0C"
  }
});
