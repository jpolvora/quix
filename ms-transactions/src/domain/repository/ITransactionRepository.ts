import { TransactionDTO } from '@/data/dto/TransactionDTO';


export interface ITransactionRepository {
    deposit(accountId: string, value: number): Promise<TransactionDTO>;

    getAllTransactionsByAccount(accountId: string): Promise<TransactionDTO[]>;
}
