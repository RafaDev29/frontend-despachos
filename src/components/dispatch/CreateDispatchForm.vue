<template>
    <div
        v-if="dialog"
        class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
    >
        <div class="bg-white rounded-lg shadow-lg max-w-lg w-full">
            <div class="p-4 border-b">
                <h3 class="text-lg font-semibold text-center">Cargar Archivo Excel</h3>
            </div>
            <div class="p-4">
                <form @submit.prevent="submitForm">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Seleccionar archivo Excel</label>
                    <input
                        type="file"
                        @change="handleFileChange"
                        accept=".xlsx, .xls"
                        class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                        required
                    />

                    <!-- Cargando indicador -->
                    <div v-if="isLoading" class="text-center text-gray-500 mt-4">Cargando...</div>

                    <!-- Botones -->
                    <div class="flex justify-end mt-4 space-x-2">
                        <button
                            type="button"
                            @click="closeDialog"
                            class="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                            :disabled="isLoading"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            class="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                            :disabled="isLoading"
                        >
                            Subir
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { createDispatchApi } from '@/api/DispatchService';
import store from '@/store';
import Swal from 'sweetalert2';

export default {
    emits: ['close', 'fileUploaded'],
    setup(props, { emit }) {
        const dialog = ref(true);
        const file = ref(null);
        const isLoading = ref(false);

        const closeDialog = () => {
            emit('close');
        };

        const handleFileChange = (event) => {
            file.value = event.target.files[0];
        };

        const submitForm = async () => {
            if (!file.value) {
                console.error('No se ha seleccionado ningún archivo.');
                return;
            }

            isLoading.value = true;

            try {
                const token = store.state.token;
                const formData = new FormData();
                formData.append('file', file.value);

                await createDispatchApi(token, formData);
                Swal.fire({
                    icon: 'success',
                    title: '¡Archivo subido con éxito!',
                    showConfirmButton: false,
                    timer: 1500
                });
                emit('fileUploaded');
                closeDialog();
            } catch (error) {
                console.error('Error al subir el archivo:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al subir el archivo',
                    text: 'Hubo un problema al subir el archivo. Intenta nuevamente.'
                });
            } finally {
                isLoading.value = false;
            }
        };

        return {
            dialog,
            file,
            isLoading,
            closeDialog,
            handleFileChange,
            submitForm,
        };
    },
};
</script>

<style scoped>
/* Agrega estilos adicionales aquí si es necesario */
</style>
