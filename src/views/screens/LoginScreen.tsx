import {ActivityIndicator, Button, SafeAreaView, StyleSheet, TextInput, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../../App";
import {useMapDispatch, useMapState} from "../../state/store";
import {getCurrentUser, login} from "../../state/user.slice";

interface Props {
    navigation: StackNavigationProp<RootStackParamList>;
}

export const LoginScreen = (props: Props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const appState = useMapState(state => ({
        loading: state.users.loading,
        currentUser: state.users.currentUser,
    }));
    const dispatch = useMapDispatch({
        login,
        getCurrentUser,
    });

    useEffect(() => {
        dispatch.getCurrentUser();
    }, []);

    useEffect(() => {
        if (appState.currentUser) {
            props.navigation.replace("Budget Details", {
                isHeaderDropdownVisible: false,
            })
        }
    }, [appState.currentUser, props.navigation]);

    const handleLogin = useCallback(() => {
        if (username.length > 0 && password.length > 0) {
            dispatch.login({
                username,
                password,
            });
        }
    }, [username, password]);

    return (
        <SafeAreaView style={styles.container}>
            { appState.loading && <ActivityIndicator /> }
            {
                !appState.currentUser &&
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                    <Button
                        title="Login"
                        onPress={handleLogin}
                    />
                </View>
            }
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        margin: 5,
        height: 40,
        padding: 10,
        borderWidth: 1
    }
})
