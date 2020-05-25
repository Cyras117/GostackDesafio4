import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
class TransactionsRepository {
  private transactions: Transaction[];
  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
   return this.transactions;
  }
  private getValue(type:string){
    let sum:number = 0;
    for(let t of this.transactions){
      if(type === t.type){
        sum = sum + t.value;
      }
    }
    return sum;
  }
  public getBalance(): Balance {
    const income = this.getValue('income');
    const outcome = this.getValue('outcome');
    const total = income - outcome;
    return ({income,outcome,total});
  }

  public create(title: string, value: number, type:'income'|'outcome'): Transaction {
    const transaction = new Transaction({title,value,type});
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
