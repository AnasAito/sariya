import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import {
  Subheading,
  Title,
  Text,
  Portal,
  Provider,
  Paragraph,
  Dialog
} from "react-native-paper";
import { Button } from "react-native-paper";
import { Chip } from "react-native-paper";
import NumericInput from "react-native-numeric-input";
export default function ProductScreen() {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(0);
  return (
    <>
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 10,
              marginLeft: 10
            }}
          >
            <Title style={styles.title}>Product name</Title>

            <Chip style={styles.code}>
              <Text style={{ fontWeight: "bold" }}>200 dh</Text>
            </Chip>
          </View>

          <Text style={styles.desc}>
            What are you working on? Dribbble is a community of designers
            sharing screenshots of their work, process, and projects.
          </Text>
          <Button
            mode="contained"
            style={{ alignSelf: "center", marginTop: 30 }}
            onPress={() => setVisible(true)}
            color="#FC6C03"
          >
            Add to card
          </Button>
        </View>
        <Portal>
          <Dialog visible={visible} onDismiss={() => setVisible(false)}>
            <Dialog.Title>Quantity</Dialog.Title>
            <Dialog.Content>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <NumericInput
                  value={value}
                  onChange={value => setValue(value)}
                  onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                  totalWidth={240}
                  totalHeight={50}
                  iconSize={25}
                  valueType="real"
                  rounded
                  iconStyle={{ color: "white" }}
                  rightButtonBackgroundColor="#FC6C03"
                  leftButtonBackgroundColor="#FC6C03"
                />
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setVisible(false)}>Add to card</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,

    flexDirection: "column"
  },
  images: { flex: 0.4 },
  title: { paddingTop: 30, fontSize: 40, flex: 0.9 },
  code: {
    marginTop: 25,
    backgroundColor: "#FC6C03",

    alignSelf: "flex-start"
  },
  desc: { marginLeft: 10, fontSize: 20, marginTop: 20 }
});
