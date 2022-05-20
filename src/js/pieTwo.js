/* global Chart */
const labels1 = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June'
]

const data1 = {
  labels: labels1,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(100, 99, 132)',
    borderColor: 'rgb(300, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45]
  }]
}

const config1 = {
  type: 'pie',
  data: data1,
  options: {}
}

const pieTwo = new Chart(
  document.getElementById('pie-2'),
  config1
)
