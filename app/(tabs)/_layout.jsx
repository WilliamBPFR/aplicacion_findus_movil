import { Tabs, Redirect } from "expo-router";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Octicons from "react-native-vector-icons/Octicons";
import { StatusBar } from "expo-status-bar";

const _renderIcon = (routeName, focused) => {
  let IconComponent = Feather;
  let iconName = "";
  let color = focused ? "#3E86B9" : "#97A4AC";

  switch (routeName) {
    case "home/index":
      IconComponent = AntDesign;
      iconName = "home";
      break;
    case "search/index":
      IconComponent = AntDesign;
      iconName = "search1";
      break;
    case "material-educativo/index":
      IconComponent = Feather;
      iconName = "book-open";
      break;
    case "profile/index":
      IconComponent = Octicons;
      iconName = "person";
      break;
    case "FormPublicacion/index":
      IconComponent = Feather;
      iconName = "plus-square";
      break;
    default:
      break;
  }

  return (
    <IconComponent
      name={iconName}
      size={32}
      color={color}
    />
  );
};

export default function TabsLayout () {
  return (
    <>
      <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarIconStyle: { justifyContent: "center", alignItems: "center" },
            tabBarStyle: {
                height: 60,
                borderTopWidth: 1,
                borderTopColor: "#C0C7D1",
                backgroundColor: "#F3F7FD",
            },
        }}
      >
        
        <Tabs.Screen
          name="home/index"
          options={{
            headerShown: false,
            title: "",
            tabBarIcon: ({ focused }) => _renderIcon("home/index", focused),
          }}
        />
        <Tabs.Screen
          name="search/index"
          options={{
            headerShown: false,
            title: "",
            tabBarIcon: ({ focused }) => _renderIcon("search/index", focused),
          }}
        />
        <Tabs.Screen
          name="FormPublicacion/index"
          options={{
            headerShown: false,
            title: "",
            tabBarIcon: ({ focused }) =>
              _renderIcon("FormPublicacion/index", focused),
          }}
        />
        <Tabs.Screen
          name="material-educativo/index"
          options={{
            headerShown: false,
            title: "",
            tabBarIcon: ({ focused }) =>
              _renderIcon("material-educativo/index", focused),
          }}
        />
        <Tabs.Screen
          name="profile/index"
          options={{
            headerShown: false,
            title: "",
            tabBarIcon: ({ focused }) =>
              _renderIcon("profile/index", focused),
          }}
        />
        <Tabs.Screen
          name="publicacionDentroPublicacion/index"
          options={{
            href: null,
            headerShown: false,
            title: "",
          }}
        />
      </Tabs>
      
    <StatusBar backgroundColor="#F3F7FD" style="auto" />
    </>
  );
};

// export default TabsLayout;
