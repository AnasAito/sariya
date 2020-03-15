import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Subheading, Title } from "react-native-paper";
import { Surface, Chip } from "react-native-paper";
import { Dimensions } from "react-native";
import { DataTable } from "react-native-paper";
import { Modal, Portal, Button, Provider, Dialog } from "react-native-paper";

export default function Bag() {
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <View style={styles.icon}>
          <Chip style={styles.code}>
            <Text style={{ fontWeight: "bold" }}>17 items</Text>
          </Chip>
        </View>
      </View>

      <ScrollView style={{ flex: 0.5 }}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Product Name</DataTable.Title>
            <DataTable.Title numeric>Quantity</DataTable.Title>
            <DataTable.Title numeric>Total Price</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell>Frozen yogurt</DataTable.Cell>
            <DataTable.Cell numeric>159</DataTable.Cell>
            <DataTable.Cell numeric>6.0</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
            <DataTable.Cell numeric>237</DataTable.Cell>
            <DataTable.Cell numeric>8.0</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
            <DataTable.Cell numeric>237</DataTable.Cell>
            <DataTable.Cell numeric>8.0</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
            <DataTable.Cell numeric>237</DataTable.Cell>
            <DataTable.Cell numeric>8.0</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
            <DataTable.Cell numeric>237</DataTable.Cell>
            <DataTable.Cell numeric>8.0</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </ScrollView>
      <View style={{ flex: 0.4 }}>
        <View style={styles.icon}>
          <Chip style={styles.code}>
            <Text style={{ fontWeight: "bold" }}>Total : 1238 DH</Text>
          </Chip>
        </View>
        <Button
          mode="contained"
          style={{ alignSelf: "center", marginTop: 30 }}
          onPress={() => setVisible(true)}
          color="#FC6C03"
        >
          Check Out
        </Button>
        <Portal>
          <Dialog visible={visible} onDismiss={() => setVisible(false)}>
            <Dialog.Title>Check out</Dialog.Title>
            <Dialog.Content>
              <Text> sure?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setVisible(false)}>Yes</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
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
