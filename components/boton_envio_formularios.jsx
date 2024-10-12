import {Text, TouchableOpacity} from "react-native";
import { useEffect } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);


export default function BotonEnvioFormularios({esValido, sendingData, label,handleSubmit,width="85%"}) {
    // const [buttonBGColor, setButtonBGColor] = useState('#FFFFFF');

    const backgroundColorAnim = useSharedValue(0);  // Valor inicial de la animación

    // useEffect(() => {
    //     const newColor = (esValido && !sendingData) ? "#3E86B9" : "#C9C9C9";
    //     setButtonBGColor(newColor);
    // }, [esValido, sendingData]);  // Dependencias del efecto

      // Usar useEffect para animar el color cuando cambien las condiciones
      useEffect(() => {
        backgroundColorAnim.value = (esValido && !sendingData) ? 1 : 0;
      }, [esValido, sendingData, backgroundColorAnim]);

      // Interpolar el valor animado a colores específicos
      const animatedStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
          backgroundColorAnim.value,
          [0, 1],
          ['#C9C9C9', '#3E86B9']  // Colores de inicio y final
        );
    
        return {
          backgroundColor: withTiming(backgroundColor, { duration: 200 })
        };
      });
    return(
        <AnimatedTouchableOpacity 
            activeOpacity={0.7} 
            className={`flex  mx-auto w-[${width}] h-[7vh] rounded-md justify-center align-middle`}
            // style={{backgroundColor: buttonBGColor}}
            style={[animatedStyle]}
            onPress={handleSubmit}
            disabled={!esValido || sendingData}
        >
                <Text className="flex w-full text-center text-xl font-bold text-[#F3F7FD]">
                    {label}
                </Text>
        </AnimatedTouchableOpacity>
    )
}