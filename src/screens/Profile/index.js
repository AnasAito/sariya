import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { Subheading, Title, Text } from "react-native-paper";
import { Button } from "react-native-paper";
import { Chip } from "react-native-paper";
export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <SliderBox
        images={[
          "https://assets-ouch.icons8.com/preview/898/8942160d-0a5d-4978-b21b-3722075388d1.png",
          "https://assets-ouch.icons8.com/preview/105/9ecf53bb-4a39-4b07-9af3-531a361270e6.png"
          // Network image
          // Local image
        ]}
        dotColor="#FC6C03"
        inactiveDotColor="#777"
        sliderBoxHeight={300}
        autoplay
        circleLoop
      />
      <View>
        <Title style={styles.title}>Product name</Title>

        <Chip style={styles.code}>
          <Text style={{ fontWeight: "bold" }}>200 dh</Text>
        </Chip>
        <Text style={styles.desc}>
          What are you working on? Dribbble is a community of designers sharing
          screenshots of their work, process, and projects.
        </Text>

        <Button
          mode="contained"
          style={{ alignSelf: "center", marginTop: 30 }}
          onPress={() => console.log("Pressed")}
          color="#FC6C03"
        >
          Add to card
        </Button>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,

    flexDirection: "column"
  },
  images: { flex: 0.4 },
  title: { margin: 10, paddingTop: 30, fontSize: 40 },
  code: {
    marginLeft: 10,
    marginTop: 5,
    backgroundColor: "#FC6C03",

    alignSelf: "flex-start"
  },
  desc: { marginLeft: 10, fontSize: 20, marginTop: 20 }
});
