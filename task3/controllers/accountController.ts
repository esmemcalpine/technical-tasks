import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { AccountValidationService } from '../services/accountValidationService';

const app = express();
const PORT = 3000;

// do we still need this given there is a model for this now?
interface Account {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

// In-memory storage
let accounts: Account[] = [];

// parses JSON from request body for all requests
app.use(bodyParser.json());

const accountValidationService = new AccountValidationService();

// Create account
app.post('/accounts', (req: Request, res: Response) => {
  try {
    const newAccount: Account = req.body;
    accountValidationService.validate(newAccount);
    accounts.push(newAccount);
    return res.status(201).json(newAccount);
  } catch (e) {
    return res.status(500)
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
    const account: Account | undefined = accounts.find(account => account.id === accountId);
    if (!account) {
      return res.status(404).send('Account not found');
    }

    accountValidationService.validate(account);
    return res.status(200).json(account);
    
  } catch (e) {
    return res.status(500);
  }
  
});

// Update existing account
app.put('/accounts/:id', (req: Request, res: Response) => {
  const accountId: string = req.params.id;
  const updatedAccount: Account = req.body;
  const index: number = accounts.findIndex(account => account.id === accountId);
  if (index === -1) {
    res.status(404).send('Account not found');
  } else {
    accounts[index] = updatedAccount;
    res.json(updatedAccount);
  }
});

// Delete account by id
app.delete('/accounts/:id', (req: Request, res: Response) => {
  const accountId: string = req.params.id;
  const account: Account | undefined = accounts.find(account => account.id === accountId);
  if (!account) {
    return res.status(404).send('Account not found');
  }
  accounts = accounts.filter(account => account.id !== accountId);
  return res.sendStatus(204);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
