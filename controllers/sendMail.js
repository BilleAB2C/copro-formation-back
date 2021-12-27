const nodemailer = require("nodemailer");

exports.sendMailContact= (req, res, next) => {
  console.log("coucou");
  const transporter = nodemailer.createTransport({
    service : 'hotmail',
    auth:{
      user:"billel.abbes@hotmail.com",
      pass:"00213bnAZ77&&"
    }
  })

  const html = "<h2>Demande de contact</h2>"+
               "<h3>Nom : "+req.body.nom+"</h3>"+
               "<h3>Prénom : "+req.body.prenom+"</h3>"+
               "<h3>Email : "+req.body.email+"</h3>"+
               "<h3>Objet : "+req.body.objet+"</h3>"+
               "<h3>Message</h3><p>"+req.body.message+"</p>" ;

  const text = "Nom : "+req.body.nom+"\n"+
               "Prénom : "+req.body.prenom+"\n"+
               "Email : "+req.body.email+"\n"+
               "Objet : "+req.body.objet+"\n"+
               "Message\n"+req.body.message ;

  const optionsUs = {
    from : "billel.abbes@hotmail.com",
    to : "billel.abbes@arc-copro.fr",
    subject: "Email contact - CoproFormation",
    text: text,
    html: html // html body
  }

  const optionsUser = {
    from : "billel.abbes@hotmail.com",
    to : req.body.email,
    subject: "Acusé de réception",
    text: "Nous accusons bonne réception de votre mail", // plain text body
    html: "<p>Nous accusons bonne réception de votre mail</p>"+
          "<p>Détails de votre demande : </p>"+
          html
  }

  transporter.sendMail(optionsUs, function(errUs, infoUs){
    if (errUs){
      console.log("errUs test: "+errUs);
      res.status(400).json({
        error: errUs
      });
      return;
    }
    transporter.sendMail(optionsUser, function(errUser, infoUser){
      if (errUser){
        console.log("errUser : "+errUser);
        res.status(400).json({
          error: errUser
        });
        return;
      }
      res.status(200).json({
        message: "sent" + infoUs.response + infoUser.response
      });
    })
  })
}

