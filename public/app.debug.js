/* global enigma schema Filter include Hypercube PieOne app Chart BarOne LineOne WebsyDesigns */  
/* global Chart render */

class PieOne {
  constructor (elementId, options) {
    const DEFAULT = {}
    this.elementId = elementId
    this.options = Object.assign({}, options)
    const el = document.getElementById(this.elementId)
    const config = {
      type: 'doughnut',
      options: {
        backgroundColor: '#545AC4'
      }
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
          backgroundColor: this.options.backgroundColor,
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
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      this.options.model.on('changed', this.render.bind(this))
      const config = {
        type: 'bar',
        options: { 
          plugins: {legend: {display: false}, title: {text: options.title, display: true}},
          backgroundColor: '#545AC4' }
      }
      this.barOne = new Chart(
        document.getElementById(this.elementId),
        config
      )
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
      const data = {
        labels: [],
        datasets: [{
          label: '',
          backgroundColor: this.options.backgroundColor,
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

/* global Chart render */

class LineOne {
  constructor (elementId, options) {
    const DEFAULT = {}
    this.elementId = elementId
    this.options = Object.assign({}, options)
    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      this.options.model.on('changed', this.render.bind(this))
      const config = {
        type: 'line',
        options: {
          plugins: {legend: {display: false}, title: {text: 'Deaths & disappearances per month', display: true}},
          showLine: true
        }
      }
      this.lineOne = new Chart(
        document.getElementById(this.elementId),
        config
      )
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
      const data = {
        labels: [],
        datasets: [{
          label: '',
          fill: false,
          borderColor: 'rgb(75, 192, 192))',
          tension: 0.1,
          data: []
        }]
      }
      layout.qHyperCube.qDataPages[0].qMatrix.forEach(row => {
        data.labels.push(row[0].qText)
        data.datasets[0].data.push(row[1].qNum)
      })
      this.lineOne.data = data 
      this.lineOne.update()
    })
  }
}

class Filter {
  constructor (elementId, options) {
    const DEFAULT = {}
    this.elementId = elementId
    this.options = Object.assign({}, options)

    const el = document.getElementById(this.elementId)
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this))
      el.innerHTML = `<ul id='${this.elementId}_list'></ul>`
      this.options.model.on('changed', this.render.bind(this))
      this.render()
    }
    else {
      console.error(`no element found with id - ${this.elementId}`)
    }
  }

  handleClick (event) {
    if (event.target.classList.contains('list-item')) {
      const elemNumber = event.target.getAttribute('data-elem')
      this.options.model.selectListObjectValues('/qListObjectDef', [+elemNumber], true)
    }
  }

  render () {
    this.options.model.getLayout().then(layout => {
      let html = layout.qListObject.qDataPages[0].qMatrix.map(row => 
        `<li data-elem="${row[0].qElemNumber}" class='list-item state-${row[0].qState}'>${row[0].qText}</li>`).join('')
      const el = document.getElementById(`${this.elementId}_list`)
      if (el) {
        el.innerHTML = html
      }
    })
  }
}


// router initialisation
const options = {
  defaultView: 'home'
}
const router = new WebsyDesigns.Router(options)
router.init()

const loader = new WebsyDesigns.WebsyLoadingDialog('loader')

const session = enigma.create({
  schema,
  url: 'ws://ec2-3-92-185-52.compute-1.amazonaws.com/anon/app/6bb2c4a8-4328-46d5-88e1-747870f4e1d2'
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
          { qDef: { qFieldDefs: ['Year'], qLabel: 'Year', qSortCriterias: [{qSortByNumeric: 1}] } }
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
      const TestTwo = new BarOne('bar-1', { model, title: 'Deaths & disappearances by year' })
    })
    const def4 = {
      qInfo: {
        qType: 'line-one'
      },
      qHyperCubeDef: {
        qDimensions: [
          { qDef: { qFieldDefs: ['Month'], qLabel: 'Month', qSortCriterias: [{qSortByNumeric: 0}] } }
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
  })
})
