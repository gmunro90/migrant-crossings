/* global enigma schema Filter include Hypercube Test app */ 
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


const session = enigma.create({
  schema,
  url: 'wss://ec2-3-92-185-52.compute-1.amazonaws.com/anon/app/6bb2c4a8-4328-46d5-88e1-747870f4e1d2'
})

session.open().then(global => {
  global.openDoc('6bb2c4a8-4328-46d5-88e1-747870f4e1d2').then(app => {
    console.log(app)
  })

  const def = {
    qInfo: {
      qType: 'pie'
    },
    qHyperCubeDef: {
      qDimensions: [
        { qDef: { qFieldDefs: ['Details'] } }
      ],
      qMeasures: [
        { qDef: { qDef: 'Sum({$<Activity = {"Deaths /disappearances"}>}Count)', qLabel: 'Deaths' } }
      ],
      qInitialDataFetch: [
        {
          qTop: 0,
          qLeft: 0,
          qWidth: 3,
          qHeight: 10
        }]
    }
  }
  app.createSessionObject(def).then(model => {
    const hyperCubeTest = new Hypercube('bar-chart-parent', { model })
    const Test1 = new Test('myChart', { model })
  })
})
