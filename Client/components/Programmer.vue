<template>

<div>
<div style="display:flex;">

    <div id="form">
    	<h2 style="margin-top:10%;width:20%;margin-left:auto;margin-right:auto;color:black">Programmer une élection</h2>
    <!-- TODO -->
  	
  	<div id="form2">
  	 	<form @submit.prevent="createElection">
  				<!-- Numero de piece d'identité -->
  				<div class="form-group">
    					<label for="exampleInputEmail2">Type d'election</label>
    					<input type="text" v-model="newElection.typeElection" id="e" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Entrer type election" required>
  				</div>
  	
  			  <!-- Nom -->
  				<div class="form-group">
    					<label for="date">Date</label>
    					<input type="date" v-model="newElection.dateDebut" id="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Entrer Date de l'election" required>
  				</div>
  
  				<!-- Prenom -->
  				<div class="form-group">
    					<label for="heureDebut">Heure de début</label>
    					<input type="time" v-model="newElection.heureDebut" id="heureDebut" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Entrer Heure de début" required>
  				</div>

  				<!-- Heure de fin -->
  				<div class="form-group">
    					<label for="heureFin">Heure de Fin</label>
    					<input type="time" v-model="newElection.heureFin" id="heureFin" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Entrer Date de Fin" required>
  				</div>

  				<!-- Email -->
  				<div class="form-group">
    					<label for="email">Disposition electorale</label>
    					<input type="text" id="p2" v-model="newElection.dispElectorale" class="form-control" id="email" placeholder="Entrer disposition du code electoral" required>
  				</div>

  				<!-- Date de naissance -->
  				<div class="form-group">
    					<label for="piece">Piece d'identité</label>
    					<input type="text" v-model="newElection.piecesIdentites" class="form-control" id="piece" placeholder="Entrer ensemble des pieces nécessaires" required>
  				</div>

  				<br>
  				
  <br>
  				<div id="vali" style="display:flex">

  					<div>
  						<button type="submit" style="float:left" class="btn btn-primary">Programmer</button>
  					</div>

  				</div>
				</form>
			</div>

			<div style="color:white;margin-bottom:10%">
				<router-link style="color:black;text-align:center" to='/login' class="nav-link" style="color:black" tabindex="-1"><span class="ins"></span> </router-link>
			</div>
  </div>

  </div>
</template>

<script>

module.exports = {

  data () {
    return {
      newElection:{
      	typeElection: '',
      	date: '',
      	heureDebut: '',
      	heureFin:'',
        dispElectorale: '',
        piecesIdentites: '', 
      }
      
    }
  },
  methods: {
  	
    async createElection() {
        await axios.post('/api/programmer',this.newElection)
        this.$router.push('/')
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
