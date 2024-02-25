import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { AccountValidationService } from '../services/accountValidationService';

const app = express();
const PORT = 3000;


// In-memory storage
let accounts: AccountDTO[] = [];

// parses JSON from request body for all requests
app.use(bodyParser.json());

const accountValidationService = new AccountValidationService();

// Create account
app.post('/accounts', (req: Request, res: Response) => {
  try {
    const newAccount: AccountDTO = req.body;
    accountValidationService.validate(newAccount);
    accounts.push(newAccount);
    return res.status(201).json(newAccount);
  } catch (e) {
    console.error('Error creating account: ', e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }  
});

// Get all accounts
app.get('/accounts', (req: Request, res: Response) => {
  res.json(accounts);
});

// Get account by id
app.get('/accounts/:id', (req: Request, res: Response) => {

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
  
});

// Update existing account
app.put('/accounts/:id', (req: Request, res: Response) => {
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
  
});

// Delete account by id
app.delete('/accounts/:id', (req: Request, res: Response) => {
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
  
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
