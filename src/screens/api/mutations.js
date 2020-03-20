import { gql } from "apollo-boost";

export const CreateUser = gql`
  mutation createUser($phone: String!, $name: String!, $mdp: String!) {
    createUser(data: { name: $name, phone: $phone, mdp: $mdp }) {
      id
    }
  }
`;

export const CreateUserProduct = gql`
  mutation createUserProduct(
    $user: ID!
    $product: ID!
    $userBag: ID!
    $qt: Int
  ) {
    createUserProduct(
      data: {
        user: { connect: { id: $user } }
        product: { connect: { id: $product } }
        UserBag: { connect: { id: $userBag } }
        qt: $qt
      }
    ) {
      id
    }
  }
`;
export const CreateUserBag = gql`
  mutation createUserBag($user: ID!) {
    createUserBag(data: { user: { connect: { id: $user } } }) {
      id
    }
  }
`;
export const DeleteUserProduct = gql`
  mutation deleteUserProduct($id: ID!) {
    deleteUserProduct(where: { id: $id }) {
      id
    }
  }
`;
export const CheckOut = gql`
  mutation updateUserBag($id: ID!, $location: ID!) {
    updateUserBag(
      where: { id: $id }
      data: { published: true, location: { connect: { id: $location } } }
    ) {
      id
      published
    }
  }
`;
export const UpdateQt = gql`
  mutation updateQt($id: ID!, $qt: Int!) {
    updateUserProduct(where: { id: $id }, data: { qt: $qt }) {
      id
    }
  }
`;
export const CreateLocation = gql`
  mutation createUserProduct(
    $user: ID!
    $name: String!
    $long: String!
    $lat: String!
  ) {
    createLocation(
      data: {
        name: $name
        lat: $lat
        long: $long
        user: { connect: { id: $user } }
      }
    ) {
      id
    }
  }
`;
export default {
  createUserProduct: CreateUserProduct,
  createUser: CreateUser,
  deleteUserProduct: DeleteUserProduct,
  checkOut: CheckOut,
  createUserBag: CreateUserBag,
  createLocation: CreateLocation,
  updateQt: UpdateQt
};
