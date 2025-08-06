<template>
  <div class="message">
    <h1><b>{{t('landing')}}</b></h1>
  </div>
  <div class="button">
    <Button size="large">{{ t('btnText') }}</Button>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
