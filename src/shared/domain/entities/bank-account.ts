import { randomUUID } from "crypto";

export type BankAccountType = 'Corrente' | 'Poupança'

export default class BankAccount {


  /** 
   * regras: conta poupança não aceita PIX  
   */


  private _balance: number = 0;

  constructor(
    private readonly accountNumber: string,
    private readonly type: BankAccountType) { }

  setBalance(value: number) {
    const constant: number = 100;
    var rounded = Math.round(value * constant) / constant
    this._balance = rounded;
  }

  public get Balance(): number {
    return this._balance
  }

  public static Generate(): string {
    return randomUUID();
  }

  public static CreateNewAccount() {
    var account = new BankAccount(
      BankAccount.Generate(),
      "Corrente");

    account.setBalance(567.65756)

    return account;
  }
}



