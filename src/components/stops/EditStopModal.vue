<template>
    <div v-if="route" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 class="text-lg font-semibold text-gray-700 mb-4">Editar Ruta</h2>
            <form @submit.prevent="submitUpdate">
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-500 mb-1">Nombre</label>
                    <input type="text" v-model="editedRoute.name"
                        class="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required disabled />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Latitud</label>
                    <input type="number" step="0.000000000000000001" v-model="editedRoute.latitude"
                        class="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Longitud</label>
                    <input type="number" step="0.00000000000001" v-model="editedRoute.longitude"
                        class="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required />
                </div>
                <div class="flex justify-end space-x-2">
                    <button type="button" @click="$emit('close')"
                        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                        Cancelar
                    </button>
                    <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Guardar Cambios
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
    props: {
        route: {
            type: Object,
            required: true,
        },
    },
    emits: ['close', 'updateRoute'],
    setup(props, { emit }) {
        const editedRoute = ref({ ...props.route });

        watch(
            () => props.route,
            (newRoute) => {
                editedRoute.value = { ...newRoute };
            }
        );

        const submitUpdate = () => {
            emit('updateRoute', editedRoute.value);
        };

        return {
            editedRoute,
            submitUpdate,
        };
    },
};
</script>
