<template>
  <div class="app-container">
    <div class="app-container">
      <header-comp
        :active-list-name="activeList?.name || 'Select list'"
        @add-list="handleAddList"
        @select-list="setActiveList"
        @delete-list="handleDeleteList"
      />
      <div class="to-do-container" v-if="activeList">
      <h2><b>{{ activeList.name }}</b></h2>
      <div class="add-task">
        <InputText
          v-model="newTask"
          placeholder="Add new task..."
          @keyup.enter="addTask"
        />
        <Button
          icon="pi pi-plus"
          class="custom-colors"
          @click="addTask"
        />
      </div>
      <div class="tasks">
        <div v-for="(task, index) in activeList.tasks" :key="index" class="task-item">
          <Checkbox
            v-model="task.completed"
            :binary="true"
          />
          <span :class="{ completed: task.completed }">{{ task.text }}</span>
          <Button
            icon="pi pi-trash"
            class="p-button-text p-button-danger"
            @click="removeTask(index)"
          />
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import HeaderComp from "@/components/header-comp.vue";
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';

const lists = ref([]);
const activeListId = ref(null);
const newTask = ref('');

const activeList = computed(() => {
  return lists.value.find(list => list.id === activeListId.value);
});

onMounted(() => {
  const savedLists = localStorage.getItem('toDoLists');
  if (savedLists) {
    lists.value = JSON.parse(savedLists);
    if (lists.value.length > 0) {
      activeListId.value = lists.value[0].id;
      lists.value.forEach(list => {
        if (!list.tasks) list.tasks = [];
      });
    }
  }
});

const setActiveList = (listId) => {
  activeListId.value = listId;
};

const handleAddList = (listName) => {
  const newList = {
    id: Date.now(),
    name: listName,
    tasks: []
  };
  lists.value.push(newList);
  activeListId.value = newList.id;
  saveLists();
};

const addTask = () => {
  if (!newTask.value.trim() || !activeList.value) return;

  activeList.value.tasks.push({
    text: newTask.value.trim(),
    completed: false
  });

  newTask.value = '';
  saveLists();
};

const removeTask = (index) => {
  if (!activeList.value) return;

  activeList.value.tasks.splice(index, 1);
  saveLists();
};

const saveLists = () => {
  localStorage.setItem('toDoLists', JSON.stringify(lists.value));
};

const handleDeleteList = (listId) => {
  const index = lists.value.findIndex(list => list.id === listId);
  if (index !== -1) {
    lists.value.splice(index, 1);
    saveLists();

    if (activeListId.value === listId) {
      activeListId.value = lists.value.length > 0 ? lists.value[0].id : null;
    }
  }
};
</script>

<style scoped>
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
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.to-do-container {
  padding: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.add-task {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tasks {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.task-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.completed {
  text-decoration: line-through;
  opacity: 0.7;
}
</style>
