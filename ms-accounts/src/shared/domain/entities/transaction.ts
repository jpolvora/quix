import BankAccount from "./bank-account"


export default class Transaction {
    constructor(
        private readonly source: BankAccount,
        private readonly target: BankAccount) {
    }
}
