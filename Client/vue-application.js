const Home = window.httpVueLoader('./components/Home.vue')
const Electeur = window.httpVueLoader('./components/Electeur.vue')
const Decharge = window.httpVueLoader('./components/Decharge.vue')
const Candidat = window.httpVueLoader('./components/Candidat.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Resultat = window.httpVueLoader('./components/Resultat.vue')
const Login = window.httpVueLoader('./components/Login.vue')
const Programmer = window.httpVueLoader('./components/Programmer.vue')
const Logout = window.httpVueLoader('./components/Logout.vue')


const routes = [
  { path: '/', component: Home },
  { path: '/electeur', component: Electeur},
  { path: '/decharge', component: Decharge},
  { path: '/candidat', component: Candidat},
   { path: '/resultat', component: Resultat},
   { path: '/register', component: Register},
  { path: '/login', component: Login},
  { path: '/programmer', component: Programmer},
  { path: '/logout', component: Logout},
]

const router = new VueRouter({
  routes
})

var app = new Vue({
  router,
  el: '#app',
  data: {
    electeurs: [],
    vainqueur: {},
    vainqueurs: [],
    resultats: [],
    elections: [],
    electeursemarge: [],
    electionprincipale: [],
    candidats: [],
    wishlist: {
      createdAt: null,
      updatedAt: null,
      games: []
    },
    user: {},
    isConnected: false,
    admin: false,
    vote: false,
    droitvote: false,
    fini: false,
    debut:false,
    role: '',
    id_emp: '',
  },

  async mounted () {
    const res = await axios.get('/api/elections')
    this.elections = res.data
    //console.log(this.elections)

    const res2 = await axios.get('/api/electeurs')
    this.electeurs = res2.data
    //console.log(this.electeurs)

     const res6 = await axios.get('/api/electeursemarge')
    this.electeursemarge = res6.data
    //console.log(this.electeurs)

    const res5 = await axios.get('/api/electionPrinc')
    this.electionprincipale = res5.data

    const res10 =  await axios.get('/api/vainqueur')
    this.resultats = res10.data


  //  console.log(this.electionprincipale)
    
    const res3 = await axios.get('/api/candidats')
    this.candidats = res3.data

    /*var date1 = new Date()


    alert(this.candidats[0].date)
    if(date1.getFullYear() == this.candidats[0].date.getFullYear()){

      alert("oyi")
    if( date1.getMonth() == res3.rows[0].date.getMonth()){
       console.log(parseInt(res3.rows[0].heurefin.toString().substring(0,2)))

      if(date1.getDate() == res3.rows[0].date.getDate()){

       if( date1.getHours() >= parseInt(res3.rows[0].heuredebut.toString().substring(0,1)) &&  date.getHours() <= parseInt(res3.rows[0].heurefint.toString().substring(0,1)) ){

          this.debut = true
       }
     }
   }
 }*/
  

    try {
      const res4 = await axios.get('/api/verif')
      this.user = res4.data
      this.isConnected = true
      this.admin = this.user.admin
      this.role = this.user.role
      this.droitvote = this.user.droitvote
      this.vote = this.user.vote
      this.id_emp = this.user.id_employe

     // alert(this.isConnected)

    } catch (err) {
      // if (err.response && err.response.statusCode === 401) {
      if (err.response?.status === 401) {
        this.isConnected = false
      } else {
        console.log('error', err)
      }
    }

     try {   

      const res7 = await axios.post('/api/electionlance', this.electionprincipale[0])

      this.vainqueurs = res7.data
      this.fini = this.vainqueurs[0].fini

      if(this.fini){
          this.vainqueur = this.vainqueurs[0]
      }
      
      alert(this.fini)

    } catch (err) {
      // if (err.response && err.response.statusCode === 401) {
      if (err.response?.status === 401) {
  
      } else {
        console.log('error', err)
      }
    }


   
    },

  methods: {
    async addGame (game) {
        const res = await axios.post('/api/game', game)
        //if(res.status === 200){
          alert('Le jeu a été correctement ajouté')
          this.games.push(res.data)
        //} 
    },

    async addCandidat (candidat) {
        const res = await axios.post('/api/candidat', candidat)
        //if(res.status === 200){
          alert('Le candidat a été correctement ajouté')
          this.consols.push(res.data)
        //} 
    },

    async addParticipation (part) {
        const res = await axios.post('/api/participer', part)
        //if(res.status === 200){
          alert('Participation envoyée')
          this.consols.push(res.data)
        //} 
    },

    async updateGame (newGame) {
      await axios.put('/api/game/' + newGame.id, newGame)
      const game = this.games.find(a => a.id === newGame.id)
      game.name = newGame.name
      game.description = newGame.description
      game.image = newGame.image
      game.gameplay = newGame.gameplay
      game.lienachat = newGame.lienachat
      alert('Le jeu a été correctement modifié');
    },

    async updateCandidat (newCandidat) {
      await axios.put('/api/candidat/' + newCandidat.id, newCandidat)
      const candidat = this.candidats.find(a => a.idcandidat === newCandidat.id)
      candidat.nomcandidat = newCandidat.nom
      candidat.prenomcandidat = newCandidat.prenom
      candidat.programmeelectoral = newCandidat.programmeelectoral
      candidat.datenaissance = newCandidat.date
      candidat.sexe = newCandidat.sexe
      candidat.image = newCandidat.photo
      alert('Les informations du candidat ont été correctement modifiées');
    },

     async voterCandidat (newCandidat) {
      await axios.put('/api/candidater/' + newCandidat.id, newCandidat)
      const candidat = this.candidats.find(a => a.idcandidat === newCandidat.id)
      
      alert('Vote Valider');
    },

    async updateElecteur (newElecteur) {
      const res1 = await axios.post('/api/electeur', newElecteur) 
      alert("Electeur Validé")
    },

    async refuseElecteur (newElecteur) {
      const res1 = await axios.post('/api/refelecteur', newElecteur) 
      alert("Electeur Invalidé")
    },

    async validerElecteur (newElecteur) {
      const res1 = await axios.post('/api/valielecteur', newElecteur) 
      alert("Emargement Validé")
    },

    async deleteGame (gameId){
       await axios.delete('/api/game/' + gameId)
      const index = this.games.findIndex(a => a.id === gameId)
      this.games.splice(index, 1)
      alert('Jeu supprimé avec succès!!')
    },

    async deleteCandidat (candidatId){
       await axios.delete('/api/candidat/' + candidatId)
      const index = this.candidats.findIndex(a => a.idcandidat === candidatId)
      this.candidats.splice(index, 1)
      alert('Candidat supprimée avec succès!!')
    },

     async addToWishList (gameId) {
      const res = await axios.post('/api/wishlist', { gameId })
      this.wishlist.games.push(res.data)
    },

    async removeFromWishList (gameId) {
      const res = await axios.delete('/api/wishlist/' + gameId)
      const idx = this.wishlist.games.findIndex(a => a.id === gameId)
      this.wishlist.games.splice(idx, 1)
    },

    async login (user) {
      const res = await axios.post('/api/login', user)
      this.user = res.data
      this.admin = this.user.admin     
      this.role = this.user.role
      this.vote = this.user.vote
      this.droitvote = this.user.droitvote
      this.id_emp = this.user.id_employe
      this.isConnected = true
      this.$router.push('/')
    },
  }
  })
