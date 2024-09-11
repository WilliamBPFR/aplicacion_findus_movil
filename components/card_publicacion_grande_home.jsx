import {Text, TouchableOpacity, View} from "react-native";
import { useEffect,useRef } from "react";
import { useState } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);


export default function CardPublicacionesGrande() {
    return(
      <View className="flex items-center justify-center bg-black w-[95vw] h-[30vh] mb-[calc(1.5vh)]">
      </View>
    )
}