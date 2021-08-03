import {useQuery} from "@apollo/client";
import {BudgetQueryResultList, GET_BUDGETS, GetBudgetsVariables} from "../../graphql/BudgetQuery";
import {Pressable, StyleSheet, Text, View} from "react-native";
import React from "react";
import {RouteProp} from "@react-navigation/native";
import {RootStackParamList} from "../../../App";
import {StackNavigationProp} from "@react-navigation/stack";
import {Budget} from "../../models/Budget";

interface Props {
    route: RouteProp<RootStackParamList, "Budget Details">;
    navigation: StackNavigationProp<RootStackParamList>;
}

export const BudgetSelectionScreen = (props: Props) => {
    const {data} = useQuery<BudgetQueryResultList, GetBudgetsVariables>(GET_BUDGETS, {variables: {userId: 1}});

    const handleSelectBudget = (budget: Budget) => () => {
        props.navigation.setParams({
            budgetId: budget.id,
            budgetTitle: budget.title,
            isHeaderDropdownVisible: !props.route.params.isHeaderDropdownVisible,
        });
    }

    return (
        <View style={styles.container}>
            {data?.budgets.map(budget => (
                <Pressable key={budget.id} onPress={handleSelectBudget(budget)} style={styles.budgetCard}>
                    <Text>{budget.title}</Text>
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eee",
        padding: 20
    },
    budgetCard: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 5,
        padding: 10,
        backgroundColor: "white",
        shadowColor: "black",
        shadowOpacity: 0.15,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 }
    }
})
