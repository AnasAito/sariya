import { gql } from "apollo-boost";

export const User = gql`
  query user($id: ID!) {
    user(where: { id: $id }) {
      id
      name
      phone
      locations {
        id
        name
        long
        lat
      }
    }
  }
`;
export const Login = gql`
  query users($phone: String!, $mdp: String!) {
    users(where: { phone: $phone, mdp: $mdp }) {
      id
    }
  }
`;

export const Products = gql`
  query products {
    products(where: { published: true }) {
      id
      name
      price
      images
    }
  }
`;
export const Product = gql`
  query product($id: ID!) {
    product(where: { id: $id }) {
      id
      name
      price
      description
      images
    }
  }
`;
export const UserBag = gql`
  query userBag($id: ID!) {
    userBag(where: { id: $id }) {
      id
      userProducts {
        id
        qt
        product {
          name
          price
        }
      }
    }
  }
`;
export const StaticData = gql`
  query user {
    user(where: { id: "ck830jgzw002c0704ihzvmbh4" }) {
      phone
      name
    }
  }
`;
export default {
  user: User,
  products: Products,
  product: Product,
  userBag: UserBag,
  login: Login,
  staticData: StaticData
};
