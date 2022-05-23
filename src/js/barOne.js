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
