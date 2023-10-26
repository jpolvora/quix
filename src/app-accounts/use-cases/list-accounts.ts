import BankAccount from "@/shared/domain/entities/bank-account"

export type Result = {
    success: boolean;
    error?: string
}

export type ListAccountOutput = Result & {
    data?: BankAccount[]
}

export interface ListAccounts {
    execute(page: number, pageSize: number): Promise<ListAccountOutput>
}