<template>
  <div class="header">
    <div class="left">
      <div class="card flex justify-center">
        <Drawer v-model:visible="visible" header="Your to-do lists">
          <hr>
          <br>
          <Button label="Add new list" icon="pi pi-plus" class="custom-colors"/>
        </Drawer>
        <Button icon="pi pi-arrow-right" class="custom-colors" @click="visible = true" />
      </div>
    </div>
    <div class="right">
      <Button icon="pi pi-plus" class="custom-colors" aria-label="Add" />
    </div>
  </div>
</template>


<script setup>
import Button from 'primevue/button';

import Drawer from 'primevue/drawer';


import { ref } from "vue";

const visible = ref(false);
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
}
.custom-colors {
  background-color: var(--accent) !important;
  border: none;
  color: #fbfbfe !important;
  transition: all 0.3s ease-in-out;
}
.custom-colors:hover {
    background-color: var(--accent) !important;
    box-shadow: 0 0 10px #f4f2ef, 0 0 20px #f4f2ef;
    transform: scale(1.02);
    border: #f4f2ef !important;
}
</style>
