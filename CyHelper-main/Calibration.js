import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, Image, Animated} from 'react-native';
import { DeviceMotion } from 'expo-sensors';
import {useNavigation} from "@react-navigation/native";
import bicycle from './assets/bicycle.png';
import tree from './assets/tree.png'
import {t} from "i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';
const CalibrateButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};
const ContinueButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};
export default function Calibrate() {

    const navigation = useNavigation();
    const [beta, setBeta] = useState(null);
    const [angle, setAngle] = useState(0);
    const [fixedAngle, setFixedAngle] = useState(0);
    const [diff, setDiff] = useState(0);
    const animationAngle = useRef(new Animated.Value(-10)).current;

    const [showCalibrateButton, setShowCalibrateButton] = useState(true);

    useEffect(() => {
        DeviceMotion.addListener((motionData) => {
            const { beta } = motionData.rotation;
            setBeta(beta);
        });
    }, []);

    const betaInDegrees = (beta * 180) / Math.PI;

    const handleCalibrateButtonPress = () => {
        handleFixAngle();
        setShowCalibrateButton(false);
        Animated.timing(animationAngle, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start();
        AsyncStorage.setItem('fixedAngle', JSON.stringify(angle));
    }

    useEffect(() => {
        AsyncStorage.getItem('fixedAngle').then(data => {
            if (data) {
                setFixedAngle(JSON.parse(data));
            }
        });
    }, []);

    useEffect(() => {
        navigation.addListener('focus', () => {
            setShowCalibrateButton(true);
        });
    }, [navigation]);

    useEffect(() => {
        DeviceMotion.addListener((motionData) => {
            const { beta } = motionData.rotation;
            setBeta(beta);
        });
    });


    const handleFixAngle = () => {
        setFixedAngle(betaInDegrees);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            animationAngle.setValue(-10);
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if (fixedAngle !== 0) {
            setDiff(betaInDegrees - fixedAngle);
        }
    }, [betaInDegrees, fixedAngle]);

    const normal_angle = Math.round(betaInDegrees);
    return (
        <View style={styles.container}>

            <Text style={styles.instructionHeader}>{t('instructionHdr')}</Text>

            <Text style={styles.instructionText1}>{t('instructionText1')}</Text>

            <Text style={styles.instructionText2}>{t('instructionText2')}</Text>

            <Text style={styles.text}>{t('deviation')}</Text>

            <Text style={styles.deviation}>{normal_angle}°</Text>

            <View style={styles.buttonContainer}>
                <View style={styles.buttonContainer}>
                    {showCalibrateButton ? (
                        <CalibrateButton title={t('calibrate')} onPress={handleCalibrateButtonPress} />
                    ) : (
                        <ContinueButton
                            title={t('getStarted')}
                            onPress={() => navigation.navigate('Recommendations', { fixedAngle })}
                        />
                    )}
                </View>
            </View>

            <Animated.View style={[styles.containerAnimation, {transform: [{ rotate: animationAngle.interpolate({
                        inputRange: [-10, 0],
                        outputRange: ['-10deg', '0deg']
                    }) }]}]}>
                <Image
                    source={bicycle}
                    style={styles.imageB}
                    resizeMode="contain"
                />

                <Image
                    source={tree}
                    style={styles.imageT}
                    resizeMode="contain"
                />

                <Text style={styles.ground}></Text>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: '#003D59',
        flexDirection: "column",
    },

    instructionText1: {
        width: 300,
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 20,
        color: '#D0D0D0',
        position: 'absolute',
        top: '25%',
        left: '10%',
        textAlign: 'left',
    },

    instructionText2: {
        width: 300,
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 20,
        color: '#D0D0D0',
        position: 'absolute',
        top: '35%',
        left: '10%',
        textAlign: 'left',
    },

    instructionHeader:{
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 27,
        color: '#D0D0D0',
        top: '10%',
        right: 0,
        left: 0,
        textAlign: 'center',
        position: 'absolute',
    },

    deviation:{
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 30,
        color: '#FB9334',
        textAlign: 'center',
        top: '75%',
    },

    title: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 24,
        color: '#D0D0D0',
        textAlign: 'center'
    },

    text: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 24,
        color: '#D0D0D0',
        textAlign: 'center',
        top: '75%',
    },

    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '77%',
        width: "100%",
        height: 90,
        borderRadius: 50,
    },

    button: {
        width: 300,
        height: 90,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D0D0D0',
    },

    buttonText: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 32,
        color: '#2D2D2D',
    },
    imageB: {
        position:'absolute',
        left:'20%',
        top: '25%',
        width: '44%',
        height: '44%',
    },
    imageT: {
        position:'relative',
        left:'55 %',
        top: '22%',
        width: '40%',
        height: '40%',
    },

    containerAnimation:{
        fontFamily: 'Montserrat_600SemiBold',
        height: '70%',
        right: '0%',

        width:'120%',
        top: '30%',
        position: 'absolute',
        zIndex: -1,
    },

    ground:{
        backgroundColor:'#44857D',
        width: "100%",
        height: "60%",
        zIndex:-1,
        position: 'absolute',
        top: '53%',
    },
});