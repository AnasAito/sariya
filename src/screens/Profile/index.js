import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import { MapView } from "expo";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import Constants from "expo-constants";
import get from "lodash";

export default function ProfileScreen() {
  const [hasLocationPermissions, setHasLocationPermissions] = useState(false);
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
  console.log(locationResult);
  return (
    <View>
      <Button title="test" onPress={() => getLocationAsync()} />
      <Text>{locationResult}</Text>
    </View>
  );
}
