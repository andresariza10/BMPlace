<template>
  <div class="home">
    <v-row class="d-flex justify-center">
      <v-col cols="12" md="8">
        <v-card
          class="portrait"
          img="https://www.writersevoke.com/wp-content/uploads/2019/09/Best-Online-Store-To-Buy-Winter-Jackets-1.jpg"
          width="900"
          height="500"
        ></v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="headline font-weight-bold">Inicia Sesión</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-btn block color="error" @click="inicioGoogle">
              <v-icon left dark>fab fa-google</v-icon>Google
            </v-btn>

            <v-btn block color="info" @click="inicioFacebook" class="mt-3">
              <v-icon left dark>fab fa-facebook-f</v-icon>Facebook
            </v-btn>
          </v-card-text>
        </v-card>

        <v-card class="mt-5" elevation="5">
          <v-card-title>BMPlace</v-card-title>
          <v-card-text>
            Quieres tener un amplio contenido de información respecto a pequeñas
            <strong>empresas, tiendas, locales de comida y demás,</strong>
            los cuales se han visto afectadas por el
            <strong>COVID 19</strong> y a razón de esto, sus ingresos han disminuido.
            <br />
            <br />Necesitas una droguería o quieres comprar algo de comida. En tu barrio pueden haber varios
            <strong>lugares</strong>, pero no los tenemos presente, horarios y mucho menos los productos que ofrecen.
            <br />
            <br />Registrate como
            <strong>Comerciante o Usuario</strong>, da a conocer tu empresa y productos o ten a la mano lo que necesitas.
          </v-card-text>
        </v-card> 
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions(["inicioGoogle", "inicioFacebook"])
  },
  computed: {}
};
</script>

