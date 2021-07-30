export interface Budget {
    id: number;
    title: string;
}

export interface BudgetSubmissionView extends Pick<Budget, "title"> {}
