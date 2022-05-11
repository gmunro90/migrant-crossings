"use strict";

/* global enigma schema Filter include Hypercube Test app */
var session = enigma.create({
  schema: schema,
  url: 'wss://ec2-3-92-185-52.compute-1.amazonaws.com/anon/app/6bb2c4a8-4328-46d5-88e1-747870f4e1d2'
});
session.open().then(function (global) {
  global.openDoc('6bb2c4a8-4328-46d5-88e1-747870f4e1d2').then(function (app) {
    console.log(app);
  });
});
var def = {
  qInfo: {
    qType: 'pie'
  },
  qHyperCubeDef: {
    qDimensions: [{
      qDef: {
        qFieldDefs: ['Details']
      }
    }],
    qMeasures: [{
      qDef: {
        qDef: 'Sum({$<Activity = {"Deaths /disappearances"}>}Count)',
        qLabel: 'Deaths'
      }
    }],
    qInitialDataFetch: [{
      qTop: 0,
      qLeft: 0,
      qWidth: 3,
      qHeight: 10
    }]
  }
};
