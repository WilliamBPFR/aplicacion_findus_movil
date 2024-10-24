import {Text, TouchableOpacity, View,Image} from "react-native";
import { useRouter } from "expo-router";

export default function CardPublicacionesGrande({idPublicacion=1,fotoPerfil="https://rmmjqtigwdgygmsibvuh.supabase.co/storage/v1/object/sign/assets/persona4.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvcGVyc29uYTQucG5nIiwiaWF0IjoxNzI2MTEwNTcxLCJleHAiOjMxNTUyOTQ1NzQ1NzF9.kS3sLNvPe8gVi9ZdfOWTTNdwPpWDsn8Nvwc0b-kr1CU&t=2024-09-12T03%3A09%3A31.630Z",fotoDesaparecido="https://rmmjqtigwdgygmsibvuh.supabase.co/storage/v1/object/sign/assets/persona2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvcGVyc29uYTIucG5nIiwiaWF0IjoxNzI2MTA5MjE1LCJleHAiOjMxNTUyOTQ1NzMyMTV9.7XG2tuhw2kQA595EJlG7a0JC35lSVFq9_wXFTqO03VQ&t=2024-09-12T02%3A46%3A55.517Z",nombreUsuario="Nombre de usuario",fechaCreacion,descripcion = "Este es un mensaje urgente para informarles que mi hermano, Hugo Desangles Dietsch, ha desaparecido en Ágora Mall. La última vez que fue visto fue alrededor de las 09:00 A.M. Agradezco cualquier información o ayuda para encontrarlo.",nombreDesaparecido="Nombre de Persona Desaparecida"}) {

    const router = useRouter();

    return(
      <View className="flex  w-[95vw] mb-[calc(1.5vh)]">
        <View className="flex flex-row w-[100%] mb-[1vh]">
            <Image
                source={{ uri: fotoPerfil }}
                // style={{ width: 50, height: 50, borderRadius: 25 }}
                className="bg-yellow-100 w-[45px] h-[45px] rounded-full"
                resizeMode="contain"  // Puedes usar "cover", "contain", o "stretch"
            />

            <View className="flex flex-col ml-[5%] ">
                <Text className="text-[#233E58] text-lg font-bold">{nombreUsuario}</Text>
                <Text className="text-[#233E58] text ml-[7%]">Hace 2 horas</Text>
            </View>
        </View>

        <View className="flex w-[100%] h-[35vh]">
          <View className="flex flex-col mx-[5%] h-[100%]">
              <Text className="text-[#233E58] text-[18px] font-bold mb-2">{nombreDesaparecido}</Text>
               <Text className="text-[#233E58] text-[12px] font-bold">{descripcion}</Text>

               <Image
                  source={{uri: fotoDesaparecido}}
                  className="w-[100%] flex-1 rounded-lg my-[calc(2.5%)]"
               />
          </View>
        </View>
        <TouchableOpacity 
          className="flex w-[90%] h-[6vh] bg-[#3E86B9] mx-auto items-center justify-center mt-[calc(0.5vh)] rounded-lg" 
          onPress={() => router.push(`/publicacionDentroPublicacion/${idPublicacion}`)} 
          activeOpacity={0.9}>
            <Text className="text-white text-lg font-bold">Ver Publicación Completa</Text>
        </TouchableOpacity>
      </View>
    )
}