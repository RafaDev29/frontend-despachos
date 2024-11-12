<template>
    <v-dialog v-model="dialog" max-width="600px" persistent>
        <v-card>
            <span class="text-h5 mp-2 mb-4 text-center">Crear Nueva Conductor</span>
            <v-card-text>
                <v-form @submit.prevent="submitForm">
                    <v-text-field v-model="form.code" label="Código" prepend-icon="mdi mdi-rename-box"
                        required></v-text-field>
                    <v-text-field v-model="form.identification_document" label="Documento" prepend-icon="mdi mdi-card-account-details"
                        required></v-text-field>
                    <v-text-field v-model="form.name" label="Nombre" prepend-icon="mdi mdi-rename"
                        required></v-text-field>
                    <v-text-field v-model="form.email" label="Correo" prepend-icon="mdi mdi-email"
                        required></v-text-field>
                    <v-text-field v-model="form.license_type" label="Tipo de licencia" prepend-icon="mdi mdi-badge-account-horizontal-outline"
                        required></v-text-field>
                    <v-text-field v-model="form.license_expiration_date" type="Date" label="Fecha de expiracion de licencia"
                        prepend-icon="mdi mdi-calendar-range" required></v-text-field>
                    <v-text-field v-model="form.license_points" type="number" label="Puntos de Licencia"
                        prepend-icon="mdi mdi-plus-circle-outline" required></v-text-field>
                    <v-text-field v-model="form.company_identifier" label="Identificador de compañia" prepend-icon="mdi mdi-domain"
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