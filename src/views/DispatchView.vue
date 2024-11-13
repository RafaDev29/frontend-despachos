<template>
    <div>
      <div class="flex justify-between items-center">
        <h1 class="font-bold lg:text-2xl text-xl text-gray-500 mb-5">DESPACHOS</h1>
        <button
          class="flex items-center justify-center bg-[#f13131] text-white font-semibold px-5 py-2 rounded-lg hover:bg-red-500 shadow-md"
          @click="openCreateForm"
        >
          Crear +
        </button>
      </div>
  
      <!-- Componente de búsqueda de fecha -->
      <DateSearch @search="fetchRoutes" />
      <CreateDispatchForm v-if="isCreateFormVisible" @close="closeCreateForm" @driverCreated="fetchRoutes" />
      <RoutesTable :routes="routes" />
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { listDispatchApi } from '@/api/DispatchService';
  import RoutesTable from '@/components/dispatch/dispatchTable.vue';
  import DateSearch from '@/components/dispatch/DateSearch.vue';
  import CreateDispatchForm from '@/components/dispatch/CreateDispatchForm.vue';
  import store from '@/store';
  
  export default {
    components: { RoutesTable, DateSearch , CreateDispatchForm},
    setup() {
      const routes = ref([]);
      const isCreateFormVisible = ref(false);
        const openCreateForm = () => {
            isCreateFormVisible.value = true;
        };

        const closeCreateForm = () => {
            isCreateFormVisible.value = false;
        };
      const fetchRoutes = async (date = '') => {
        try {
          const token = store.state.token;
          const payload = date ? { date } : {};
          const response = await listDispatchApi(token, payload);
          routes.value = response.data.data.length ? response.data.data : null; // Si no hay datos, asigna null
        } catch (error) {
          console.error('Error al obtener las rutas:', error);
        }
      };
  
      return { routes, fetchRoutes, isCreateFormVisible,
            openCreateForm,
            closeCreateForm, };
    },
  };
  </script>
  