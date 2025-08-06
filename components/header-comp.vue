<template>
  <div class="header">
    <div class="left">
      <div class="card flex justify-center">
        <Drawer v-model:visible="visible" header="Your to-do lists">
          <Button label="Add new list" icon="pi pi-plus" />
        </Drawer>
        <Button icon="pi pi-arrow-right" @click="visible = true" />
      </div>
    </div>
    <div class="right">
      <Button icon="pi pi-plus" aria-label="Add" />
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
  padding: 0.5rem;
}

</style>