exports.sendMailDevis= (req, res, next) => {
  const transporter = nodemailer.createTransport({
    service : 'hotmail',
    auth:{
      user:"billel.abbes@hotmail.com",
      pass:"00213bnAZ77&&"
    }
  })

  let html ="";

  if (req.body.vousetes=='particulier'){
    html = "<style type='text/css'>"+
                  ".titre{"+
                    "font-weight: bold;"+
                    "color:#0052cc;"+
                  "}"+
                 "</style>"+
                 "<h2>Demande de Devis</h2>"+
                 "<h3> Type : "+req.body.vousetes+"</h3>"+
                 "<p><span class='titre'>Nom :</span><span> "+req.body.nom+"</span></p>"+
                 "<p><span class='titre'>Prénom :</span><span> "+req.body.prenom+"</span></p>"+
                 "<p><span class='titre'>Status :</span><span> "+req.body.status+"</span></p>"+
                 "<p><span class='titre'>Précision :</span><span> "+req.body.autre+"</span></p>"+
                 "<p><span class='titre'>Adresse :</span><span> "+req.body.adresse+"</span></p>"+
                 "<p><span class='titre'>Complement d'adresse :</span><span> "+req.body.complement_adresse+"</span></p>"+
                 "<p><span class='titre'>Code postal :</span><span> "+req.body.zip+"</span></p>"+
                 "<p><span class='titre'>Ville :</span><span> "+req.body.ville+"</span></p>"+
                 "<p><span class='titre'>E-mail :</span><span> "+req.body.email+"</span></p>"+
                 "<p><span class='titre'>Téléphoone :</span><span> "+req.body.tel+"</span></p>"+
                 "<p><span class='titre'>Métier :</span><span> "+req.body.metier+"</span></p>"+
                 "<p><span class='titre'>Entreprise :</span><span> "+req.body.entreprise+"</span></p>"+
                 "<p><span class='titre'>Formation :</span><span> "+req.body.formation+"</span></p>"+
                 "<p><span class='titre'>Periode :</span><span> "+req.body.periode+"</span></p>"+
                 "<p><span class='titre'>nombre de Personnes participantes :</span><span> "+req.body.nbPersonne+"</span></p>"+
                 "<p><span class='titre'>Format :</span><span> "+req.body.format+"</span></p>"+
                 "<p><span class='titre'>Plus :</span><span> "+req.body.plus+"</span></p>";
  } else
    if (req.body.vousetes=='entreprise') {
          html = "<style type='text/css'>"+
                  ".titre{"+
                    "font-weight: bold;"+
                    "color:#0052cc;"+
                  "}"+
                 "</style>"+
                 "<h2>Demande de Devis</h2>"+
                 "<h3> Type : "+req.body.vousetes+"</h3>"+
                 "<p><span class='titre'>Nom :</span><span> "+req.body.nom+"</span></p>"+
                 "<p><span class='titre'>Prénom :</span><span> "+req.body.prenom+"</span></p>"+
                 "<p><span class='titre'>Raison Sociale :</span><span> "+req.body.raisonSociale+"</span></p>"+
                 "<p><span class='titre'>SIRET :</span><span> "+req.body.siret+"</span></p>"+
                 "<p><span class='titre'>Adresse :</span><span> "+req.body.adresse+"</span></p>"+
                 "<p><span class='titre'>Complement d'adresse :</span><span> "+req.body.complement_adresse+"</span></p>"+
                 "<p><span class='titre'>Code postal :</span><span> "+req.body.zip+"</span></p>"+
                 "<p><span class='titre'>Ville :</span><span> "+req.body.ville+"</span></p>"+
                 "<p><span class='titre'>E-mail :</span><span> "+req.body.email+"</span></p>"+
                 "<p><span class='titre'>Téléphoone :</span><span> "+req.body.tel+"</span></p>"+
                 "<p><span class='titre'>Post occupé :</span><span> "+req.body.postOccupe+"</span></p>"+
                 "<p><span class='titre'>Formation :</span><span> "+req.body.formation+"</span></p>"+
                 "<p><span class='titre'>Periode :</span><span> "+req.body.periode+"</span></p>"+
                 "<p><span class='titre'>nombre de Personnes participantes :</span><span> "+req.body.nbPersonne+"</span></p>"+
                 "<p><span class='titre'>Format :</span><span> "+req.body.format+"</span></p>"+
                 "<p><span class='titre'>Plus :</span><span> "+req.body.plus+"</span></p>";
   } else
      if (req.body.vousetes=='collectivite' ){
          html = "<style type='text/css'>"+
                  ".titre{"+
                    "font-weight: bold;"+
                    "color: #0052cc;"+
                  "}"+
                 "</style>"+
                 "<h2>Demande de Devis</h2>"+
                 "<h3> Type : "+req.body.vousetes+"</h3>"+
                 "<p><span class='titre'>Nom :</span><span> "+req.body.nom+"</span></p>"+
                 "<p><span class='titre'>Prénom :</span><span> "+req.body.prenom+"</span></p>"+
                 "<p><span class='titre'>Collectivite :</span><span> "+req.body.collectivite+"</span></p>"+
                 "<p><span class='titre'>SIRET :</span><span> "+req.body.siret+"</span></p>"+
                 "<p><span class='titre'>Adresse :</span><span> "+req.body.adresse+"</span></p>"+
                 "<p><span class='titre'>Complement d'adresse :</span><span> "+req.body.complement_adresse+"</span></p>"+
                 "<p><span class='titre'>Code postal :</span><span> "+req.body.zip+"</span></p>"+
                 "<p><span class='titre'>Ville :</span><span> "+req.body.ville+"</span></p>"+
                 "<p><span class='titre'>E-mail :</span><span> "+req.body.email+"</span></p>"+
                 "<p><span class='titre'>Téléphoone :</span><span> "+req.body.tel+"</span></p>"+
                 "<p><span class='titre'>Post occupé :</span><span> "+req.body.postOccupe+"</span></p>"+
                 "<p><span class='titre'>Service :</span><span> "+req.body.service+"</span></p>"+
                 "<p><span class='titre'>Formation :</span><span> "+req.body.formation+"</span></p>"+
                 "<p><span class='titre'>Periode :</span><span> "+req.body.periode+"</span></p>"+
                 "<p><span class='titre'>nombre de Personnes participantes :</span><span> "+req.body.nbPersonne+"</span></p>"+
                 "<p><span class='titre'>Format :</span><span> "+req.body.format+"</span></p>"+
                 "<p><span class='titre'>Plus :</span><span> "+req.body.plus+"</span></p>";
  }else{
    console.log("erreur");
  }

  const text = "Nom : "+req.body.name+"\n"+
               "Email : "+req.body.email+"\n"+
               "Objet : "+req.body.objet+"\n"+
               "Message\n"+req.body.body ;

  const optionsUs = {
    from : "billel.abbes@hotmail.com",
    to : "billel.abbes@arc-copro.fr",
    subject: "Email contact - CoproFormation",
    text: text,
    html: html // html body
  }

  const optionsUser = {
    from : "billel.abbes@hotmail.com",
    to : req.body.email,
    subject: "Acusé de réception",
    text: "Nous accusons bonne réception de votre mail", // plain text body
    html: "<p>Nous accusons bonne réception de votre mail</p>"+
          "<p>Détails de votre demande : </p>"+
          html
  }

  transporter.sendMail(optionsUs, function(errUs, infoUs){
    if (errUs){
      res.status(400).json({
        error: errUs
      });
      return;
    }
    transporter.sendMail(optionsUser, function(errUser, infoUser){
      if (errUser){
        res.status(400).json({
          error: errUser
        });
        return;
      }
      res.status(200).json({
        message: "sent" + infoUs.response + infoUser.response
      });
    })
  })
}
