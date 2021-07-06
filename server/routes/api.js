const express = require('express')
const nodemailer = require('nodemailer')
const router = express.Router()
const bcrypt = require('bcrypt')
const { Client } = require('pg')

require('dotenv').config()

const client = new Client({
	user: 'postgres',
	host: 'localhost',
	password: 'Rochroch',
	database: 'urneurlt'
})



client.connect()

/**
 * 
 * 
 * 
 *
 */
 /**Cette route retourne l'intégralité des 
 *  électionsdans la BDD
 */
router.get('/elections', async(req, res) => {

  const result = await client.query({
    text: 'SELECT * FROM election '    
  })

  res.json(result.rows)
})

router.get('/vainqueur', async(req, res) => {

  const result = await client.query({
    text: 'SELECT * FROM election natural join vainqueur natural join candidat'    
  })

  res.json(result.rows)
})


router.get('/email', async(req, res, next) => {
  var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'urnerl16@gmail.com',
    pass: 'UrneRL&44&'
  }
})

var mailOptions = {
  from: 'urnerl16@gmail.com',
  to: 'rochmbanya10@gmail.com',
  subject: 'Test',
  text: 'Test vrai'
}

transporter.sendMail(mailOptions, function(err, data){
  if(err){
      console.log('errr', err)
  }
  else{
      console.log('bon')
  }
})   

})

/**
 * 
 * 
 * 
 *
 */
 /**Cette route retourne l'élection en cours  
 * 
 */
router.get('/electionPrinc', async(req, res) => {

  const date = new Date()

  const result = await client.query({
    text: 'SELECT id_election, typeelection, dispositionscodeelectoral, id_employe, heuredebut, heurefin, pieceidentites, tour, Min(date) as date FROM election WHERE date >= $1 GROUP BY id_election',
    values:[date]    
  })

  if(result.rows.length == 0){
      res.status(404).json({ message: 'Aucune élection à venir'})
    return
  }


  res.json(result.rows)
})


/**Cette route retourne l'intégralité des 
 *  candidats présents dans la BDD
 */
router.get('/candidats', async(req, res) => {
  const date = new Date()

  const result1 = await client.query({
    text: 'SELECT id_election, typeelection, dispositionscodeelectoral, id_employe, heuredebut, heurefin, pieceidentites, tour, Min(date) as date FROM election WHERE date >= $1 GROUP BY id_election',
    values:[date]    
  })

  const result = await client.query({
    text: 'SELECT * FROM candidat natural join candidater natural join election WHERE id_election=$1',
    values: [result1.rows[0].id_election]    
  })

  console.log(result.rows)
  res.json(result.rows)
})


/**Cette route retourne l'intégralité des 
 *  électeurs provisoires présents dans la BDD
 */
router.get('/electeurs', async(req, res) => {

  const result = await client.query({
    text: 'SELECT * FROM  electeurprovisoire'    
  })

  res.json(result.rows)
})

/**Cette route retourne l'intégralité des 
 *  électeurs provisoires présents dans la BDD
 */
router.get('/electeursemarge', async(req, res) => {

  const result = await client.query({
    text: 'SELECT * FROM  electeur natural join participer'    
  })

  res.json(result.rows)
})



