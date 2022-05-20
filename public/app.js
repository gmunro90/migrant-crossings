"use strict";

/* global enigma schema Filter include Hypercube Test app Chart */

/*
class Hypercube {
  constructor (elementId, options) {
    const DEFAULT = {}
    this.elementId = elementId
    this.options = Object.assign({}, options)
    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      el.innerHTML = `<table id='${this.elementId}_table'></table>` 
      this.options.model.on('changed', this.render.bind(this))
      this.render()
    }
    else {
      console.error(`no element found with id - ${this.elementId}`)
    }
  }
  
  handleClick (event) {
    if (event.target.classList.contains('table-row')) {
      const elemNumber = event.target.getAttribute('data-elem')
      this.options.model.selectHyperCubeValues('/qHyperCubeDef', 0, [+elemNumber], true)
        .then(res => {}, error => { console.log(error, 'error') })
    }
  }

  render () {
    this.options.model.getLayout().then(layout => {
      let html = ''
      layout.qHyperCube.qDataPages[0].qMatrix.forEach(row => {
        html += '<tr>'
        html += row.map(cell => `<td data-elem="${cell.qElemNumber}"class="table-row">${cell.qText}</td>`).join('')
        html += '</tr>'
      })
      const el = document.getElementById(`${this.elementId}_table`)
      if (el) {
        el.innerHTML = html
      }
    })
  }
}
*/

/* global Chart */
var labels = ['January', 'February', 'March', 'April', 'May', 'June'];
var data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(100, 99, 132)',
    borderColor: 'rgb(300, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45]
  }]
};
var config = {
  type: 'pie',
  data: data,
  options: {}
};
var pieOne = new Chart(document.getElementById('pie-1'), config);
/* global Chart */

var labels1 = ['January', 'February', 'March', 'April', 'May', 'June'];
var data1 = {
  labels: labels1,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(100, 99, 132)',
    borderColor: 'rgb(300, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45]
  }]
};
var config1 = {
  type: 'pie',
  data: data1,
  options: {}
};
var pieTwo = new Chart(document.getElementById('pie-2'), config1);
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
});
