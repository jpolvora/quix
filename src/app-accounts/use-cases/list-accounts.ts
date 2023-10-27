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

    /**
    * list-all-accounts
    *
    * @param page the page number
    * @param pageSize the page size
    * @returns the list of accounts according to page & pageSize parameters
    */
    execute(page: number, pageSize: number): Promise<ListAccountOutput>
}