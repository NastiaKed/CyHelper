import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Button, TouchableOpacity, Animated, Alert, Text} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {Montserrat_600SemiBold, useFonts} from "@expo-google-fonts/montserrat";
import { useRoute } from '@react-navigation/native';
import { Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export default function Language(){
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
        <View style={styles.container2}><View style={styles.container3}></View></View>

                <TouchableOpacity style = {styles.containerEngLanguage}
                    onPress={() => {
                        i18n.changeLanguage('eng')
                        navigation.goBack();
                    }}>
                    <Text style={styles.text_eng}>English</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.containerUkLanguage}
                    title="Українська"
                    onPress={() => {
                        i18n.changeLanguage('uk')
                        navigation.goBack();
                    }}>
                    <Text style={styles.text_uk}>Українська</Text>
                </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#003D59',
        width:'100%'
    },
    container2:{
        flex: 1,
        justifyContent: 'left',
        position:"relative",
        backgroundColor: '#44857D',
        width:'100%',
        alignItems: 'baseline',
        borderRadius:500
    },

    container3:{
        flex: 1,
        justifyContent: 'left',
        position:"relative",
        backgroundColor: '#167070',
        width:'50%',
        marginRight:'70%',
        borderRadius:500
    },

    containerEngLanguage: {
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FB9334',
        height: '10%',
        width: '60%',
        borderRadius: 400,
        top:'38%',
        position:'absolute'
    },

    containerUkLanguage: {
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FE6625',
        height: '10%',
        width: '60%',
        borderRadius: 400,
        top:'55%',
        position:'absolute'
    },

    text_eng:{
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 32,
        color: 'white',
        textAlign: 'center',
    },

    text_uk:{
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 32,
        color: 'white',
        textAlign: 'center',
    }
});
