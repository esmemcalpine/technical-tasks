import request from 'supertest';

import app from '../app';

describe('POST /accounts', () => {
  it('should create a new account with valid data', async () => {
    const newAccount = {
      id: '1',
      name: 'Esme',
      email: 'esme@mrswordsmith.com',
      phone: "0121",
      address: 'cookie lane'
    };

    const response = await request(app)
      .post('/accounts')
      .send(newAccount);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(newAccount);
  });

  it('should return 500 if account data is invalid', async () => {
    const invalidAccount = {
      id: 2,
      name: null,
      email: null,
      phone: "",
      address: null,

    };

    const response = await request(app)
      .post('/accounts')
      .send(invalidAccount);

    expect(response.status).toBe(500);
    expect(response.body.error).toBeDefined();
  });

});

