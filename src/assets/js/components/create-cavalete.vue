<template>
    <div id="create-cavalete">
        <h1>Registrar Cavalete</h1>

        <p><router-link :to="{ name: 'all_cavaletes' }">Voltar</router-link></p>

        <notification v-bind:notifications="notifications"></notification>

        <form v-on:submit.prevent="addCavalete">
            <div class="form-group">
                <label name="cavalete_id">ID</label>
                <input type="text" class="form-control" disabled v-model="cavalete.id" id="cavalete_id">
            </div>

            <div class="form-group">
                <label name="cavalete_name">Nome</label>
                <input type="text" class="form-control" v-model="cavalete.name" id="cavalete_name" required>
            </div>

            <div class="form-group">
                <label name="cavalete_imei">IMEI</label>
                <input type="text" class="form-control" v-model="cavalete.imei" id="cavalete_imei" required>
            </div>

            <div class="form-group">
                <label name="cavalete_type">Tipo</label>
                <select class="form-control" v-model="cavalete.type" id="cavalete_type" required> <!--Supplement an id here instead of using 'name'-->
                    <option value="L - Inloader">L - Inloader</option>
                    <option value="A - Caminhões">A - Caminhões</option>
                </select>
            </div>

            <div class="form-group">
                <button class="btn btn-primary">Adicionar</button>
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

        methods: {
            addCavalete: function()
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
//                } else {
//                    this.cavalete.price = this.cavalete.price;
//                }

                this.$http.post(config.getApiURL() + '/api/cavalete/create', this.cavalete, {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).then((response) => {
                    this.notifications.push({
                        type: 'success',
                        message: 'Cavalete adicionado com sucesso'
                    });
                }, (response) => {
                    this.notifications.push({
                        type: 'error',
                        message: 'Cavalete não adicionado'
                    });
                });
            }
        },

        components: {
            'notification' : Notification
        }
    }
</script>
