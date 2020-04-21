import { getCustomRepository } from 'typeorm';
import { isUuid } from 'uuidv4';
import AppError from '../errors/AppError';

// import Transiction from '../models/Transaction';

import TransactionRepository from '../repositories/TransactionsRepository';

interface RequestDTO {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: RequestDTO): Promise<void> {
    const transictionRepository = getCustomRepository(TransactionRepository);

    if (!isUuid(id)) {
      throw new AppError('Invalid parameter');
    }

    const transaction = await transictionRepository.findOne(id);

    if (!transaction) {
      throw new AppError('Transaction does not exist');
    }

    await transictionRepository.remove(transaction);
  }
}

export default DeleteTransactionService;
