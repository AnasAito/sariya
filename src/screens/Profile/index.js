import React, { useState, useEffect } from "react";
import { View, Button, Text, AsyncStorage, StyleSheet } from "react-native";
import { MapView } from "expo";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";

export default function ProfileScreen() {
  const [hasLocationPermissions, setHasLocationPermissions] = useState(false);
  useEffect(() => {
    // Create an scoped async function in the hook
    async function loadUsername() {
      const bagId = await AsyncStorage.getItem("bagId");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      console.log(bagId);
    }
    // Execute the created function directly
    loadUsername();
  }, []);
  const [locationResult, setLocationResult] = useState(null);
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

  return (
    <View style={styles.container}>
      <Text>test</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    //  justifyContent: "center",
    alignItems: "center"
  },
  head: {
    marginLeft: 10,

    flexDirection: "row",
    justifyContent: "space-between"
  },
  hi: {
    color: "gray",
    marginTop: 10
  },
  welcome: { fontSize: 40, paddingTop: 10 },
  content: {
    flex: 0.8,
    paddingTop: 10
  },

  icon: {
    margin: 10,
    marginTop: 28
  }
});
