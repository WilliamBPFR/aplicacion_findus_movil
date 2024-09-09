import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";
import { Button, Icon } from "react-native-paper";
import { useState, useEffect } from "react";
import InputSignUp from "../../../components/input_sign_up";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputFecha from "../../../components/input_fecha";
import DropdownComponent from "../../../components/dropdown";
import ImagePickerComponent from "../../../components/imagePicker";
import DocumentPickerComponent from "../../../components/filePicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { obtenerTiposDocumentos } from "../../../services/catalogoServices";
import MapInput from "../../../components/map";
export default function Page() {
  const [showDateModal, setShowDateModal] = useState(false);

  const router = useRouter();
  // Estado para el valor seleccionado del dropdown
  const [selectedValue, setSelectedValue] = useState("");
  const [error, setError] = useState(false);

  // Manejo del evento de selección
  const handleSelect = (value) => {
    setSelectedValue(value);
    setPressed(true); // Puedes ajustar según la lógica de tu aplicación
  };

  const handleChange = (text, index) => {
    let newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Mueve el foco al siguiente campo
    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  useEffect(() => {
    console.log("useEffect ejecutado");
    obtenerTiposDocumentos().then((response) => {
      console.log("Respuesta de la ppetición:", response.data);
      if (response.status == 200) {
        setItems(response.data);
      }
    });
  }, []);

  const [items, setItems] = useState([
    { value: "Cédula", key: 1 },
    { value: "Pasaporte", key: 2 },
  ]);

  const validationSchema = Yup.object({
    nombre: Yup.string().required("Este campo es obligatorio"),
    tipo_documento: Yup.string().required("Este campo es obligatorio"),
    documento: Yup.string().required("Este campo es obligatorio"),
    telefono: Yup.string().required("Este campo es obligatorio"),
    relacion_desaparecido: Yup.string().required("Este campo es obligatorio"),
    contacto: Yup.string().required("Este campo es obligatorio"),
    ubicacion: Yup.string().required("Este campo es obligatorio"),
    descripcion_desaparecido: Yup.string().required(
      "Este campo es obligatorio"
    ),
  });

  const [pressed, setPressed] = useState({
    nombre: false,
    fecha_nacimiento: false,
    tipo_documento: false,
    documento: false,
    telefono: false,
    fecha_desaparicion: false,
    relacion_desaparecido: false,
    contacto: false,
    ubicacion: false,
    descripcion_desaparecido: false,
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      fecha_nacimiento: new Date(),
      tipo_documento: "",
      documento: "",
      telefono: "",
      fecha_desaparicion: new Date(),
      relacion_desaparecido: "",
      contacto: "",
      ubicacion: "",
      descripcion_desaparecido: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handlePress = (field) => {
    setPressed({ ...pressed, [field]: true });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F3F7FD]">
      <StatusBar
        hidden={false}
        backgroundColor={"#F3F7FD"}
        barStyle={"dark-content"}
      />
      {/* Boton back */}
      <View className="flex">
        <View className="flex mx-[4.5vw] my-[1vh]">
          <TouchableOpacity onPress={() => router.push("../bienvenida")}>
            <Image
              source={require("../../../assets/sign_up/flecha-izquierda.png")}
              className="w-[10vw] h-[calc(4.5vh)]"
            ></Image>
          </TouchableOpacity>
        </View>
      </View>

      {/* Formulario */}
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        className=" flex  mb-[calc(1.5vh)]"
      >
        <View className="flex">
          <Text className="text-[24px] text-[#233E58] font-extrabold py-[1vh] mx-[-42.5vw]">
            Crear publicación de{"\n"}
            Persona Desaparecida
          </Text>
        </View>
        <View className=" flex w-[calc(85.380vw)]">
          {/* Input Nombre */}
          <InputSignUp
            separation={0.028}
            label="Nombre"
            text={formik.values.nombre}
            placeholder="Ingrese el nombre"
            id_name={"nombre"}
            handleChange={formik.handleChange("nombre")}
            pressed={pressed.nombre}
            handlePressed={() => setPressed({ ...pressed, nombre: true })}
            error={formik.errors.nombre}
          />

          {/* Input Fecha de Nacimiento */}
          <InputFecha
            label={"Fecha de Nacimiento"}
            separation={0.028}
            value={formik.values.fecha_nacimiento}
            placeholder={"Seleccione su fecha de Nacimiento"}
            id_name={"fecha_nacimiento"}
            setFieldValue={formik.setFieldValue}
            fiedName={"fecha_nacimiento"}
            pressed={pressed.fecha_nacimiento}
            handlePressed={() =>
              setPressed({ ...pressed, fecha_nacimiento: true })
            }
            error={formik.errors.fecha_nacimiento}
            showDateModal={showDateModal}
            setShowDateModal={setShowDateModal}
            maxDate={new Date()}
          />

          <DropdownComponent
            separation={0.028}
            label="Tipo de documento"
            placeholder="Seleccione el tipo de documento"
            id_name={"tipo_documento"}
            data={items}
            handleChange={formik.handleChange("tipo_documento")}
            value={parseInt(formik.values.tipo_documento)}
            pressed={pressed.tipo_documento}
            handlePressed={() =>
              setPressed({ ...pressed, tipo_documento: true })
            }
            error={formik.errors.tipo_documento}
            valueField={"key"}
            labelField={"value"}
          />

          {/* Input Documento */}
          <InputSignUp
            separation={0.028}
            label="Documento"
            text={formik.values.documento}
            placeholder="Documento"
            id_name={"documento"}
            handleChange={formik.handleChange("documento")}
            pressed={pressed.documento}
            handlePressed={() => setPressed({ ...pressed, documento: true })}
            error={formik.errors.documento}
          />

          {/* Input Teléfono */}
          <InputSignUp
            separation={0.028}
            label="Teléfono contacto"
            text={formik.values.telefono}
            placeholder="809-000-0000"
            id_name={"telefono"}
            handleChange={formik.handleChange("telefono")}
            pressed={pressed.telefono}
            handlePressed={() => setPressed({ ...pressed, telefono: true })}
            error={formik.errors.telefono}
          />

          {/* Input Fecha de desaparición */}
          <InputFecha
            label={"Fecha de desaparición"}
            separation={0.028}
            value={formik.values.fecha_desaparicion}
            placeholder={"Seleccione la fecha de desaparición"}
            id_name={"fecha_desaparicion"}
            setFieldValue={formik.setFieldValue}
            fiedName={"fecha_desaparicion"}
            pressed={pressed.fecha_desaparicion}
            handlePressed={() =>
              setPressed({ ...pressed, fecha_desaparicion: true })
            }
            error={formik.errors.fecha_desaparicion}
            showDateModal={showDateModal}
            setShowDateModal={setShowDateModal}
          />

          {/* Subir imagen */}
          <ImagePickerComponent
            separation={0.028}
            buttonTitle="Subir foto"
            label="Foto del desaparecido"
            onImagePicked={(image) => console.log(image)}
            containerStyle={{ marginVertical: 24 }}
            imageStyle={{ width: 200, height: 200 }}
          />

          {/* Subir documento */}
          <DocumentPickerComponent
            separation={0.028}
            label="Reporte de la policia"
            onDocumentPicked={(document) => console.log(document)}
          />

          {/* Input Ubicación con MapInput */}
          <MapInput
            separation={0.028}
            onLocationSelect={(location) =>
              formik.setFieldValue(
                "ubicacion",
                `Lat: ${location.latitude}, Lng: ${location.longitude}`
              )
            }
          />
          {pressed.ubicacion && formik.errors.ubicacion && (
            <Text style={{ color: "red" }}>{formik.errors.ubicacion}</Text>
          )}

          {/* Input Relación con el desaparecido */}
          <InputSignUp
            separation={0.028}
            label="Relación con el desaparecido"
            text={formik.values.relacion_desaparecido}
            placeholder="ej. Madre, Padre, Hermano"
            id_name={"relacion_desaparecido"}
            handleChange={formik.handleChange("relacion_desaparecido")}
            pressed={pressed.relacion_desaparecido}
            handlePressed={() =>
              setPressed({ ...pressed, relacion_desaparecido: true })
            }
            error={formik.errors.relacion_desaparecido}
          />

          {/* Input Contacto */}
          <InputSignUp
            separation={0.028}
            label="Contacto"
            text={formik.values.contacto}
            placeholder="Otra información de contacto"
            id_name={"contacto"}
            handleChange={formik.handleChange("contacto")}
            pressed={pressed.contacto}
            handlePressed={() => setPressed({ ...pressed, contacto: true })}
            error={formik.errors.contacto}
          />

          {/* Input Ubicación */}
          {/* <InputSignUp
            separation={0.028}
            label="Ubicación"
            placeholder="Ubicación"
            value={formik.values.ubicacion}
            onChangeText={formik.handleChange("ubicacion")}
            onBlur={() => handlePress("ubicacion")}
            error={pressed.ubicacion && formik.errors.ubicacion}
          /> */}

          {/* Input Descripción del desaparecido */}
          <InputSignUp
            separation={0.028}
            label="Descripción del desaparecido"
            text={formik.values.descripcion_desaparecido}
            placeholder="ej. Estatura, color de piel, color de ojos"
            id_name={"descripcion_desaparecido"}
            handleChange={formik.handleChange("descripcion_desaparecido")}
            pressed={pressed.descripcion_desaparecido}
            handlePressed={() =>
              setPressed({ ...pressed, descripcion_desaparecido: true })
            }
            error={formik.errors.descripcion_desaparecido}
          />

          {/* Subit foto */}

          <View className="flex flex-col w-full">
            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-[#3E86B9] flex mx-auto w-[85vw] h-[7vh] rounded-md justify-center  align-middle"
              onPress={formik.handleSubmit}
            >
              <Text className="flex w-full text-center text-[16px] font-bold text-[#F3F7FD]">
                Publicar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* <BottomNavigator /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  scrollViewContent: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  button: {
    marginTop: 24,
  },
});
