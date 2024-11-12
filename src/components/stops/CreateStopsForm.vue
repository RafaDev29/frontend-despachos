<template>
    <v-dialog v-model="dialog" max-width="600px" persistent>
        <v-card>
            <span class="text-h5 mp-2 mb-4 text-center">Crear Nueva Parada</span>
            <v-card-text>
                <v-form @submit.prevent="submitForm">
                    <v-text-field v-model="form.name" label="Código" prepend-icon="mdi mdi-rename-box"
                        required></v-text-field>
                    <v-text-field v-model="form.latitude"  type="number" label="Latitud" prepend-icon="mdi mdi-map"
                        required></v-text-field>
                        <v-text-field v-model="form.longitude" type="number" label="Longitud" prepend-icon="mdi mdi-map"
                        required></v-text-field>
                        
                    <v-card-actions class="justify-end">
                        <v-btn text @click="closeDialog" color="#180c24">Cancelar</v-btn>
                        <v-btn type="submit" color="red">Guardar</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { ref } from 'vue';
import { createStopsApi } from '@/api/StopsService';
import store from '@/store';

export default {
    emits: ['close', 'stopCreated'],
    setup(props, { emit }) {
        const dialog = ref(true);
        const form = ref({
            name: '',
            latitude: 0,
            longitude: 0,
        });

        const closeDialog = () => {
            emit('close');
        };


        const submitForm = async () => {
            try {
                const token = store.state.token;
                const payload = {
                    name: form.value.name,
                    latitude: Number(form.value.latitude),
                    longitude: Number(form.value.longitude)
                };
                await createStopsApi(token, payload);
                emit('stopCreated');
                closeDialog();
            } catch (error) {
                console.error('Error al crear la ruta:', error);
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

<style scoped></style>