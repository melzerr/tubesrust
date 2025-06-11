// Sample data riwayat
const riwayatData = [
  {
    id: 1,
    lokasi: "Surabaya Barat",
    kelembaban: "85%",
    status: "BAHAYA",
    tanggal: "2024-06-09",
    waktu: "14:30"
  },
  {
    id: 2,
    lokasi: "Surabaya Timur",
    kelembaban: "65%",
    status: "AMAN",
    tanggal: "2024-06-09",
    waktu: "13:15"
  },
  {
    id: 3,
    lokasi: "Surabaya Utara",
    kelembaban: "75%",
    status: "PERINGATAN",
    tanggal: "2024-06-09",
    waktu: "12:00"
  },
  {
    id: 4,
    lokasi: "Surabaya Selatan",
    kelembaban: "60%",
    status: "AMAN",
    tanggal: "2024-06-08",
    waktu: "16:45"
  },
  {
    id: 5,
    lokasi: "Surabaya Barat",
    kelembaban: "78%",
    status: "PERINGATAN",
    tanggal: "2024-06-08",
    waktu: "15:20"
  }
];

// Function untuk render tabel
function renderTable() {
  const tableBody = document.getElementById('tableBody');
  const emptyState = document.getElementById('emptyState');
  
  if (riwayatData.length === 0) {
    tableBody.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }
  
  tableBody.innerHTML = '';
  emptyState.style.display = 'none';
  
  riwayatData.forEach((item, index) => {
    const row = document.createElement('tr');
    
    // Tentukan class status
    let statusClass = 'aman';
    if (item.status === 'BAHAYA') statusClass = 'bahaya';
    else if (item.status === 'PERINGATAN') statusClass = 'peringatan';
    
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.lokasi}</td>
      <td>${item.kelembaban}</td>
      <td><span class="status ${statusClass}">${item.status}</span></td>
      <td>${formatTanggal(item.tanggal)}</td>
      <td>${item.waktu}</td>
    `;
    
    tableBody.appendChild(row);
  });
}

// Function untuk format tanggal
function formatTanggal(tanggal) {
  const date = new Date(tanggal);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('id-ID', options);
}

// Navigation functions
function navigateToHome() {
  // Implementasi navigasi ke halaman home
  console.log('Navigasi ke Home');
  // window.location.href = 'index.html';
}

function navigateToRiwayat() {
  // Sudah di halaman riwayat
  console.log('Sudah di halaman Riwayat');
}

// Function untuk menambah data baru (simulasi)
function addNewRecord(lokasi, kelembaban, status) {
  const now = new Date();
  const newRecord = {
    id: riwayatData.length + 1,
    lokasi: lokasi,
    kelembaban: kelembaban,
    status: status,
    tanggal: now.toISOString().split('T')[0],
    waktu: now.toTimeString().split(' ')[0].substring(0, 5)
  };
  
  riwayatData.unshift(newRecord); // Tambah di awal array
  renderTable();
}

// Function untuk clear semua data
function clearAllRecords() {
  riwayatData.length = 0;
  renderTable();
}

// Function untuk export data ke CSV
function exportToCSV() {
  let csv = 'No,Lokasi,Tingkat Kelembaban,Status,Tanggal,Waktu\n';
  
  riwayatData.forEach((item, index) => {
    csv += `${index + 1},${item.lokasi},${item.kelembaban},${item.status},${item.tanggal},${item.waktu}\n`;
  });
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'riwayat-kelembaban.csv';
  a.click();
  window.URL.revokeObjectURL(url);
}

// Function untuk filter data berdasarkan status
function filterByStatus(status) {
  const tableBody = document.getElementById('tableBody');
  const rows = tableBody.querySelectorAll('tr');
  
  rows.forEach(row => {
    if (status === 'ALL') {
      row.style.display = '';
    } else {
      const statusCell = row.querySelector('.status');
      if (statusCell && statusCell.textContent === status) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    }
  });
}

// Function untuk search data
function searchData(query) {
  const tableBody = document.getElementById('tableBody');
  const rows = tableBody.querySelectorAll('tr');
  const searchTerm = query.toLowerCase();
  
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    let found = false;
    
    cells.forEach(cell => {
      if (cell.textContent.toLowerCase().includes(searchTerm)) {
        found = true;
      }
    });
    
    row.style.display = found ? '' : 'none';
  });
}

// Initialize saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
  renderTable();
  
  // Simulasi data baru setiap 30 detik (untuk testing)
  setInterval(() => {
    const lokasi = ['Surabaya Barat', 'Surabaya Timur', 'Surabaya Utara', 'Surabaya Selatan'];
    const randomLokasi = lokasi[Math.floor(Math.random() * lokasi.length)];
    const randomKelembaban = Math.floor(Math.random() * 40) + 50; // 50-90%
    
    let status = 'AMAN';
    if (randomKelembaban > 80) status = 'BAHAYA';
    else if (randomKelembaban > 70) status = 'PERINGATAN';
    
    // Uncomment baris di bawah untuk simulasi data real-time
    // addNewRecord(randomLokasi, randomKelembaban + '%', status);
  }, 30000);
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.key === 'h') {
    e.preventDefault();
    navigateToHome();
  } else if (e.ctrlKey && e.key === 'r') {
    e.preventDefault();
    location.reload();
  } else if (e.ctrlKey && e.key === 'e') {
    e.preventDefault();
    exportToCSV();
  }
});

// Function untuk mendapatkan statistik data
function getStatistics() {
  const total = riwayatData.length;
  const aman = riwayatData.filter(item => item.status === 'AMAN').length;
  const peringatan = riwayatData.filter(item => item.status === 'PERINGATAN').length;
  const bahaya = riwayatData.filter(item => item.status === 'BAHAYA').length;
  
  return {
    total: total,
    aman: aman,
    peringatan: peringatan,
    bahaya: bahaya
  };
}

// Function untuk update data real-time (untuk integrasi dengan sensor)
function updateRealTimeData(newData) {
  // newData format: { lokasi, kelembaban, status }
  addNewRecord(newData.lokasi, newData.kelembaban, newData.status);
  
  // Batasi data maksimal 100 record untuk performa
  if (riwayatData.length > 100) {
    riwayatData.splice(100);
    renderTable();
  }
}