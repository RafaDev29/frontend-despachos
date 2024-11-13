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
                    <!-- Input de archivo -->
                    <label class="block text-sm font-medium text-gray-700 mb-2">Seleccionar archivo Excel</label>
                    <input
                        type="file"
                        @change="handleFileChange"
                        accept=".xlsx, .xls"
                        class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                        required
                    />

                    <!-- Botones -->
                    <div class="flex justify-end mt-4 space-x-2">
                        <button
                            type="button"
                            @click="closeDialog"
                            class="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            class="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
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

export default {
    emits: ['close', 'fileUploaded'],
    setup(props, { emit }) {
        const dialog = ref(true);
        const file = ref(null); // Campo para almacenar el archivo seleccionado

        const closeDialog = () => {
            emit('close');
        };

        const handleFileChange = (event) => {
            file.value = event.target.files[0]; // Obtiene el archivo del input
        };

        const submitForm = async () => {
            if (!file.value) {
                console.error('No se ha seleccionado ningún archivo.');
                return;
            }

            try {
                const token = store.state.token;
                const formData = new FormData();
                formData.append('file', file.value); // Agrega el archivo con la clave 'file'

                await createDispatchApi(token, formData); // Usa el método adecuado para enviar el FormData
                emit('fileUploaded');
                closeDialog();
            } catch (error) {
                console.error('Error al subir el archivo:', error);
            }
        };

        return {
            dialog,
            file,
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
