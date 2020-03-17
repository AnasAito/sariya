import React, { useState, useEffect } from "react";
import { StyleSheet, View, AsyncStorage, ScrollView } from "react-native";
import { Subheading, Title } from "react-native-paper";

import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import Ascard from "./card.js";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height
import { ActivityIndicator, Colors } from "react-native-paper";
// api import
import queries from "../api/queries";
import { useQuery } from "@apollo/react-hooks";

export default function HomeScreen({ navigation }) {
  const { loading, data } = useQuery(queries.products);

  const [visible, setVisible] = useState(false);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    // Create an scoped async function in the hook
    async function loadUsername() {
      // const bagId = await AsyncStorage.getItem("bagId");
      const UserId = await AsyncStorage.getItem("userToken");
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.

      setUserId(UserId);
    }
    // Execute the created function directly
    loadUsername();
  }, []);
  const { loading: loadingu, data: user } = useQuery(queries.user, {
    variables: { id: userId }
  });
  // console.log(!loading ? data : "loading");
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <View style={styles.icon}>
          <Icon
            onPress={() => navigation.navigate("Bag")}
            name="bag"
            size={40}
            color="#FC6C03"
          />
        </View>
        <View>
          <Subheading style={styles.hi}>
            {!loadingu ? user.user.name : ""} أهلا
          </Subheading>
          <Title style={styles.welcome}>مرحباً</Title>
        </View>
      </View>
      <ScrollView style={styles.content}>
        {!loading ? (
          <>
            {data.products.map(product => (
              <Ascard
                key={product.id}
                id={product.id}
                navigation={navigation}
                price={product.price}
                name={product.name}
                cardImage={product.images[0]}
                // images={product.images}
              />
            ))}
          </>
        ) : (
          <ActivityIndicator
            style={{ marginTop: 20 }}
            size={"large"}
            animating={true}
            color={"#FC6C03"}
          />
        )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  head: {
    // marginLeft: 10,

    flexDirection: "row",
    justifyContent: "space-between"
  },
  hi: {
    color: "gray",
    marginTop: 10,
    marginRight: 10
  },
  welcome: { fontSize: 40, paddingTop: 10, marginRight: 10 },
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
