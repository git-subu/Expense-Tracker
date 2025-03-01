<template>
  <div>
    <h3>Add new transaction</h3>
    <form id="form" @submit.prevent="onSubmit">
      <div class="form-control">
        <label for="text">Description</label>
        <input
          v-model="text"
          type="text"
          id="text"
          placeholder="Enter a transaction..."
        />
      </div>
      <div class="form-control">
        <label for="amount"
          >Amount

          <br />(negative - expense, positive - income)
        </label>
        <input
          v-model="amount"
          type="number"
          id="amount"
          placeholder="Enter amount.."
        />
      </div>
      <button class="btn">Add transaction</button>
    </form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";

const emit = defineEmits(["transactionSubmitted"]);
const text = ref("");
const amount = ref("");
const Toast = useToast();

// Validation for input transaction
const onSubmit = () => {
  if (!text.value || !amount.value) {
    Toast.error("Both fields are necessary bitch");
    text.value = "";
    amount.value = "";
    return;
  }

  const transactionData = {
    text: text.value,
    amount: parseFloat(amount.value),
  };
  emit("transactionSubmitted", transactionData);
  text.value = "";
  amount.value = "";
};
</script>
