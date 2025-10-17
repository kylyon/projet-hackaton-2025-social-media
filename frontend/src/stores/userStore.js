import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null
  }),

  getters: {
    // Renvoie true si l'utilisateur est connecté
    isLoggedIn: (state) => !!state.user && !!state.token
  },

  actions: {
    setUser(user, token = null) {
      this.user = user

      // Récupération du token (si renvoyé dans user.token.tokenId)
      const tokenValue = token || user?.token?.tokenId || null
      this.token = tokenValue

      // Sauvegarde dans le localStorage
      localStorage.setItem('user', JSON.stringify(user))
      if (tokenValue) {
        localStorage.setItem('token', tokenValue)
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  }
})
