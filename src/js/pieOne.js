/* global Chart */
const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June'
]

const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(100, 99, 132)',
    borderColor: 'rgb(300, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45]
  }]
}

const config = {
  type: 'pie',
  data: data,
  options: {}
}

const pieOne = new Chart(
  document.getElementById('pie-1'),
  config
)
