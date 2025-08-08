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
            >
              <div class="list-item-content" @click="selectList(list.id)">
                {{ list.name }}
              </div>
              <Button
                icon="pi pi-trash"
                class="p-button-text p-button-danger"
                @click="confirmDeleteList(list)"
              />
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
          :label="props.activeListName"
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

        <Dialog
          v-model:visible="deleteDialogVisible"
          header="Confirm Deletion"
          :modal="true"
          :style="{ width: '350px' }"
        >
          <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span>Are you sure you want to delete this list?</span>
          </div>
          <template #footer>
            <Button
              label="No"
              icon="pi pi-times"
              @click="deleteDialogVisible = false"
              class="p-button-text"
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              @click="deleteList"
              class="p-button-danger"
              autofocus
            />
          </template>
        </Dialog>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';

const props = defineProps({
  activeListName: {
    type: String,
    default: 'Select list'
  }
});

const emit = defineEmits(['add-list', 'select-list', 'delete-list']);

const visible = ref(false);
const displayDialog = ref(false);
const deleteDialogVisible = ref(false);
const lists = ref([]);
const newListName = ref('');
const listToDelete = ref(null);

onMounted(() => {
  const savedLists = localStorage.getItem("toDoLists");
  if (savedLists) {
    try {
      lists.value = JSON.parse(savedLists);
    } catch (e) {
      console.error('Error parsing saved lists', e);
      createDefaultList();
    }
  } else {
    createDefaultList();
  }
});

function createDefaultList() {
  const defaultList = { id: Date.now(), name: 'Main List', tasks: [] };
  lists.value = [defaultList];
  saveLists();
  emit('select-list', defaultList.id);
}

const showDialog = () => {
  newListName.value = "";
  displayDialog.value = true;
};

const addNewList = () => {
  if (!newListName.value.trim()) return;

  const newList = {
    id: Date.now(),
    name: newListName.value.trim(),
    tasks: []
  };

  lists.value.push(newList);
  saveLists();
  displayDialog.value = false;
  visible.value = false;
  emit('add-list', newList);
  emit('select-list', newList.id);
};

const selectList = (listId) => {
  emit('select-list', listId);
  visible.value = false;
};

const confirmDeleteList = (list) => {
  listToDelete.value = list;
  deleteDialogVisible.value = true;
};

const deleteList = () => {
  if (!listToDelete.value) return;

  const index = lists.value.findIndex(list => list.id === listToDelete.value.id);
  if (index !== -1) {
    lists.value.splice(index, 1);
    saveLists();
    emit('delete-list', listToDelete.value.id);
  }

  deleteDialogVisible.value = false;
  listToDelete.value = null;
};

const saveLists = () => {
  const listsToSave = lists.value.map(list => ({
    id: list.id,
    name: list.name,
    tasks: list.tasks || []
  }));
  localStorage.setItem('toDoLists', JSON.stringify(listsToSave));
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  margin: 0.25rem 0;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  transition: background 0.2s;
}

.list-item-content {
  flex-grow: 1;
  cursor: pointer;
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

.confirmation-content {
  display: flex;
  align-items: center;
  padding: 1rem;
}
</style>
