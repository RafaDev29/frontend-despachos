<template>
    <table>
        <thead>
            <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Paradas</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="route in routes" :key="route.code">
                <td>{{ route.code }}</td>
                <td>{{ route.name }}</td>
                <td>
                    <table>
                        <thead>
                            <tr>
                                <th>Parada</th>
                                <th>Tiempo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="stop in route.step_time_ids" :key="stop.bus_stop">
                                <td>{{ stop.bus_stop }}</td>
                                <td>{{ stop.time }} min</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: {
        routes: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
}

th {
    background-color: #f4f4f4;
    text-align: left;
}

td table {
    width: 100%;
    margin-top: 8px;
}

td table th, td table td {
    border: none;
    padding: 4px;
    font-size: 0.9em;
}
</style>
