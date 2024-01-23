import express from "express";
import ejs from "ejs";
import axios from "axios";
import bodyParser from "body-parser";

///const
const port = 3000;
const app = express();
const API_URL = "https://api.fda.gov/drug/event.json"
const key ="sMUYA92eegDtrgwLNdF6pWaR4v41HHBgTXWCbMM9"

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req,res)=>{
    const result = await axios.get('https://api.fda.gov/drug/event.json?search=patient.drug.openfda.substance_name:"rivaroxaban"&count=patient.reaction.reactionmeddrapt.exact')
    res.render("index.ejs",result.data);
})

app.listen(port,()=>{
    console.log(`Servidor funcionando em ${port}`)
})