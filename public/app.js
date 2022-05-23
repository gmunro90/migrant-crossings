"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/* global enigma schema Filter include Hypercube Test app Chart */

/* global Chart render */
var Test = /*#__PURE__*/function () {
  function Test(elementId, options) {
    _classCallCheck(this, Test);

    var DEFAULT = {};
    this.elementId = elementId;
    this.options = _extends({}, options);
    var el = document.getElementById(this.elementId);
    var config = {
      type: 'bar',
      options: {}
    };
    this.pieOne = new Chart(document.getElementById('pie-1'), config);
    this.render();
  }

  _createClass(Test, [{
    key: "render",
    value: function render() {
      var _this = this;

      this.options.model.getLayout().then(function (layout) {
        var data = {
          labels: [],
          datasets: [{
            label: 'Deaths',
            backgroundColor: 'rgb(100, 99, 132)',
            borderColor: 'rgb(300, 99, 132)',
            data: []
          }]
        };
        layout.qHyperCube.qDataPages[0].qMatrix.forEach(function (row) {
          data.labels.push(row[0].qText);
          data.datasets[0].data.push(row[1].qNum);
        });
        _this.myChart.data = data;

        _this.myChart.update();
      });
    }
  }]);

  return Test;
}();

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
        qWidth: 2,
        qHeight: 5
      }]
    }
  };
  app.createSessionObject(def).then(function (model) {
    var TestOne = new Test('pieOne', {
      model: model
    });
    console.log(TestOne);
  });
});
