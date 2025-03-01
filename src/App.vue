<template>
  <div>
    <Header></Header>
    <div class="container">
      <Balance :total="+total"></Balance>
      <IncomeExpense :income="+income" :expenses="+expenses"></IncomeExpense>
      <TransactionList
        @transactionDeleted="handleTransactionDeleted"
        :transactions="transactions"
      ></TransactionList>
      <AddTransaction
        @transactionSubmitted="handleTransaction"
      ></AddTransaction>
    </div>
  </div>
</template>
<script setup>
import Header from "./components/Header.vue";
import Balance from "./components/Balance.vue";
import IncomeExpense from "./components/IncomeExpense.vue";
import TransactionList from "./components/TransactionList.vue";
import AddTransaction from "./components/AddTransaction.vue";
import { useToast } from "vue-toastification";

import { ref, computed, onMounted } from "vue";
const Toast = useToast();
const transactions = ref([]);

// Get the transactions in local storage
onMounted(() => {
  const savedTransaction = JSON.parse(localStorage.getItem("transactions"));
  if (savedTransaction) {
    transactions.value = savedTransaction;
  }
});

// Update the state value using computed property
const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);
});

// Get income
const income = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0)
    .toFixed(2);
});

// Calculate expenses and update state value
const expenses = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0)
    .toFixed(2);
});

// Handle the income and push the new value
const handleTransaction = (transactionData) => {
  transactions.value.push({
    id: generateUniqueId(),
    text: transactionData.text,
    amount: transactionData.amount,
  });
  saveTransactionToLocalStorage();
  Toast.success("Transaction added", { timeout: 2000 });
};

// Generate uniqueId for each transaction
const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000000);
};

// Delete transaction
const handleTransactionDeleted = (id) => {
  transactions.value = transactions.value.filter(
    (transaction) => transaction.id !== id
  );
  saveTransactionToLocalStorage();
  Toast.success("You deleted a transaction", { timeout: 2000 });
};

// Save to localstorage
const saveTransactionToLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions.value));
};
</script>
