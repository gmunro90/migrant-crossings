"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/* global enigma schema Filter include Hypercube PieOne app Chart BarOne LineOne WebsyDesigns */

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

    if (el) {
      el.addEventListener('click', this.handleClick.bind(this));
      this.options.model.on('changed', this.render.bind(this));
      var config = {
        type: 'bar',
        options: {}
      };
      this.barOne = new Chart(document.getElementById(this.elementId), config);
      this.render();
    } else {
      console.error("no element found with id - ".concat(this.elementId));
    }
  }

  _createClass(BarOne, [{
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
/* global Chart render */


var LineOne = /*#__PURE__*/function () {
  function LineOne(elementId, options) {
    _classCallCheck(this, LineOne);

    var DEFAULT = {};
    this.elementId = elementId;
    this.options = _extends({}, options);
    var el = document.getElementById(this.elementId);

    if (el) {
      el.addEventListener('click', this.handleClick.bind(this));
      this.options.model.on('changed', this.render.bind(this));
      var config = {
        type: 'line',
        options: {
          showLine: true
        }
      };
      this.lineOne = new Chart(document.getElementById(this.elementId), config);
      this.render();
    } else {
      console.error("no element found with id - ".concat(this.elementId));
    }
  }

  _createClass(LineOne, [{
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
      var _this3 = this;

      this.options.model.getLayout().then(function (layout) {
        var data = {
          labels: [],
          datasets: [{
            label: '',
            fill: false,
            borderColor: 'rgb(75, 192, 192))',
            tension: 0.1,
            data: []
          }]
        };
        layout.qHyperCube.qDataPages[0].qMatrix.forEach(function (row) {
          data.labels.push(row[0].qText);
          data.datasets[0].data.push(row[1].qNum);
        });
        _this3.lineOne.data = data;

        _this3.lineOne.update();
      });
    }
  }]);

  return LineOne;
}();

var Filter = /*#__PURE__*/function () {
  function Filter(elementId, options) {
    _classCallCheck(this, Filter);

    var DEFAULT = {};
    this.elementId = elementId;
    this.options = _extends({}, options);
    var el = document.getElementById(this.elementId);

    if (el) {
      el.addEventListener('click', this.handleClick.bind(this));
      el.innerHTML = "<ul id='".concat(this.elementId, "_list'></ul>");
      this.options.model.on('changed', this.render.bind(this));
      this.render();
    } else {
      console.error("no element found with id - ".concat(this.elementId));
    }
  }

  _createClass(Filter, [{
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.classList.contains('list-item')) {
        var elemNumber = event.target.getAttribute('data-elem');
        this.options.model.selectListObjectValues('/qListObjectDef', [+elemNumber], true);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      this.options.model.getLayout().then(function (layout) {
        var html = layout.qListObject.qDataPages[0].qMatrix.map(function (row) {
          return "<li data-elem=\"".concat(row[0].qElemNumber, "\" class='list-item state-").concat(row[0].qState, "'>").concat(row[0].qText, "</li>");
        }).join('');
        var el = document.getElementById("".concat(_this4.elementId, "_list"));

        if (el) {
          el.innerHTML = html;
        }
      });
    }
  }]);

  return Filter;
}(); // router initialisation


var options = {};
var router = new WebsyDesigns.Router(options);
router.init();
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
    var def4 = {
      qInfo: {
        qType: 'line-one'
      },
      qHyperCubeDef: {
        qDimensions: [{
          qDef: {
            qFieldDefs: ['Month'],
            qLabel: 'Month'
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
    app.createSessionObject(def4).then(function (model) {
      var TestTwo = new LineOne('line-1', {
        model: model
      });
    });
    var def5 = {
      qinfo: {
        qType: 'Year filter'
      },
      qListObjectDef: {
        qDef: {
          qFieldDefs: ['Year']
        },
        qInitialDataFetch: [{
          qTop: 0,
          qLeft: 0,
          qWidth: 1,
          qHeight: 6
        }]
      }
    };
    app.createSessionObject(def5).then(function (model) {
      var f = new Filter('filter1', {
        model: model
      });
    });
  });
});
