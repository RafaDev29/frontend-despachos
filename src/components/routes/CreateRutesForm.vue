<template>
    <div
        v-if="dialog"
        class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
    >
        <div class="bg-white rounded-lg shadow-lg max-w-lg w-full">
            <div class="p-6 border-b">
                <h3 class="text-xl font-semibold text-center text-gray-700">Crear Nueva Ruta</h3>
            </div>
            <div class="p-6">
                <form @submit.prevent="submitForm" class="space-y-4">
                    <!-- Código -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Código</label>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="mdi mdi-rename-box text-gray-400"></i>
                            </span>
                            <input
                                type="text"
                                v-model="form.code"
                                class="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                placeholder="Código"
                                required
                            />
                        </div>
                    </div>

                    <!-- Nombre -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="mdi mdi-road-variant text-gray-400"></i>
                            </span>
                            <input
                                type="text"
                                v-model="form.name"
                                class="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                placeholder="Nombre de la ruta"
                                required
                            />
                        </div>
                    </div>

                    <!-- Paradas -->
                    <div v-for="(stop, index) in form.step_time_ids" :key="index" class="space-y-2">
                        <div class="flex items-center">
                            <div class="flex-grow">
                                <label class="block text-sm font-medium text-gray-700 mb-1">Parada {{ index + 1 }}</label>
                                <div class="relative">
                                    <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i class="mdi mdi-map text-gray-400"></i>
                                    </span>
                                    <input
                                        type="text"
                                        v-model="stop.bus_stop"
                                        class="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                        placeholder="Nombre de la parada"
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                @click="removeStop(index)"
                                class="ml-2 text-red-500 hover:text-red-700"
                                title="Eliminar parada"
                            >
                                <i class="mdi mdi-delete"></i>
                            </button>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Tiempo (min)</label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i class="mdi mdi-clock text-gray-400"></i>
                                </span>
                                <input
                                    type="number"
                                    v-model="stop.time"
                                    class="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                    placeholder="Tiempo en minutos"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Botón para añadir paradas -->
                    <div class="flex justify-start mt-4">
                        <button
                            type="button"
                            @click="addStop"
                            class="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300"
                        >
                            Añadir Parada
                        </button>
                    </div>

                    <!-- Botones de acción -->
                    <div class="flex justify-end mt-6 space-x-4">
                        <button
                            type="button"
                            @click="closeDialog"
                            class="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { createRoutesApi } from '@/api/RoutesService';
import store from '@/store';

export default {
    emits: ['close', 'routeCreated'],
    setup(props, { emit }) {
        const dialog = ref(true);
        const form = ref({
            code: '',
            name: '',
            step_time_ids: [
                { bus_stop: '', time: 0 }
            ]
        });

        const closeDialog = () => {
            emit('close');
        };

        const addStop = () => {
            form.value.step_time_ids.push({ bus_stop: '', time: 0 });
        };

        const removeStop = (index) => {
            form.value.step_time_ids.splice(index, 1);
        };

        const submitForm = async () => {
            try {
                const token = store.state.token;
                const payload = {
                    code: form.value.code,
                    name: form.value.name,
                    step_time_ids: form.value.step_time_ids.map(stop => ({
                        bus_stop: stop.bus_stop,
                        time: Number(stop.time) 
                    }))
                };
                await createRoutesApi(token, payload);
                emit('routeCreated');
                closeDialog();
            } catch (error) {
                console.error('Error al crear la ruta:', error);
            }
        };

        return {
            dialog,
            form,
            closeDialog,
            addStop,
            removeStop,
            submitForm
        };
    }
};
</script>

<style scoped></style>
