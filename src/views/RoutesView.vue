<template>
    <div>
        <div class="flex justify-between items-center">
            <h1 class="font-bold lg:text-2xl text-xl text-gray-500 mb-5"> RUTAS</h1>
            <button
                class="flex items-center justify-center bg-[#f13131] text-white font-semibold px-5 py-2 rounded-lg hover:bg-red-500 shadow-md"
                @click="openCreateForm"
            >
                Crear +
            </button>
        </div>
        <CreateRoutesForm v-if="isCreateFormVisible" @close="closeCreateForm" @routeCreated="fetchRoutes" />
        <RoutesTable :routes="routes" @deleteRow="handleDeleteRoute" />
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { listRoutesApi, deleteRoutesApi } from '@/api/RoutesService';
import RoutesTable from '@/components/routes/RoutesTable.vue';
import CreateRoutesForm from '@/components/routes/CreateRutesForm.vue';
import store from '@/store';

export default {
    components: { RoutesTable, CreateRoutesForm },
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
                const response = await listRoutesApi(token);
                routes.value = response.data.data;
            } catch (error) {
                console.error('Error al obtener las rutas:', error);
            }
        };

        const handleDeleteRoute = async (code) => {
            try {
                const token = store.state.token;
                const payload = [{ code }]; // Formato requerido para la solicitud

                await deleteRoutesApi(token, payload);
                // Actualizar la lista de rutas después de eliminar
                routes.value = routes.value.filter(route => route.code !== code);
            } catch (error) {
                console.error('Error al eliminar la ruta:', error);
            }
        };

        onMounted(fetchRoutes);

        return {
            routes,
            isCreateFormVisible,
            openCreateForm,
            closeCreateForm,
            fetchRoutes,
            handleDeleteRoute,
        };
    },
};
</script>
