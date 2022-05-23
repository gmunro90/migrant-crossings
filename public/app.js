"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/* global enigma schema Filter include Hypercube PieOne app Chart BarOne */

/* global Chart render */
var PieOne = /*#__PURE__*/function () {
  function PieOne(elementId, options) {
    _classCallCheck(this, PieOne);

    var DEFAULT = {};
    this.elementId = elementId;
    this.options = _extends({}, options);
    var el = document.getElementById(this.elementId);
    var config = {
      type: 'doughnut',
      options: {}
    };
    this.pieOne = new Chart(document.getElementById(this.elementId), config);
    this.render();
  }

  _createClass(PieOne, [{
    key: "render",
    value: function render() {
      var _this = this;

      this.options.model.getLayout().then(function (layout) {
        var data = {
          labels: [],
          datasets: [{
            label: '',
            backgroundColor: 'rgb(43, 144, 201)',
            borderColor: 'rgb(255, 255, 255)',
            data: []
          }]
        };
        layout.qHyperCube.qDataPages[0].qMatrix.forEach(function (row) {
          data.labels.push(row[0].qText);
          data.datasets[0].data.push(row[1].qNum);
        });
        _this.pieOne.data = data;

        _this.pieOne.update();
      });
    }
  }]);

  return PieOne;
}();
/* global Chart render */


var BarOne = /*#__PURE__*/function () {
  function BarOne(elementId, options) {
    _classCallCheck(this, BarOne);

    var DEFAULT = {};
    this.elementId = elementId;
    this.options = _extends({}, options);
    var el = document.getElementById(this.elementId);
    var config = {
      type: 'bar',
      options: {}
    };
    this.barOne = new Chart(document.getElementById(this.elementId), config);
    this.render();
  }

  _createClass(BarOne, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      this.options.model.getLayout().then(function (layout) {
        var data = {
          labels: [],
          datasets: [{
            label: '',
            backgroundColor: 'rgb(242, 73, 107)',
            borderColor: 'rgb(255, 255, 255)',
            data: []
          }]
        };
        layout.qHyperCube.qDataPages[0].qMatrix.forEach(function (row) {
          data.labels.push(row[0].qText);
          data.datasets[0].data.push(row[1].qNum);
        });
        _this2.barOne.data = data;

        _this2.barOne.update();
      });
    }
  }]);

  return BarOne;
}();

var session = enigma.create({
  schema: schema,
  url: 'wss://ec2-3-92-185-52.compute-1.amazonaws.com/anon/app/6bb2c4a8-4328-46d5-88e1-747870f4e1d2'
});
session.open().then(function (global) {
  global.openDoc('6bb2c4a8-4328-46d5-88e1-747870f4e1d2').then(function (app) {
    var def = {
      qInfo: {
        qType: 'pie-one'
      },
      qHyperCubeDef: {
        qDimensions: [{
          qDef: {
            qFieldDefs: ['Details']
          }
        }],
        qMeasures: [{
          qDef: {
            qDef: "Sum({$<Details = {\"Deaths recorded in Central Med\"} >}Count)",
            qLabel: 'Deaths'
          }
        }],
        qInitialDataFetch: [{
          qTop: 0,
          qLeft: 0,
          qWidth: 3,
          qHeight: 3
        }]
      }
    };
    app.createSessionObject(def).then(function (model) {
      var TestOne = new PieOne('pie-1', {
        model: model
      });
    });
    var def1 = {
      qInfo: {
        qType: 'pie-two'
      },
      qHyperCubeDef: {
        qDimensions: [{
          qDef: {
            qFieldDefs: ['Activity']
          }
        }],
        qMeasures: [{
          qDef: {
            qDef: "Sum({$<Activity = {\"Interceptions at sea\"}>}Count)",
            qLabel: 'Interceptions'
          }
        }],
        qInitialDataFetch: [{
          qTop: 0,
          qLeft: 0,
          qWidth: 3,
          qHeight: 3
        }]
      }
    };
    app.createSessionObject(def1).then(function (model) {
      var TestTwo = new PieOne('pie-2', {
        model: model
      });
    });
    var def2 = {
      qInfo: {
        qType: 'pie-three'
      },
      qHyperCubeDef: {
        qDimensions: [{
          qDef: {
            qFieldDefs: ['Activity']
          }
        }],
        qMeasures: [{
          qDef: {
            qDef: "Sum({$<Activity = {\"Irregular arrivals in Europe\"}>}Count)",
            qLabel: 'Interceptions'
          }
        }],
        qInitialDataFetch: [{
          qTop: 0,
          qLeft: 0,
          qWidth: 3,
          qHeight: 3
        }]
      }
    };
    app.createSessionObject(def2).then(function (model) {
      var TestTwo = new PieOne('pie-3', {
        model: model
      });
    });
    var def3 = {
      qInfo: {
        qType: 'bar-one'
      },
      qHyperCubeDef: {
        qDimensions: [{
          qDef: {
            qFieldDefs: ['Year'],
            qLabel: 'Year'
          }
        }],
        qMeasures: [{
          qDef: {
            qDef: "Sum({$<Activity = {\"Deaths /disappearances\"}>}Count)",
            qLabel: 'Deaths'
          }
        }],
        qInitialDataFetch: [{
          qTop: 0,
          qLeft: 0,
          qWidth: 10,
          qHeight: 1000
        }]
      }
    };
    app.createSessionObject(def3).then(function (model) {
      var TestTwo = new BarOne('bar-1', {
        model: model
      });
    });
  });
});
