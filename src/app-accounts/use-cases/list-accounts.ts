import BankAccount from "@/shared/domain/entities/bank-account"

export type Result = {
    success: boolean;
    error?: string
}

export type Paging = {
    page: number;
    pageSize: number
}

export type ListAccountOutput = Result & Paging & {
    data?: BankAccount[]
}

export interface ListAccounts {
    execute(page: number, pageSize: number): Promise<ListAccountOutput>
}