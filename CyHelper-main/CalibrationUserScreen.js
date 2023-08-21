import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, Image, Animated} from 'react-native';
import { Accelerometer, Gyroscope } from 'expo-sensors';
import {useNavigation} from "@react-navigation/native";
import bicycle from './assets/bicycle.png';
import tree from './assets/tree.png'
import Recommendations from "./Recommendations";
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
export default function CalibrateUser() {
    const navigation = useNavigation();
    const [gyroData, setGyroData] = useState({ x: 0, y: 0, z: 0 });
    const [accData, setAccData] = useState({ x: 0, y: 0, z: 0 });
    const [angle, setAngle] = useState(0);
    const [resetAngle, setResetAngle] = useState(false);
    const [fixedAngle, setFixedAngle] = useState(0);
    const [diff, setDiff] = useState(0);
    const animationAngle = useRef(new Animated.Value(-10)).current;

    const handleCalibrateButtonPress = () => {
        handleFixAngle();
        Animated.timing(animationAngle, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    useEffect(() => {
        let prevPitch = 0;


        const gyroSub = Gyroscope.addListener(gyroData => {
            setGyroData(gyroData);
        });

        const accSub = Accelerometer.addListener(accData => {
            setAccData(accData);
            const { x, y, z } = accData;
            const roll = Math.atan2(y, z) * (180 / Math.PI);
            const pitch = Math.atan2(-x, Math.sqrt(y * y + z * z)) * (180 / Math.PI);

            // Only update the angle if the phone is tilted forward or backward
            if (Math.abs(pitch - prevPitch) > 0.1) {
                const angle = (360 + roll) % 360;
                setAngle(angle.toFixed(0));
                prevPitch = pitch;
            }
        });

        if (resetAngle) {
            setAngle(0);
            setResetAngle(false);
        }

        return () => {
            gyroSub.remove();
            accSub.remove();
        };
    }, [resetAngle]);

    const handleFixAngle = () => {
        setFixedAngle(angle);
    };

    useEffect(() => {
        if (fixedAngle !== 0) {
            setDiff(angle - fixedAngle);
        }
    }, [angle, fixedAngle]);

    // const handleResetAngle = () => {
    //     setAngle(0);
    //     setResetAngle(true);
    //     setFixedAngle(0);
    //     setDiff(0);
    // };
    const normal_angle = angle - 180;
    return (
        <View style={styles.container}>

            <Text style={styles.instructionHeader}>Before start,
                follow instructions below</Text>
.
            <Text style={styles.instructionText1}>1. Fix phone on bicycle
                stem holder</Text>

            <Text style={styles.instructionText2}>2. Press calibrate when
                you did first step</Text>

            <Text style={styles.text}>deviation</Text>

            <Text style={styles.deviation}>{normal_angle}°</Text>

            <View style={styles.buttonContainer}>
                {fixedAngle === 0 ? (
                    <CalibrateButton title="CALIBRATE" onPress={handleCalibrateButtonPress} />
                ) : (
                    <ContinueButton
                        title="RETURN BACK"
                        onPress={() => navigation.navigate('Settings', { fixedAngle })}
                    />
                )}
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
        top: '85%',
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