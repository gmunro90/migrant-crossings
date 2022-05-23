/* global Chart render */

class PieOne {
  constructor (elementId, options) {
    const DEFAULT = {}
    this.elementId = elementId
    this.options = Object.assign({}, options)
    const el = document.getElementById(this.elementId)
    const config = {
      type: 'pie',
      options: {}
    }
    this.pieOne = new Chart(
      document.getElementById('pie-1'),
      config
    )
    this.render()
  }
        
  render () {
    this.options.model.getLayout().then(layout => {
      const data = {
        labels: [],
        datasets: [{
          label: 'Deaths',
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
