<template>
    <div class="flex items-center space-x-4 mb-5">
      <input
        type="date"
        v-model="selectedDate"
        class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        @click="searchByDate"
        class="bg-blue-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-600 shadow-md"
      >
        Buscar
      </button>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    emits: ['search'],
    setup(_, { emit }) {
      const selectedDate = ref('');
  
      // Configurar fecha actual al montar el componente
      onMounted(() => {
        const today = new Date().toISOString().split('T')[0];
        selectedDate.value = today;
        emit('search', selectedDate.value); // Realiza la búsqueda automáticamente con la fecha actual
      });
  
      const searchByDate = () => {
        emit('search', selectedDate.value);
      };
  
      return { selectedDate, searchByDate };
    },
  };
  </script>
  