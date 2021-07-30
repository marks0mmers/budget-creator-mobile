import React, {useCallback, useEffect, useState} from "react";
import {
    FlatList,
    ListRenderItemInfo,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import {useMutation, useQuery} from "@apollo/client";
import {
    ADD_BUDGET,
    AddBudgetResult, AddBudgetVariables,
    BudgetQueryResultList,
    GET_BUDGETS,
    GetBudgetsVariables
} from "../../graphql/BudgetQuery";
import {Budget} from "../../models/Budget";
import {NavigationProp} from "@react-navigation/native";
import {HeaderButton} from "../shared/HeaderButton";

interface Props {
    navigation: NavigationProp<any>
}

export const HomeScreen = (props: Props) => {
    const [budgets, setBudgets] = useState<Budget[]>([]);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButton
                    name="add"
                    onPress={async () => {
                        await addBudget({variables: {
                            userId: 1,
                            budgetInput: {
                                title: "Testing"
                            }
                        }});
                    }}
                />
            )
        })
    }, []);

    const {data, error, loading} = useQuery<BudgetQueryResultList, GetBudgetsVariables>(GET_BUDGETS, {variables: {userId: 1}});
    const [addBudget, {data: addBudgetData}] = useMutation<AddBudgetResult, AddBudgetVariables>(ADD_BUDGET)

    useEffect(() => {
        if (data) {
            setBudgets(data.budgets);
        }
    }, [data]);

    useEffect(() => {
        if (addBudgetData?.addBudget) {
            setBudgets([...budgets, addBudgetData.addBudget])
        }
    }, [addBudgetData]);

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
                data={budgets}
                extraData={budgets}
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
