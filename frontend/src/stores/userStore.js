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
    const tokenValue = token || user?.token?.tokenId || null
    this.token = tokenValue
    localStorage.setItem('user', JSON.stringify(user))
    if (tokenValue) localStorage.setItem('token', tokenValue)
  },

  logout() {
    this.user = null
    this.token = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  },

  // Nouvelle action pour ajouter un hobby
  addHobbie(hobbieName) {
    if (!this.user) return
    if (!this.user.hobbies) this.user.hobbies = []
    if (!this.user.hobbies.includes(hobbieName)) {
      this.user.hobbies.push(hobbieName)
      localStorage.setItem('user', JSON.stringify(this.user))
    }
  }
}

})
