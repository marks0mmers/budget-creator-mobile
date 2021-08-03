// noinspection JSUnusedGlobalSymbols

import React from 'react';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {StatusBar} from "expo-status-bar";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {BudgetDetailScreen} from "./src/views/screens/BudgetDetailScreen";
import {StyleSheet} from "react-native";
import {HeaderDropdown} from "./src/views/shared/HeaderDropdown";
import {BudgetSelectionScreen} from "./src/views/screens/BudgetSelectionScreen";
import {Provider} from "react-redux";
import {store} from "./src/state/store";
import {LoginScreen} from "./src/views/screens/LoginScreen";
import {API_URL} from "./src/constants/Constants";


const client = new ApolloClient({
    uri: `${API_URL}/graphql`,
    cache: new InMemoryCache()
})

export type RootStackParamList = {
    Login: undefined
    "Budget Details": {
        budgetId?: number,
        budgetTitle?: string,
        isHeaderDropdownVisible: boolean
    },
}

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
    return (
        <Provider store={store}>
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
                        <Stack.Screen name="Login">
                            {(props) => (
                                <LoginScreen navigation={props.navigation} />
                            )}
                        </Stack.Screen>
                        <Stack.Screen
                            name="Budget Details"
                            options={(props) => {
                                const selectedBudgetTitle = props.route.params?.budgetTitle;
                                return {
                                    headerTitle: () => <HeaderDropdown
                                        route={props.route}
                                        navigation={props.navigation}
                                        title={selectedBudgetTitle || "Select a Budget"}
                                    />
                                }
                            }}
                        >
                            {(props => {
                                return props.route.params?.isHeaderDropdownVisible ? (
                                    <BudgetSelectionScreen
                                        navigation={props.navigation}
                                        route={props.route}
                                    />
                                ) : (
                                    <BudgetDetailScreen
                                        navigation={props.navigation}
                                        route={props.route}
                                    />
                                )
                            })}
                        </Stack.Screen>
                    </Stack.Navigator>
                </NavigationContainer>
                <StatusBar/>
            </ApolloProvider>
        </Provider>
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
