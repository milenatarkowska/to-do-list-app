<template>
  <div class="header">
    <div class="left">
      <div class="card flex justify-center">
        <Drawer v-model:visible="visible" header="Your to-do lists">
          <div class="lists-container">
            <div
              v-for="list in lists"
              :key="list.id"
              class="list-item"
              @click="selectList(list.id)"
            >
              {{ list.name }}
            </div>
          </div>
          <hr>
          <Button
            label="Add new list"
            icon="pi pi-plus"
            class="custom-colors"
            @click="showDialog"
          />
        </Drawer>
        <Button
          icon="pi pi-arrow-right"
          class="custom-colors"
          @click="visible = true"
          :label="activeListName"
        />

        <Dialog
          v-model:visible="displayDialog"
          header="New List"
          :modal="true"
          :style="{ width: '350px' }"
        >
          <div class="dialog-content">
            <InputText
              v-model="newListName"
              placeholder="Enter list name"
              autofocus
              @keyup.enter="addNewList"
              class="dialog-input"
            />
          </div>
          <template #footer>
            <Button
              label="Cancel"
              icon="pi pi-times"
              @click="displayDialog = false"
              class="p-button-text"
            />
            <Button
              label="Add"
              icon="pi pi-check"
              @click="addNewList"
              class="custom-colors"
              :disabled="!newListName.trim()"
            />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';



const emit = defineEmits(['add-list', 'select-list']);

const visible = ref(false);
const displayDialog = ref(false);
const lists = ref([]);
const newListName = ref('');

onMounted(() => {
  const savedLists = localStorage.getItem("toDoLists");
  if (savedLists) {
    lists.value = JSON.parse(savedLists);
  } else {
    const defaultList = { id: Date.now(), name: 'Main List' };
    lists.value = [defaultList];
    saveLists();
    emit('select-list', defaultList.id);
  }
});

const showDialog = () => {
  newListName.value = "";
  displayDialog.value = true;
};

const addNewList = () => {
  if (!newListName.value.trim()) return;

  const newList = {
    id: Date.now(),
    name: newListName.value.trim()
  };

  lists.value.push(newList);
  saveLists();
  displayDialog.value = false;
  visible.value = false;
  emit('select-list', newList.id);
};

const selectList = (listId) => {
  emit('select-list', listId);
  visible.value = false;
};

const saveLists = () => {
  localStorage.setItem('toDoLists', JSON.stringify(lists.value));
};
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

.lists-container {
  margin: 1rem 0;
  max-height: 60vh;
  overflow-y: auto;
}

.list-item {
  padding: 0.75rem;
  margin: 0.25rem 0;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.list-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.dialog-content {
  padding: 1rem 0;
}

.dialog-input {
  width: 100%;
}
</style>
