<template>
    <div id="delete-cavalete">
        <h1>Remover Cavalete {{ cavalete.name }}</h1>

        <p><router-link :to="{ name: 'all_cavaletes' }">Voltar</router-link></p>

        <notification v-bind:notifications="notifications"></notification>

        <form v-on:submit.prevent="deleteCavalete">
            <p><button class="btn btn-danger">Remover Cavalete</button></p>
        </form>
    </div>
</template>

<script>
    import Notification from './notifications.vue';
    import config from './config.js';

    export default{
        data(){
            return{
                cavalete:{},
                notifications:[]
            }
        },

        created: function(){
            this.getCavalete();
        },

        methods: {
            getCavalete: function()
            {
                this.$http.get(apiURL() + '/api/cavalete/' + this.$route.params.id).then((response) => {
                    this.cavalete = response.body;
                }, (response) => {

                });
            },

            deleteCavalete: function()
            {
                this.$http.delete(config.getApiURL() + '/api/cavalete/delete/' + this.$route.params.id, this.cavalete, {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).then((response) => {
                    this.$router.push({name: 'all_cavaletes'})
                }, (response) => {
                    this.notifications.push({
                        type: 'danger',
                        message: 'Cavalete não foi removido'
                    });
                });
            }
        },

        components: {
            'notification' : Notification
        }
    }
</script>
