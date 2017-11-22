<template>
    <div id="update-cavalete">
        <h1>Atualizar Cavalete</h1>

        <p><router-link :to="{ name: 'all_cavaletes' }">Voltar</router-link></p>

        <notification v-bind:notifications="notifications"></notification>

        <form v-on:submit.prevent="editCavalete">
            <div class="form-group">
                <label name="cavalete_id">ID</label>
                <input type="text" class="form-control" disabled v-model="cavalete.id" id="cavalete_id">
            </div>

            <div class="form-group">
                <label name="cavalete_name">Nome</label>
                <input type="text" class="form-control" v-model="cavalete.name" id="cavalete_name" required>
            </div>

            <div class="form-group">
                <label name="cavalete_type">Tipo</label>
                <select class="form-control" v-model="cavalete.type" id="cavalete_type" required> <!--Supplement an id here instead of using 'name'-->
                    <option value="L - Inloader">L - Inloader</option>
                    <option value="A - Caminhões">A - Caminhões</option>
                </select>
            </div>

            <div class="form-group">
                <button class="btn btn-primary">Atualizar</button>
            </div>
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
                this.$http.get(config.getApiURL() + '/api/cavalete/' + this.$route.params.id).then((response) => {
                    this.cavalete = response.body;
                }, (response) => {

                });
            },

            editCavalete: function()
            {
                // Validation
//                var price = parseFloat(this.cavalete.price);
//                if(isNaN(price))
//                {
//                    this.notifications.push({
//                        type: 'danger',
//                        message: 'Price must be a number'
//                    });
//                    return false;
//                }

                this.$http.patch(config.getApiURL() + '/api/cavalete/edit/' + this.$route.params.id, this.cavalete, {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).then((response) => {
                    this.notifications.push({
                        type: 'success',
                        message: 'Cavalete updated successfully'
                    });
                }, (response) => {
                    this.notifications.push({
                        type: 'error',
                        message: 'Cavalete not updated'
                    });
                });
            }
        },

        components: {
            'notification' : Notification
        }
    }
</script>
