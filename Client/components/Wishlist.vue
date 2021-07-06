<template>
<div v-if="isConnected">
     <h2 style="text-align:center;margin-top:2%;margin-bottom:2%">My WishList de {{ user.pseudo }}</h2>
  <div id="gaming">
    
    
    <!-- Bloc affichant les jeux-->
    <div v-for="game in wishlist.games" :key="game.id">
        <div class="group">
        <!--Image-->
        <div  class="image" :style="{ 'background-image': 'url('+ find(game.id).image +')'}"> 
        </div>

        <!--Nom-->
        <div id="name">
        {{ find(game.id).name}}
        </div>

        <!--Description-->
        <div id="description">
        {{ find(game.id).description }}
        </div>

        <!--Button-->
        <div id="bouton">
        <a :href='find(game.id).gameplay'><button class="btn btn-info"> Game Play</button></a>

        <a :href='find(game.id).lienachat'><button class="btn btn-info"> Lien vers l'achat</button></a>
        </div>

        </div> 
        <br>       
        </div>

  </div>
  </div>

  <div v-else>
    <h2 style="text-align:center"> Vous n'êtes pas encore connecté {{user.pseudo}} </h2>
    <div style="text-align:center">
          <router-link to="/login" ><button type="button" class="btn btn-success">S'identifier</button></router-link>
        
  </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    games: { type: Array, default: [] },
    wishlist: { type: Object },
    user: {type: Object},
    isConnected: { type: Boolean }
  },
  data () {
    return {
    }
  },
  methods: {
    find (gameId) {
      return this.games.find(game => game.id === gameId)
    },
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
	width:20em;
	height:20em;

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

</style>
