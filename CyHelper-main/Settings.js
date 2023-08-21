import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, Animated, Alert, Linking} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {Montserrat_600SemiBold, useFonts} from "@expo-google-fonts/montserrat";
import { useRoute } from '@react-navigation/native';
import {t} from "i18next";
import {useTranslation} from "react-i18next";

export default function Settings(){
    const navigation = useNavigation();
    const wave1 = useRef(new Animated.Value(1)).current;
    const wave2 = useRef(new Animated.Value(1)).current;
    const wave3 = useRef(new Animated.Value(1)).current;
    const wave4 = useRef(new Animated.Value(1)).current;
    const wave5 = useRef(new Animated.Value(1)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;
    const route = useRoute();
    const { fixedAngle } = route.params;
    const { t } = useTranslation();


    useEffect(() => {
        const waveAnimations = [
            Animated.timing(wave1, {
                toValue: 1,
                useNativeDriver: true,
            }),
            Animated.timing(wave2, {
                toValue: 1,
                useNativeDriver: true,
            }),
            Animated.timing(wave3, {
                toValue: 1,
                useNativeDriver: true,
            }),
            Animated.timing(wave4, {
                toValue: 1,
                useNativeDriver: true,
            }),
            Animated.timing(wave5, {
                toValue: 1,
                useNativeDriver: true,
            }),
        ];
        Animated.stagger(200, waveAnimations).start();


        Animated.timing(textOpacity, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }, [wave1, wave2, wave3, wave4, wave5, textOpacity]);

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
        fontSize: 37,
        color: '#FFF',
        textAlign: 'center',
        opacity: textOpacity,
        fontFamily: 'Montserrat_600SemiBold',
    };

    return (
        <View style={styles.container}>
            <Animated.View style={wave1Style} />
            <Animated.View style={wave2Style} />
            <Animated.View style={wave3Style} />
            <Animated.View style={wave4Style} />
            <Animated.View style={wave5Style} />
            <View style={styles.containerSupport}>
                <TouchableOpacity onPress={() => Alert.alert(
                    t('contactUs'),
                    t('doYouWantToSendAnEmail'),
                    [
                        {text: t('cancel')},
                        {text: t('ok'), onPress: () => Linking.openURL('mailto:jaimelviv@gmail.com')},
                    ]
                )}>
                    <Animated.Text style={textStyle}>{t('support')}</Animated.Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerCalibration}>
                <TouchableOpacity onPress={() => navigation.navigate('Language')}>
                    <Animated.Text style={textStyle}>{t('language')}</Animated.Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerSettings}>
                <TouchableOpacity onPress={() => navigation.navigate('ManualSettings')}>
                    <Animated.Text style={textStyle}>{t('settings')}</Animated.Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerGoBack}>
                <TouchableOpacity onPress={() => navigation.navigate('Recommendations', { fixedAngle })}>
                    <Animated.Text style={textStyle}>{t('return')}</Animated.Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003D59',
        alignItems: 'center',
        height:'100%',
        width:'100%'
    },
    containerSettings:{
        justifyContent:'center',
        width:'100%',
        alignItems:'center',
        height:'10%',
        flexDirection: "column",
        top:'62%',
        position:'absolute'
    },
    containerCalibration:{
        justifyContent:'center',
        width:'100%',
        alignItems:'center',
        height:'10%',
        flexDirection: "column",
        top:"41%",
        position:'absolute'
    },
    containerSupport:{
        justifyContent:'center',
        width:'100%',
        alignItems:'center',
        height:'10%',
        flexDirection: "column",
        top:"19%",
        position:'absolute'
    },
    containerGoBack:{
        justifyContent:'center',
        width:'60%',
        borderRadius:500,
        alignItems:'center',
        height:'10%',
        flexDirection: "column",
        top:"82%",
        position:'absolute',
    },


});
