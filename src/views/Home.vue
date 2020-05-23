<template>
  <div>
    <v-row class="d-flex flex-wrap">
      <v-col cols="12" md="4" v-for="(item, index) in local" :key="index">
        <v-card :shaped="true" elevation="5">
          <v-card-title>
            <strong>{{ item.nombre_local }}</strong>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <span>
              <strong>Tipo de Comercio</strong>
              <br />
              {{ item.tipo_comercio }}
              <br />
              <strong>Horario - Dirección</strong>
              <br />
              {{ item.horario_atencion }}
              <br />
              <span> <small> {{ item.direccion }} </small> </span>
              <br />
              <strong>Telefonos</strong>
              <br />
              {{ item.telefono }}
            </span>
          </v-card-text>
          <v-card-actions>
            <v-btn
              :href="`https://api.whatsapp.com/send?phone=${item.indicativo}${item.telefono}`"
              target="_blank"
              color="success"
            >
            <v-icon left dark>fab fa-whatsapp</v-icon>
              contacto
            </v-btn>
          </v-card-actions> 
        </v-card>
      </v-col>
    </v-row>

  </div>
</template>
<script>
// api de whatsapp para enviar mensajes directo al local
// https://api.whatsapp.com/send?phone=573192599955&text=Hola,%20mi%20vida%20hermosa%20te%20amo
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
    };
  },
  components: {
    
  },
  created() {
    this.getComerciantes();
  },
  computed: {
    ...mapState(["local"])
  },
  methods: {
    ...mapActions(['getComerciantes'])
  }
};
</script>