<template>
  <div>
      <v-alert type="warning" v-if="!atorCarregado">
          A carregar informação...
      </v-alert>

      <v-card v-else>
        <v-card-title class="indigo darken-4 white--text" dark>
            <span class="headline">{{ator.info.sexo == 'F'? 'Atriz' : 'Ator'}}: "{{ ator.info.anome }}" ({{idAtor}})</span>
        </v-card-title>

        <v-card-text>
            <v-row v-if="ator.filmes.length > 0">
            <v-col cols="2">
                <div class="info-label">Participou nos Filmes:</div>
            </v-col>
            <v-col>
                <div class="info-content">
                    <ul>
                        <li v-for="f in ator.filmes" :key="f.idFilme">
                            <a :href="'/filmes/' + f.idFilme">{{ f.tit }}</a> [{{ f.pnome }}]
                        </li>
                    </ul>
                </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="$router.go(-1)">Voltar</v-btn>
        </v-card-actions>
      </v-card>
  </div>
</template>

<script>
import axios from 'axios'
const lhost = require("@/config/global").host;


export default {
  name: 'ConsultaAtor',

  props: ["idAtor"],

  data: () => ({
    ator: {},
    atorCarregado: false,
    footer_props: {
      "items-per-page-text": "Mostrar",
      "items-per-page-options": [10, 20, 50, 100, -1],
      "items-per-page-all-text": "Todos"
    }
  }),

  created: async function(){
    try {
      let response = await axios.get(lhost + "/atores/" + this.idAtor);
      this.ator = response.data;
      this.atorCarregado = true;
    } 
    catch (e) {
      return e;
    }
  },

  methods: {
  }
  
}
</script>

<style>
.info-label {
  color: indigo;
  padding: 5px;
  font-weight: 400;
  width: 100%;
  background-color: #e0f2f1;
  font-weight: bold;
}

.info-content {
  padding: 5px;
  width: 100%;
  border: 1px solid #1a237e;
}
</style>