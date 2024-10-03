const express = require("express");
const router = express.Router();
var mssql = require('../../function/mssql');
var mssqlR = require('../../function/mssqlR');
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
  if (input[`BAPI_NAME`] !== undefined && input[`TABLE_NAME`] !== undefined && input[`IMP_WERKS`] !== undefined && input[`IMP_PRCTR`] !== undefined && input[`LAST_DATE`] !== undefined) {


    try {
      let resp = await axios.post('http://tp-portal.thaiparker.co.th/API_QcReport/ZBAPI_QC_INTERFACE', {
        // "BAPI_NAME": "ZPPIN014_OUT",
        // "IMP_PRCTR": input[`IMP_PRCTR`],       //25000,25700 GW-GAS 
        // "IMP_WERKS": input[`IMP_WERKS`],        //2200 GW
        // "TABLE_NAME": "PPINCOMING"
        "BAPI_NAME": input[`BAPI_NAME`],
        "TABLE_NAME": input[`TABLE_NAME`],
        "IMP_WERKS": input[`IMP_WERKS`],
        "IMP_PRCTR": input[`IMP_PRCTR`],
        "LAST_DATE": input[`LAST_DATE`],
      });
      if (resp.status == 200) {
        let returnDATA = resp.data;
        output = returnDATA["Records"] || []
        //  console.log(output)
      }
    } catch (err) {
      output = [];
    }

  }

  return res.json(output);
});


router.post('/datacentertest/getsoi8set', async (req, res) => {
  //-------------------------------------
  console.log("----getsap/getsoi8set----");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = {};
  if (input[`PLANT`] !== undefined) {

    if (input[`PLANT`] === 'premix' || input[`PLANT`] === 'coilcoating' || input[`PLANT`] === 'hydro' || input[`PLANT`] === 'plx' || input[`PLANT`] === 'liquid' || input[`PLANT`] === 'powder' || input[`PLANT`] === 'noxrust') {


      try {
        let resp = await axios.post(`http://172.23.10.34:2500/${input[`PLANT`]}`, {
          // "BAPI_NAME": "ZPPIN014_OUT",
          // "IMP_PRCTR": input[`IMP_PRCTR`],       //25000,25700 GW-GAS 
          // "IMP_WERKS": input[`IMP_WERKS`],        //2200 GW
          // "TABLE_NAME": "PPINCOMING"

        });
        if (resp.status == 200) {
          let returnDATA = resp.data;
          output = returnDATA || {}
          //  console.log(output)
        }
      } catch (err) {
        output = [];
      }
    }

  }

  return res.json(output);
});

router.post('/datacentertest/getsoi8order', async (req, res) => {
  //-------------------------------------
  console.log("----datacentertest/getincomming_2----");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = [];
  if (input[`PLANT`] !== undefined && input[`ORDER`] !== undefined) {

    if (input[`PLANT`] === 'premix') {

      let queryS = `SELECT * FROM [ScadaReport].[dbo].[PMIXprocessinfo] where NumOrder = '${input[`ORDER`]}' order by RecordTimeStart desc`
      let db = await mssql.qurey(queryS);
 
      let datadb = db['recordsets'][0];
      output = datadb


    }else if (input[`PLANT`] === 'coilcoating') {

      let queryS = `SELECT * FROM [ScadaReport].[dbo].[CoilProcessinfo] where NumOrder = '${input[`ORDER`]}' order by RecordTimeStart desc`
      let db = await mssql.qurey(queryS);
      let datadb = db['recordsets'][0];
      output = datadb


    }else if (input[`PLANT`] === 'hydro') {

      let queryS = `SELECT * FROM [ScadaReport].[dbo].[HydroProcessinfo] where NumOrder = '${input[`ORDER`]}' order by RecordTimeStart desc`
      let db = await mssql.qurey(queryS);
      let datadb = db['recordsets'][0];
      output = datadb


    }else if (input[`PLANT`] === 'plx') {

      let queryS = `SELECT * FROM [ScadaReport].[dbo].[PLXprocessinfo] where NumOrder = '${input[`ORDER`]}' order by RecordTimeStart desc`
      let db = await mssql.qurey(queryS);
      let datadb = db['recordsets'][0];
      output = datadb


    }else if (input[`PLANT`] === 'liquid') {

      let queryS = `SELECT * FROM [ScadaReport].[dbo].[LQprocessinfo] where NumOrder = '${input[`ORDER`]}' order by RecordTimeStart desc`
      let db = await mssql.qurey(queryS);
      let datadb = db['recordsets'][0];
      output = datadb


    }else if (input[`PLANT`] === 'powder') {

      let queryS = `SELECT * FROM [ScadaReport].[dbo].[PMProcessinfo] where NumOrder = '${input[`ORDER`]}' order by RecordTimeStart desc`
      let db = await mssql.qurey(queryS);
      let datadb = db['recordsets'][0];
      output = datadb


    }else if (input[`PLANT`] === 'noxrust') {

      let queryS = `SELECT * FROM [ScadaReport].[dbo].[NoxProcessinfo] where NumOrder = '${input[`ORDER`]}' order by RecordTimeStart desc`
      let db = await mssql.qurey(queryS);
      let datadb = db['recordsets'][0];
      output = datadb

    }

  }

  return res.json(output);
});

