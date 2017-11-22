<template>
    <div id="all-cavaletes">
        <h1>Cebrace Cavaletes</h1>

        <p><router-link :to="{ name: 'create_cavalete' }" class="btn btn-primary">Adicionar Cavalete</router-link></p>

        <div class="form-group">
            <input type="text" name="search" v-model="cavaleteSearch" placeholder="Procurar cavaletes" class="form-control" v-on:keyup="searchCavaletes">
        </div>

        <table class="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Nome</td>
                <td>Tipo</td>
                <td>Ações</td>
                <td>Alertas</td>
            </tr>
            </thead>

            <tbody>
                <tr v-for="cavalete in cavaletes">
                    <td>{{ cavalete.id }}</td>
                    <td>{{ cavalete.name }}</td>
                    <td>{{ cavalete.type }}</td>
                    <td>
                        <router-link :to="{name: 'view_cavalete', params: { id: cavalete.id }}" class="btn btn-primary">Visualizar</router-link>
                        <router-link :to="{name: 'edit_cavalete', params: { id: cavalete.id }}" class="btn btn-primary">Editar</router-link>
                        <router-link :to="{name: 'delete_cavalete', params: { id: cavalete.id }}" class="btn btn-danger">Remover</router-link>
                    </td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    import config from './config.js';

    export default{
        data(){
            return{
                cavaletes: [],
                originalCavaletes: [],
                cavaleteSearch: ''
            }
        },

        created: function()
        {
            this.fetchCavaleteData();
        },

        methods: {
            fetchCavaleteData: function()
            {
                this.$http.get(config.getApiURL() + '/api/cavaletes').then((response) => {
                    this.cavaletes = response.body;
                    this.originalCavaletes = this.cavaletes;
                }, (response) => {

                });
            },

            searchCavaletes: function()
            {
                if(this.cavaleteSearch == '')
                {
                    this.cavaletes = this.originalCavaletes;
                    return;
                }

                var searchedCavaletes = [];
                for(var i = 0; i < this.originalCavaletes.length; i++)
                {
                    var cavaleteNome = this.originalCavaletes[i]['name'].toLowerCase();
                    if(cavaleteNome.indexOf(this.cavaleteSearch.toLowerCase()) >= 0)
                    {
                        searchedCavaletes.push(this.originalCavaletes[i]);
                    }
                }

                this.cavaletes = searchedCavaletes;
            }
        }
    }
</script>
