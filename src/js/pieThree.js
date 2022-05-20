/* global Chart */
const labels2 = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June'
]

const data2 = {
  labels: labels2,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(100, 99, 132)',
    borderColor: 'rgb(300, 99, 132)',
    data: [10, 5, 5, 2, 50]
  }]
}

const config2 = {
  type: 'pie',
  data: data2,
  options: {}
}

const pieThree = new Chart(
  document.getElementById('pie-3'),
  config2
)
