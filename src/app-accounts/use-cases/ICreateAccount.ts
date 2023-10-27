import { Result } from "./types";
import { AccountDTO } from "../data/AccountDTO";

export type AccountOutput = Result & {
  data?: AccountDTO
}

export interface ICreateAccount {
  /**
    * create account
    *
    * @param id the account id
    * @param accountType the account type (Poupança, Corrente)
    * @returns success if account created
    */
  execute: (id: string, accountType: string) => Promise<AccountOutput>;
}
