/* global enigma schema Filter include Hypercube PieOne app Chart BarOne */  
/* global Chart render */

class PieOne {
  constructor (elementId, options) {
    const DEFAULT = {}
    this.elementId = elementId
    this.options = Object.assign({}, options)
    const el = document.getElementById(this.elementId)
    const config = {
      type: 'doughnut',
      options: {}
    }
    this.pieOne = new Chart(
      document.getElementById(this.elementId),
      config
    )
    this.render()
  }
        
  render () {
    this.options.model.getLayout().then(layout => {
      const data = {
        labels: [],
        datasets: [{
          label: '',
          backgroundColor: 'rgb(43, 144, 201)',
          borderColor: 'rgb(255, 255, 255)',
          data: []
        }]
      }
      layout.qHyperCube.qDataPages[0].qMatrix.forEach(row => {
        data.labels.push(row[0].qText)
        data.datasets[0].data.push(row[1].qNum)
      })
      this.pieOne.data = data 
      this.pieOne.update()
    })
  }
}

/* global Chart render */

class BarOne {
  constructor (elementId, options) {
    const DEFAULT = {}
    this.elementId = elementId
    this.options = Object.assign({}, options)
    const el = document.getElementById(this.elementId)
    const config = {
      type: 'bar',
      options: {}
    }
    this.barOne = new Chart(
      document.getElementById(this.elementId),
      config
    )
    this.render()
  }
        
  render () {
    this.options.model.getLayout().then(layout => {
      const data = {
        labels: [],
        datasets: [{
          label: '',
          backgroundColor: 'rgb(242, 73, 107)',
          borderColor: 'rgb(255, 255, 255)',
          data: []
        }]
      }
      layout.qHyperCube.qDataPages[0].qMatrix.forEach(row => {
        data.labels.push(row[0].qText)
        data.datasets[0].data.push(row[1].qNum)
      })
      this.barOne.data = data 
      this.barOne.update()
    })
  }
}


const session = enigma.create({
  schema,
  url: 'wss://ec2-3-92-185-52.compute-1.amazonaws.com/anon/app/6bb2c4a8-4328-46d5-88e1-747870f4e1d2'
})

session.open().then(global => {
  global.openDoc('6bb2c4a8-4328-46d5-88e1-747870f4e1d2').then(app => {
    const def = {
      qInfo: {
        qType: 'pie-one'
      },
      qHyperCubeDef: {
        qDimensions: [
          { qDef: { qFieldDefs: ['Details'] } }
        ],
        qMeasures: [
          { qDef: { qDef: `Sum({$<Details = {"Deaths recorded in Central Med"} >}Count)`, qLabel: 'Deaths' } }
        ],
        qInitialDataFetch: [
          {
            qTop: 0,
            qLeft: 0,
            qWidth: 3,
            qHeight: 3
          }]
      }
    }
    app.createSessionObject(def).then(model => {
      const TestOne = new PieOne('pie-1', { model })
    })

    const def1 = {
      qInfo: {
        qType: 'pie-two'
      },
      qHyperCubeDef: {
        qDimensions: [
          { qDef: { qFieldDefs: ['Activity'] } }
        ],
        qMeasures: [
          { qDef: { qDef: `Sum({$<Activity = {"Interceptions at sea"}>}Count)`, qLabel: 'Interceptions' } }
        ],
        qInitialDataFetch: [
          {
            qTop: 0,
            qLeft: 0,
            qWidth: 3,
            qHeight: 3
          }]
      }
    }
    app.createSessionObject(def1).then(model => {
      const TestTwo = new PieOne('pie-2', { model })
    })

    const def2 = {
      qInfo: {
        qType: 'pie-three'
      },
      qHyperCubeDef: {
        qDimensions: [
          { qDef: { qFieldDefs: ['Activity'] } }
        ],
        qMeasures: [
          { qDef: { qDef: `Sum({$<Activity = {"Irregular arrivals in Europe"}>}Count)`, qLabel: 'Interceptions' } }
        ],
        qInitialDataFetch: [
          {
            qTop: 0,
            qLeft: 0,
            qWidth: 3,
            qHeight: 3
          }]
      }
    }
    app.createSessionObject(def2).then(model => {
      const TestTwo = new PieOne('pie-3', { model })
    })
    const def3 = {
      qInfo: {
        qType: 'bar-one'
      },
      qHyperCubeDef: {
        qDimensions: [
          { qDef: { qFieldDefs: ['Year'], qLabel: 'Year' } }
        ],
        qMeasures: [
          { qDef: { qDef: `Sum({$<Activity = {"Deaths /disappearances"}>}Count)`, qLabel: 'Deaths' } }
        ],
        qInitialDataFetch: [
          {
            qTop: 0,
            qLeft: 0,
            qWidth: 10,
            qHeight: 1000
          }]
      }
    }
    app.createSessionObject(def3).then(model => {
      const TestTwo = new BarOne('bar-1', { model })
    })
  })
})
