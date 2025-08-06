<template>
  <div class="home-comp">
    <div class="message">
      <h1><b>{{t('landing')}}</b></h1>
    </div>
    <div class="button">
      <router-link to="/app"><Button size="large">{{ t('btnText') }}</Button></router-link>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style scoped>
.home-comp {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  text-align: center;
  gap: 1rem;
}
.message {
  font-size: 2rem;
}
.button {
  scale: 1.5;
}
</style>
