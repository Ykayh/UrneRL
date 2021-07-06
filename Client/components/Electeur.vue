<template>

<!-- S  I      C  O  N  N  E  C  T  E   -->
<div v-if="isConnected">
<!-- S  I      E  M  P  L  O  Y  E       A  J  O  U  T  E  R       C  A  N  D  I  D  A  T  E  R-->
  <div v-if="role === 'employe' " id="form" class="body"> 
      
      <p style="text-align:center;color:black;margin-top:2%;margin-bottom:2%;font-size:250%">Les Electeurs</p>
      <hr style="color:black;width:10%;margin:auto;margin-bottom:2%;">
      
      <table class="table">
          <thead>
            <tr>
              <th class="th">Numero de Piece</th>
              <th class="th">Nom</th>
              <th class="th">Prenom</th>
              <th class="th" >Email</th>
              <th class="th">Date de naissance</th>
              <th class="th">Piece d'identité</th>
              <th class="th">Photo</th>
              <th class="th">Justif de logement</th>
              <th class="th">Valider Inscription</th>
            </tr>
          </thead>
          
          <tbody>
            <tr v-for="electeur in electeurs" :key="electeur.numeropiece" >
              <div v-if="!electeur.valider">
                <td class="td">{{ electeur.numeropiece }}</td>
                <td class="td" >{{electeur.nomelecteur}}</td>
                <td class="td">{{electeur.prenomelecteur}}</td>
                <td class="td">{{electeur.emailelecteur}}</td>
                <td class="td">{{electeur.date_naissance}}</td>
                <td class="td"><a :href="electeur.pieceelecteur" :download="electeur.pieceelecteur">Download</a></td>
                <td class="td"><a :href="electeur.photoelecteur" :download="electeur.photoelecteur">Download</a></td>
                <td class="td"><a :href="electeur.justlogement" :download="electeur.justlogement">Download</a></td>
                <td class="td">
                <button type="button" class="btn btn-info" @click="valider(electeur)">Valider</button>
                <button type="button" class="btn btn-danger" @click="invalider(electeur)">Invalider</button></td>
              </div>
            </tr>
          </tbody>
           
        
   
      </table>


  </div>

    </div>



<!--  N  O  N  ____________________  C  O  N  N  E  C  T  E -->
<div v-else>

</div>     

</template>

<script>

module.exports = {
  props: {
    electeurs: { type: Array, default: [] },
    user: {type: Object},
    isConnected: { type: Boolean },
    admin: { type: Boolean},
    role: {type: String}
  },
  data () {
    return {
      editingElecteur: {
        id: '',
        motdepasse: '',
        numeropiece: '',
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
    valider(electeur) {


      this.editingElecteur.numeropiece = electeur.numeropiece
      var num = electeur.numeropiece.substring(2,5).toString()
      var an = new Date();
      var an1 = an.getFullYear().toString();
  //    alert(an1)

      this.editingElecteur.id = an1 + num
      this.editingElecteur.motdepasse = num + an1
/*
      alert(this.editingElecteur.id)
      alert(this.editingElecteur.motdepasse)*/
     this.$emit('update-electeur', this.editingElecteur)
    },

    invalider(electeur) {


      this.editingElecteur.numeropiece = electeur.numeropiece
      var num = electeur.numeropiece.substring(2,5).toString()
      var an = new Date();
      var an1 = an.getFullYear().toString();
  //    alert(an1)

      this.editingElecteur.id = an1 + num
      this.editingElecteur.motdepasse = num + an1
/*
      alert(this.editingElecteur.id)
      alert(this.editingElecteur.motdepasse)*/
     this.$emit('refuse-electeur', this.editingElecteur)
    },
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
