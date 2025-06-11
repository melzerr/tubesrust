const ctx = document.getElementById('chart').getContext('2d');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['2004', '2005', '2006', '2007'],
    datasets: [
      {
        label: 'Sensor A',
        data: [800, 900, 1100, 950],
        borderColor: 'blue',
        borderWidth: 2,
        fill: false
      },
      {
        label: 'Sensor B',
        data: [400, 600, 950, 600],
        borderColor: 'red',
        borderWidth: 2,
        fill: false
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }
});
