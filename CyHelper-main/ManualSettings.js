import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFonts, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { useNavigation } from '@react-navigation/native';
import Calibration from './Calibration';
//import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {t} from "i18next";

//const db = SQLite.openDatabase('myDatabase.db');

const CountButtonRear = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.countButtonRear} onPress={onPress}>
            <Text style={styles.countButtonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const CountButtonFront = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.countButtonFront} onPress={onPress}>
            <Text style={styles.countButtonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const ContinueButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.continueButton} onPress={onPress}>
            <Text style={styles.continueButtonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const ManualSettings = () => {
    const navigation = useNavigation();
    const [] = useFonts({
        Montserrat_600SemiBold,
    });
    const [count, setCount] = useState(1);
    const [count2, setCount2] = useState(1);

    useEffect(() => {
        AsyncStorage.getItem('basadate').then(data => {
            if (data) {
                const { count: c, count2: c2 } = JSON.parse(data);
                setCount(c);
                setCount2(c2);
            }
        });
    }, []);

    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };
    const incrementCount = () => {
        if (count < 8) {
            setCount(count + 1);
        }
    };
    const decrementCount2 = () => {
        if (count2 > 1) {
            setCount2(count2 - 1);
        }
    };
    const incrementCount2 = () => {
        if (count2 < 3) {
            setCount2(count2 + 1);
        }
    };

    const saveData = async () => {
        try {
            const data = JSON.stringify({ count, count2 });
            await AsyncStorage.setItem('basadate', data);
            console.log('Data saved successfully');
        } catch (error) {
            console.error('Error saving data: ', error);
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.textInstruction}>{t('textInstruction')}</Text>

            <Text style={styles.rearText}>{t('rearText')}</Text>
            <View style={styles.countContainerRear}>
                <CountButtonRear title="-" onPress={decrementCount} />
                <View style={styles.counterRear}>
                    <Text style={styles.countText}>{count}</Text>
                </View>
                <CountButtonRear title="+" onPress={incrementCount} />
            </View>

            <Text style={styles.frontText}>{t('rearText')}</Text>
            <View style={styles.countContainerFront}>
                <CountButtonFront title="-" onPress={decrementCount2} />
                <View style={styles.counterFront}>
                    <Text style={styles.countText}>{count2}</Text>
                </View>
                <CountButtonFront title="+" onPress={incrementCount2} />
            </View>

            <View style={styles.continueButtonContainer}>
                <ContinueButton title={t('continueButton')} onPress={() => {saveData();
                    navigation.navigate('Calibration');}}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height: "100%",
        backgroundColor: '#003D59',
        flexDirection: "column",
    },textInstruction:{ //текст інструкції
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 26,
        color: '#D0D0D0',
        position: 'absolute',
        top: '12%',
        right: '15%',
        left: '7%',
        textAlign: 'left',
    },

    rearText:{ //текст про передачі rear
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 24,
        color: '#D0D0D0',
        position: 'absolute',
        top: '30%',
        right: 0,
        left: 0,
        textAlign: 'center',
    },

    frontText:{ //текст про передачі front
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 24,
        color: '#D0D0D0',
        position: 'absolute',
        top: '55%',
        right: 0,
        left: 0,
        textAlign: 'center',
    },

    countContainerRear:{ //button + - and counter together of 1st row
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '40%',
    },

    countButtonRear:{ //кнопка + - до каунтера rear
        width: 100,
        borderRadius: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },

    countContainerFront:{ //button + - and counter together of 2nd row
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '65%',
    },

    countButtonFront:{ //кнопка + - до каунтера front
        width: 100,
        height: 60,
        borderRadius: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },

    countButtonText:{ //текст кнопки + i -
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 40,
        color: '#fff',
    },

    countText: { //текст поля передачі
        fontSize: 40,
        fontFamily: 'Montserrat_600SemiBold',
        color: '#FFF',
    },

    counterRear: {
        width: 90,
        height: 90,
        borderRadius: 90,
        backgroundColor: '#44857D',
        justifyContent: 'center',
        alignItems: 'center',
    },

    counterFront: {
        width: 90,
        height: 90,
        borderRadius: 90,
        backgroundColor: '#FE6625',
        justifyContent: 'center',
        alignItems: 'center',
    },

    continueButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: "5%",
        width: "100%",
        height: 90,
        borderRadius: 50,
    },

    continueButton:{
        width: 270,
        height: 90,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D0D0D0',
    },

    continueButtonText:{
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 24,
        color: '#2D2D2D',
    },
});

export default ManualSettings;