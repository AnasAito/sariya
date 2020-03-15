import { gql } from "apollo-boost";

export const User = gql`
  query user($phone: String!) {
    user(where: { phone: $phone }) {
      id
      name
      locations {
        name
        long
        lat
      }
    }
  }
`;

export const Products = gql`
  query products {
    products {
      id
      name
      price
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
export default {
  user: User,
  products: Products,
  product: Product,
  userBag: UserBag
};
