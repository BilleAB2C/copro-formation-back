const nodemailer = require("nodemailer");

exports.sendMailContact= (req, res, next) => {
  const transporter = nodemailer.createTransport({
    service : 'hotmail',
    auth:{
      user:"billel.abbes@hotmail.com",
      pass:"00213bnAZ77&&"
    }
  })

  const html = "<h3>Nom : "+req.body.name+"</h3>"+
               "<h3>Email : "+req.body.email+"</h3>"+
               "<h3>Objet : "+req.body.objet+"</h3>"+
               "<h3>Message</h3><p>"+req.body.body+"</p>" ;

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
    html: "<p>Nous accusons bonne réception de votre mail</p>" // html body
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

exports.sendMailDevis= (req, res, next) => {
  const transporter = nodemailer.createTransport({
    service : 'hotmail',
    auth:{
      user:"billel.abbes@hotmail.com",
      pass:"00213bnAZ77&&"
    }
  })

  const html = "<h3>Nom : "+req.body.name+"</h3>"+
               "<h3>Email : "+req.body.email+"</h3>"+
               "<h3>Objet : "+req.body.objet+"</h3>"+
               "<h3>Message</h3><p>"+req.body.body+"</p>" ;

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
    html: "<p>Nous accusons bonne réception de votre mail</p>" // html body
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
