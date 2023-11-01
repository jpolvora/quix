class BankAccount {
  private balance: number
  public readonly accountNumber: string
  public readonly accountHolder: string

  constructor(accountNumber: string, accountHolder: string, initialBalance: number = 0) {
    this.accountNumber = accountNumber
    this.accountHolder = accountHolder
    this.balance = initialBalance
  }

  getBalance(): number {
    return this.balance
  }

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount
      console.log(`Deposit of $${amount} into account ${this.accountNumber}. New balance: $${this.balance}`)
    }
  }

  withdraw(amount: number): void {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount
      console.log(`Withdrawal of $${amount} from account ${this.accountNumber}. New balance: $${this.balance}`)
    } else {
      console.log('Insufficient balance for withdrawal.')
    }
  }
}

class TransferBetweenAccounts {
  static performTransfer(source: BankAccount, target: BankAccount, amount: number): void {
    if (amount > 0 && source.getBalance() >= amount) {
      source.withdraw(amount)
      target.deposit(amount)
      console.log(
        `Transfer of $${amount} completed from account ${source.accountNumber} to account ${target.accountNumber}`,
      )
    } else {
      console.log('Transfer cannot be completed due to insufficient balance or invalid amount.')
    }
  }
}
