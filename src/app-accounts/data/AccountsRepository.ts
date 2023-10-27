import { PrismaClient } from '@prisma/client/edge'
import BankAccount, { BankAccountType } from "../../shared/domain/entities/bank-account";
import { randomUUID } from "crypto";

export default class AccountsRepository {

    constructor(private readonly prisma: PrismaClient) { }

    async getAccounts(skip: number, take: number): Promise<BankAccount[]> {
        const result: BankAccount[] = [];
        console.log({ skip, take })
        const data = await this.prisma.accounts.findMany({
            skip,
            take
        })

        console.log(data)

        data.map(item => {
            const account = new BankAccount(item.id, item.account_type as BankAccountType);
            result.push(account);
        })

        return result;

        // return [
        //     new BankAccount(randomUUID(), 'Corrente')
        // ]
    }
}