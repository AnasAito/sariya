import React from "react";

import {
  createAppContainer,
  createSwitchNavigator,
  NavigationActions
} from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

// import screens
import HomeScreen from "./src/screens/Home/index";
import ProfileScreen from "./src/screens/Profile/index";
import AuthLoadingScreen from "./src/screens/loading";
import SignInScreen from "./src/screens/signin";

const client = new ApolloClient({
  uri: "https://backend.anasaitaomar1999.now.sh/"
});

const AppStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },

    Other: {
      screen: ProfileScreen
    }
  },
  {
    header: null,
    headerMode: "none"
  }
);
const Profile = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen
    }
  },
  {
    header: null,
    headerMode: "none"
  }
);
const AuthStack = createStackNavigator({
  SignIn: {
    screen: SignInScreen
  }
});
const AppTabNavigator = createBottomTabNavigator({
  Home: {
    screen: AppStack
  },
  Profile: {
    screen: Profile
  }
});

const AppNavigator = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: AppTabNavigator,
  Auth: AuthStack
});
const Navigator = createAppContainer(AppNavigator);
export default function App() {
  console.log("app");
  return (
    <ApolloProvider client={client}>
      <Navigator />
    </ApolloProvider>
  );
}
