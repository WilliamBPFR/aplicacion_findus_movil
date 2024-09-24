import { Text, View, Image, Dimensions, StatusBar, ScrollView, view} from "react-native";
import CardPublicacionesHorizontal from "./card_publicacion_horizontal.jsx";

export default function SliderPublicacionesRecientes() {

  const data = 
    [
      {nombre: "Antonio Duvergé", edad: "35 años", fecha_desaparicion: "16/06/2024", ultima_ubicacion: "Los Jardines, D.N.", imagen: "https://rmmjqtigwdgygmsibvuh.supabase.co/storage/v1/object/sign/assets/persona1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvcGVyc29uYTEucG5nIiwiaWF0IjoxNzI2MDE5NDA4LCJleHAiOjMxNTUzMjYwMTk0MDh9.rm1N02w0q05satHgiDz8vgOx84dAdDIsV3aStQHDeHw&t=2024-09-11T01%3A50%3A03.953Z"},
      {nombre: "Amelia Vigoroux Polanco", edad: "26 años", fecha_desaparicion: "22/06/2024", ultima_ubicacion: "Honduras, D.N.", imagen: "https://rmmjqtigwdgygmsibvuh.supabase.co/storage/v1/object/sign/assets/persona11.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvcGVyc29uYTExLnBuZyIsImlhdCI6MTcyNjAyNDgyMCwiZXhwIjozMTU1MzI2MDI0ODIwfQ.iWBAYXO24qXy7uTfz7ov5eVcwSzu4rWencyNvyetMSk&t=2024-09-11T03%3A20%3A15.417Z"},
      {nombre: "Carlos Jeremías Wrench", edad: "22 años", fecha_desaparicion: "26/06/2024", ultima_ubicacion: "La Esperilla, D.N.", imagen: "https://rmmjqtigwdgygmsibvuh.supabase.co/storage/v1/object/sign/assets/persona6.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvcGVyc29uYTYucG5nIiwiaWF0IjoxNzI2MDI0ODQ5LCJleHAiOjMxNTUzMjYwMjQ4NDl9.QWm6ysGWon7AjtkHOE-Ulo7YNj_2mSTZReWD6gTGdos&t=2024-09-11T03%3A20%3A45.033Z"},
      {nombre: "Tomás González", edad: "17 años", fecha_desaparicion: "30/06/2024", ultima_ubicacion: "Gazcue, D.N.", imagen: "https://rmmjqtigwdgygmsibvuh.supabase.co/storage/v1/object/sign/assets/persona8.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhc3NldHMvcGVyc29uYTgucG5nIiwiaWF0IjoxNzI2MDI0OTEyLCJleHAiOjMxNTUzMjYwMjQ5MTJ9.764uQrwER3v_03-7GbwBTcki1QgZJMtQ6Kxm9TMsF-o&t=2024-09-11T03%3A21%3A47.901Z"},

    ]
  return (
    <View className="flex-1 flex-col mt-[calc(1.5vh)] mb-[calc(3vh)]">
      <View className="w-[100vw] pl-[10vw] mb-[2vh] ">
        <Text className="text-[#233E58] font-extrabold text-2xl ">Últimos reportes</Text>
      </View>
      <ScrollView 
          horizontal={true}
          showsHorizontalScrollIndicator={false}  
          contentContainerStyle={{marginLeft: "2.8%", alignItems: "center", justifyContent:"center"}}
      >
       {data.map((item, index) => (
          <CardPublicacionesHorizontal
            key={index}
            nombre={item.nombre}
            edad={item.edad}
            fecha_desaparicion={item.fecha_desaparicion}
            ultima_ubicacion={item.ultima_ubicacion}
            imagen={item.imagen}
          />
        ))}

      </ScrollView>        
    </View>
  );
}

