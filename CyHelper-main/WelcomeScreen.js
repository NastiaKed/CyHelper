import React, {useRef, useEffect, useTransition} from 'react';
import { StyleSheet, SafeAreaView, Animated, View, Text } from 'react-native';
import {Montserrat_600SemiBold, useFonts} from "@expo-google-fonts/montserrat";
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';


const WelcomeScreen = ({ navigation, onComplete }) => {
    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
        });
    }, [navigation]);

    const Stack = createStackNavigator();
    const wave1 = useRef(new Animated.Value(-20)).current;
    const wave2 = useRef(new Animated.Value(-20)).current;
    const wave3 = useRef(new Animated.Value(-20)).current;
    const wave4 = useRef(new Animated.Value(-20)).current;
    const wave5 = useRef(new Animated.Value(-20)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;

    const { t } = useTranslation();
    const [fontsLoaded] = useFonts({
        Montserrat_600SemiBold,
    });

    useEffect(() => {
        const waveAnimations = [
            Animated.timing(wave1, {
                toValue: 1,
                duration: 600,
                delay: 200,
                useNativeDriver: true,
            }),
            Animated.timing(wave2, {
                toValue: 1,
                duration: 600,
                delay: 350,
                useNativeDriver: true,
            }),
            Animated.timing(wave3, {
                toValue: 1,
                duration: 600,
                delay: 500,
                useNativeDriver: true,
            }),
            Animated.timing(wave4, {
                toValue: 1,
                duration: 600,
                delay: 650,
                useNativeDriver: true,
            }),
            Animated.timing(wave5, {
                toValue: 1,
                duration: 600,
                delay: 800,
                useNativeDriver: true,
            }),
        ];
        Animated.stagger(200, waveAnimations).start();

        const animateText = () => {
            Animated.timing(textOpacity, {
                toValue: 1,
                duration: 700,
                delay: 3000,
                useNativeDriver: true,
            }).start(async () => {
                const isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');
                if (isFirstLaunch === null) {
                    await AsyncStorage.setItem('isFirstLaunch', 'false');
                    navigation.navigate('ManualSettings');
                } else {
                    navigation.navigate('Calibration');
                }
            });
        };

        if (fontsLoaded) {
            animateText();
        }
    }, [fontsLoaded, navigation, textOpacity, wave1, wave2, wave3, wave4, wave5]);


    const wave1Style = {
        transform: [
            {
                translateY: wave1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [300, 0],
                }),
            },
        ],
        backgroundColor: '#003D59',
        height: '111%',
        width: '100%',
        position: 'absolute',
        bottom: '0%',
    };

    const wave2Style = {
        transform: [
            {
                translateY: wave2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [300, 0],
                }),
            },
        ],
        backgroundColor: '#167070',
        height: '88%',
        width: '270%',
        position: 'absolute',
        bottom: '0%',
        borderTopLeftRadius: 5000,
        borderTopRightRadius: 5000,
    };

    const wave3Style = {
        transform: [
            {
                translateY: wave3.interpolate({
                    inputRange: [0, 1],
                    outputRange: [300, 0],
                }),
            },
        ],
        backgroundColor: '#44857D',
        height: '66%',
        width: '220%',
        position: 'absolute',
        bottom: '0%',
        borderTopLeftRadius: 5000,
        borderTopRightRadius: 5000,
    };

    const wave4Style = {
        transform: [
            {
                translateY: wave4.interpolate({
                    inputRange: [0, 1],
                    outputRange: [300, 0],
                }),
            },
        ],
        backgroundColor: '#FE6625',
        height: '44%',
        width: '160%',
        position: 'absolute',
        bottom: '0%',
        borderTopLeftRadius: 5000,
        borderTopRightRadius: 5000,

    };

    const wave5Style = {
        transform: [
            {
                translateY:wave5.interpolate({
                    inputRange: [0, 1],
                    outputRange: [300, 0],
                }),
            },
        ],
        backgroundColor: '#FB9334',
        height: '44%',
        width: '130%',
        position: 'absolute',
        bottom: '-20%',
        borderTopLeftRadius: 1000,
        borderTopRightRadius: 1000,
    };

    const textStyle = {
        fontSize: 48,
        textAlign: 'center',
        color: '#FFF',
        opacity: textOpacity,
        fontFamily: 'Montserrat_600SemiBold',
    };

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={wave1Style} />
            <Animated.View style={wave2Style} />
            <Animated.View style={wave3Style} />
            <Animated.View style={wave4Style} />
            <Animated.View style={wave5Style} />
            {fontsLoaded && (
                <Animated.Text style={textStyle}>{t('cyhelper')}</Animated.Text>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003D59',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default WelcomeScreen;
