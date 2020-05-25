import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import { response } from 'express';

interface ReqInfo{
  titulo: string;
  valor: number;
  tipo: 'income'|'outcome';
}


class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({titulo,valor,tipo}:ReqInfo): Transaction {
    if((tipo === 'outcome') &&
    (valor > this.transactionsRepository.getBalance().total)){
      throw Error('Saldo insuficiente :D');
    }
    const transaction = this.transactionsRepository.create(titulo,valor,tipo);
    return transaction;
  }

}

export default CreateTransactionService;
