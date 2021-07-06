

<template>

<!-- S  I      C  O  N  N  E  C  T  E   -->
<div v-if="isConnected">

<div v-if="vainqueurs.length > 0">

  <div v-if="fini">
     <p style="text-align:center;color:black;margin-top:2%;margin-bottom:2%;font-size:250%">Le Vainqueur
     </p>
      <hr style="color:black;width:10%;margin:auto;margin-bottom:2%;">
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

      <p style="text-align:center;color:black;margin-top:2%;margin-bottom:2%;font-size:250%">Les Résultats des élections
     </p>
      <hr style="color:black;width:10%;margin:auto;margin-bottom:2%;">
       <div class="candit">
        <div  class="chCandit" v-for="candidat in vainqueurs" :key="candidat.idcandidat">
          <div  class="photo" :style="{ 'background-image' : 'url('+ candidat.image +')'}"> 
          </div>

          <!--Nom-->
          <div class="nom" style="color:black">
            {{ candidat.nomcandidat }} {{ candidat.prenomcandidat }}
          </div>

        <!--Description-->
          <div class="prog" style="color:black" >
            {{ candidat.programmeelectoral }}
          </div> 

          <!--Description-->
          <div class="prog" style="color:black" >
            {{ candidat.datenaissance }}
          </div> 

          <div class="prog" style="color:black" >
            Nobre de votes : {{ vainqueur.nbrevote }}
          </div> 

          <br>
          <!--Bouton pour modifier les caractéristiques de la console-->
            <div v-if="!vote" style="text-align:center">
              <button  type="button" class="btn btn-info" id="bat2" @click="voter(candidat)">Voter</button>
            </div> 

            <div v-else style="text-align:center">
              <p style="color:blue;text-align:center">Merci d'avoir voté</p>
            </div> 
        </div>
      </div>
  </div>

  <div v-else>
    <p style="text-align:center;color:black;margin-top:2%;margin-bottom:2%;font-size:250%">Les Résultats du 1er tour
     </p>
      <hr style="color:black;width:10%;margin:auto;margin-bottom:2%;">
       <div class="candit">
        <div  class="chCandit" v-for="candidat in vainqueurs" :key="candidat.idcandidat">
          <div  class="photo" :style="{ 'background-image' : 'url('+ candidat.image +')'}"> 
          </div>

          <!--Nom-->
          <div class="nom" style="color:black">
            {{ candidat.nomcandidat }} {{ candidat.prenomcandidat }}
          </div>

        <!--Description-->
          <div class="prog" style="color:black" >
            {{ candidat.programmeelectoral }}
          </div> 

          <!--Description-->
          <div class="prog" style="color:black" >
            {{ candidat.datenaissance }}
          </div> 

          <div class="prog" style="color:black" >
            Nobre de votes : {{ vainqueur.nbrevote }}
          </div> 

          <br>
          <!--Bouton pour modifier les caractéristiques de la console-->
            <div v-if="!vote" style="text-align:center">
              <button  type="button" class="btn btn-info" id="bat2" @click="voter(candidat)">Voter</button>
            </div> 
            <div v-else style="text-align:center">
              <p style="color:blue;text-align:center">Merci d'avoir voté</p>
            </div> 
        </div>
      </div>
  </div>


</div>


<!-- S  I  _____________  E L E C T I O N  ___________  N  O  N ____________  T  E  R  M  I N E E-->

<div v-else>
<!-- S  I      E  M  P  L  O  Y  E       A  J  O  U  T  E  R       C  A  N  D  I  D  A  T  E  R-->
  <div v-if="role === 'employe' " id="form" class="body"> 

<br>
    <!-- Button pour ajouter un jeu-->
      <div style="text-align:center">
          <button type="button" class="btn btn-secondary" @click="show">Ajouter candidat</button>
      </div>
