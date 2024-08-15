const express = require("express");
const router = express.Router();
var mssql = require('../../function/mssql');
var mongodb = require('../../function/mongodb');
var httpreq = require('../../function/axios');
var axios = require('axios');


router.get('/TEST', async (req, res) => {
  // console.log(mssql.qurey())
  res.json("TEST");
})

router.post('/TEST', async (req, res) => {
 //-------------------------------------
 console.log("--TEST--");
 console.log(req.body);
 let input = req.body;
 //-------------------------------------


  //-------------------------------------
  res.json(input);
});


router.post('/datacentertest/getsap', async (req, res) => {
  //-------------------------------------
  console.log("----getsap/getincomming_2----");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = [];
  if (input[`BAPI_NAME`] !== undefined &&  input[`TABLE_NAME`] !== undefined && input[`IMP_WERKS`] !== undefined && input[`IMP_PRCTR`] !== undefined && input[`LAST_DATE`] !== undefined) {
    

    try {
      let resp = await axios.post('http://tp-portal.thaiparker.co.th/API_QcReport/ZBAPI_QC_INTERFACE', {
        // "BAPI_NAME": "ZPPIN014_OUT",
        // "IMP_PRCTR": input[`IMP_PRCTR`],       //25000,25700 GW-GAS 
        // "IMP_WERKS": input[`IMP_WERKS`],        //2200 GW
        // "TABLE_NAME": "PPINCOMING"
        "BAPI_NAME":  input[`BAPI_NAME`],  
        "TABLE_NAME": input[`TABLE_NAME`],  
        "IMP_WERKS":  input[`IMP_WERKS`],  
        "IMP_PRCTR":  input[`IMP_PRCTR`],  
        "LAST_DATE":  input[`LAST_DATE`],  
      });
      if (resp.status == 200) {
        let returnDATA = resp.data;
        output = returnDATA["Records"]||[]
    //  console.log(output)
      }
    } catch (err) {
      output = [];
    }


   

  }

  // console.log(output)



  return res.json(output);
});


module.exports = router;
