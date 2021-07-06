

<template>

<!-- S  I      C  O  N  N  E  C  T  E   -->
<div v-if="isConnected">

  <div v-for="election in elections">
    <h1>{{election.typeelection}} {{election.date}} {{election.tour}}</h1>
    <div v-if="vainqueur.id_election===election.id_election" v-for="vainqueur in resultats">
      <div class="candit">
        <div  class="chCandit">
          <div  class="photo" :style="{ 'background-image' : 'url('+ vainqueur.image +')'}"> 
          </div>

          <!--Nom-->
          <div class="nom" style="color:black">
            {{ vainqueur.nomcandidat }} {{ vainqueur.prenomcandidat }}
          </div>

        <!--Description-->
          <div class="prog" style="color:black" >
            {{ vainqueur.programmeelectoral }}
          </div> 

          <!--Description-->
          <div class="prog" style="color:black" >
            {{ vainqueur.datenaissance }}
          </div> 

          <div class="prog" style="color:black" >
            Nobre de votes : {{ vainqueur.nbrevote }}
          </div> 

          <br>
          
        </div>
      </div>
    </div>
  </div>

</div>

<div else>

  <div v-for="election in elections">
    <h1>{{election.typeelection}} {{election.date}} {{election.tour}}</h1>
    <div v-if="vainqueur.id_election===election.id_election" v-for="vainqueur in resultats">
      <div class="candit">
        <div  class="chCandit">
          <div  class="photo" :style="{ 'background-image' : 'url('+ vainqueur.image +')'}"> 
          </div>

          <!--Nom-->
          <div class="nom" style="color:black">
            {{ vainqueur.nomcandidat }} {{ vainqueur.prenomcandidat }}
          </div>

        <!--Description-->
          <div class="prog" style="color:black" >
            {{ vainqueur.programmeelectoral }}
          </div> 

          <!--Description-->
          <div class="prog" style="color:black" >
            {{ vainqueur.datenaissance }}
          </div> 

          <div class="prog" style="color:black" >
            Nobre de votes : {{ vainqueur.nbrevote }}
          </div> 

          <br>
          
        </div>
      </div>
    </div>
  </div>

</div>      
</template>

<script>

module.exports = {
  props: {
    candidats: { type: Array, default: [] },
    vainqueurs: { type: Array, default: [] },
    resultats: { type: Array, default: [] },
    elections: { type: Array, default: [] },
    vainqueur: {type: Object},
    user: {type: Object},
    isConnected: { type: Boolean },
    admin: { type: Boolean},
    vote: { type: Boolean},
    debut: { type: Boolean},
    fini: { type: Boolean},
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
        id_election: '',
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
      alert(this.newCandidat.photo)
      this.$emit('add-candidat', this.newCandidat)
    },
    
    deleteCandidat (candidatId) {
      this.$emit('delete-candidat', candidatId)
    },

    /*onFileChange(e){
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();

      reader.onload = (e) => {
        this.newCandidat.photo = e.target.result;

      };
        reader.readAsDataURL(file);
      },

     onFileChange2(e){
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
        return;
      this.createImage2(files[0]);
    },
    createImage2(file) {
      var image = new Image();
      var reader = new FileReader();

      reader.onload = (e) => {
        this.editingCandidat.photo = e.target.result;
      };
        reader.readAsDataURL(file);
      },
    */
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
       this.votingCandidat.id_election = candidat.id_election
       this.$emit('voter-candidat', this.votingCandidat)
    
    },

    sendEditCandidat () {
      

      alert(this.editingCandidat.photo)

        
      this.$emit('result', this.editingCandidat)
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
