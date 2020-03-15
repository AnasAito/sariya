import React, { useState } from "react";
import { StyleSheet, View, AsyncStorage, ScrollView } from "react-native";
import { Subheading, Title } from "react-native-paper";
import { Surface, Text } from "react-native-paper";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Ascard from "./card.js";
import { Modal, Portal, Button, Provider } from "react-native-paper";
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height
export default function HomeScreen({ navigation }) {
  console.log("Home");
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <View>
          <Subheading style={styles.hi}>Hi Anas</Subheading>
          <Title style={styles.welcome}>Welcome</Title>
        </View>
        <View style={styles.icon}>
          <Icon
            onPress={() => navigation.navigate("Bag")}
            name="bag"
            size={40}
            color="#FC6C03"
          />
        </View>
      </View>
      <ScrollView style={styles.content}>
        <Ascard navigation={navigation} />
        <Ascard navigation={navigation} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
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
  surface: {
    marginLeft: 15,
    marginRight: 15,
    height: 300,
    width: width - 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4
  },
  icon: {
    margin: 10,
    marginTop: 28
  }
});
