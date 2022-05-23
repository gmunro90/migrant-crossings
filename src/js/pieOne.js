/* global Chart render */

class Test {
  constructor (elementId, options) {
    const DEFAULT = {}
    this.elementId = elementId
    this.options = Object.assign({}, options)
    const el = document.getElementById(this.elementId)
    const config = {
      type: 'bar',
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
          backgroundColor: 'rgb(100, 99, 132)',
          borderColor: 'rgb(300, 99, 132)',
          data: []
        }]
      }
      layout.qHyperCube.qDataPages[0].qMatrix.forEach(row => {
        data.labels.push(row[0].qText)
        data.datasets[0].data.push(row[1].qNum)
      })
      this.myChart.data = data 
      this.myChart.update()
    })
  }
}
