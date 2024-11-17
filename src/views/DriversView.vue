<template>
    <div>
        <div class="flex justify-between items-center">
            <h1 class="font-bold lg:text-2xl text-xl text-gray-500 mb-5">CONDUCTORES</h1>

            <button
                class="flex items-center justify-center bg-[#f13131] text-white font-semibold px-5 py-2 rounded-lg hover:bg-red-500 shadow-md"
                @click="openCreateForm"
            >
                Crear +
            </button>
        </div>
        
        <!-- Tabla de Conductores -->
        <RoutesTable :routes="routes" @editRoute="openEditForm" />

        <!-- Formulario para Crear un Conductor -->
        <CreateDriverForm v-if="isCreateFormVisible" @close="closeCreateForm" @driverCreated="fetchRoutes" />

        <!-- Formulario para Editar un Conductor -->
        <EditDriverForm 
            v-if="isEditFormVisible" 
            :driver="selectedDriver" 
            @close="closeEditForm" 
            @updateDriver="handleUpdateDriver" 
        />
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { listDriversApi, updateDriversApi } from '@/api/DriverService';
import CreateDriverForm from '@/components/driver/CreateDriverForm.vue';
import EditDriverForm from '@/components/driver/EditDriverForm.vue';
import RoutesTable from '@/components/driver/DriversTable.vue';
import store from '@/store';

export default {
    components: { RoutesTable, CreateDriverForm, EditDriverForm },
    setup() {
        const routes = ref([]);
        const isCreateFormVisible = ref(false);
        const isEditFormVisible = ref(false);
        const selectedDriver = ref(null);

        const openCreateForm = () => {
            isCreateFormVisible.value = true;
        };

        const closeCreateForm = () => {
            isCreateFormVisible.value = false;
        };

        const openEditForm = (driver) => {
            selectedDriver.value = { ...driver };
            isEditFormVisible.value = true;
        };

        const closeEditForm = () => {
            isEditFormVisible.value = false;
        };

        const fetchRoutes = async () => {
            try {
                const token = store.state.token;
                const response = await listDriversApi(token);
                routes.value = response.data.data;
            } catch (error) {
                console.error('Error al obtener los conductores:', error);
            }
        };

        const handleUpdateDriver = async (updatedDriver) => {
            try {
                const token = store.state.token;
                const payload = {
                    code: updatedDriver.code,
                    identification_document: updatedDriver.identification_document,
                    name: updatedDriver.name,
                    email: updatedDriver.email,
                    license_type: updatedDriver.license_type,
                    license_expiration_date: updatedDriver.license_expiration_date,
                    license_points: updatedDriver.license_points,
                    company_identifier: updatedDriver.company_identifier,
                };

                await updateDriversApi(token, payload);
                await fetchRoutes(); 
                closeEditForm();
            } catch (error) {
                console.error('Error al actualizar el conductor:', error);
            }
        };

        onMounted(fetchRoutes);

        return {
            routes,
            isCreateFormVisible,
            isEditFormVisible,
            selectedDriver,
            openCreateForm,
            closeCreateForm,
            openEditForm,
            closeEditForm,
            fetchRoutes,
            handleUpdateDriver,
        };
    },
};
</script>
