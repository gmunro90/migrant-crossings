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