/*
 * Cette route est utilisée pour l'inscription à la bdd
 * 
 */
 router.post('/register', async(req, res) => {
  console.log(req.body.numPiece)
  const NumeroPiece = req.body.numPiece
  const NomElecteur = req.body.nom
  const PrenomElecteur = req.body.prenom
  const EmailElecteur = req.body.email
  const Date_Naissance = req.body.date
  const PieceElecteur = req.body.piece
  const PhotoElecteur = req.body.photo
  const JustLogement = req.body.logement

  const Rue = req.body.rue
  const CodePostal = req.body.codePostal
  const Ville = req.body.ville

  const result = await client.query({
    text: 'SELECT NumeroPiece, NomElecteur, PrenomElecteur, EmailElecteur FROM Electeurprovisoire WHERE NumeroPiece=$1 OR NomElecteur=$2 AND PrenomElecteur=$3 OR EmailElecteur = $4',
    values: [NumeroPiece, NomElecteur, PrenomElecteur, EmailElecteur]   
  })

  if(result.rows.length > 0){
    res.status(400).json({ message: 'Utilisateur existant!!'})
    return
  }

   const inst = await client.query({
    text: 'INSERT INTO Electeurprovisoire VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
    values: [NumeroPiece, NomElecteur, PrenomElecteur, EmailElecteur, Date_Naissance, PieceElecteur, PhotoElecteur, JustLogement]
  })

   const inst1 = await client.query({
    text: 'INSERT INTO Adresse (Rue,CodePostal,Ville,NumeroPiece) VALUES ($1,$2,$3,$4)',
    values: [Rue, CodePostal, Ville, NumeroPiece]
  })

   const inst4 = await client.query({
    text: 'SELECT * FROM employe WHERE admin=true'
  })

   const inst5 = await client.query({
    text: 'SELECT * FROM employe WHERE admin=false'
  })

   res.json('Insertion réussie')


   var bod = NomElecteur+ " "+ PrenomElecteur+" veut être membre de UrneUrl !!" 

   var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
      user: inst4.rows[0].emailemploye,
      pass: 'UrneRL&44&'
      }
    })

   for(var i =0; i<inst5.rows.length;i++){
      var mailOptions = {
        from: inst4.rows[0].emailemploye,
        to: inst5.rows[i].emailemploye,
        subject: 'Nouvelle inscription en attente',
        text: bod
      }

      transporter.sendMail(mailOptions, function(err, data){
        if(err){
          console.log('errr', err)
        }
        else{
          console.log('bon')
        }
      })   
   }


  
 })

/*
 * Cette route est utilisé pour l'inscription à la bdd
 * 
 
 router.post('/register', async(req, res) => {
  const NumeroPiece = req.body.numPiece
  const NomElecteur = req.body.nom
  const PrenomElecteur = req.body.prenom
  const EmailElecteur = req.body.email
  const Date_Naissance = req.body.date
  const PieceElecteur = req.body.piece
  const PhotoElecteur = req.body.photo
  const JustLogement = req.body.logement

  const Rue = req.body.rue
  const CodePostal = req.body.codePostal
  const Ville = req.body.ville

  const result = await client.query({
    text: 'SELECT NumeroPiece, NomElecteur, PrenomElecteur, EmailElecteur FROM Electeurprovisoire WHERE NumeroPiece=$1 OR NomElecteur=$2 AND PrenomElecteur=$3 OR EmailElecteur = $4',
    values: [NumeroPiece, NomElecteur, PrenomElecteur, EmailElecteur]   
  })

  if(result.rows.length > 0){
    res.status(400).json({ message: 'Utilisateur existant!!'})
    return
  }

  const hash = await bcrypt.hash(mdp, 10)

   const inst = await client.query({
    text: 'INSERT INTO users (email, password, pseudo) VALUES ($1,$2,$3)',
    values: [email,hash, pseudo]
  })

   res.json('Insertion réussie')

  
 })

*/

/*
 * Cette route est utilisé pour la connexion à la bdd
 * 
 */
  router.post('/login', async(req, res) => {
  const id = req.body.id
  const mdp = req.body.password
  var date = new Date();

  if(id.substring(0,4) == date.getFullYear()){
      const result = await client.query({
        text: 'SELECT * FROM electeur WHERE id_electeur=$1',
        values: [id]   
      })

      if(result.rows.length === 0){
         res.status(400).json({ message: 'Utilisateur inexistant!!'})
        return
      }

  //res.json(result.rows[0].password)
  
      if(!await bcrypt.compare(mdp, result.rows[0].motdepasse)){
        res.status(401).json({ message: 'mot de passe incorrect'})
        return
      }

      if(req.session.userId){
        res.status(402).json({ message: 'Déjà connecté'})
        return
      }

      req.session.userId = result.rows[0].id_electeur

      res.json(result.rows[0])
      console.log(req.session.userId)

  }

  else{
     const result = await client.query({
        text: 'SELECT * FROM employe WHERE id_employe=$1',
        values: [id]   
      })

     if(result.rows.length === 0){
    res.status(400).json({ message: 'Utilisateur inexistant!!'})
    return
  }

     if(mdp != result.rows[0].motdepassee){
      console.log(mdp)
      console.log(result.rows[0].motdepassee)
        res.status(401).json({ message: 'mot de passe incorrect'})
        return
      }

      if(req.session.userId){
        res.status(402).json({ message: 'Déjà connecté'})
        return
      }

      req.session.userId = result.rows[0].id_employe

      console.log(req.session.userId)

      res.json(result.rows[0])
  }

})


