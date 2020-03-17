import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, AsyncStorage } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { Title, Text, Portal, Dialog } from "react-native-paper";
import { Button } from "react-native-paper";
import { Chip, Snackbar } from "react-native-paper";
import NumericInput from "react-native-numeric-input";

// api import
import queries from "../api/queries";
import mutations from "../api/mutations";
import { useQuery } from "@apollo/react-hooks";
import { useMutation } from "@apollo/react-hooks";
export default function ProductScreen(props) {
  const [visible, setVisible] = useState(false);
  const [snackVisible, setSnackVisible] = useState(false);
  const [bagId, setBagId] = useState("");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    // Create an scoped async function in the hook
    async function loadUsername() {
      const bagId = await AsyncStorage.getItem("bagId");
      const UserId = await AsyncStorage.getItem("userToken");
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setBagId(bagId);
      setUserId(UserId);
    }
    // Execute the created function directly
    loadUsername();
  }, []);
  const { loading, data } = useQuery(queries.product, {
    variables: { id: props.navigation.getParam("productId", "") }
  });
  const [mutation] = useMutation(mutations.createUserProduct);

  //console.log(!loading ? data : "nodata");
  const addtobag = async (mutation, product, value) => {
    mutation({
      variables: {
        user: userId,
        product: product,
        userBag: bagId,
        qt: value
      }
    }).then(data => {
      setSnackVisible(true);
    });
  };
  const [value, setValue] = useState(0);
  return (
    <>
      <ScrollView style={styles.container}>
        <SliderBox
          images={
            !loading
              ? data.product.images
              : [
                  "https://assets-ouch.icons8.com/preview/898/8942160d-0a5d-4978-b21b-3722075388d1.png",
                  "https://assets-ouch.icons8.com/preview/105/9ecf53bb-4a39-4b07-9af3-531a361270e6.png"
                  // Network image
                  // Local image
                ]
          }
          dotColor="#FC6C03"
          inactiveDotColor="#777"
          sliderBoxHeight={300}
          autoplay
          circleLoop
        />
        <View>
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              direction: "rtl",
              marginLeft: 10
            }}
          >
            <Chip style={styles.code}>
              <Text style={{ fontWeight: "bold" }}>
                {!loading ? data.product.price : ""} MRO
              </Text>
            </Chip>
            <Title style={styles.title}>
              {" "}
              {!loading ? data.product.name : ""}
            </Title>
          </View>

          <Text style={styles.desc}>
            {!loading ? data.product.description : ""}
          </Text>

          <Button
            mode="contained"
            style={{ alignSelf: "center", marginTop: 30 }}
            onPress={() => setVisible(true)}
            color="#FC6C03"
          >
            أضف الى الحقيبة
          </Button>
        </View>
        <Portal>
          <Dialog
            style={{ direction: "rtl" }}
            visible={visible}
            onDismiss={() => setVisible(false)}
          >
            <Dialog.Title>اختر عدد العناصر</Dialog.Title>
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
              <Button
                onPress={() => {
                  addtobag(
                    mutation,
                    props.navigation.getParam("productId", ""),
                    value
                  );
                  setVisible(false);
                }}
              >
                أضف الى الحقيبة
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
      <Snackbar
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}
        action={{
          label: "الغاء",
          onPress: () => {
            setSnackVisible(false);
          }
        }}
      >
        تمت إضافة المنتج إلى حقيبة !
      </Snackbar>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  marginTop: 20,

    flexDirection: "column"
  },
  images: { flex: 0.4 },
  title: {
    paddingTop: 30,
    fontSize: 30,
    flex: 0.9,
    marginLeft: 10
  },
  code: {
    marginTop: 30,
    backgroundColor: "#FC6C03",

    alignSelf: "flex-start"
  },
  desc: {
    marginLeft: 10,
    fontSize: 20,
    marginTop: 20,
    direction: "rtl"
  }
});
