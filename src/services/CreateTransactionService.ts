import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}:Request ): Transaction {
    const verifyInvalidBalance = () => {
      return type === 'outcome' && 
      this.transactionsRepository.getBalance().total - value < 0;
    }
    
    if (verifyInvalidBalance()){
      throw Error('Insufficient budget for this transaction.')
    }else {
      const transaction = this.transactionsRepository.create(
        title,
        value, 
        type
        );

      return transaction ;
    }


  }
}

export default CreateTransactionService;
