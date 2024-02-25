const express = require("express");

const {
  getAccounts,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
} = require("../controllers/accountController");

const router = express.Router();

// Creating the routes for the Account controller
router.get("/accounts", getAccounts);

router.get("/accounts/:id", getAccount);

router.post("/accounts", createAccount);

router.patch("/accounts/:id", updateAccount);

router.delete("/accounts/:id", deleteAccount);

module.exports = router;