/**
 * Verifier si l'utilisateur est déjà connecté
 * 
 * */
  router.get('/verif', async (req, res) => {
    var date = new Date();

    console.log(date)

    if(req.session.userId){
      const result = await client.query({
        text: 'SELECT * FROM employe WHERE id_employe=$1',
        values: [req.session.userId]  
      })


      if(result.rows.length === 0){

        console.log("electeur44444")

        const result1 = await client.query({
          text: 'SELECT * FROM electeur WHERE id_electeur=$1',
          values: [req.session.userId]  
        })

        if(result1.rows.length === 0){
          res.status(400).json({ message: 'Utilisateur inexistant!!'})
          return
        }

         console.log(result1.rows[0].role)

         res.json(result1.rows[0])
         return
      }

       res.json(result.rows[0])
    }

    
  })
  

  router.get('/destroy', async (req, res) =>{
      if(req.session.userId){
        req.session.destroy
      }
  })


/*
 *
 * Cette route est utilisée pour l'inscription à la bdd
 * 
 */
 router.post('/programmer', async(req, res) => {

  var date1 = new Date();
  var an1 = date1.getFullYear()
  var mois1 = date1.getDate()
  var jour1 = date1.getMonth()
  console.log(an1 + " " + mois1 + " " + jour1)
  
  const typeelection = req.body.typeElection
  const date = req.body.date
  const heuredebut = req.body.heureDebut
  const heurefin = req.body.heureFin
  const dispositionscodeelectoral = req.body.dispElectorale
  const PieceEmploye = req.body.piecesIdentites
  const id_employe = req.session.userId

  var jour2 = parseInt(date.substring(0,2))+1
  var mois2 = parseInt(date.substring(4,5))
  var an2 = date.substring(6,10)

  var date2 = new Date(an2,mois2,jour2)

  console.log(an2 + " " + mois2 + " " + jour2)
  console.log(date2)

  if(date2 < date1){
    res.status(400).json({ message: 'Veuillez entrer une date à venir'})
        return
  }

  else{ 
      console.log(date)

      const result = await client.query({
        text: 'SELECT * FROM election WHERE date = $1',
        values: [date]   
      })

      if(result.rows.length > 0){
        res.status(400).json({ message: 'Election déjà programmé à cette date'})
        return
      }

      const inst = await client.query({
        text: 'INSERT INTO election (typeelection, date, dispositionscodeelectoral, id_employe, heuredebut, heurefin, pieceidentites) VALUES ($1,$2,$3,$4,$5,$6,$7)',
        values: [typeelection, date2, dispositionscodeelectoral, id_employe, heuredebut, heurefin, PieceEmploye]
      })

      res.json('Insertion réussie')

  }

 
  
 })

/**
 * 
 * 
 * Met à jour la console
*/
router.put('/candidat/:candidatId', async(req, res) => {
   const candidatId = parseInt(req.params.candidatId)

  // si gameId n'est pas un nombre (NaN = Not A Number), alors on s'arrête
  if (isNaN(candidatId)) {
    res.status(400).json({ message: 'candidatId should be a number' })
    return
  }
  
  req.candidatId = candidatId

  const nomcandidat = req.body.nom
  const prenomcandidat = req.body.prenom
  const programmeelectoral = req.body.programmeelectoral
  const datenaissance = req.body.date
  const sexe = req.body.sexe 
  const image = req.body.photo
    
console.log(candidatId + "  " + nomcandidat + "  " + prenomcandidat + "  "+ datenaissance + "  " + candidatId + "  "+ image)

    await client.query({
      text: 'UPDATE candidat SET nomcandidat=$1, prenomcandidat=$2, programmeelectoral=$3, datenaissance=$4, sexe=$5, image=$6 WHERE idcandidat=$7',
      values: [nomcandidat, prenomcandidat, programmeelectoral, datenaissance, sexe, image, req.candidatId]
    })
    res.send()
})

