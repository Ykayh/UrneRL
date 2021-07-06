<template>
	<form style="background-color: black;
	border: solid white;
	border-radius: 5%;" @submit.prevent="addGame" v-show="show">
      <h4>Ajout de Jeu</h4>
      <div id="editGame" class="input-group">
  				<div class="input-group mb-2 mr-sm-2">
    				<div class="input-group-prepend">
      					<div class="input-group-text">Nom</div>
    				</div>
    				<input type="text" v-model="newGame.name" class="form-control" placeholder="Nom du produit" required>
  				</div>

  			</div>

  			<div id="editImage" class="input-group">
  				<div class="input-group mb-2 mr-sm-2">
    				<div class="input-group-prepend">
      					<div class="input-group-text">Image</div>
    				</div>
    				<input class="form-control" type="text" v-model="newGame.image" placeholder="Lien vers l'image">
  				</div>

  			</div>

  			<div id="editDescription" class="input-group">
  				<div class="input-group mb-2 mr-sm-2">
    				<div class="input-group-prepend">
      					<div class="input-group-text">Decsription</div>
    				</div>
    				<textarea class="form-control" type="text" v-model="newGame.description" required></textarea>
  				</div>

  			</div>

  			<div id="editGamePlay" class="input-group">
  				<div class="input-group mb-2 mr-sm-2">
    				<div class="input-group-prepend">
      					<div class="input-group-text">GamePlay</div>
    				</div>
    				<input type="text" v-model="newGame.gameplay" class="form-control" placeholder="Lien vers le gameplay">
  				</div>

  			</div>

        <div id="editLienAchat" class="input-group">
          <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
                <div class="input-group-text">LienAchat</div>
            </div>
            <input type="text" v-model="newGame.lienachat" class="form-control" placeholder="Lien pour l'achat">
          </div>

        </div>
  			
  			
            	<button class="btn btn-success" type="submit">Ajouter</button>
        

      
      
      
      
      
    </form>
</template>

<script>
	module.exports = {
		props: {
			show: Boolean
		},

		data () {
			return {
				 newGame: {
        			name: '',
    			    description: '',
        			image: '',
        			gameplay: '',
              lienachat:''
      			 }
			}
		},

		methods: {
			addGame () {
     			 this.$emit('add-game', this.newGame)
    		},
	
		}
	}
</script>

<style>
</style>