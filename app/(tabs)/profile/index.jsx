import { useState } from "react";
import { Text, View, Image, Dimensions, StatusBar, ScrollView, view, Touchable, TouchableOpacity} from "react-native";
import TopBar from "../../../components/topbar.jsx";
import { Dialog, Portal, PaperProvider,Button } from 'react-native-paper';
import OptionsButtons from "../../../components/optionButtons.jsx";
import { User2, BookA, BookCheck, LogOut} from "lucide-react-native";
import { useRouter } from "expo-router";



export default function Page() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <PaperProvider>
      <View className="flex-1 bg-[#F3F7FD] justify-center align-middle items-center">
        <StatusBar hidden={false} backgroundColor={"#C6DAEB"} barStyle={"light-content"} />
        <TopBar/>
        <ScrollView 
          className="flex-col w-[100%] h-[70vh] mt-[3%] rounded-lg"
          contentContainerStyle={{alignItems: "center", justifyContent: "center"}}
        >
          <View className="flex-col w-full justify-center items-center">
            <TouchableOpacity activeOpacity={0.8} onPress={showDialog}>
              <Image
                source={{ uri: "https://rmmjqtigwdgygmsibvuh.supabase.co/storage/v1/object/sign/assets/persona4.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvcGVyc29uYTQucG5nIiwiaWF0IjoxNzI3NzM5NDIyLCJleHAiOjMxNTUyOTYyMDM0MjJ9.Bpj268olzbmxG_A_hO9yLEDzEpjsPv7DpQtj4aTbEWY&t=2024-09-30T23%3A37%3A02.760Z"}}
                // style={{ width: 50, height: 50, borderRadius: 25 }}
                className="w-[35vw] h-[35vw] rounded-full"
                resizeMode="contain"  // Puedes usar "cover", "contain", o "stretch"
              />
            </TouchableOpacity>
              <Text className="mt-[1vh] text-xl font-bold text-[#233E58]">
                Nombre de Usuario
              </Text>
          </View>

          <View className="flex-col w-[100vw] justify-center items-center align-middle mt-[5%]">
              <OptionsButtons 
                label={"Perfil"} 
                icon={<User2 size={25} color="#254E70" source={"user"} allowFontScaling={true}/>}
                onPress={() => router.push("../perfilAdentro")}
              />

              {/* <OptionsButtons 
                label={"Mis Publicaciones"}
                icon={<BookCheck size={25} color="#254E70" source={"book"} allowFontScaling={true}/>}
                onPress={() => console.log("Mis Publicaciones")}
              /> */}
              <OptionsButtons 
                label={"Idioma"}
                icon={<BookA size={25} color="#254E70" source={"book"} allowFontScaling={true}/>}
                onPress={() => console.log("Idioma")}
              />

              <OptionsButtons
                label={"Cerrar Sesión"}
                icon={<LogOut size={25} color="#254E70" source={"log-out"} allowFontScaling={true}/>}
                onPress={() => console.log("Cerrar Sesión")}
                rojo={true}
              />
          </View>
        </ScrollView>
            
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title className="text-center font-bold">Foto de Perfil</Dialog.Title>
            <Dialog.Content>
              <Text className="text-lg text-center">¿Deseas cambiar tu foto de perfil?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancelar</Button>
              <Button onPress={hideDialog}>Aceptar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
}