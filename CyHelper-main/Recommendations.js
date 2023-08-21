import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, Image} from 'react-native';
import { Accelerometer, Gyroscope, DeviceMotion } from 'expo-sensors';
import {useNavigation} from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import {t} from "i18next";
//import * as SQLite from 'expo-sqlite';
import way from './assets/way2.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from "react-i18next";
//const db = SQLite.openDatabase('myDatabase.db');

const MenuButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.menu} onPress={onPress}>
            <Text style={styles.menuText}>{title}</Text>
        </TouchableOpacity>
    );
};


export default function Recommendations() {

    const deviceMotionData = {
            "acceleration": {
                "z": -0.0005327463150024414,
                "y": 0.0034074783325195312,
                "x": 0.0005932972417213023
            },
            "accelerationIncludingGravity": {
                "z": -0.8134145140647888,
                "y": -9.769495010375977,
                "x": 0.0011865944834426045
            },
            "orientation": 0,
            "rotation": {
                "gamma": -0.000039085680327843875,
                "alpha": 0.00004289219214115292,
                "beta": 1.4878977537155151
            },
            "rotationRate": {
                "gamma": 0,
                "alpha": 0,
                "beta": 0 }
        }

    const navigation = useNavigation();
    const [beta, setBeta] = useState(null);
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);
    const [angle, setAngle] = useState(0);
    const [diff, setDiff] = useState(0);
    const [rear, setRear] = useState(0);
    const [front, setFront] = useState(0);
    const route = useRoute();
    const { fixedAngle } = route.params;
    const { t } = useTranslation();

    const intervalDuration = 400; // 0.5 seconds
    const [interpolatedRear, setInterpolatedRear] = useState(rear);
    const [interpolatedFront, setInterpolatedFront] = useState(front);

    useEffect(() => {
        const interval = setInterval(() => {
            setInterpolatedRear(prevInterpolatedRear => prevInterpolatedRear + (rear - prevInterpolatedRear) * 0.7);
            setInterpolatedFront(prevInterpolatedFront => prevInterpolatedFront + (front - prevInterpolatedFront) * 0.7);
        }, intervalDuration);
        return () => clearInterval(interval);
    }, [rear, front]);

    useEffect(() => {
        AsyncStorage.getItem('basadate').then(data => {
            if (data) {
                const { count: c, count2: c2 } = JSON.parse(data);
                setCount(c);
                setCount2(c2);
            }
        });

        const devSub = DeviceMotion.addListener((deviceMotionData) => {
                const { beta } = deviceMotionData.rotation;
                setBeta(beta);
        });

        return () => {
        };
    }, []);

    const betaInDegrees = (beta * 180) / Math.PI;

    const getAngleDiff = () => {
        return betaInDegrees - fixedAngle;
    };
    useEffect(() => {
        if (fixedAngle !== 0) {
            setDiff(getAngleDiff());
        }
    }, [beta, fixedAngle]);

    useEffect(() => {
        if (count2 == 3 && count == 8) {
            if (diff >= -29) {
                setRear(8);
                setFront(3);
            }
            if (diff >= -17) {
                setRear(7);
                setFront(3);
            }
            if (diff >= -11) {
                setRear(6);
                setFront(3);
            }
            if (diff >= -6) {
                setRear(3);
                setFront(2);
            }
            if (diff >= 6) {
                setRear(3);
                setFront(1);
            }
            if (diff >= 12) {
                setRear(2);
                setFront(1);
            }
            if (diff >= 18) {
                setRear(1);
                setFront(1);
            }
        }
        else if (count2 == 3 && count == 7) {
            if (diff >= -50) {
                setRear(7);
                setFront(3);
            }
            if (diff >= -43) {
                setRear(6);
                setFront(3);
            }
            if (diff >= -36) {
                setRear(5);
                setFront(3);
            }
            if (diff >= -29) {
                setRear(5);
                setFront(3);
            }
            if (diff >= -22) {
                setRear(4);
                setFront(3);
            }
            if (diff >= -15) {
                setRear(4);
                setFront(2);
            }
            if (diff >= -5) {
                setRear(3);
                setFront(2);
            }
            if (diff >= 0) {
                setRear(2);
                setFront(3);
            }
            if (diff >= 5) {
                setRear(2);
                setFront(2);
            }
            if (diff >= 12) {
                setRear(2);
                setFront(2);
            }
            if (diff >= 19) {
                setRear(1);
                setFront(2);
            }
            if (diff >= 28) {
                setRear(2);
                setFront(1);
            }
            if (diff >= 35) {
                setRear(1);
                setFront(1);
            }
            if (diff >= 42) {
                setRear(1);
                setFront(1);
            }
            if (diff >= 49) {
                setRear(1);
                setFront(1);
            }
        }}, [count, count2, diff]);

    return (
        <View style={styles.container}>
            <Image
                source={way}
                style={styles.imageW}
                resizeMode="contain"
            />
            <View style={styles.circlesContainer}>
                <View style={styles.circleRear}>
                    <Text style={styles.recommendationTextRear}>{Math.round(interpolatedFront)}</Text>
                </View>
                <Text style={styles.descriptionTextRear}>{t('r_display_rear')}</Text>
                <View style={styles.circleFront}>
                    <Text style={styles.recommendationTextFront}>{Math.round(interpolatedRear)}</Text>
                </View>
                <Text style={styles.descriptionTextFront}>{t('f_display_rear')}</Text>
            </View>
            <View style={styles.containerOfSettings}>

                <Text style={styles.instHeader}>{t('m_settings')}</Text>
                <Text style={styles.instHeader}>{t('f_rear')} {count2} </Text>
                <Text style={styles.instHeader}>{t('r_rear')} {count} </Text>

                <Text style={styles.instHeader}>{t('u_deviation')} {Math.round(diff)}°</Text>
            </View>
            <MenuButton title="..." onPress={() => navigation.navigate('Settings', { fixedAngle })} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flexDirection: "column",
        width: '100%',
        height: '100%',
        backgroundColor: '#003D59',
    },

    containerOfSettings:{
        left: '5%',
        position: 'absolute',
        flexDirection: "column",
        height: '10%',
        width: '40%',
        bottom: '2%'
    },

    instHeader:{
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 13,
        color: '#D0D0D0',
        textAlign: 'left',
    },

    circlesContainer: {
        top: '65%',
        position: 'absolute',
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleRear: {
        width: '60%',
        height: "70%",
        borderRadius: 400,
        backgroundColor: '#FE6625',
        position: 'absolute',
        left: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        top:'1%',
    },circleFront: {
        width: '60%',
        height: "70%",
        borderRadius: 400,
        backgroundColor: '#44857D',
        position: 'absolute',
        right: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        top:'1%',
    },

    recommendationTextRear:{
        fontSize: 70,
        fontFamily: 'Montserrat_600SemiBold',
        color: '#FFF',
        right:'23%',
    },

    recommendationTextFront:{
        fontSize: 70,
        fontFamily: 'Montserrat_600SemiBold',
        color: '#FFF',
        left:'23%',
    },

    descriptionTextRear:{
        fontSize: 22,
        color: "#D0D0D0",
        fontFamily: 'Montserrat_600SemiBold',
        position:"absolute",
        top: '78%',
        right:'5%',
    },

    descriptionTextFront:{
        fontSize: 22,
        color: "#D0D0D0",
        fontFamily: 'Montserrat_600SemiBold',
        position:"absolute",
        top: '78%',
        left:'5%',
    },
    imageW:{
        position:'absolute',
        alignSelf:'center',
        top: '-20%',
        width: '90%',
        height: '110%',
        zIndex:1,
    },
    menu:{
        flex:1,
        alignSelf:'center',
        position: "absolute",
        bottom:'5%',
        right:'4%',
        height: 50,
        width: 50,
        backgroundColor:'#D0D0D0',
        borderRadius: 100,
    },
    menuText:{
        top:'7%',
        fontSize: 24,
        color: "black",
        fontFamily: 'Montserrat_600SemiBold',
        position:"absolute",
        alignSelf:'center'
    }
})