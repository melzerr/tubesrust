const ctx = document.getElementById('humidityChart').getContext('2d');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['2004', '2005', '2006', '2007'],
    datasets: [
      {
        label: 'RH1',
        data: [1000, 1200, 800, 1000],
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'RH2',
        data: [300, 400, 1100, 600],
        borderColor: 'red',
        fill: false,
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }
});
