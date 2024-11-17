<template>
    <div
        v-if="dialog"
        class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
    >
        <div class=" overflow-y-auto bg-white rounded-lg shadow-lg max-w-md w-full p-6" style="max-height: 90vh; margin-bottom: 1rem;">
            <h2 class="text-xl font-semibold text-gray-700 mb-4 text-center">Crear Nuevo Conductor</h2>
            <form @submit.prevent="submitForm">
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-500 mb-1">Código</label>
                    <input
                        type="text"
                        v-model="form.code"
                        class="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-500 mb-1">Documento</label>
                    <input
                        type="text"
                        v-model="form.identification_document"
                        class="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-500 mb-1">Nombre</label>
                    <input
                        type="text"
                        v-model="form.name"
                        class="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-500 mb-1">Correo</label>
                    <input
                        type="email"
                        v-model="form.email"
                        class="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-500 mb-1">Tipo de licencia</label>
                    <input
                        type="text"
                        v-model="form.license_type"
                        class="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-500 mb-1">Fecha de expiración de licencia</label>
                    <input
                        type="date"
                        v-model="form.license_expiration_date"
                        class="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-500 mb-1">Puntos de Licencia</label>
                    <input
                        type="number"
                        v-model="form.license_points"
                        class="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-500 mb-1">Identificador de compañía</label>
                    <input
                        type="text"
                        v-model="form.company_identifier"
                        class="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div class="flex justify-end space-x-2">
                    <button
                        type="button"
                        @click="closeDialog"
                        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { createDriversApi } from '@/api/DriverService';
import store from '@/store';

export default {
    emits: ['close', 'driverCreated'],
    setup(props, { emit }) {
        const dialog = ref(true);
        const form = ref({
            code: '',
            identification_document: '',
            name: '',
            email: '',
            license_type: '',
            license_expiration_date: '',
            license_points: '',
            company_identifier: ''
        });

        const closeDialog = () => {
            emit('close');
        };

        const submitForm = async () => {
            try {
                const token = store.state.token;
                const payload = {
                    code: form.value.code,
                    identification_document: form.value.identification_document,
                    name: form.value.name,
                    email: form.value.email,
                    license_type: form.value.license_type,
                    license_expiration_date: form.value.license_expiration_date,
                    license_points: Number(form.value.license_points),
                    company_identifier: form.value.company_identifier
                };
                await createDriversApi(token, payload);
                emit('driverCreated');
                closeDialog();
            } catch (error) {
                console.error('Error al crear el conductor:', error);
            }
        };

        return {
            dialog,
            form,
            closeDialog,
            submitForm
        };
    }
};
</script>
