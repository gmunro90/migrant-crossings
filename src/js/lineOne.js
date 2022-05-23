/* global Chart render */

class LineOne {
  constructor (elementId, options) {
    const DEFAULT = {}
    this.elementId = elementId
    this.options = Object.assign({}, options)
    const el = document.getElementById(this.elementId)
    const config = {
      type: 'line',
      options: {
        showLine: true
      }
    }
    this.lineOne = new Chart(
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
