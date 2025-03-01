<template>
  <div>
    <h3>History</h3>
    <input
      v-model="searchQuery"
      type="text"
      placeholder="search for transaction"
    />
    <ul id="list" class="list">
      <li
        v-for="transaction in filteredTransaction"
        :key="transaction.id"
        :class="transaction.amount < 0 ? 'minus' : 'plus'"
      >
        {{ transaction.text }} <span>${{ transaction.amount }}</span
        ><button @click="deleteTransaction(transaction.id)" class="delete-btn">
          x
        </button>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { defineProps, ref, computed } from "vue";

// Define emit events
const emit = defineEmits(["transactionDeleted"]);
const searchQuery = ref("");
const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
});

//Search transaction
const filteredTransaction = computed(() => {
  return props.transactions.filter((transaction) =>
    Object.values(transaction).some((val) =>
      String(val).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );
});

// Delete transaction
const deleteTransaction = (id) => {
  emit("transactionDeleted", id);
};
</script>
