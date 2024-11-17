<template>
    <div v-if="driver" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4">
        <div class="overflow-y-auto bg-white rounded-lg shadow-lg max-w-md w-full p-6 " style="max-height: 90vh; margin-bottom: 1rem;">
            <h2 class="text-lg font-semibold text-gray-700 mb-4">Editar Conductor</h2>
            <form @submit.prevent="submitUpdate">
                <!-- Código (Deshabilitado) -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-500 mb-1">Código</label>
                    <input
                        type="text"
                        v-model="editedDriver.code"
                        class="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled
                    />
                </div>

                <!-- Documento de Identificación -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Documento</label>
                    <input
                        type="text"
                        v-model="editedDriver.identification_document"
                        class="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <!-- Nombre -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input
                        type="text"
                        v-model="editedDriver.name"
                        class="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <!-- Email -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        v-model="editedDriver.email"
                        class="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <!-- Tipo de Licencia -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Licencia</label>
                    <input
                        type="text"
                        v-model="editedDriver.license_type"
                        class="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <!-- Fecha de Expiración de la Licencia -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Expiración de Licencia</label>
                    <input
                        type="date"
                        v-model="editedDriver.license_expiration_date"
                        class="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <!-- Puntos de Licencia -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Puntos de Licencia</label>
                    <input
                        type="number"
                        v-model="editedDriver.license_points"
                        class="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <!-- Identificador de Compañía -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Identificador de Compañía</label>
                    <input
                        type="text"
                        v-model="editedDriver.company_identifier"
                        class="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <!-- Botones de Acción -->
                <div class="flex justify-end space-x-2 mt-4">
                    <button @click="$emit('close')" type="button" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
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
        driver: {
            type: Object,
            required: true,
        },
    },
    emits: ['close', 'updateDriver'],
    setup(props, { emit }) {
        const editedDriver = ref({ ...props.driver });

        watch(
            () => props.driver,
            (newDriver) => {
                editedDriver.value = { ...newDriver };
            }
        );

        const submitUpdate = () => {
            emit('updateDriver', editedDriver.value); // Emite los datos actualizados al componente padre
            emit('close'); // Cierra el modal
        };

        return {
            editedDriver,
            submitUpdate,
        };
    },
};
</script>
