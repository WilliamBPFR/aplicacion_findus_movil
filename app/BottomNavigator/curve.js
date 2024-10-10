import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';

export default class BottomNavigator extends Component {
    toggleOpen = () => {
        // Funcionalidad para el botón "+" si es necesario
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                {/* Contenedor del Botón Central Sobresaliente */}
                <View style={styles.circleButtonContainer}>
                    <TouchableWithoutFeedback onPress={this.toggleOpen}>
                        <View style={[styles.button, styles.actionBtn]}>
                            <AntDesign name="plus" size={32} color="#FFFFFF" />
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                {/* Contenedor del BottomNavigator */}
                <View style={styles.bottomNavigator}>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => Alert.alert('Home clicked')}>
                        <AntDesign name="home" size={32} color="#97A4AC" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => Alert.alert('Search clicked')}>
                        <AntDesign name="search1" size={32} color="#97A4AC" />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity style={styles.iconContainer} onPress={() => Alert.alert('Book clicked')}>
                        <Feather name="book-open" size={32} color="#97A4AC" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => Alert.alert('Profile clicked')}>
                        <Octicons name="person" size={32} color="#97A4AC" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    circleButtonContainer: {
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: '#F3F7FD',
        width: 70,
        height: 55,
        bottom: 15,
        zIndex: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        
    },
    button: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: '#00D0A1',
        position: 'absolute',
        
        left: 5,
        right: 5,
        bottom: 5,
    },
    bottomNavigator: {
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        bottom: 0,
        width: '100%',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


