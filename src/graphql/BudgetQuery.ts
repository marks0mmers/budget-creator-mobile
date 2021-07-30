import {gql} from "@apollo/client";
import {Budget, BudgetSubmissionView} from "../models/Budget";

export interface BudgetQueryResultList {
    budgets: Budget[];
}

export interface GetBudgetsVariables {
    userId: number;
}

export const GET_BUDGETS = gql`
    query GetBudgets($userId: Int!) {
        budgets(userId: $userId) {
            id
            title
        }
    }
`

export interface AddBudgetResult {
    addBudget: Budget;
}

export interface AddBudgetVariables {
    userId: number;
    budgetInput: BudgetSubmissionView;
}

export const ADD_BUDGET = gql`
    mutation addBudget($userId: Int!, $budgetInput: BudgetSubmissionView!) {
        createBudget(budgetInput: $budgetInput, userId: $userId) {
            id
            title
        }
    }
`
