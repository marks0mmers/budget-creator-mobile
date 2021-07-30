import React, {useCallback, useEffect} from "react";
import {
    Alert,
    Button,
    FlatList,
    ListRenderItemInfo,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {useQuery} from "@apollo/client";
import {GET_BUDGETS} from "../../graphql/BudgetQuery";
import {Budget} from "../../models/Budget";
import {NavigationProp} from "@react-navigation/native";
import {Icon} from "react-native-elements";
import {HeaderButton} from "../shared/HeaderButton";

interface Props {
    navigation: NavigationProp<any>
}

export const HomeScreen = (props: Props) => {
    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButton name="add" />
            )
        })
    }, []);

    const {data, error, loading} = useQuery<{ budgets: Budget[] }>(GET_BUDGETS);

    const renderBudget = useCallback(({item}: ListRenderItemInfo<Budget>) => (
        <TouchableOpacity style={styles.item} onPress={() => {
            props.navigation.navigate("Budget Details");
        }}>
            <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
    ), []);

    return (
        <SafeAreaView style={styles.container}>
        {
            data?.budgets && !loading &&
            <FlatList
                style={styles.budgetList}
                data={data.budgets}
                renderItem={renderBudget}
                keyExtractor={item => item.id.toString()}
            />
        }
    {
        error &&
        <Text style={styles.error}>{error.message}</Text>
    }
    </SafeAreaView>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    budgetList: {
        width: "100%"
    },
    item: {
        padding: 15,
    },
    title: {
        fontSize: 20,
        textAlign: "center"
    },
    error: {
        color: "red",
        fontWeight: "bold"
    }
});
