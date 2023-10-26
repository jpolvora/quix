import { ListAccountOutput, ListAccounts } from "../use-cases/list-accounts";
import AccountsRepository from "./AccountsRepository";

export default class ListAccountsFromDb implements ListAccounts {
    constructor(private readonly repository: AccountsRepository) {

    }

    async execute(page: number, pageSize: number): Promise<ListAccountOutput> {
        const multplier = page <= 0 ? 1 : page + 1;
        const skip = pageSize * multplier;
        const data = await this.repository.getAccounts(skip, pageSize);
        
        return await Promise.resolve({
            success: true,
            data: data,
            page,
            pageSize
        })
    }
}