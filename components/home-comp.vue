<template>
  <div class="home-comp">
    <div class="message">
      <h1><b>{{t('landing')}}</b></h1>
    </div>
    <div class="button">
      <router-link to="/app"><Button size="large" class="custom-button">{{ t('btnText') }}</Button></router-link>
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1rem;
  background: radial-gradient(circle, var(--primary), var(--secondary));
}
.message {
  font-size: 2rem;
}
.custom-button{
  scale: 1.5;
  background-color: var(--accent) !important;
  border: none;
  color: #fbfbfe !important;
  transition: all 0.3s ease-in-out;
}
.custom-button:hover{
  background-color: var(--accent) !important;
  box-shadow: 0 0 10px #f4f2ef, 0 0 20px #f4f2ef;
  transform: scale(1.02);
  border: #f4f2ef !important;
}
</style>
