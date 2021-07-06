<template>


  <div class="body">
    <div v-for="election in electionprincipale" :key="election.id_election">
      <br>
      <div style="text-align:center;width:45%;margin:auto;color:black">
        <p style="font-size:200%">Tour n° {{election.tour}} de l'élection {{election.typeelection}} 
        de </p>
        <p style="font-size:150%">l'année {{election.date}}
        De {{election.heuredebut}} à {{election.heurefin}}</p>
      </div>


      <div class="test" style="display:flex;text-align:center;width:45%;margin:auto;color:black">
        <div class="piece5">
          <img src="elec.jpg" alt="pieces">
        </div>
        
        <div style="color:black;margin:auto;font-size:130%">
          {{ election.dispositionscodeelectoral}}
        </div>
      </div>
      <br>

        <div style="text-align:center">
          <button v-if="!isConnected" type="button" class="btn btn-warning">  

          
             <router-link v-if="vainqueurs.length > 0" to='/resultats' class="nav-link" style="color:black" tabindex="-1"> Résultats </router-link>
            <router-link v-else to='/register' class="nav-link" style="color:black" tabindex="-1"> S'inscrire </router-link>
          
          </button>
        </div>
        <br>

        <div class="test" style="display:flex;text-align:center;width:45%;margin:auto">
        <div class="piece4">
          <img width="75%" src="piece.jpg" alt="pieces">
        </div>
        
        <div style="color:black;margin:auto;font-size:130%">
          {{ election.pieceidentites}}
        </div>
      </div>
    </div>
    <br>
  </div>
</template>

<script>


module.exports = {
  props: {
    elections: { type: Array, default: [] },
    vainqueurs: { type: Array, default: [] },
    electionprincipale: { type: Array, default: [] },
    wishlist: { type: Object },
    user: {type: Object},
    isConnected: { type: Boolean }
  },
  data () {
    return {
      editingGames: {
        id: -1,
        name: '',
        description: '',
        image: '',
        gamePlay: ''
      }
    }
  },
  methods: {
    isInWishList (gameId) {
      return !!this.wishList.games.find(a => a.id === gameId)
    },
    addToWishList (gameId) {
      this.$emit('add-to-wishList', gameId)
    },
    removeFromWishList (gameId) {
      this.$emit('remove-from-wishList', gameId)
    },
    addGame (game) {
      this.$emit('add-game', game)
    },
    deleteGame (gameId) {
      this.$emit('delete-game', gameId)
    },
    editGame (game) {
      this.editingGame.id = game.id
      this.editingGame.name = game.name
      this.editingGame.description = game.description
      this.editingGame.image = game.image
      this.editingGame.gamePlay = game.gamePlay
    },
    sendEditGame () {
      this.$emit('update-game', this.editingGame)
      this.abortEditGame()
    },
    abortEditGame () {
      this.editingGame = {
        id: -1,
        name: '',
        description: '',
        image: '',
        gamePlay: ''
      }
    }
  }
}
</script>

<style scoped>
article {
  display: flex;
}

.article-img {
  flex: 1;
}

.article-img div {
  width: 100px;
  height: 100px;
  background-size: cover;
}

.article-content {
  flex: 3;
}

.article-title {
  display: flex;
  justify-content: space-between;
}

textarea {
  width: 100%;
}

body{
  background-color: blue;
}
</style>
