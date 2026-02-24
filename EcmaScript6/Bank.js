class BankAccount {
    constructor(name, accountNumber, balance = 0) {
        this.name = name;
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    deposit(amount) {
        if (amount <= 0) {
            console.log("Deposit amount must be greater than 0");
            return;
        }

        this.balance += amount;
        console.log(`₹${amount} deposited successfully`);
    }

    withdraw(amount) {
        if (amount <= 0) {
            console.log("Withdrawal amount must be greater than 0");
            return;
        }

        if (amount > this.balance) {
            console.log("Insufficient balance");
        } else {
            this.balance -= amount;
            console.log(`₹${amount} withdrawn successfully`);
        }
    }

    checkBalance() {
        console.log(`Account Holder: ${this.name}`);
        console.log(`Account Number: ${this.accountNumber}`);
        console.log(`Current Balance: ₹${this.balance}`);
    }
}

// Creating account object
const account1 = new BankAccount("Kanishk Singh", 12345, 1000);

// Performing operations
account1.deposit(500);
account1.withdraw(300);
account1.checkBalance();