<template>
    <div id="all-cavaletes">
        <div class="row">
            <div class="col-lg-6"><h1>Controle de Cavaletes</h1></div>
            <div class="col-lg-6 text-right"><img src="/src/assets/images/logo-cebrace.png" width="250px" /></div>
        </div>

        <gmap-map
                :center="center"
                :zoom="9"
                style="width: 100%; height: 360px">
            <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
                {{infoContent}}
            </gmap-info-window>
            <gmap-cluster>
            <gmap-marker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    :icon="m.icon"
                    :clickable="true"
                    :draggable="false"
                    @click="toggleInfoWindow(m, index)">
            </gmap-marker>
            </gmap-cluster>
        </gmap-map>

        <div style="padding: 6px;">
            <p><router-link :to="{ name: 'create_cavalete' }" class="btn btn-primary">Adicionar Cavalete</router-link></p>
        </div>

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

    import Vue from 'vue'
    import * as VueGoogleMaps from 'vue2-google-maps'
    Vue.use(VueGoogleMaps, {
        load: {
            key: 'AIzaSyCRBmNhLQtEY7cDQrDIC2nODKbcOAWn-Cw',
            libraries: 'places', // This is required if you use the Autocomplete plugin
            // OR: libraries: 'places,drawing'
            // OR: libraries: 'places,drawing,visualization'
            // (as you require)
        }
    })
    Vue.component('infoWindow', VueGoogleMaps.InfoWindow);

    export default{
        data(){
            return {
                cavaletes: [],
                originalCavaletes: [],
                cavaleteSearch: '',
                center: {lat: -23.17000, lng: -46.713879},
                markers: [
                    {
                    infoText: '00001',
                    position: {lat: -23.533941, lng: -46.713879},
                    icon: 'http://maps.google.com/mapfiles/ms/micons/red-dot.png'
                }, {
                    infoText: '00002',
                    position: {lat: -23.515217, lng: -47.447518},
                    icon: 'http://maps.google.com/mapfiles/ms/micons/red-dot.png'
                }, {
                    infoText: '00003',
                    position: {lat: -22.895943, lng: -47.214161},
                    icon: 'http://maps.google.com/mapfiles/ms/micons/red-dot.png'
                }, {
                    infoText: '00004',
                    position: {lat: -22.832696, lng: -47.092097},
                    icon: 'http://maps.google.com/mapfiles/ms/micons/red-dot.png'
                }, {
                    infoText: '00005',
                    position: {lat: -23.280570, lng: -45.981990},
                    icon: 'http://maps.google.com/mapfiles/ms/micons/red-dot.png'
                }, {
                    infoText: '00006',
                    position: {lat: -22.772871, lng: -47.161385},
                    icon: 'http://maps.google.com/mapfiles/ms/micons/red-dot.png'
                }, {
                    infoText: 'Jacarei - Telefone: 9999-0000',
                    position: {lat: -23.284574, lng: -45.941994},
                    icon: 'http://maps.google.com/mapfiles/ms/micons/homegardenbusiness.png'
                }, {
                    infoText: 'Caçapava - Telefone: 9999-0000',
                    position: {lat: -23.1304921, lng: -45.7554771},
                    icon: 'http://maps.google.com/mapfiles/ms/micons/homegardenbusiness.png'
                }, {
                    infoText: 'Itaquaquecetuba - Telefone: 9999-0000',
                    position: {lat: -23.465075, lng: -46.357408},
                    icon: 'http://maps.google.com/mapfiles/kml/pal3/icon21.png'
                }],
                infoContent: '',
                infoWindowPos: {
                    lat: 0,
                    lng: 0
                },
                infoWinOpen: false,
                infoOptions: {
                    pixelOffset: {
                        width: 0,
                        height: -35
                    }
                }
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
            },

            toggleInfoWindow: function(marker, idx) {
                this.infoWindowPos = marker.position;
                this.infoContent = marker.infoText;
                //check if its the same marker that was selected if yes toggle
                if (this.currentMidx == idx) {
                    this.infoWinOpen = !this.infoWinOpen;
                }
                //if different marker set infowindow to open and reset current marker index
                else {
                    this.infoWinOpen = true;
                    this.currentMidx = idx;
                }
            }

        }
    }
</script>

<style scoped>
    #map {
        height: 430px;
        position: relative;
        width: 100%;
    }
</style>