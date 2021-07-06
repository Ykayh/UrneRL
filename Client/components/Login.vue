<template>
<div>
<div style="display:flex;;" >


	<div id="form" >
		
		<h2 style="margin-top:10%;width:10%;margin-left:auto;margin-right:auto;color:black">Connexion</h2>
		<div id="form2">
    		<!--h2 style="width:40%;margin-left:auto;margin-right:auto;color:black">Connexion</h2-->
    	<!-- TODO -->
  		
  			<form @submit.prevent="loginUser">
  			
  				<div class="form-group">
    				<label for="exampleInputEmail1" style="color:black">Identifant</label>
    				<input type="text" v-model="newUser.id" id="e" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter identifiant" required>
  				</div>
  			<br>
  				<div class="form-group">
    				<label style="color:black" for="exampleInputPassword1">Password</label>
    				<input type="password" id="p" v-model="newUser.password" class="form-control" id="exampleInputPassword1" placeholder="Password" required>
  				</div>
  <br>
  				<div id="vali" style="display:flex">
  					<router-link style="color:black" to='/register' class="nav-link" tabindex="-1">Mot de passe oublié ?</router-link>

  					<button id="btnConnexion" style="float:left" type="submit" class="btn btn-primary pull-right">Connexion</button>
  					
  				</div>
  
			</form>

		</div>

		<div style="color:white;margin-bottom:10%">
			<router-link style="text-align:center;color:black" to='/register' class="nav-link " tabindex="-1">Pas encore membre ? <span class="ins">S'Inscrire</span></router-link>
		</div>
  	</div>

 </div>
</template>

<script>

module.exports = {

  data () {
    return {
      newUser:{
        id: '',
        password: '',
      }
      
    }
  },
  methods: {
    loginUser() {
        this.$emit('login', this.newUser)
    }
  	  }
}
</script>

<style scoped>


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

body{
	background-color : white;
}

</style>
