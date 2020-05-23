<template>
  <v-app >
    <v-app-bar app color="primary" dark>
      <router-link :to="{name: 'Home'}" style="text-decoration: none;">
        <div class="d-flex align-center white--text display-1 font-weight-black">BMPlace</div>
      </router-link>

      <v-spacer></v-spacer>

      <v-menu absolute offset-y style="max-width: 50px" v-if="usuario != null">
        <template v-slot:activator="{ on }">
          <v-btn dark icon small v-on="on">
            <v-icon>fas fa-ellipsis-v</v-icon>
          </v-btn>
          <v-avatar>
            <v-img class="elevation-6" :src="`${usuario.foto}`"></v-img>
          </v-avatar>
          <span class="mr-3">
            <strong>{{ usuario.nombre }}</strong>
          </span>
        </template>

        <v-list>
          <v-list-item style="cursor: pointer">
            <v-list-item-title @click="setting">Configuración</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item style="cursor: pointer;">
            <v-list-item-title @click="cerrarSesion">Cerrar Sesion</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
  created() {
    this.getComerciantes();
  },
  methods: {
    ...mapActions(["cerrarSesion", "getComerciantes", "setting"])
  },
  computed: {
    ...mapState(["usuario"])
  }
};
</script>

