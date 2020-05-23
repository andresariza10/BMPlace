<template>
  <div>
    <span class="display-2 font-regular font-weight-medium">
      <v-icon x-large style="color: black">fas fa-user-cog</v-icon>Configuraciones
    </span>
    <v-card class="mt-5">
      <v-card-title class="title font-weight-regular justify-space-between">
        <span>{{ currentTitle }}</span>
        <v-avatar color="primary lighten-2" class="subheading white--text" size="24" v-text="step"></v-avatar>
      </v-card-title>
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text>
            <v-row class="d-flex">
              <v-col cols="12" md="2">
                <v-select v-model="datos_local.rol" :items="tipo_rol" attach chips label="Rol"></v-select>
              </v-col>
              <v-col cols="12" md="10"></v-col>
              <v-col cols="2">
                <v-text-field label="Indicativo País" value="57" v-model="datos_local.indicativo"></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  label="Teléfono"
                  hint="Este teléfono se usará para contactar con el local"
                  v-model="datos_local.telefono"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Dirección" hint="Ubicación" v-model="datos_local.direccion"></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <v-row class="d-flex">
              <v-col cols="12" md="8">
                <v-text-field
                  :disabled="datos_local.rol === 'cliente'"
                  v-model="datos_local.nombre_local"
                  label="Nombre del local"
                  hint="Razón Social"
                  class="mb-5"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">   
                <v-text-field
                  :disabled="datos_local.rol === 'cliente'"
                  v-model="datos_local.tipo_comercio"
                  label="Tipo de Comercio"
                  hint="¿Qué vende? - Max 21 Caracteres"
                  class="mb-5"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  :disabled="datos_local.rol === 'cliente'"
                  hint="Días de la semana & Horaio de trabajo"
                  name="input-7-4"
                  label="Horario de Atención"
                  v-model="datos_local.horario_atencion"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
          <div class="pa-4 text-center">
            <v-img
              class="mb-4"
              contain
              height="128"
              src="https://res.cloudinary.com/komercia-store/image/upload/q_auto,f_auto/v1571439030/landing-komercia/storeicon.webp"
            ></v-img>
            <h3 class="title font-weight-light mb-2">Bienvenid@ a BMPlace</h3>
            <span class="caption grey--text">Gracias por preferirnos</span>
          </div>
        </v-window-item>
      </v-window>

      <v-card-actions>
        <v-btn :disabled="step === 1" text @click="substractStep">Atras</v-btn>
        <v-spacer></v-spacer>
        <v-btn v-if="step === 3" color="primary" depressed @click="saveData()">Guardar & Continuar</v-btn>
        <v-btn v-else color="primary" depressed @click="addStep">Siguiente</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, Store } from "vuex";
import { auth, db } from "../firebaje";
export default {
  data() {
    return {
      datos_local: {
        rol: "comerciante",
        indicativo: "",
        nombre_local: "",
        telefono: "",
        direccion: "",
        tipo_comercio: "",
        horario_atencion: "",
        configuracion: false
      },
      tipo_rol: ["comerciante", "cliente"]
    };
  },
  created() {
    this.mostrarUsuario();
  },
  methods: {
    ...mapMutations(["addStep", "substractStep"]),
    ...mapActions(["saveUsuario"]),
    async mostrarUsuario() {
      try {
        const data = await db
          .collection("datosUsuario")
          .doc(this.usuario.uid)
          .get();

        console.log(data.data());
        this.datos_local.rol = data.data().rol;
        this.datos_local.nombre_local = data.data().nombre_local;
        this.datos_local.indicativo = data.data().indicativo;
        this.datos_local.telefono = data.data().telefono;
        this.datos_local.direccion =  data.data().direccion;
        this.datos_local.tipo_comercio = data.data().tipo_comercio;
        this.datos_local.horario_atencion = data.data().horario_atencion;

      } catch (error) {
        console.log(error);
      }
    },
    saveData() {
      auth.onAuthStateChanged(user => {
        if (user) {
          const usuario = {
            nombre: user.displayName,
            email: user.email,
            uid: user.uid,
            // foto: user.photoURL,
            rol: this.datos_local.rol,
            nombre_local: this.datos_local.nombre_local,
            indicativo: this.datos_local.indicativo,
            telefono: this.datos_local.telefono,
            direccion: this.datos_local.direccion,
            tipo_comercio: this.datos_local.tipo_comercio,
            horario_atencion: this.datos_local.horario_atencion
            // configuracion: this.datos_local.configuracion
          };
          this.datos_local.rol = "comerciante";
          this.datos_local.nombre_local = "";
          this.datos_local.indicativo = "";
          this.datos_local.telefono = "";
          this.datos_local.direccion = "";
          this.datos_local.tipo_comercio = "";
          this.datos_local.horario_atencion = "";
          // this.datos_local.configuracion = false

          // console.log(usuario);
          this.saveUsuario(usuario);
        }
      });
    }
  },
  computed: {
    ...mapState(["usuario", "step", "local"]),
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Datos personales";
        case 2:
          return "Datos del Local";
        default:
          return "Cuenta Creada";
      }
    }
  }
};
</script>