/**
 * 
 * 
 * M  E  T  ________________ A _____________ J  O  U  R __________________ L  E  S   _______________  V  O  T  E 
*/
router.put('/candidater/:candidatId', async(req, res) => {
   const candidatId = parseInt(req.params.candidatId)

  // si gameId n'est pas un nombre (NaN = Not A Number), alors on s'arrête
  if (isNaN(candidatId)) {
    res.status(400).json({ message: 'candidatId should be a number' })
    return
  }
  
  req.candidatId = candidatId

  const result = await client.query({
    text: 'SELECT * FROM candidat natural join candidater natural join election WHERE idcandidat =$1 AND id_electeur=$2',
    values: [req.candidatId, req.body.id_election]
  })

  if(result.rows.length > 0){
    
    await client.query({
      text: 'UPDATE electeur SET vote = true WHERE id_electeur=$1',
      values: [req.session.userId]
     })

    await client.query({
      text: 'UPDATE candidater SET nbrevote = nbrevote + 1 WHERE idcandidat=$1',
      values: [req.candidatId]
    })

    res.send()
  }

  else{
    res.status(404).json('Candidat ne fait pas partie des élections concernées')
  }
 
  
})



/**
 * 
 * Supprime une console
*/
router.delete('/candidat/:candidatId', async(req, res) => {
    const candidatId = parseInt(req.params.candidatId)

      // si consolId n'est pas un nombre (NaN = Not A Number), alors on s'arrête
      if (isNaN(candidatId)) {
        res.status(400).json({ message: 'candidatId should be a number' })
        return
      }
  
     req.candidatId = candidatId

     await client.query({
       text: 'DELETE FROM candidater WHERE idcandidat=$1',
       values: [req.candidatId]
     })

     await client.query({
       text: 'DELETE FROM candidat WHERE idcandidat=$1',
       values: [req.candidatId]
     })

     res.send()
})



 /*
 *
 * Cette route est utilisée pour l'aout d'un candidat
 * 
 */
 router.post('/candidat', async(req, res) => {
  
  const nomcandidat = req.body.nom
  const prenomcandidat = req.body.prenom
  const programmeelectoral = req.body.programmeelectoral
  const date = req.body.date
  const sexe = req.body.sexe
  const image = req.body.photo
  const election = req.body.election
  const dateE = req.body.dateE

  console.log(image)

  

  const result = await client.query({
      text: 'SELECT * FROM candidat WHERE nomcandidat = $1 AND prenomcandidat = $2',
      values: [nomcandidat, prenomcandidat]   
  })

  if(result.rows.length > 0){
      res.status(400).json({ message: 'Le candidat est déjà ajouté'})
      return
  }

  const inst2 = await client.query({
      text: 'SELECT * FROM election WHERE typeelection = $1 AND date = $2',
      values: [election, dateE]   
      })

  if(inst2.rows.length == 0){
    res.status(404).json({ message: 'Aucune élection correspondante'})
    return
  }

  const inst = await client.query({
      text: 'INSERT INTO candidat (nomcandidat, prenomcandidat, programmeelectoral, datenaissance, sexe, image) VALUES ($1,$2,$3,$4,$5,$6)',
      values: [nomcandidat, prenomcandidat, programmeelectoral, date, sexe, image]
  })

  const inst3 = await client.query({
      text: 'SELECT * FROM candidat WHERE nomcandidat = $1 AND prenomcandidat = $2',
      values: [nomcandidat, prenomcandidat]
  })

  console.log(election)

  const inst4 = await client.query({
      text: 'INSERT INTO candidater VALUES ($1,$2)',
      values: [inst2.rows[0].id_election, inst3.rows[0].idcandidat]
  })

      

      res.json('Insertion réussie')


 
  
 })


  /*
 *
 * Cette route est utilisée pour l'aout d'un candidat
 * 
 */
 router.post('/participer', async(req, res) => {
  
  const election = req.body.typeelection
  const dateE = req.body.date


  const inst2 = await client.query({
      text: 'SELECT * FROM election WHERE typeelection = $1 AND date = $2',
      values: [election, dateE]   
      })

  if(inst2.rows.length == 0){
    res.status(404).json({ message: 'Aucune élection correspondante'})
    return
  }

  const inst = await client.query({
      text: 'INSERT INTO participer VALUES ($1,$2)',
      values: [inst2.rows[0].id_election, req.session.userId]
  })

    
      res.json('Insertion réussie')
 })


 /**
  * 
  * V  A  L  I  D  E  R  ________________ L  E  S ________________ E  L  E  C  T  E  U  R  S
  * 
  * 
  */
