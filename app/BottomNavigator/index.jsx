// import React from "react";
// import { View, StyleSheet, TouchableOpacity } from "react-native";
// import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Feather from 'react-native-vector-icons/Feather';
// import Octicons from 'react-native-vector-icons/Octicons';
// import HomeScreen from "../home/index";
// import SearchScreen from "../search/index";
// import MapScreen from "../material/index";
// import ProfileScreen from "../profile/index";
// import FormPublicacion from "../FormPublicacion/index";
// import { useNavigation } from "@react-navigation/native";
// import { useRouter } from "expo-router";

// const BaseNavigator = () => {
//   const router = useRouter();
//   const _renderIcon = (routeName, selectedTab) => {
//     let IconComponent = Feather;
//     let iconName = "";

//     switch (routeName) {
//       case "home/index":
//         IconComponent = AntDesign;
//         iconName = "home";
//         break;
//       case "search/index":
//         IconComponent = AntDesign;
//         iconName = "search1";
//         break;
//       case "material/index":
//         IconComponent = Feather;
//         iconName = "book-open";
//         break;
//       case "profile/index":
//         IconComponent = Octicons;
//         iconName = "person";
//         break;
//       default:
//         break;
//     }

//     return (
//       <IconComponent
//         name={iconName}
//         size={32}
//         color={routeName === selectedTab ? "#3E86B9" : "#556871"}
//       />
//     );
//   };

//   const renderTabBar = ({ routeName, selectedTab, navigate }) => {
//     return (
//       <TouchableOpacity
//         onPress={() => navigate(routeName)}
//         style={styles.tabButton}
//       >
//         {_renderIcon(routeName, selectedTab)}
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={styles.outerContainer}>
//       <View style={styles.contentContainer}>
//         <CurvedBottomBarExpo.Navigator
//           style={styles.bottomBar}
//           height={60}
//           circleWidth={55}
//           bgColor="#F3F7FD"
//           initialRouteName="home"
//           borderTopLeftRight={true}
//           renderCircle={({ selectedTab, navigate }) => (
//             <TouchableOpacity
//               style={styles.btnCircle}
//               onPress={() => router.push("/FormPublicacion")}
//             >
//               <AntDesign name="plus" size={32} color="#F3F7FD" />
//             </TouchableOpacity>
//           )}
//           tabBar={renderTabBar}
//         >
          
//           <CurvedBottomBarExpo.Screen
//             name="home/index"
//             position="LEFT"
//             options={{ headerShown: false }}
//             component={HomeScreen}
//           />
//           <CurvedBottomBarExpo.Screen
//             name="search/index"
//             position="LEFT"
//             options={{ headerShown: false }}
//             component={SearchScreen}
//           />
//           <CurvedBottomBarExpo.Screen
//             name="material/index"
//             position="RIGHT"
//             options={{ headerShown: false }}
//             component={MapScreen}
//           />
//           <CurvedBottomBarExpo.Screen
//             name="profile/index"
//             position="RIGHT"
//             options={{ headerShown: false }}
//             component={ProfileScreen}
//           />
//         </CurvedBottomBarExpo.Navigator>
//       </View>
//     </View>
//   );
// };

// export default BaseNavigator;

// const styles = StyleSheet.create({
//   outerContainer: {
//     flex: 1,
//     justifyContent: 'space-between', // Asegura que el contenido esté limitado
//     backgroundColor: '#FFFFFF', // Asegura un fondo consistente
//   },
//   contentContainer: {
//     flex: 1,
//   },
//   bottomBar: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     zIndex: 2,  // Asegura que el BottomBar esté por encima
//     elevation: 10,
//     shadowColor: "#000000",
//     shadowOffset: {
//       width: 0,
//       height: 0.5,
//     },
//     shadowOpacity: 1,
//     shadowRadius: 10,
//   },
//   btnCircle: {
//     width: 60,
//     height: 60,
//     borderRadius: 35,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#00D0A1",
//     padding: 10,
//     shadowColor: "#1A1A23",
//     shadowOffset: {
//       width: 0,
//       height: 0.5,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 20,
//     bottom: 30,
//   },
//   tabButton: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });