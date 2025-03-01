<template>
  <div>
    <h4>Your Balance</h4>
    <h1 id="balance">${{ total }}</h1>
  </div>
</template>
<script setup>
import { defineProps } from "vue";

// Define prop data
const Props = defineProps({
  total: {
    type: Number,
    required: true,
  },
});
</script>
