import {StyleSheet, Text, View} from "react-native";
import React, {useEffect} from "react";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../../App";
import {RouteProp} from "@react-navigation/native";
import {useQuery} from "@apollo/client";
import {BudgetByIdResult, GET_BUDGET_BY_ID, GetBudgetByIdVariables} from "../../graphql/BudgetQuery";

interface Props {
    navigation: StackNavigationProp<RootStackParamList>;
    route: RouteProp<RootStackParamList, "Budget Details">;
}

export const BudgetDetailScreen = (props: Props) => {
    const {data, loading} = useQuery<BudgetByIdResult, GetBudgetByIdVariables>(GET_BUDGET_BY_ID, {
        variables: {
            id: props.route.params?.budgetId ?? 0
        }
    })

    useEffect(() => {
        props.navigation.setOptions({
            title: props.route.params?.budgetTitle
        })
    }, []);

    return (
        <View style={styles.container}>
            {
                data?.budgetById && !loading &&
                <Text>{data.budgetById.title}</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
