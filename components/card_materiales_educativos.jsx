import {Text, TouchableOpacity, View,Image, StyleSheet,Linking} from "react-native";
import { Forward } from "lucide-react-native";
import { Divider } from "react-native-paper";
import { useEffect,useState } from "react";
import * as FileSystem from 'expo-file-system';
// import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';

export default function CardMaterialesEducativos({nombreTipoMaterial, idTipoMaterial, nombreMaterial, urlAMaterial}) {
    const downloadFile = async (urlmaterial) => {

        try {
          // URL del archivo a descargar
          //   const fileUrl = 'https://ejemplo.com/archivo.jpg'; // Cambia por tu URL
              // Define la ruta de la carpeta de descargas y la ruta final del archivo
            const fileName = urlmaterial.split('/').pop().split('?')[0];
            const downloadDir = `${FileSystem.bundleDirectory}findus/`; // Carpeta de descargas
            const fileUri = `${downloadDir}/${fileName}`;

            // Verifica si la carpeta de descargas existe; si no, créala
            const dirInfo = await FileSystem.getInfoAsync(downloadDir);

            if (!dirInfo.exists) {
                await FileSystem.makeDirectoryAsync(downloadDir, { intermediates: true });
            }

            // Ruta en la carpeta de descargas
        
            // Descarga el archivo
            const { uri } = await FileSystem.downloadAsync(urlmaterial, fileUri);
            console.log('Archivo descargado en:', uri);
        
            // Muestra una notificación para abrir el archivo
            //   await Notifications.scheduleNotificationAsync({
            //     content: {
            //       title: 'Descarga completada',
            //       body: 'Haz clic para abrir el archivo',
            //       data: { uri },
            //     },
            //     trigger: null,
            //   });
            } catch (error) {
            console.error('Error al descargar el archivo:', error);
            Alert.alert('Error', 'No se pudo descargar el archivo');
            }
    };
    
        const openLink = async (urlmaterial) => {
            const supported = await Linking.canOpenURL(urlmaterial);
            if (supported) {
                await Linking.openURL(urlmaterial);
            } else {
                console.error('No se puede abrir el enlace:', urlmaterial);
            }
        };

    const [fotoMostrar, setFotoMostrar] = useState("https://rmmjqtigwdgygmsibvuh.supabase.co/storage/v1/object/sign/assets/Foto%20Tipo%20Material%20Educativo/recursoGenerico.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvRm90byBUaXBvIE1hdGVyaWFsIEVkdWNhdGl2by9yZWN1cnNvR2VuZXJpY28ucG5nIiwiaWF0IjoxNzMwMDczOTY0LCJleHAiOjg2NTcyOTk4NzU2NH0.U1k3GbYDKL97jtQHjQigN3lxzmkO63bxpE2h7lQ5zZs&t=2024-10-28T00%3A06%3A04.110Z")
    const [accion, setAccion] = useState("")

    useEffect(() => {
        if(idTipoMaterial === 1){ //PDF
            setFotoMostrar("https://rmmjqtigwdgygmsibvuh.supabase.co/storage/v1/object/sign/assets/Foto%20Tipo%20Material%20Educativo/pdf.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvRm90byBUaXBvIE1hdGVyaWFsIEVkdWNhdGl2by9wZGYucG5nIiwiaWF0IjoxNzMwMDczNjg3LCJleHAiOjg2NTcyOTk4NzI4N30.EZCs50BeZLOVu9b7UYHWD9hoZuUVwvbBaeGfp5EtLTc&t=2024-10-28T00%3A01%3A26.841Z")
            setAccion("Descargar Archivo")
        }
        else if(idTipoMaterial === 2){ //Video
            setFotoMostrar("https://rmmjqtigwdgygmsibvuh.supabase.co/storage/v1/object/sign/assets/Foto%20Tipo%20Material%20Educativo/video.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvRm90byBUaXBvIE1hdGVyaWFsIEVkdWNhdGl2by92aWRlby5wbmciLCJpYXQiOjE3MzAwNzM3MTEsImV4cCI6ODY1NzI5OTg3MzExfQ.I7EKioG157Mtqo3hfU44s5xSquLU84JR43VMYw-PBCQ&t=2024-10-28T00%3A01%3A51.419Z")
            setAccion("Ir al Video")
        }
        else if(idTipoMaterial === 4){ //Link a Pagina Web
            setFotoMostrar("https://rmmjqtigwdgygmsibvuh.supabase.co/storage/v1/object/sign/assets/Foto%20Tipo%20Material%20Educativo/link.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvRm90byBUaXBvIE1hdGVyaWFsIEVkdWNhdGl2by9saW5rLnBuZyIsImlhdCI6MTczMDA3MzYwMCwiZXhwIjo4NjU3Mjk5ODcyMDB9.GHNeuzDgczdh51AWYHQ1m-4cx8hf--3RvgPe2GxCHZc&t=2024-10-27T23%3A59%3A59.871Z")
            setAccion("Ir a la Pagina Web")
        }else if(idTipoMaterial === 3){ //Imagen
            setFotoMostrar(urlAMaterial)
            setAccion("Descargar Imagen")
        }

    }, [])
    return(
      <View className="flex flex-col w-[100%] h-[50vh] bg-[#a7a8a947] rounded-lg px-[5%] py-[4%] mb-[2vh]">
            <Text className="text-[#233E58] text-xl font-bold">
                {nombreTipoMaterial} - {nombreMaterial}
            </Text>

            <Image
                source={{uri: fotoMostrar}}
                className="h-[65%] rounded-md mt-[3%]"
                resizeMode="cover"
            />

            <View className="flex-1 flex-row justify-between items-center">
                <TouchableOpacity activeOpacity={0.7} className="flex-row bg-[#00d0a08a] rounded-lg w-[45%] h-[8vh]  ml-[2%] mt-[3%] justify-center items-center">
                    <Text className="text-white font-bold text-lg mr-[5%]">
                        Compartir
                    </Text>

                    <Forward size={30} className="text-white"/>
                </TouchableOpacity>

                <TouchableOpacity 
                    activeOpacity={0.7} 
                    className="bg-[#3E86B9] rounded-lg px-[3%] w-[45%] h-[8vh] py-[1%] mr-[2%] mt-[3%] justify-center items-center"
                    onPress={() => openLink(urlAMaterial)}
                >
                    <Text className="text-white font-bold text-lg text-center">
                        {accion}
                    </Text>
                </TouchableOpacity>
            </View>
      </View>
)}
