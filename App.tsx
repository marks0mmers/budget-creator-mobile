// noinspection JSUnusedGlobalSymbols

import React from 'react';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {StatusBar} from "expo-status-bar";
import Constants from "expo-constants";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {HomeScreen} from "./src/views/screens/HomeScreen";
import {BudgetDetailScreen} from "./src/views/screens/BudgetDetailScreen";
import {StyleSheet} from "react-native";

console.log(Constants.manifest)

const client = new ApolloClient({
    uri: `https://budget-creator-backend.herokuapp.com/graphql`,
    cache: new InMemoryCache()
})

const Stack = createStackNavigator();

const App = () => {
    return (
        <ApolloProvider client={client}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: styles.header,
                        headerLeftContainerStyle: styles.headerLeft,
                        headerRightContainerStyle: styles.headerRight,
                        headerTitleStyle: styles.headerTitle,
                        headerBackTitleVisible: false,
                        headerTintColor: "white",
                    }}
                >
                    <Stack.Screen name="Home" component={HomeScreen} options={{title: "Budgets"}}/>
                    <Stack.Screen name="Budget Details" component={BudgetDetailScreen} />
                </Stack.Navigator>
            </NavigationContainer>
            <StatusBar/>
        </ApolloProvider>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "rgb(185, 23, 23)",
    },
    headerLeft: {
        paddingLeft: 10
    },
    headerRight: {
        paddingRight: 10
    },
    headerTitle: {
        color: "white",
        fontSize: 24
    }
})

export default App;
