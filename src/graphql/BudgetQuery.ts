import {gql} from "@apollo/client";

export const GET_BUDGETS = gql`
    query GetBudgets {
        budgets(userId: 1) {
            id
            title
        }
    }
`