<br>
      <div  id="form2" style="display:none">
        <h4 style="color:black;text-align:center">Nouveau Candidat</h4>
        <br>
        <form @submit.prevent="addCandidat">
          <div id="editGame" style="text-align:center" class="form-group">
              <select name="election" v-model="newCandidat.election">
                <option selected hidden value="">Choisir une élection</option>
                <option value="Présidentielle">Présidentielle</option>
                <option value="Législative">Législative</option>
                <option value="Sénatorialle">Sénatoriale</option>
                <option value="Régionale">Régionale</option>
                <option value="Départementale">Départementale</option>
              </select>
          </div>

          <div id="editGame" class="form-group">
              <label style="color:black" for="date">Date de l'élection</label>
              <input type="date" v-model="newCandidat.dateE" class="form-control" id="date" placeholder="Entrer Date de naissance" required>
          </div>


          <div id="editGame" class="form-group aa">
            <input type="text" v-model="newCandidat.nom" class="form-control" placeholder="Nom du candidat" required>
          </div>

          <div id="editGame" class="form-group aa">
            <input class="form-control" type="text" v-model="newCandidat.prenom" placeholder="Prenom du candidat">
          </div>

          <div id="editGame" class="form-group aa" style="display:flex">
            <div style="margin-right:5%; ">
              <input type="radio" id="Homme" name="drone" v-model="newCandidat.sexe" value="Homme"
         checked>
              <label style="color:black" for="Homme">Homme</label>
            </div>
            <div>
              <input type="radio" v-model="newCandidat.sexe" id="Femme" name="drone" value="Femme">
              <label style="color:black " for="Femme">Femme</label>
            </div>
          </div>

          <div id="editGame" class="form-group">
            <label style="color:black"> Date de naissance</label>
              <input class="form-control" type="date" v-model="newCandidat.date" placeholder="Date de naissance">
          </div>

        <!-- Justificatif de logement -->
        <div id="editGame" class="form-group aa">
            <textarea class="form-control" placeholder="Programme electoral" type="text" v-model="newCandidat.programmeelectoral" required></textarea>
        </div>


         <!-- Photo -->
          <div class="form-group">
              <label for="photo" style="color:black">Joindre photo récente</label>
              <input type="file" class="form-control" id="photo" placeholder="Photo" required>
          </div>

          <div>
              <input type="text" ref="file-input" id="file" v-model="newCandidat.photo" class="form-control" placeholder="Photo" >
          </div>
        
              <button style="margin-top:5%;margin-left:3%" id="btnConnexion" class="btn btn-primary pull-right" type="submit">Ajouter</button>
      
      </form>
    </div>
  
<!-- FIN SI EMPLOYE FIN AJOUT CANDIDAT-->

  <p style="text-align:center;color:black;margin-top:2%;margin-bottom:2%;font-size:250%">Les Candidats</p>
      <hr style="color:black;width:10%;margin:auto;margin-bottom:2%;">






 <div  id="form3" style="display:none">
      <h4 style="color:black;text-align:center">Modifier Candidat</h4>
      <br>
      <form @submit.prevent="sendEditCandidat">

        <div id="editGame" class="form-group aa">
            <input type="text" v-model="editingCandidat.nom" class="form-control" placeholder="Nom du candidat" required>
        </div>

        <div id="editGame" class="form-group aa">
            <input class="form-control" type="text" v-model="editingCandidat.prenom" placeholder="Prenom du candidat">
        </div>

        <div id="editGame" class="form-group aa" style="display:flex">
          <div style="margin-right:5%; ">
            <input type="radio" id="Homme" name="drone" v-model="editingCandidat.sexe" value="Homme"
         checked>
            <label style="color:black" for="Homme">Homme</label>
          </div>
          <div>
            <input type="radio" v-model="editingCandidat.sexe" id="Femme" name="drone" value="Femme">
            <label style="color:black" for="Femme">Femme</label>
          </div>
        </div>

        <div id="editGame" class="form-group">
           <label style="color:black"> Date de naissance</label>
            <input class="form-control" type="date" v-model="editingCandidat.date" placeholder="Date de naissance">
        </div>

        <!-- Justificatif de logement -->
        <div id="editGame" class="form-group aa">
            <textarea class="form-control" placeholder="Programme electoral" type="text" v-model="editingCandidat.programmeelectoral" required></textarea>
        </div>


         <!-- Photo -->
          <div>
              <label for="photo" style="color:black">Joindre photo récente</label>
              <input type="file" ref="file-input" id="file2"  class="form-control"  placeholder="Photo" >
          </div>

          <div>
              <input type="text" ref="file-input" id="file3" v-model="editingCandidat.photo" class="form-control" placeholder="Photo" >
          </div>
        
              <button style="margin-top:5%;margin-left:3%" id="btnConnexion" class="btn btn-primary pull-right" type="submit">Modifier</button>
      
      </form>
    </div>










      <div class="candit">
        <div  class="chCandit" v-for="candidat in candidats" :key="candidat.idcandidat">
          <div  class="photo" :style="{ 'background-image' : 'url('+ candidat.image +')'}"> 
          </div>

          <!--Nom-->
          <div class="nom" style="color:black">
            {{ candidat.nomcandidat }} {{ candidat.prenomcandidat }}
          </div>

        <!--Description-->
          <div class="prog" style="color:black" >
            {{ candidat.programmeelectoral }}
          </div>  

           <!--Description-->
        <div class="prog" style="color:black" >
            {{ candidat.datenaissance }}
          </div>



          <!--Boutons-->
        <div id="bouton1">
          
          <!--Bouton pour supprimer la console-->
          <div>
            <button type="button" class="btn btn-warning" @click="deleteCandidat(candidat.idcandidat)"><i class="fa fa-trash" aria-hidden="true"></i></button>
          </div>

          <!--Bouton pour modifier les caractéristiques de la console-->
            <div>
              <button type="button" class="btn btn-info" @click="editCandidat(candidat)">Modifier</button>
            </div>
                
          </div>


        </div>
    </div>
  </div>


