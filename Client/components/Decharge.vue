<template>

<!-- S  I      C  O  N  N  E  C  T  E   -->
<div v-if="isConnected">
<!-- S  I      E  M  P  L  O  Y  E       A  J  O  U  T  E  R       C  A  N  D  I  D  A  T  E  R-->
  <div v-if="role ==='electeur'" id="form"> 
    <br>
      <div  id="form2">

        <h4 style="color:black;text-align:center">Emarger</h4>
        <br>
        <form @submit.prevent="addParticiper">
          <div id="editGame" style="text-align:center" class="form-group">
              <select name="election" v-model="electionParticip.typeelection">
                <option selected hidden value="">Choisir une élection</option>
                <option value="Présidentielle">Présidentielle</option>
                <option value="Législative">Législative</option>
                <option value="Sénatorialle">Sénatoriale</option>
                <option value="Régionale">Régionale</option>
                <option value="Départementale">Départementale</option>
              </select>
          </div>

          <div id="editGame" class="form-group">
              <label style="color:black"for="date">Date de l'élection</label>
              <input type="date" v-model="electionParticip.date" class="form-control" id="date" placeholder="Entrer Date de naissance" required>
          </div>

        
              <button style="margin-top:5%;margin-left:3%" id="btnConnexion" class="btn btn-primary pull-right" type="submit">Signer</button>
      
      </form>
    </div>
    <br>


</div>


<!-- F   I   N      E  M  P  L  O  Y  E -->



<!-- S  I  ____________________________  N  O  N  _________________  E  L  E  C  T  E  U  R   -->
  <div id="form" v-else >
    <div style="margin-left:auto;margin-right:auto;width:85%" >
     <p  style="text-align:center;color:black;margin-top:2%;margin-bottom:2%;font-size:250%">Les Electeurs ayant emargé</p>
      <hr style="color:black;width:10%;margin:auto;margin-bottom:2%;">
      
      <table class="table">
          <thead>
            <tr>
              <th class="th">Numero de Piece</th>
              <th class="th">Identifiant</th>
              <th class="th">Justif de logement</th>
              <th class="th">Valider Inscription</th>
            </tr>
          </thead>
          
          <tbody>
            <tr v-for="electeur in electeursemarge" :key="electeur.numeropiece" v-if="!electeur.droitvote">
              <td class="td">{{ electeur.numeropiece }}</td>
              <td class="td" >{{electeur.id_electeur}}</td>
              <td class="td"><a href="#" download="vote2.jpg">Download</a></td>
               <td class="td">
                <button type="button" class="btn btn-info" @click="validerpart(electeur)">Valider</button>
                <button type="button" class="btn btn-danger" @click="invaliderpart(electeur)">InValider</button></td>
            </tr>
          </tbody>
           
        
   
      </table>
    
  </div>
</div>
</div>




















<!-- S  I ________________  N  O  N ____________  C  O  N  N  E  C  T  E -->

    <!--h2 style="text-align:center"> Vous n'êtes pas encore connecté {{user.email}} </h2>
    <div style="text-align:center">
          <router-link to="/login" ><button type="button" class="btn btn-success">S'identifier</button></router-link-->

    <div id="form" v-else>

      <p style="text-align:center;color:black;margin-top:2%;margin-bottom:2%;font-size:250%;margin-top:5%">Vous n'êtes pas connecté ! <router-link to='/login' title="Connectez-vous" class="nav-link na" tabindex="-1">Connexion ?! </router-link></p>

    </div>
      
</template>

<script>

module.exports = {
  props: {
    candidats: { type: Array, default: [] },
    electeursemarge: { type: Array, default: [] },
    user: {type: Object},
    isConnected: { type: Boolean },
    admin: { type: Boolean},
    vote: { type: Boolean},
    droitvote: { type: Boolean},
    role: {type: String}
  },
  data () {
    return {
      editingCandidat: {
        id: -1,
        nom: '',
        prenom: '',
        programmeelectoral: '',
        date: '',
        sexe: '',
        photo: '',
       },

      votingCandidat: {
        id: 0,
       },

       electionParticip:{
          typeelection: '',
          date: '',
       },

      newCandidat: {
              nom: '',
              prenom: '',
              programmeelectoral: '',
              date: '',
              sexe: '',
              photo: '',
              election: '',
              dateE: ''
      }
    }
  },
  methods: {
    show(){
      var form = document.getElementById('form2')
      if(form.style.display === "none")
        form.style.display=''
      else
        form.style.display='none'
    },
    
    addCandidat () {
      this.$emit('add-candidat', this.newCandidat)
      this.$router.push('/candidat')
    },
    
    addParticiper () {
      this.$emit('add-participation', this.electionParticip)
      this.$router.push('/candidat')
    },
    

    deleteCandidat (candidatId) {
      this.$emit('delete-candidat', candidatId)
    },
    
    editCandidat (candidat) {
       var form = document.getElementById('form3')
      if(form.style.display === "none")
        form.style.display=''
      else
        form.style.display='none'

      this.editingCandidat.id = candidat.idcandidat
      this.editingCandidat.nom = candidat.nomcandidat
      this.editingCandidat.prenom = candidat.prenomcandidat
      this.editingCandidat.programmeelectoral = candidat.programmeelectoral
      this.editingCandidat.date = candidat.datenaissance
      this.editingCandidat.sexe = candidat.sexe
      this.editingCandidat.photo = candidat.image
    },

    voter(candidat) {
       this.votingCandidat.id = candidat.idcandidat
       this.$emit('voter-candidat', this.votingCandidat)
       this.$router.push('/candidat')
    },

    validerpart(electeur) {
       this.$emit('valider-electeur', electeur)
       this.$router.push('/candidat')
    },

    sendEditCandidat () {
      this.$emit('update-candidat', this.editingCandidat)
      this.abortEditCandidat()
      var form = document.getElementById('form3')
      if(form.style.display === "none")
        form.style.display=''
      else
        form.style.display='none'
      this.$router.push('/candidat')
    },
    abortEditCandidat () {
      this.editingCandidat = {
        id: -1,
        nom: '',
        prenom: '',
        programmeelectoral: '',
        date: '',
        sexe: '',
        photo: '',
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
	border: solid black;
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
	width:95%;
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
