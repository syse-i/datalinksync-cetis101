import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListScreen, DetailsScreen } from "./Screenapp";

const Stack2 = createNativeStackNavigator();

export function HomeScreen() {
    return (
        <NavigationContainer independent>
            <Stack2.Navigator initialRouteName="List">
                <Stack2.Screen name="List" component={ListScreen} options={{headerShown: false}} />
                <Stack2.Screen name="Details" component={DetailsScreen} />
            </Stack2.Navigator>
        </NavigationContainer>
    );
}