import React from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import HomeScreen from "../home";
import SearchScreen from "../login";
import MapScreen from "../sign_up";
import ProfileScreen from "../FormPublicacion";
import { BlurView } from '@react-native-community/blur'; // Importa BlurView
import { SafeAreaView } from "react-native-safe-area-context";

const BaseNavigator = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const _renderIcon = (routeName, selectedTab) => {
    let IconComponent = Feather;
    let iconName = ""

    switch (routeName) {
        case "Home":
            IconComponent = AntDesign;
            iconName = "home";
            break;
        case "Search":
            IconComponent = AntDesign;
            iconName = "search1";
            break;
        case "Map":
            IconComponent = Feather;
            iconName = "book-open";
            break;
        case "profile":
            IconComponent = Octicons;
            iconName = "person";
            break;
        default:
            break;
    }

    return (
        <IconComponent
            name={iconName}
            size={32}
            color={routeName === selectedTab ? "#3E86B9" : "#556871"}
        />
    );
  };
  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1}}>
      <CurvedBottomBarExpo.Navigator
        style={styles.bottomBar}
        height={60}
        circleWidth={55}
        bgColor="#F3F7FD"
        initialRouteName="Search"
        borderTopLeftRight={true}
        renderCircle={({ selectedTab, navigate }) => (
          <Animated.View>
            <TouchableOpacity
              style={styles.btnCircle}
              onPress={() => router.push("/FormPublicacion")}
            >
              <AntDesign name="plus" size={32} color="#F3F7FD" />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}
      >
        <CurvedBottomBarExpo.Screen
          name="Home"
          position="LEFT"
          options={{ headerShown: false }}
          component={() => router.push("/home")}
          
        />
        <CurvedBottomBarExpo.Screen
          name="Search"
          position="LEFT"
          options={{
            headerShown: false,
          }}
          component={SearchScreen}
        />
        <CurvedBottomBarExpo.Screen
          name="Map"
          position="RIGHT"
          options={{
            headerShown: false,
          }}
          component={MapScreen}
        />
        <CurvedBottomBarExpo.Screen
          name="profile"
          component={ProfileScreen}
          position="RIGHT"
          options={{ headerShown: false }}
        />
      </CurvedBottomBarExpo.Navigator>
    </View>
  );
};
export default BaseNavigator;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    marginVertical: 5,
  },
  bottomBar: {
    position: "absolute",
    borderRadius: 20,
    elevation: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  btnCircle: {
    width: 60,
    height: 60,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00D0A1",
    padding: 10,
    shadowColor: "#1A1A23",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
    bottom: 30,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: "gray",
  },
  img: {
    width: 30,
    height: 30,
  },
});
