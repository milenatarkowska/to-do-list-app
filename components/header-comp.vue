<template>
  <div class="navbar-comp">
    <div class="right">
      <!-- zmiana motywow jasny/ciemny -->
    </div>
    <div class="left">
      <div class="card flex justify-center">
        <Drawer v-model:visible="visible" header="Your to-do lists">
          <Button label="Add new list" icon="pi pi-plus" />
        </Drawer>
        <Button icon="pi pi-arrow-right" @click="visible = true" />
      </div>
    </div>
  </div>
</template>


<script setup>
import Button from 'primevue/button';

import Drawer from 'primevue/drawer';

import { ref } from "vue";

const visible = ref(false);
</script>
