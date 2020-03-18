import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, AsyncStorage } from "react-native";
import { Chip } from "react-native-paper";
import { DataTable } from "react-native-paper";
import { Portal, Button, Dialog } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import { ActivityIndicator } from "react-native-paper";
import { RadioButton } from "react-native-paper";
import NumericInput from "react-native-numeric-input";
import { Snackbar } from "react-native-paper";
// api import
import queries from "../api/queries";
import mutations from "../api/mutations";
import { useQuery, useMutation } from "@apollo/react-hooks";

export default function Bag() {
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visibleq, setVisibleq] = useState(false);
  const [value, setValue] = useState(1);
  const [snackVisible, setSnackVisible] = useState(false);
  const [snackVisibled, setSnackVisibled] = useState(false);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [checked, setChecked] = useState("");
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

  const { loading, data, refetch } = useQuery(queries.userBag, {
    variables: { id: bagId },
    fetchPolicy: "cache-and-network"
  });
  const { loading: loadingl, data: dataLocation } = useQuery(queries.user, {
    variables: { id: userId },
    fetchPolicy: "network-only"
  });
  const [mutation] = useMutation(mutations.deleteUserProduct);
  const [updateQt] = useMutation(mutations.updateQt);
  const [checkout] = useMutation(mutations.checkOut);
  const [create, { bagdata }] = useMutation(mutations.createUserBag);
  //console.log(!loading ? data : "nodata");
  const getTotal = list => {
    let total = 0;
    list.map(product => {
      total = total + product.product.price * product.qt;
    });
    return total.toFixed(2);
  };
  const getTotald = list => {
    let total = 50;
    list.map(product => {
      total = total + product.product.price * product.qt;
    });
    return total.toFixed(2);
  };
  const publish = async () => {
    if (checked) {
      // publish bag
      checkout({
        variables: {
          id: bagId,
          location: checked
        }
      });
      // create a new bag
      await create({
        variables: {
          user: userId
        }
      }).then(async data => {
        console.log(data.data.createUserBag.id);
        await AsyncStorage.setItem("bagId", data.data.createUserBag.id);
        setVisible(false);
        setSnackVisibled(true);
        setBagId(data.data.createUserBag.id);
      });
    } else {
      setSnackVisible(true);
    }

    // set new  bag id in loval storage
  };
  console.log(checked);
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <View style={styles.icon}>
          <Chip style={styles.code}>
            <Text style={{ fontWeight: "bold" }}>
              {!loading ? data.userBag.userProducts.length : ""} products
            </Text>
          </Chip>
        </View>
      </View>

      <ScrollView style={{ flex: 0.5 }}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>اسم المنتج</DataTable.Title>
            <DataTable.Title numeric>كمية</DataTable.Title>

            <DataTable.Title numeric>تعديل</DataTable.Title>
            <DataTable.Title numeric>حذف</DataTable.Title>
          </DataTable.Header>
          {!loading ? (
            <>
              {data.userBag.userProducts.map(product => (
                <DataTable.Row
                  key={product.id}
                  onPress={() => setVisible1(true)}
                >
                  <DataTable.Cell>{product.product.name}</DataTable.Cell>
                  <DataTable.Cell numeric>{product.qt}</DataTable.Cell>

                  <DataTable.Cell numeric>
                    <Icon
                      onPress={() => {
                        setProductId(product.id);
                        setProductName(product.product.name);
                        setVisibleq(true);
                      }}
                      name="edit"
                      size={29}
                      color="#FC6C03"
                    />
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <Icon
                      onPress={() => {
                        setProductId(product.id);
                        setProductName(product.product.name);
                        setVisible1(true);
                      }}
                      name="delete"
                      size={29}
                      color="#FC6C03"
                    />
                  </DataTable.Cell>
                </DataTable.Row>
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
        </DataTable>
      </ScrollView>

      <View style={{ flex: 0.5 }}>
        <View style={styles.icon}>
          <Chip style={styles.code}>
            <Text style={{ fontWeight: "bold" }}>
              إجمالي : {!loading ? getTotal(data.userBag.userProducts) : 0} MRO
            </Text>
          </Chip>
        </View>
        <View style={{ alignSelf: "center", marginTop: 10 }}>
          <Chip style={styles.code}>
            <Text style={{ fontWeight: "bold" }}>
              الإجمالي بعد تكلفة التسليم :{" "}
              {!loading ? getTotald(data.userBag.userProducts) : 0} MRO
            </Text>
          </Chip>
        </View>
        <Button
          mode="contained"
          style={{ alignSelf: "center", marginTop: 30 }}
          onPress={() => setVisible(true)}
          color="#FC6C03"
        >
          الدفع
        </Button>
        <Portal>
          <Dialog
            style={{ direction: "rtl" }}
            visible={visible}
            onDismiss={() => setVisible(false)}
          >
            <Dialog.Title> الدفع</Dialog.Title>
            <Dialog.Content>
              <Text style={{ marginRight: 100 }}>
                {" "}
                اختر مكان التوصيل الخاص بك
              </Text>
              <View>
                <RadioButton.Group
                  onValueChange={value => setChecked(value)}
                  value={checked}
                >
                  {!loadingl ? (
                    dataLocation.user.locations.map(location => (
                      <RadioButton.Item
                        key={location.id}
                        label={location.name}
                        value={location.id}
                        color="#FC6C03"
                      />
                    ))
                  ) : (
                    <></>
                  )}
                </RadioButton.Group>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setVisible(false)}>إلغاء</Button>
              <Button onPress={() => publish()}>نعم</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Portal>
          <Dialog visible={visible1} onDismiss={() => setVisible1(false)}>
            <Dialog.Title>{productName}</Dialog.Title>
            <Dialog.Content>
              <Text> هل تريد حذف هذا المنتج من الحقيبة؟</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  mutation({
                    variables: {
                      id: productId
                    }
                  });
                  refetch({ variables: { id: bagId } });
                  setVisible1(false);
                }}
              >
                نعم
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Portal>
          <Dialog
            style={{ direction: "rtl" }}
            visible={visibleq}
            onDismiss={() => setVisibleq(false)}
          >
            <Dialog.Title>اختر عدد العناصر</Dialog.Title>
            <Dialog.Content>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <NumericInput
                  value={value}
                  minValue={1}
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
                  updateQt({
                    variables: {
                      id: productId,
                      qt: value
                    }
                  });
                  refetch({ variables: { id: bagId } });
                  setVisibleq(false);
                }}
              >
                حفظ
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
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
        الرجاء اختيار موقع أو إضافة موقع في ملفك الشخصي!
      </Snackbar>
      <Snackbar
        visible={snackVisibled}
        onDismiss={() => setSnackVisibled(false)}
        action={{
          label: "الغاء",
          onPress: () => {
            setSnackVisibled(false);
          }
        }}
      >
        سوف نتصل بك قريبًا بعد تأكيد عملية الشراء !
      </Snackbar>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    direction: "rtl"
  },
  head: {
    flex: 0.1,
    margin: 10
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
    alignSelf: "center"
  }
});