router.post('/datacentertest/getsoi8order-pack', async (req, res) => {
  //-------------------------------------
  console.log("----datacentertest/getsoi8order-pack----");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = [];
  if (input[`PLANT`] !== undefined && input[`ORDER`] !== undefined) {

    if (input[`PLANT`] === 'premix') {

      let queryS = `SELECT * FROM [ScadaReport].[dbo].[PMIXpackinginfo] where NumOrder = '${input[`ORDER`]}' order by RecordTimeStart desc`
      let db = await mssql.qurey(queryS);
      let datadb = db['recordsets'][0];
      output = datadb


    }else if (input[`PLANT`] === 'coilcoating') {

      let queryS = `SELECT * FROM [ScadaReport].[dbo].[CoilPackinginfo] where NumOrder = '${input[`ORDER`]}' order by RecordTimeStart desc`
      let db = await mssql.qurey(queryS);
      let datadb = db['recordsets'][0];
      output = datadb


    }else if (input[`PLANT`] === 'hydro') {

      let queryS = `SELECT * FROM [ScadaReport].[dbo].[HydroPackinginfo] where NumOrder = '${input[`ORDER`]}' order by RecordTimeStart desc`
      let db = await mssql.qurey(queryS);
      let datadb = db['recordsets'][0];
      output = datadb


    }else if (input[`PLANT`] === 'plx') {

      let queryS = `SELECT * FROM [ScadaReport].[dbo].[PLXpackinginfo] where NumOrder = '${input[`ORDER`]}' order by RecordTimeStart desc`
      let db = await mssql.qurey(queryS);
      let datadb = db['recordsets'][0];
      output = datadb


    }else if (input[`PLANT`] === 'liquid') {

      let queryS = `SELECT * FROM [ScadaReport].[dbo].[LQpackinginfo] where NumOrder = '${input[`ORDER`]}' order by RecordTimeStart desc`
      let db = await mssql.qurey(queryS);
      let datadb = db['recordsets'][0];
      output = datadb


    }else if (input[`PLANT`] === 'powder') {

      let queryS = `SELECT * FROM [ScadaReport].[dbo].[PMpackinginfo] where NumOrder = '${input[`ORDER`]}' order by RecordTimeStart desc`
      let db = await mssql.qurey(queryS);
      let datadb = db['recordsets'][0];
      output = datadb


    }else if (input[`PLANT`] === 'noxrust') {

      let queryS = `SELECT * FROM [ScadaReport].[dbo].[Noxpackinginfo] where NumOrder = '${input[`ORDER`]}' order by RecordTimeStart desc`
      let db = await mssql.qurey(queryS);
      let datadb = db['recordsets'][0];
      output = datadb

    }

  }

  return res.json(output);
});


router.post('/datacentertest/planning', async (req, res) => {
  //-------------------------------------
  console.log("----datacentertest/planning----");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = [];
  if (input[`day`] !== undefined && input[`monyh`] !== undefined&& input[`year`] !== undefined) {


      let queryS = ` SELECT * FROM [SOI8_INVs].[dbo].[incomming] WHERE Bsc_start='${input[`monyh`]}-${input[`day`]}-${input[`year`]}' order by Bsc_start desc`
      console.log(queryS)
      let db = await mssqlR.qurey(queryS);
      console.log(db)
    if(db['recordsets'].length>0){
      let datadb = db['recordsets'][0];
      output = datadb
    }
    


    

  }

  return res.json(output);
});


module.exports = router;

