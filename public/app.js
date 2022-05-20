"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* global enigma schema Filter include Hypercube Test app Chart */

/* global Chart require */
// const { render } = require("express/lib/response")
var Test = /*#__PURE__*/_createClass(function Test(elementId, options) {
  _classCallCheck(this, Test);

  var DEFAULT = {};
  this.elementId = elementId;
  this.options = _extends({}, options);
  var el = document.getElementById(this.elementId);
  var config = {
    type: 'bar',
    // data: data,
    options: {}
  };
  this.pieOne = new Chart(document.getElementById('pie-1'), config);
  this.render();
}); // render() {
//   this.options.model.getLayout().then(layout => {
//     const data = {
//       labels: [],
//       datasets: [{
//         label: 'Deaths',
//         backgroundColor: 'rgb(100, 99, 132)',
//         borderColor: 'rgb(300, 99, 132)',
//         data: []
//       }]
//     }
//     layout.qHyperCube.qDataPages[0].qMatrix.forEach(row => {
//       data.labels.push(row[0].qText)
//       data.datasets[0].data.push(row[1].qNum)
//     })
//     this.myChart.data = data 
//     this.myChart.update()
//   })
// }

/* global Chart */


var labels1 = ['January', 'February', 'March', 'April', 'May', 'June'];
var data1 = {
  labels: labels1,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(100, 99, 132)',
    borderColor: 'rgb(300, 99, 132)',
    data: [10, 5, 5, 2, 50]
  }]
};
var config1 = {
  type: 'pie',
  data: data1,
  options: {}
};
var pieTwo = new Chart(document.getElementById('pie-2'), config1);
/* global Chart */

var labels2 = ['January', 'February', 'March', 'April', 'May', 'June'];
var data2 = {
  labels: labels2,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(100, 99, 132)',
    borderColor: 'rgb(300, 99, 132)',
    data: [10, 5, 5, 2, 50]
  }]
};
var config2 = {
  type: 'pie',
  data: data2,
  options: {}
};
var pieThree = new Chart(document.getElementById('pie-3'), config2);
var session = enigma.create({
  schema: schema,
  url: 'wss://ec2-3-92-185-52.compute-1.amazonaws.com/anon/app/6bb2c4a8-4328-46d5-88e1-747870f4e1d2'
});
session.open().then(function (global) {
  global.openDoc('6bb2c4a8-4328-46d5-88e1-747870f4e1d2').then(function (app) {
    console.log(app);
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
        qWidth: 5,
        qHeight: 10
      }]
    }
  };
  app.createSessionObject(def).then(function (model) {
    var TestOne = new Test('pieOne', {
      model: model
    });
  });
});
