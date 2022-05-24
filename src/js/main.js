/* global enigma schema Filter include Hypercube PieOne app Chart BarOne LineOne WebsyDesigns */  
include('./pieOne.js')
include('./barOne.js')
include('./lineOne.js')
include('./filter.js')

// router initialisation
const options = {
  defaultView: 'home'
}
const router = new WebsyDesigns.Router(options)
router.init()

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
    const def4 = {
      qInfo: {
        qType: 'line-one'
      },
      qHyperCubeDef: {
        qDimensions: [
          { qDef: { qFieldDefs: ['Month'], qLabel: 'Month' } }
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
    app.createSessionObject(def4).then(model => {
      const TestTwo = new LineOne('line-1', { model })
    })
    const def5 = {
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
    }
    app.createSessionObject(def5).then(model => {
      const f = new Filter('filter1', { model })
    })
    const def6 = {
      qInfo: {
        qType: 'line-one'
      },
      qHyperCubeDef: {
        qDimensions: [
          { qDef: { qFieldDefs: ['Month'], qLabel: 'Month' } }
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
    app.createSessionObject(def6).then(model => {
      const TestTwo = new LineOne('arrivals-es', { model })
    })
  })
})
