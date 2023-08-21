import React, {useState} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import Recommendations from './Recommendations';
import WelcomeScreen from './WelcomeScreen';
import ManualSettings from "./ManualSettings";
import Calibration from "./Calibration";
import Settings from './Settings';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import eng from './translations/eng.json';
import uk from './translations/uk.json';
import Language from './Langauge'


i18n
    .use(initReactI18next)
    .init({
        resources: {
            eng: {
                translation: eng
            },
            uk: {
                translation: uk
            }
        },
        compatibilityJSON: 'v3',
        lng: 'eng',
        fallbackLng: 'eng',
        interpolation: {
            escapeValue: false
        }
    });
const App = () => {
    const [isWelcomeScreenCompleted, setIsWelcomeScreenCompleted] = useState(false);
    const handleWelcomeScreenComplete = () => {
        setIsWelcomeScreenCompleted(true);
    }
    const Stack = createStackNavigator()


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="WelcomeScreen"
                        component={WelcomeScreen}
                        options={{ headerShown: false, gestureEnabled: false }}
                    />
                    <Stack.Screen
                        name="ManualSettings"
                        component={ManualSettings}
                        options={{ headerShown: false, gestureEnabled: false }}
                    />
                    <Stack.Screen
                        name="Calibration"
                        component={Calibration}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Recommendations"
                        component={Recommendations}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Settings"
                        component={Settings}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Language"
                        component={Language}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>

    );
};

export default App;
