import { v4 as uuidv4 } from 'uuid'

type BankAccountType = 'Corrente' | 'Poupança'

export default class BankAccount {

  private _balance: number = 0;

  constructor(
    private readonly accountNumber: string,
    private readonly type: BankAccountType) { }

  setBalance(value: number) {
    const constant: number = 100;
    var rounded = Math.round(value * constant) / constant
    this._balance = rounded;
  }

  getBalance(): number {
    return this._balance
  }

  public static Generate(): string {
    return uuidv4();
  }

  public static CreateNewAccount() {
    var account = new BankAccount(
      BankAccount.Generate(),
      "Corrente");

    account.setBalance(567.65756)

    return account;
  }
}



