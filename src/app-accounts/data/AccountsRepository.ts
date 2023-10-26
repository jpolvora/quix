import BankAccount from "../../shared/domain/entities/bank-account";
import { randomUUID } from "crypto";

export default class AccountsRepository {
    async getAccounts(skip: number, take: number): Promise<BankAccount[]> {
        return [
            new BankAccount(randomUUID(), 'Corrente')
        ]
    }
}