import BankAccount from "@/shared/domain/entities/bank-account"
import { Paging, Result } from "./types"
import { AccountDTO } from "../data/AccountDTO"

export type ListAccountOutput = Result & Paging & {
    data?: AccountDTO[]
}

export interface IListAccounts {

    /**
    * list-all-accounts
    *
    * @param page the page number
    * @param pageSize the page size
    * @returns the list of accounts according to page & pageSize parameters
    */
    execute: (page: number, pageSize: number) => Promise<ListAccountOutput>
}

