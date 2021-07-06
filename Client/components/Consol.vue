<template>

<div v-if="isConnected">
<div id="gaming">
    
    <!-- Bloc affichant les consoles-->
  	<div v-for="consol in consols" :key="consol.id">

      <!--Affichage des jeux-->
  		<div v-if="editingConsol.id !== consol.id" class="group">
  		  
        <!--Image-->
  			<div  class="image" :style="{ 'background-image': 'url('+ consol.image +')'}"> 
  			</div>

  		  <!--Nom-->
  			<div id="name">
  			{{ consol.name }}
  			</div>

  		  <!--Description-->
  			<div id="description">
  			{{ consol.description }}
  			</div>

  		  <!--Boutons-->
  			<div id="bouton">
  				
          <!--Bouton pour supprimer la console-->
          <div>
  					<button type="button" class="btn btn-warning" @click="deleteConsol(consol.id)"><i class="fa fa-trash" aria-hidden="true"></i></button>
  				</div>

          <!--Bouton pour modifier les caractéristiques de la console-->
  				<div>
  				    <button type="button" class="btn btn-info" @click="editConsol(consol)">Modifier</button>
  				</div>
          			
        </div>

  	</div>
      
    <!--Formulaire de modification de la console-->
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
    				<input type="text" v-model="editingConsol.name" class="form-control">
  				</div>
  			</div>

        <!--Image-->
  			<div id="editImage" class="input-group">
  				<div class="input-group mb-2 mr-sm-2">
    				<div class="input-group-prepend">
      					<div class="input-group-text">Image</div>
    				</div>
    				<input type="text" v-model="editingConsol.image" class="form-control" placeholder="Lien vers l'image">
  				</div>
  			</div>

        <!--Description-->
  			<div id="editDescription" class="input-group">
  				<div class="input-group mb-2 mr-sm-2">
    				<div class="input-group-prepend">
      					<div class="input-group-text">Description</div>
    				</div>
    				<input type="text" class="form-control" v-model="editingConsol.description">
  				</div>
  			</div>

  			
        <!--Boutons de validation / Annulation des modifications-->
  			<div style="display:flex;justify-content:space-around">
            	<button type="button" class="btn btn-success" @click="sendEditConsol()">Valider</button>
            	<button type="button" class="btn btn-danger" @click="abortEditConsol()">Annuler</button>
        </div>

      </div>

      <br/>
        
  </div>

  
 </div>
    <!-- Button pour ajouter un jeu-->
  	<div style="text-align:center">
        	<button type="button" class="btn btn-secondary" @click="show">Ajouter une console</button>
    		
  </div>

  <div id="form1" style="width:35%;margin:auto;margin-top:5%;text-align:center; display:none">
  <form style="background-color: black;
  border: solid white;
  border-radius: 5%;" @submit.prevent="addConsol">
      <h4>Ajout de Console</h4>
      <div id="editGame" class="input-group">
          <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
                <div class="input-group-text">Nom</div>
            </div>
            <input type="text" v-model="newConsol.name" class="form-control" placeholder="Nom du produit" required>
          </div>

        </div>

        <div id="editImage" class="input-group">
          <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
                <div class="input-group-text">Image</div>
            </div>
            <input class="form-control" type="text" v-model="newConsol.image" placeholder="Lien vers l'image">
          </div>

        </div>

        <div id="editDescription" class="input-group">
          <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
                <div class="input-group-text">Decsription</div>
            </div>
            <textarea class="form-control" type="text" v-model="newConsol.description" required></textarea>
          </div>

        </div>
        
              <button class="btn btn-success" type="submit">Ajouter</button>
      
    </form>
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

module.exports = {
  props: {
    consols: { type: Array, default: [] },
    user: {type: Object},
    isConnected: { type: Boolean }
  },
  data () {
    return {
      editingConsol: {
        id: -1,
        name: '',
        description: '',
        image: '',
      },
      newConsol: {
              name: '',
              description: '',
              image: ''
      }
    }
  },
  methods: {
    show(){
      var form = document.getElementById('form1')
      if(form.style.display === "none")
        form.style.display=''
      else
        form.style.display='none'
    },
    addConsol () {
      this.$emit('add-consol', this.newConsol)
    },
    deleteConsol (consolId) {
      this.$emit('delete-consol', consolId)
    },
    editConsol (consol) {
      this.editingConsol.id = consol.id
      this.editingConsol.name = consol.name
      this.editingConsol.description = consol.description
      this.editingConsol.image = consol.image
    },
    sendEditConsol () {
      this.$emit('update-consol', this.editingConsol)
      this.abortEditConsol()
    },
    abortEditConsol () {
      this.editingConsol = {
        id: -1,
        name: '',
        description: '',
        image: '',
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
