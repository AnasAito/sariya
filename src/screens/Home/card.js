import React from "react";
import styled from "styled-components";
import { TouchableHighlight } from "react-native";

class Ascard extends React.Component {
  render() {
    return (
      <TouchableHighlight
        onPress={() =>
          this.props.navigation.navigate("Product", {
            productId: this.props.id
          })
        }
        underlayColor="white"
      >
        <Container>
          <Cover>
            <Image
              source={{
                uri: this.props.cardImage
              }}
            />
          </Cover>

          <Text style={{ marginTop: 10, marginLeft: 10, fontSize: 20 }}>
            {this.props.name}
          </Text>
          <Text
            style={{
              marginTop: 10,
              marginLeft: 10,
              fontWeight: "bold",
              fontSize: 25
            }}
          >
            {this.props.price} DH
          </Text>
        </Container>
      </TouchableHighlight>
    );
  }
}

export default Ascard;

const Container = styled.View`
  width: 350px;
  height: 380px;
  margin: auto;
  margin-bottom: 25px;
  border-radius: 14px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
`;

const Cover = styled.View`
  height: 290px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 290px;
`;

const Title = styled.Text`
  position: absolute;
  top: 10px;
  left: 20px;
  font-size: 30px;
  font-weight: bold;
  color: #444;
  width: 300px;
`;

const Author = styled.Text`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;

  font-weight: 600;
  text-transform: uppercase;
`;

const Text = styled.Text`
  font-size: 17px;

  line-height: 24px;
`;
