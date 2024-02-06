import express from "express";
import ejs from "ejs";
import axios from "axios";
import bodyParser from "body-parser";

///const
const port = 3000;
const app = express();
const API_URL = "https://api.fda.gov/";
const drugEndpoint ="drug/event.json?"
const labelEndpoint="drug/label.json?"
const key = "api_key=sMUYA92eegDtrgwLNdF6pWaR4v41HHBgTXWCbMM9&";

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/",async (req,res)=>{
  res.render("index.ejs",{data:"Nada a ser mostrado por aqui!"})
})

app.get("/resposta", async (req, res) => {
  const substance=   req.query.med;

  try{
    const colateral = await axios.get(
      API_URL + drugEndpoint +key+"search=patient.drug.openfda.substance_name:"+substance+"&count=patient.reaction.reactionmeddrapt.exact&limit=20",
    );
    const label = await axios.get(
      API_URL + labelEndpoint +key+"search=openfda.substance_name:"+substance+"&limit=20"
    );
    res.render("index.ejs", {substance:substance,colateral:colateral.data,label:label.data});


  }catch (error) {
    console.log(error.data + error.response.status);
    res.render("index.ejs",{data:"Um erro foi encontrado,tente novamente"})

  }

});

app.listen(port, () => {
  console.log(`Servidor funcionando em ${port}`);
});