router.post('/electeur', async(req, res) => {

  console.log(req.body.numeropiece)
  
  const id_electeur = req.body.id
  const motdepasse = req.body.motdepasse
  const numeropiece = req.body.numeropiece
  const role = "electeur"

  const hash = await bcrypt.hash(motdepasse, 10)

  const result = await client.query({
    text: 'SELECT idadresse FROM adresse WHERE numeropiece=$1',
    values: [numeropiece]   
  })

  console.log("1")

  if(result.rows.length == 0){
    res.status(404).json({ message: 'Aucune adresse pour cet electeur'})
    return
  }

  console.log(id_electeur)

  const inst2 = await client.query({
    text: 'SELECT * FROM electeur WHERE id_electeur=$1',
    values: [id_electeur]   
  })

  console.log("3")

  if(inst2.rows.length > 0){
    res.status(400).json({ message: 'Electeur déjà enregistré'})
    console.log("exist")
    return
  }

console.log("4")

   const inst = await client.query({
    text: 'INSERT INTO electeur ("id_electeur", "motdepasse", "idadresse", "numeropiece", "role") VALUES ($1,$2,$3,$4,$5)',
    values: [id_electeur, hash, result.rows[0].idadresse, numeropiece, role]
  })

   console.log("5")

 var vali = true

   await client.query({
    text: 'UPDATE electeurprovisoire SET valider=$1 WHERE numeropiece=$2',
    values: [vali,numeropiece]
   })

   res.json('Insertion réussie')

   const inst4 = await client.query({
    text: 'SELECT * FROM employe WHERE admin=true'
  })

   const inst5 = await client.query({
    text: 'SELECT * FROM electeurprovisoire WHERE numeropiece=$1',
    values: [numeropiece]
  })

   var bod = "Votre inscription a été validée. Vos identifiants pour une première connexion sont :\nIdentifiant : "+ id_electeur+ "\nMot de passe : "+motdepasse  

   var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
      user: inst4.rows[0].emailemploye,
      pass: 'UrneRL&44&'
      }
    })

   for(var i =0; i<inst5.rows.length;i++){
      var mailOptions = {
        from: inst4.rows[0].emailemploye,
        to: inst5.rows[i].emailelecteur,
        subject: 'Inscription Validée',
        text: bod
      }

      transporter.sendMail(mailOptions, function(err, data){
        if(err){
          console.log('errr', err)
        }
        else{
          console.log('bon')
        }
      })   
   }
  
 })


/*
  * 
  * V  A  L  I  D  E  R  ________________ L  E  S ________________ E  L  E  C  T  E  U  R  S
  * 
  * 
  */
router.post('/refelecteur', async(req, res) => {

  console.log(req.body.numeropiece)
  
  const id_electeur = req.body.id
  const motdepasse = req.body.motdepasse
  const numeropiece = req.body.numeropiece
  const role = "electeur"

  const hash = await bcrypt.hash(motdepasse, 10)

  const result = await client.query({
    text: 'SELECT idadresse FROM adresse WHERE numeropiece=$1',
    values: [numeropiece]   
  })

  console.log("1")

  if(result.rows.length == 0){
    res.status(404).json({ message: 'Aucune adresse pour cet electeur'})
    return
  }

  console.log(id_electeur)

  const inst2 = await client.query({
    text: 'SELECT * FROM electeur WHERE id_electeur=$1',
    values: [id_electeur]   
  })

  console.log("3")

  if(inst2.rows.length > 0){
    res.status(400).json({ message: 'Electeur déjà enregistré'})
    console.log("exist")
    return
  }

console.log("4")

 var vali = true

   await client.query({
    text: 'DELETE FROM electeurprovisoire WHERE numeropiece=$1',
    values: [numeropiece]
   })

   await client.query({
    text: 'DELETE FROM adresse WHERE numeropiece=$1',
    values: [numeropiece]
   })


   const inst4 = await client.query({
    text: 'SELECT * FROM employe WHERE admin=true'
  })

   const inst5 = await client.query({
    text: 'SELECT * FROM electeurprovisoire WHERE numeropiece=$1',
    values: [numeropiece]
  })

   var bod = "Votre inscription a été invalidée à cause d'une erreur dans vos pièces.\nVeuillez vous réinscrire avec des documents valides"  

   var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
      user: inst4.rows[0].emailemploye,
      pass: 'UrneRL&44&'
      }
    })

   for(var i =0; i<inst5.rows.length;i++){
      var mailOptions = {
        from: inst4.rows[0].emailemploye,
        to: inst5.rows[i].emailelecteur,
        subject: 'Inscription inalidée',
        text: bod
      }

      transporter.sendMail(mailOptions, function(err, data){
        if(err){
          console.log('errr', err)
        }
        else{
          console.log('bon')
        }
      })   
   }
  
 })

