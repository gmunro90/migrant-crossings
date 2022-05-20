/* global Chart */
const barLabels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June'
]

const dataBar = {
  labels: barLabels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(200, 99, 132)',
    borderColor: 'rgb(300, 99, 132)',
    data: [10, 5, 5, 2, 50]
  }]
}

const configBar = {
  type: 'pie',
  data: dataBar,
  options: {}
}

const barOne = new Chart(
  document.getElementById('bar-2'),
  configBar
)
