import { calcSkip } from "../../shared/utils/fns";
import { IListAccounts, ListAccountOutput } from "../use-cases";
import AccountsRepository from "./DbAccountsRepository";

export default class DbListAccounts implements IListAccounts {

    constructor(private readonly repository: AccountsRepository) { }

    async execute(page: number, pageSize: number): Promise<ListAccountOutput> {
        const skip = calcSkip(page, pageSize);
        const data = await this.repository.getAccounts(skip, pageSize);

        return await Promise.resolve({
            success: true,
            data: data,
            page,
            pageSize
        })
    }
}