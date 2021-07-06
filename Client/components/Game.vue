<template>

<!--div v-if="isConnected"-->
<div id="gaming">
    <!-- Bloc affichant les jeux-->
  	<div v-for="game in games" :key="game.id">

      <!--Affichage des jeux-->
  		<div v-if="editingGame.id !== game.id" class="group">
  		  
        <!--Image-->
  			<div  class="image" :style="{ 'background-image': 'url('+ game.image +')'}"> 
  			</div>

  		  <!--Nom-->
  			<div id="name">
  			{{ game.name }}
  			</div>

  		  <!--Description-->
  			<div id="description">
  			{{ game.description }}
  			</div>

  		  <!--Boutons-->
  			<div id="bouton">
  				
          <!--Bouton pour supprimer le jeu-->
          <div>
  					<button type="button" title="Supprimer le Jeu" class="btn btn-warning" @click="deleteGame(game.id)"><i class="fa fa-trash" aria-hidden="true"></i></button>
  				</div>

          <!--Bouton pour modifier les caractéristiques du jeu-->
  				<div>
  				    <button type="button" title="Modifier le jeu" class="btn btn-info" @click="editGame(game)">Modifier</button>
  				</div>

          <!--Bouton pour ajouter le lien d'achat du jeu-->
  				<div>
          			<button type="button" class="btn btn-success" title="Insérer à sa wishlist" v-if="!isInWishList(game.id)" @click="addToWishList(game.id)">Add to <i class="fa fa-shopping-basket" aria-hidden="true"></i></button>
          			<button type="button" class="btn btn-danger" v-else @click="removeFromWishList(game.id)" title="Effacer de la wishlist">Remove from <i class="fa fa-shopping-basket" aria-hidden="true"></i></button>
          </div>
          			
        </div>

  	</div>
      
    <!--Formulaire de modification du jeu-->
  	<div v-else class="group">
  
  			<div id="name" style="background-color:gray;margin-top:2%">
  				Modifications
  			</div>

        <!--Nom-->
  			<div id="editGame" class="input-group">
  				<div class="input-group mb-2 mr-sm-2">
    				<div class="input-group-prepend">
      					<div class="input-group-text">Nom</div>
    				</div>
    				<input type="text" v-model="editingGame.name" class="form-control">
  				</div>
  			</div>

        <!--Image-->
  			<div id="editImage" class="input-group">
  				<div class="input-group mb-2 mr-sm-2">
    				<div class="input-group-prepend">
      					<div class="input-group-text">Image</div>
    				</div>
    				<input type="text" v-model="editingGame.image" class="form-control" placeholder="Lien vers l'image">
  				</div>
  			</div>

        <!--GamePlay-->
  			<div id="editGamePlay" class="input-group">
  				<div class="input-group mb-2 mr-sm-2">
    				<div class="input-group-prepend">
      					<div class="input-group-text">GamePlay</div>
    				</div>
    				<input type="text" v-model="editingGame.gameplay" class="form-control" placeholder="Lien vers le gameplay">
  				</div>
  			</div>

        <!--Description-->
  			<div id="editDescription" class="input-group">
  				<div class="input-group mb-2 mr-sm-2">
    				<div class="input-group-prepend">
      					<div class="input-group-text">Description</div>
    				</div>
    				<input type="text" class="form-control" v-model="editingGame.description">
  				</div>
  			</div>

        <!--Achat-->
        <div id="editLienAchat" class="input-group">
          <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
                <div class="input-group-text">LienAchat</div>
            </div>
            <input type="text" v-model="editingGame.lienachat" class="form-control" placeholder="Lien pour l'achat">
          </div>
        </div>
  			
        <!--Boutons de validation / Annulation des modifications-->
  			<div style="display:flex;justify-content:space-around">
            	<button type="button" class="btn btn-success" @click="sendEditGame()">Valider</button>
            	<button type="button" class="btn btn-danger" @click="abortEditGame()">Annuler</button>
        </div>

      </div>

      <br/>
        
  </div>

  
 </div>
    <!-- Button pour ajouter un jeu-->
  	<div style="text-align:center">
        	<button type="button" title="Ajouter un nouveau jeu" class="btn btn-secondary" @click="showForm=!showForm">Ajouter un jeu au site</button>
    		
  </div>

  <div style="width:35%;margin:auto;margin-top:2%;text-align:center">
    <add-game @add-game="addGame" :show="showForm">
        </add-game>
  </div>

  <div style="text-align:center">
          <router-link to="/consol" ><button type="button" title="Accéder aux consoles " class="btn btn-success">Les Consoles</button></router-link>
        
  </div>


  </div>

  <div v-else>
    <h2 style="text-align:center"> Vous n'êtes pas encore connecté {{user.email}} </h2>
    <div style="text-align:center">
          <router-link to="/login" ><button type="button" class="btn btn-success">S'identifier</button></router-link>
        
  </div>
  </div>
</template>

<script>
const AddGame = window.httpVueLoader( './components/AddGame.vue' )

module.exports = {
  components: {
    AddGame
  },
  props: {
    games: { type: Array, default: [] },
    wishlist: { type: Object },
    isConnected: { type: Boolean },
    user: {type:Object}
  },
  data () {
    return {
      editingGame: {
        id: -1,
        name: '',
        description: '',
        image: '',
        gameplay: '',
        lienachat: '',
      },
      showForm : false
    }
  },
  methods: {
  	addGame (obj) {
      this.$emit('add-game', this.newGame=obj)
    },
    isInWishList (gameId) {
      return !!this.wishlist.games.find(a => a.id === gameId)
    },
    addToWishList (gameId) {
      this.$emit('add-to-wish-list', gameId)
    },
    removeFromWishList (gameId) {

      this.$emit('remove-from-wish-list', gameId)
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
      this.editingGame.gameplay = game.gameplay
      this.editingGame.lienachat = game.lienachat
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
        gameplay: '',
        lienachat: ''
      }
    }
  }
}
</script>

<style scoped>
.image{
	width: 100%;
	height:50%;
	background-size:100%;
	border: solid white;
	border-top-left-radius: 5%;
	border-top-right-radius: 5%;
}

.group{
	background-color: black;
	border: solid white;
	border-radius: 5%;
	width:22em;
	height:22.5em;

}

#gaming{
	display:flex;
	justify-content:space-around;
  flex-wrap:wrap;

}

#name{
	width:50%;
	background-color:blue;
	height:10%;
	margin:auto;
	text-align:center;
}

#description{
	width:100%;
	height:27.5%;
	margin:auto;
	text-align:center;
}

#bouton{
	width:100%;
	height:12.5%;
	display:flex;
	flex-wrap:wrap;
	justify-content: space-around;
}

#editGame{
	width:85%;
	margin:auto;
	margin-top:5%;
}

#editDescription{
	width:95%;
	margin:auto;
	margin-top:1.5%;
}

#editImage{
	width:85%;
	margin:auto;
	margin-top:1.5%;
}

#editGamePlay{
	width:85%;
	margin:auto;
	margin-top:1.5%;
}

#editLienAchat{
  width:85%;
  margin:auto;
  margin-top:1.5%;
}

</style>