<!-- F   I   N      E  M  P  L  O  Y  E -->












<!-- S  I      E  L  E  C  T  E  U  R   -->
  <div  id="form" v-else>
      <p style="text-align:center;color:black;margin-top:2%;margin-bottom:2%;font-size:250%">Les Candidats</p>
      <hr style="color:black;width:10%;margin:auto;margin-bottom:2%;">
      <div class="candit">
        <div  class="chCandit" v-for="candidat in candidats" :key="candidat.idcandidat">
          <div  class="photo" :style="{ 'background-image' : 'url('+ candidat.image +')'}"> 
          </div>

          <!--Nom-->
          <div class="nom" style="color:black">
            {{ candidat.nomcandidat }} {{ candidat.prenomcandidat }}
          </div>

        <!--Description-->
          <div class="prog" style="color:black" >
            {{ candidat.programmeelectoral }}
          </div> 

          <!--Description-->
          <div class="prog" style="color:black" >
            {{ candidat.datenaissance }}
          </div> 

          <br>
          <!--Bouton pour modifier les caractéristiques de la console-->
            <div v-if="!vote" style="text-align:center">
              <button type="button" class="btn btn-info" id="bat2" @click="voter(candidat)">Voter</button>
               <!--p v-else style="color:blue;text-align:center">Le vote aura lieu le {{candidat.date}} à partir de {{candidat.heurefin}}</p-->
            </div> 
            <div v-else style="text-align:center">
              <p style="color:blue;text-align:center">Merci d'avoir voté</p>
            </div> 
        </div>
      </div>
    </div>

 </div>   
  </div>




















<!-- S  I ________________  N  O  N ____________  C  O  N  N  E  C  T  E -->

    <!--h2 style="text-align:center"> Vous n'êtes pas encore connecté {{user.email}} </h2>
    <div style="text-align:center">
          <router-link to="/login" ><button type="button" class="btn btn-success">S'identifier</button></router-link-->

<div id="form" v-else >

      <div v-if="vainqueurs.length>0">


  <div v-if="fini">
     <p style="text-align:center;color:black;margin-top:2%;margin-bottom:2%;font-size:250%">Le Vainqueur
     </p>
      <hr style="color:black;width:10%;margin:auto;margin-bottom:2%;">
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

          <br>
          
        </div>
      </div>
  </div>

  <div v-else>
    <p style="text-align:center;color:black;margin-top:2%;margin-bottom:2%;font-size:250%">Les Vainqueurs du 1er tour
     </p>
      <hr style="color:black;width:10%;margin:auto;margin-bottom:2%;">
       <div class="candit">
        <div  class="chCandit" v-for="candidat in vainqueurs" :key="candidat.idcandidat">
          <div  class="photo" :style="{ 'background-image' : 'url('+ candidat.image +')'}"> 
          </div>

          <!--Nom-->
          <div class="nom" style="color:black">
            {{ candidat.nomcandidat }} {{ candidat.prenomcandidat }}
          </div>

        <!--Description-->
          <div class="prog" style="color:black" >
            {{ candidat.programmeelectoral }}
          </div> 

          <!--Description-->
          <div class="prog" style="color:black" >
            {{ candidat.datenaissance }}
          </div> 

          <br>
          <!--Bouton pour modifier les caractéristiques de la console-->
            <div v-if="!vote" style="text-align:center">
              <button  type="button" class="btn btn-info" id="bat2" @click="voter(candidat)">Voter</button>
            </div> 
            <div v-else style="text-align:center">
              <p style="color:blue;text-align:center">Merci d'avoir voté</p>
            </div> 
        </div>
      </div>
  </div>


      </div>

      <div v-else>

      
      <p style="text-align:center;color:black;margin-top:2%;margin-bottom:2%;font-size:250%">Les Candidats</p>
      <hr style="color:black;width:10%;margin:auto;margin-bottom:2%;">
      <div class="candit">
        <div  class="chCandit" v-for="candidat in candidats" :key="candidat.idcandidat">
          <div  class="photo" :style="{ 'background-image' : 'url('+ candidat.image +')'}"> 
          </div>

          <!--Nom-->
          <div class="nom" style="color:black">
            {{ candidat.nomcandidat }} {{ candidat.prenomcandidat }}
          </div>

        <!--Description-->
        <div class="prog" style="color:black" >
            {{ candidat.datenaissance }}
          </div>

          <div class="prog" style="color:black" >
            {{ candidat.programmeelectoral }}
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
