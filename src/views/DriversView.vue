<template>
    <div>
        <div class="flex justify-between items-center">
            <h1 class="font-bold lg:text-2xl text-xl text-gray-500 mb-5"> CONDUCTORES</h1>

            <button
                class="flex items-center justify-center bg-[#f13131] text-white font-semibold px-5 py-2 rounded-lg hover:bg-red-500 shadow-md"
                @click="openCreateForm">
                Crear +
            </button>
        </div>
        <RoutesTable :routes="routes" />
        <CreateDriverForm v-if="isCreateFormVisible" @close="closeCreateForm" @driverCreated="fetchRoutes" />
    </div>


</template>

<script>
import { ref, onMounted } from 'vue';
import { listDriversApi } from '@/api/DriverService';
import CreateDriverForm from '@/components/driver/CreateDriverForm.vue'
import RoutesTable from '@/components/driver/DriversTable.vue';
import store from '@/store';

export default {
    components: { RoutesTable, CreateDriverForm },
    setup() {
        const routes = ref([]);
        const isCreateFormVisible = ref(false);
        const openCreateForm = () => {
            isCreateFormVisible.value = true;
        };

        const closeCreateForm = () => {
            isCreateFormVisible.value = false;
        };
        const fetchRoutes = async () => {
            try {
                const token = store.state.token;
                const response = await listDriversApi(token);
                routes.value = response.data.data;
            } catch (error) {
                console.error('Error al obtener las rutas:', error);
            }
        };

        onMounted(fetchRoutes);

        return {
            routes,
            isCreateFormVisible,
            openCreateForm,
            closeCreateForm,
            fetchRoutes
        };
    },
};
</script>
