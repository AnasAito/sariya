import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Ionicons from "react-native-vector-icons/Ionicons";
// import screens
import HomeScreen from "./src/screens/Home/index";
import ProductScreen from "./src/screens/Product/index";
import ProfileScreen from "./src/screens/Profile/index";
import AuthLoadingScreen from "./src/screens/loading";
import SignInScreen from "./src/screens/signin";
import Bag from "./src/screens/Bag/index";
import Phone from "./src/screens/phoneSignIn";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f"
  }
};
const client = new ApolloClient({
  uri: "https://backend.anasaitaomar1999.now.sh/"
});

const AppStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: `الصفحة الرئيسية `,
      headerStyle: {
        backgroundColor: "#FC6C03"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    })
  },

  Product: {
    screen: ProductScreen,
    navigationOptions: () => ({
      title: ` وصف المنتج `,
      headerStyle: {
        backgroundColor: "#FC6C03"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    })
  },
  Bag: {
    screen: Bag,
    navigationOptions: () => ({
      title: `حقيبة`,
      headerStyle: {
        backgroundColor: "#FC6C03"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    })
  }
});

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
const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: AppStack,
      navigationOptions: { tabBarLabel: "الصفحة الرئيسية" }
    },
    Profile: {
      screen: Profile,
      navigationOptions: { tabBarLabel: "الملف الشخصي" }
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-home`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
        } else if (routeName === "Settings") {
          iconName = `ios-options`;
        } else if (routeName === "Profile") {
          iconName = `ios-person`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      inactiveTintColor: "gray",
      activeTintColor: "#FC6C03"
    }
  }
);

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
      <PaperProvider theme={theme}>
        <Navigator />
      </PaperProvider>
    </ApolloProvider>
  );
}
