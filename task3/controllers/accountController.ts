import { Request, Response } from 'express';
import { AccountValidationService } from '../services/accountValidationService';


// In-memory storage
let accounts: AccountDTO[] = [];

const accountValidationService = new AccountValidationService();

// Create account
export const createAccount = async (req: Request, res: Response) => {
  try {
    const newAccount: AccountDTO = req.body;
    accountValidationService.validate(newAccount);
    accounts.push(newAccount);
    return res.status(201).json(newAccount);
  } catch (e) {
    console.error('Error creating account: ', e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }  
}

// Get all accounts
export const getAccounts = async (req: Request, res: Response) => {
  res.json(accounts);
}

// Get account by id
export const getAccount = async (req: Request, res: Response) => {
  try {
    const accountId: string = req.params.id;
    const account: AccountDTO | undefined = accounts.find(account => account.id === accountId);
    if (!account) {
      return res.status(404).send('Account not found');
    }

    accountValidationService.validate(account);
    return res.status(200).json(account);
    
  } catch (e) {
    console.error('Error retrieving account: ', e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Update existing account
export const updateAccount = (req: Request, res: Response) => {
  try {
    const accountId: string = req.params.id;
    const updatedAccount: AccountDTO = req.body;
    const index: number = accounts.findIndex(account => account.id === accountId);
    if (index === -1) {
      return res.status(404).send('Account not found');
    }
    accounts[index] = updatedAccount;
    return res.json(updatedAccount);
  } catch (e) {
    console.error('Error updating account: ', e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Delete account by id
export const deleteAccount = (req: Request, res: Response) => {
  try {
    const accountId: string = req.params.id;
    const account: AccountDTO | undefined = accounts.find(account => account.id === accountId);
    if (!account) {
      return res.status(404).send('Account not found');
    }
    accounts = accounts.filter(account => account.id !== accountId);
    return res.sendStatus(204);
  } catch (e) {
    console.error('Error deleting account: ', e);
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}