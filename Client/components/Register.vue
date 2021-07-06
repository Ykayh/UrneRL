<template>

<div>
<div style="display:flex;">

    <div id="form">
    	<h2 style="margin-top:10%;width:10%;margin-left:auto;margin-right:auto;color:black">Inscription</h2>
    <!-- TODO -->
  	
  	<div id="form2">
  	 	<form @submit.prevent="createUser">
  				<!-- Numero de piece d'identité -->
  				<div class="form-group">
    					<label for="exampleInputEmail2">Numero de piece</label>
    					<input type="text" v-model="newUser.numPiece" id="e" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Entrer Numero de piece" required>
  				</div>
  	
  			  <!-- Nom -->
  				<div class="form-group">
    					<label for="exampleInputEmail1">Nom</label>
    					<input type="text" v-model="newUser.nom" id="e" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Entrer nom" required>
  				</div>
  
  				<!-- Prenom -->
  				<div class="form-group">
    					<label for="prenom">Prenom</label>
    					<input type="text" id="p" v-model="newUser.prenom" class="form-control" id="prenom" placeholder="Entrer prenom(s)" required>
  				</div>

  				<!-- Email -->
  				<div class="form-group">
    					<label for="email">email</label>
    					<input type="email" id="p2" v-model="newUser.email" class="form-control" id="email" placeholder="Entrer email" required>
  				</div>

  				<!-- Date de naissance -->
  				<div class="form-group">
    					<label for="date">Date de naissance</label>
    					<input type="date" v-model="newUser.date" class="form-control" id="date" placeholder="Entrer Date de naissance" required>
  				</div>

  				<!-- Rue -->
  				<div class="form-group">
    					<label for="rue">Rue</label>
    					<input type="text" v-model="newUser.rue" class="form-control" id="rue" placeholder="Entrer adresse  (N°Rue Nom de la voie)" required>
  				</div>

  				<!-- Code Postal -->
  				<div class="form-group">
    					<label for="codePostal">Code Postal</label>
    					<input type="text" v-model="newUser.codePostal" class="form-control" id="codePostal" placeholder="Entrer code postal" required>
  				</div>

  				<!-- Ville -->
  				<div class="form-group">
    					<label for="ville">Ville</label>
    					<input type="text" v-model="newUser.ville" class="form-control" id="ville" placeholder="Entrer Ville" required>
  				</div>

					<br>
  				<!-- Photo -->
  				<div class="form-group">
    					<label for="photo" style="color:black">Joindre photo récente</label>
    					<input type="file" id="p3" class="form-control" id="photo" placeholder="Photo" required>
  				</div>
  				<div>
              <input type="text" ref="file-input" id="file" v-model="newUser.photo" class="form-control" id="photo" placeholder="Photo" >
          </div>
  				
  				<br>
  				<!-- Piece d'identité -->
  				<div class="form-group">
    					<label for="piece" style="color:black">Joindre piece d'identité</label>
    					<input type="file" id="p3" class="form-control" id="piece" placeholder="PIECE" required>
  				</div>
  				<div>
              <input type="text" ref="file-input" id="file" v-model="newUser.piece" class="form-control" id="photo" placeholder="Photo" >
          </div>

  				<br>
  				<!-- Justificatif de logement -->
  				<div class="form-group">
    					<label for="logement" style="color:black">Joindre justificatif de logement</label>
    					<input type="file" id="p3" class="form-control" id="exampleInputPassword1" placeholder="Entrer Date de naissance" required>
  				</div>
  				<div>
              <input type="text" ref="file-input" id="file" v-model="newUser.logement" class="form-control" id="photo" placeholder="Photo" >
          </div>
  <br>
  				<div id="vali" style="display:flex">
  					<div style="margin-right:10%">
  						<input type="checkbox" required>
  						<label style="color:black;">J'accepte les cookies</label>
  					</div>

  					<div style="margin-left:20%">
  						<button type="submit" style="float:left" class="btn btn-primary">S'inscrire</button>
  					</div>

  				</div>
				</form>
			</div>

			<div style="color:white;margin-bottom:10%">
				<router-link style="color:black;text-align:center" to='/login' class="nav-link" style="color:black" tabindex="-1">Déjà inscrit ? <span class="ins">Login</span> </router-link>
			</div>
  </div>

  </div>
</template>

<script>

module.exports = {

  data () {
    return {
      newUser:{
      	numPiece: '',
      	nom: '',
      	prenom: '',
        email: '',
        date: '',
        rue: '',
        codePostal: '',
        ville: '',
        photo: '',
        piece: '',
        logement: '',
 
      }
      
    }
  },
  methods: {
    async createUser() {
        await axios.post('/api/register',this.newUser)
        this.$router.push('/login')
    },

   /* onFileChange(e){
    		var files = e.tager.files || e.dataTransfer.files;
    		if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();

      reader.onload = (e) => {
        this.newUser.photo = e.target.result;
      };
      	reader.readAsDataURL(file);
  	  },

  	 onFileChange2(e){
    		var files = e.tager.files || e.dataTransfer.files;
    		if (!files.length)
        return;
      this.createImage2(files[0]);
    },
    createImage2(file) {
      var image = new Image();
      var reader = new FileReader();

      reader.onload = (e) => {
        this.newUser.piece = e.target.result;
      };
      	reader.readAsDataURL(file);
  	  },
  	  onFileChange3(e){
    		var files = e.tager.files || e.dataTransfer.files;
    		if (!files.length)
        return;
      this.createImage3(files[0]);
    },
    createImage3(file) {
      var image = new Image();
      var reader = new FileReader();

      reader.onload = (e) => {
        this.newUser.logement = e.target.result;
      };
      	reader.readAsDataURL(file);
  	  }*/
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
