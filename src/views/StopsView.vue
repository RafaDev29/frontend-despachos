<template>
    <div>
        <div class="flex justify-between items-center">
            <h1 class="font-bold lg:text-2xl text-xl text-gray-500 mb-5"> PARADAS</h1>

            <button
                class="flex items-center justify-center bg-[#f13131] text-white font-semibold px-5 py-2 rounded-lg hover:bg-red-500 shadow-md"
                @click="openCreateForm">
                Crear +
            </button>
        </div>
        <CreateStopsForm v-if="isCreateFormVisible" @close="closeCreateForm" @stopCreated="fetchRoutes" />
        <StopsTable :items="items" @deleteItem="DeleteItem" @editItem="openEditForm" />

        <!-- Modal de Edición -->
        <EditStopModal v-if="isEditModalVisible" :route="selectedRoute" @close="closeEditForm"
            @updateRoute="handleUpdateRoute" />
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { listStopsApi, deleteStopsApi, updateStopsApi } from '@/api/StopsService';
import StopsTable from '@/components/stops/StopsTable.vue';
import CreateStopsForm from '@/components/stops/CreateStopsForm.vue';
import EditStopModal from '@/components/stops/EditStopModal.vue';
import store from '@/store';

export default {
    components: { StopsTable, CreateStopsForm, EditStopModal },
    setup() {
        const items = ref([]);
        const isCreateFormVisible = ref(false);
        const isEditModalVisible = ref(false);
        const selectedRoute = ref(null);

        const openCreateForm = () => {
            isCreateFormVisible.value = true;
        };

        const closeCreateForm = () => {
            isCreateFormVisible.value = false;
        };

        const openEditForm = (route) => {
            selectedRoute.value = { ...route };
            isEditModalVisible.value = true;
        };

        const closeEditForm = () => {
            isEditModalVisible.value = false;
        };

        const fetchRoutes = async () => {
            try {
                const token = store.state.token;
                const response = await listStopsApi(token);
                items.value = response.data.data;
            } catch (error) {
                console.error('Error al obtener las rutas:', error);
            }
        };

        const DeleteItem = async (name) => {
            try {
                const token = store.state.token;
                const payload = [{ name }];

                await deleteStopsApi(token, payload);
                await fetchRoutes();
            } catch (error) {
                console.error('Error al eliminar la ruta:', error);
            }
        };

        const handleUpdateRoute = async (updatedRoute) => {
            try {
                const token = store.state.token;
                const payload = {
                    name: updatedRoute.name,
                    latitude: updatedRoute.latitude,
                    longitude: updatedRoute.longitude,
                };

                await updateStopsApi(token, payload);
                await fetchRoutes(); // Actualiza la lista de rutas después de guardar
                closeEditForm();
            } catch (error) {
                console.error('Error al actualizar la ruta:', error);
            }
        };

        onMounted(fetchRoutes);

        return {
            items,
            isCreateFormVisible,
            isEditModalVisible,
            selectedRoute,
            openCreateForm,
            closeCreateForm,
            openEditForm,
            closeEditForm,
            fetchRoutes,
            DeleteItem,
            handleUpdateRoute,
        };
    },
};
</script>