/**
  * 
  * V  A  L  I  D  E  R  ________________ L  E  S ________________ E  L  E  C  T  E  U  R  S
  * 
  * 
  */
router.post('/valielecteur', async(req, res) => {

  const id_electeur = req.body.id_electeur

  const result = await client.query({
    text: 'SELECT * FROM electeur natural join participer WHERE id_electeur=$1',
    values: [id_electeur]   
  })

  console.log("1")

  if(result.rows.length == 0){
    res.status(404).json({ message: 'Aucun electeur à ce numero'})
    return
  }

 var vali = true

   await client.query({
    text: 'UPDATE participer SET droitvote=$1 WHERE id_electeur=$2',
    values: [vali,result.rows[0].id_electeur]
   })

   res.json('Insertion réussie')

  
 })


/**  C  e  t  t  e  ____________  r  o  u  t  e  _________________ r  e  t  o  u  r  n  e ________ l'intégralité des 
 *  électeurs provisoires présents dans la BDD
 */
router.post('/electionlance', async(req, res) => {

  var date1 = new Date();
  var an1 = date1.getFullYear()
  var jour1 = date1.getDate()
  var mois1 = date1.getMonth() 
  var heure1 = parseInt(date1.getHours())
  
  console.log(heure1)
  

  //console.log(an2 + " " + mois2 + " " + jour2)
  //console.log(date2)


  const result = await client.query({
    text: 'SELECT * FROM  election WHERE id_election=$1',
    values: [req.body.id_election]    
  })

  console.log(result.rows[0].date.getFullYear())

  if(an1 == result.rows[0].date.getFullYear()){

    console.log("meme annee")

    if( mois1 == result.rows[0].date.getMonth()){
       console.log(parseInt(result.rows[0].heurefin.toString().substring(0,2)))

      if(jour1 == result.rows[0].date.getDate()){

       if( heure1 >= parseInt(result.rows[0].heurefin.toString().substring(0,1))){
          

          const result1 = await client.query({
              text: 'SELECT * FROM  candidater natural join candidat natural join election WHERE id_election=$1 ORDER BY nbrevote DESC',
              values: [req.body.id_election]    
          })

          const result2 = await client.query({
              text: 'SELECT COUNT(id_electeur) as nbrePart FROM  participer WHERE id_election=$1',
              values: [req.body.id_election]    
          })

          for(var i = 0; i < result2.rows.length; i++){
              console.log(result2.rows[i])

          } 


          /* ______________ E L E C T I O N _______________ */

          if(result1.rows[0].tour == 1){
              
              if((result2.rows[0].nbrepart / 2) <= result1.rows[0].nbrevote ){
                  console.log(result1.rows)
                  
                  const result7 = await client.query({
                      text: 'UPDATE election SET fini=true WHERE id_election=$1',
                      values: [req.body.id_election]    
                  })

                  for(var i =0; i<result1.rows.length;i++){
                      await client.query({
                        text: 'INSERT INTO vainqueur VALUES ($1,$2)',
                        values: [req.body.id_election, result1.rows[i].idcandidat]    
                      })
                  }
                  

                  res.json(result1.rows)
                  return
              }

              else{

                res.json(result1.rows)
                return
                
              }
          } 

          else{

             const result7 = await client.query({
                      text: 'UPDATE election SET fini=true WHERE id_election=$1',
                      values: [req.body.id_election]    
                  })

                 for(var i =0; i<result1.rows.length;i++){
                      await client.query({
                        text: 'INSERT INTO vainqueur VALUES ($1,$2)',
                        values: [req.body.id_election, result1.rows[i].idcandidat]    
                      })
                  }

                  res.json(result1.rows)

            console.log("terminé")

          }

          /* _____________ E L E C T I O N _________________ */      

          }
      }
     
    }
  }
/*
  else if(an1 > result.rows[0].date.getFullYear()){

  }

  else{

  }*/

})


module.exports = router
