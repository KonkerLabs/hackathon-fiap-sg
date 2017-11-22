<template>
    <div id="update-cavalete">
        <h1>Histórico do Cavalete</h1>

        <p><router-link :to="{ name: 'all_cavaletes' }">Voltar</router-link></p>

        <notification v-bind:notifications="notifications"></notification>

        <form v-on:submit.prevent="viewCavalete">
            <div class="form-group">
                <label name="cavalete_id">ID</label>
                <input type="text" class="form-control" disabled v-model="cavalete.id" id="cavalete_id">
            </div>

            <div class="form-group">
                <label name="cavalete_name">Nome</label>
                <input type="text" class="form-control" disabled v-model="cavalete.name" id="cavalete_name" required>
            </div>
        </form>

        <table class="table table-hover">
            <thead>
            <tr>
                <td>Horário</td>
                <td>Latitude</td>
                <td>Longitude</td>
                <td></td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="coord in coords">
                <td>{{ coord.timestamp }}</td>
                <td>{{ coord.payload.coord.lat }}</td>
                <td>{{ coord.payload.coord.lon }}</td>
                <td><a target="_blank" :href="'https://www.google.com/maps/search/?api=1&query=' + coord.payload.coord.lat + ',' + coord.payload.coord.lon">Mapa</a></td>
            </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    import Notification from './notifications.vue';
    import config from './config.js';

    export default {
        data() {
            return{
                cavalete:{},
                coords:[],
                notifications:[]
            }
        },

        created: function() {
            this.getCavalete();
            this.getCoords();
        },

        methods: {
            getCavalete: function()
            {
                this.$http.get(config.getApiURL() + '/api/cavalete/' + this.$route.params.id).then((response) => {
                    this.cavalete = response.body;
                }, (response) => {

                });
            },
            getCoords: function()
            {
                this.$http.get(config.getApiURL() + '/api/cavalete/' + this.$route.params.id + '/coords').then((response) => {
                    this.coords = response.body;
                }, (response) => {

                });
            }
        },

        components: {
            'notification' : Notification
        }
    }
</script>
