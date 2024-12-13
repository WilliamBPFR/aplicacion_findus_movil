import {Text, TouchableOpacity, View,Image} from "react-native";
import { useRouter } from "expo-router";

export default function CardPublicacionesBusqueda({
    nombredesaparecido = "Nombre del Usuario", 
    fechadesaparecido = "03-12-2003", 
    urlfoto= "https://rmmjqtigwdgygmsibvuh.supabase.co/storage/v1/object/sign/assets/persona1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvcGVyc29uYTEucG5nIiwiaWF0IjoxNzMzMjc1MTY1LCJleHAiOjE3MzM4Nzk5NjV9.vNq7DCdEfVbDI8frNY4Y1K2rhW3zIF08_WOt11u_Vv4&t=2024-12-04T01%3A19%3A22.629Z", 
    idpublicacion = 1
}) {

    const router = useRouter();

    return(
        <TouchableOpacity onPress={() => router.push(`/publicacionDentroPublicacion/${idpublicacion}`)}>
            <View className="flex w-[100%] my-[calc(1vh)] rounded-xl bg-[#dee2f4]">
                <View className="flex flex-row w-[100%] my-[1vh]">
                    {/* Imagen de Persona Dessaparecida */}
                    <View className="flex flex-row ml-[5%] ">
                        <Image
                            source={{ uri: urlfoto }}
                            // style={{ width: 50, height: 50, borderRadius: 25 }}
                            className="bg-yellow-100 w-[65px] h-[65px] rounded-full"
                            resizeMode="cover"  // Puedes usar "cover", "contain", o "stretch"
                        />
                        <View className="flex flex-col ml-[5%]">
                            <Text className="text-xl font-bold text-[#233E58]">{nombredesaparecido}</Text>
                            <Text className="text-md font-bold text-[#233E58] mt-1">Fecha de Desaparición: {fechadesaparecido}</Text>
                        </View>
                    </View>
                </View>
        </View>
    </TouchableOpacity>
    )
}