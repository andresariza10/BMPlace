import Vue from 'vue'
import Vuex from 'vuex'
import { firebase, auth, db } from '../firebaje'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: null,
    step: 1,
    error: '',
    local: []

  },
  mutations: {
    nuevoUsuaio(state, payload) {
      state.usuario = payload;
    },
    initStep(state) {
      state.step = 1;
    },
    addStep(state, payload) {
      state.step += 1;
    },
    substractStep(state, payload) {
      state.step -= 1;
    },
    setLocal(state, payload){
      state.local = payload
    }
  },
  actions: {
    setUsuaio({ commit }, user) {
      const usuario = {
        nombre: user.displayName,
        email: user.email,
        uid: user.uid,
        foto: user.photoURL
      }
      commit('nuevoUsuaio', usuario)

    },
    async saveUsuario({ commit }, payload) {
      console.log('ingreso al saveusuario ', payload);
      commit('initStep')

      if(payload.telefono === ''){
        router.push({ name: 'Configuracion' });
      }else{
        try {
          // save firestore
          await db.collection('datosUsuario').doc(payload.uid).set(
            payload
          )
          router.push({ name: 'Home' })

        } catch (error) {
          console.log(error)
        }
      }
    },
    inicioFacebook({ dispatch }) {
      const provider = new firebase.auth.FacebookAuthProvider();
      dispatch('ingresar', { provider })

    },
    inicioGoogle({ dispatch }) {
      const provider = new firebase.auth.GoogleAuthProvider();
      dispatch('ingresar', { provider })

    },
    async ingresar({ commit }, payload) {
      firebase.auth().languageCode = "es";

      try {
        const result = await firebase.auth().signInWithPopup(payload.provider)
        const user = result.user;

        // construir usuario
        const usuario = {
          nombre: user.displayName,
          email: user.email,
          uid: user.uid,
          foto: user.photoURL
        }

        commit('nuevoUsuaio', usuario)

        // save firestore
        await db.collection('usuarios').doc(usuario.uid).set(
          usuario
        )

        const data = await db
          .collection("datosUsuario")
          .doc(usuario.uid)
          .get()
 
        if (data.exists) {
          router.push({ name: 'Home' });  
        } else {
          router.push({ name: 'Configuracion' });
        }
      } catch (error) {
        console.log(error)
      }

    },
    async getComerciantes({ commit }){
      try {
        const comerciantes = await db
          .collection('datosUsuario')
          .where('rol', '==', 'comerciante')
          .get()

          let load_local = []
          comerciantes.forEach(doc => {
            let add_local = doc.data();
            load_local.push(add_local);
          })

          commit('setLocal', load_local)
      } catch (error) {
        console.log(error)
      }
    },
    setting({ commit }){
      router.push({ name: 'Configuracion' })
    },
    cerrarSesion({ commit }) {
      auth.signOut()
      commit('nuevoUsuaio', null)
      router.push({ name: 'Login' })
    }
  },
  modules: {
  }
})
