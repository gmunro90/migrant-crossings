"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/* global enigma schema Filter include Hypercube Test app */
var Hypercube = /*#__PURE__*/function () {
  function Hypercube(elementId, options) {
    _classCallCheck(this, Hypercube);

    var DEFAULT = {};
    this.elementId = elementId;
    this.options = _extends({}, options);
    var el = document.getElementById(this.elementId);

    if (el) {
      el.addEventListener('click', this.handleClick.bind(this));
      el.innerHTML = "<table id='".concat(this.elementId, "_table'></table>");
      this.options.model.on('changed', this.render.bind(this));
      this.render();
    } else {
      console.error("no element found with id - ".concat(this.elementId));
    }
  }

  _createClass(Hypercube, [{
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.classList.contains('table-row')) {
        var elemNumber = event.target.getAttribute('data-elem');
        this.options.model.selectHyperCubeValues('/qHyperCubeDef', 0, [+elemNumber], true).then(function (res) {}, function (error) {
          console.log(error, 'error');
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      this.options.model.getLayout().then(function (layout) {
        var html = '';
        layout.qHyperCube.qDataPages[0].qMatrix.forEach(function (row) {
          html += '<tr>';
          html += row.map(function (cell) {
            return "<td data-elem=\"".concat(cell.qElemNumber, "\"class=\"table-row\">").concat(cell.qText, "</td>");
          }).join('');
          html += '</tr>';
        });
        var el = document.getElementById("".concat(_this.elementId, "_table"));

        if (el) {
          el.innerHTML = html;
        }
      });
    }
  }]);

  return Hypercube;
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
        qWidth: 3,
        qHeight: 10
      }]
    }
  };
  app.createSessionObject(def).then(function (model) {
    var hyperCubeTest = new Hypercube('bar-chart-parent', {
      model: model
    });
    var Test1 = new Test('myChart', {
      model: model
    });
  });
});
