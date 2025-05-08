const rooms = JSON.parse(localStorage.getItem('rooms')) || [
  { id: 1, name: 'Standart Oda', price: 100, capacity: 2, description: 'Konforlu ve sade bir oda', image: 'images/room1.jpg' },
  { id: 2, name: 'Deluxe Oda', price: 200, capacity: 4, description: 'Geniş ve lüks bir oda', image: 'images/room2.jpg' },
  { id: 3, name: 'Aile Odası', price: 300, capacity: 6, description: 'Aileler için geniş yaşam alanı', image: 'images/room3.jpg' },
  { id: 4, name: 'Süit Oda', price: 400, capacity: 4, description: 'Lüks ve özel bir deneyim', image: 'images/room4.jpg' }
];
const users = JSON.parse(localStorage.getItem('users')) || [];
const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Save to localStorage
function saveData() {
  localStorage.setItem('rooms', JSON.stringify(rooms));
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('reservations', JSON.stringify(reservations));
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

// Check if user is logged in
function checkUserLogin() {
  if (!currentUser) {
    if (window.location.pathname.includes('admin.html') || window.location.pathname.includes('booking.html') || window.location.pathname.includes('my-bookings.html')) {
      alert('Bu sayfaya erişmek için lütfen giriş yapın!');
      window.location.href = 'login.html';
    }
  }
}

// Update Navbar based on user login status
function updateNavbar() {
  const navUser = document.getElementById('navUser');
  if (navUser) {
    if (currentUser) {
      if (currentUser.role === 'admin') {
        navUser.innerHTML = `
          <a href="rooms.html" class="nav-link">Odalar</a>
          <a href="admin.html" class="nav-link">Yönetim Paneli</a>
          <span class="nav-link font-bold">Hoş geldin, ${currentUser.name}</span>
          <a href="#" onclick="logout()" class="nav-link">Çıkış Yap</a>
        `;
      } else {
        navUser.innerHTML = `
          <a href="my-bookings.html" class="nav-link">Rezervasyonlarım</a>
          <a href="rooms.html" class="nav-link">Odalar</a>
          <a href="booking.html" class="nav-link">Rezervasyon</a>
          <span class="nav-link font-bold">Hoş geldin, ${currentUser.name}</span>
          <a href="#" onclick="logout()" class="nav-link">Çıkış Yap</a>
        `;
      }
    } else {
      navUser.innerHTML = `
        <a href="rooms.html" class="nav-link">Odalar</a>
        <a href="booking.html" class="nav-link">Rezervasyon</a>
        <a href="login.html" class="nav-link">Giriş/Kayıt</a>
      `;
    }
  }
}

// List User Bookings
function listUserBookings() {
  const bookingList = document.getElementById('bookingList');
  if (!bookingList) return;
  bookingList.innerHTML = '';
  const userBookings = reservations.filter(res => res.userId === currentUser.id);
  if (userBookings.length === 0) {
    bookingList.innerHTML = '<p class="text-center text-gray-500">Henüz rezervasyonunuz bulunmamaktadır.</p>';
    return;
  }
  userBookings.forEach(res => {
    const room = rooms.find(r => r.id === res.roomId);
    const div = document.createElement('div');
    div.className = 'booking-card';
    if (!room) {
      div.innerHTML = `
        <h3 class="text-lg font-bold text-red-600">Silinmiş Oda (ID: ${res.roomId})</h3>
        <p><strong>Giriş Tarihi:</strong> ${res.checkIn}</p>
        <p><strong>Çıkış Tarihi:</strong> ${res.checkOut}</p>
        <p><strong>Kişi Sayısı:</strong> ${res.guests}</p>
        <p><strong>Toplam Fiyat:</strong> ${res.totalPrice} TL</p>
        <p><strong>Durum:</strong> ${res.status === 'pending' ? 'Onay Bekliyor' : res.status === 'approved' ? 'Onaylandı' : 'Reddedildi'}</p>
        ${res.status === 'pending' ? `<button onclick="cancelBooking(${res.id})" class="btn-danger mt-2">İptal Et</button>` : ''}
      `;
    } else {
      div.innerHTML = `
        <h3 class="text-lg font-bold">${room.name}</h3>
        <p><strong>Giriş Tarihi:</strong> ${res.checkIn}</p>
        <p><strong>Çıkış Tarihi:</strong> ${res.checkOut}</p>
        <p><strong>Kişi Sayısı:</strong> ${res.guests}</p>
        <p><strong>Toplam Fiyat:</strong> ${res.totalPrice} TL</p>
        <p><strong>Durum:</strong> ${res.status === 'pending' ? 'Onay Bekliyor' : res.status === 'approved' ? 'Onaylandı' : 'Reddedildi'}</p>
        ${res.status === 'pending' ? `<button onclick="cancelBooking(${res.id})" class="btn-danger mt-2">İptal Et</button>` : ''}
      `;
    }
    bookingList.appendChild(div);
  });
}

// Cancel Booking
function cancelBooking(id) {
  const res = reservations.find(r => r.id === id);
  if (res.userId !== currentUser.id) {
    alert('Bu rezervasyonu iptal etme yetkiniz yok!');
    return;
  }
  if (res.status !== 'pending') {
    alert('Sadece onay bekleyen rezervasyonlar iptal edilebilir!');
    return;
  }
  reservations.splice(reservations.indexOf(res), 1);
  saveData();
  listUserBookings();
  alert('Rezervasyon iptal edildi!');
}

// Login
function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    currentUser = user;
    saveData();
    if (user.role === 'admin') {
      window.location.href = 'admin.html';
    } else {
      window.location.href = 'index.html';
    }
  } else {
    alert('Geçersiz e-posta veya şifre!');
  }
}

// Register
function register() {
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  if (users.find(u => u.email === email)) {
    alert('Bu e-posta zaten kayıtlı!');
    return;
  }
  users.push({ id: users.length + 1, name, email, password, role: 'customer' });
  saveData();
  alert('Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
}

// Logout
function logout() {
  currentUser = null;
  saveData();
  window.location.href = 'index.html';
}

// List Rooms
function listRooms(checkIn = null, checkOut = null) {
  const roomList = document.getElementById('roomList');
  if (!roomList) return;
  roomList.innerHTML = '';
  let filteredRooms = rooms;
  if (checkIn && checkOut) {
    filteredRooms = rooms.filter(room => {
      return !reservations.some(res => 
        res.roomId === room.id && 
        !(new Date(checkOut) <= new Date(res.checkIn) || new Date(checkIn) >= new Date(res.checkOut))
      );
    });
  }
  filteredRooms.forEach(room => {
    const card = document.createElement('div');
    card.className = 'room-card';
    card.innerHTML = `
      <img src="${room.image}" alt="${room.name}" class="room-image">
      <div class="p-4">
        <h3 class="text-xl font-bold mt-2">${room.name}</h3>
        <p>${room.description}</p>
        <p><strong>Fiyat:</strong> ${room.price} TL/gece</p>
        <p><strong>Kapasite:</strong> ${room.capacity} kişi</p>
        <a href="booking.html?roomId=${room.id}" class="btn-primary mt-2 inline-block">Rezervasyon Yap</a>
        ${currentUser && currentUser.role === 'admin' ? `
          <button onclick="editRoom(${room.id})" class="btn-primary mt-2 ml-2">Düzenle</button>
          <button onclick="deleteRoom(${room.id})" class="btn-danger mt-2 ml-2">Sil</button>
        ` : ''}
      </div>
    `;
    roomList.appendChild(card);
  });
}

// Filter Rooms
function filterRooms() {
  const checkIn = document.getElementById('checkIn').value;
  const checkOut = document.getElementById('checkOut').value;
  if (!checkIn || !checkOut) {
    alert('Lütfen giriş ve çıkış tarihlerini seçin!');
    return;
  }
  listRooms(checkIn, checkOut);
}

// Load Booking Form
function loadBookingForm() {
  if (!currentUser) {
    alert('Rezervasyon yapmak için lütfen giriş yapın!');
    window.location.href = 'login.html';
    return;
  }
  const roomSelect = document.getElementById('roomSelect');
  if (!roomSelect) return;
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('roomId');
  roomSelect.innerHTML = rooms.map(room => `<option value="${room.id}" ${room.id == roomId ? 'selected' : ''}>${room.name}</option>`).join('');
}

// Make Booking
function makeBooking() {
  if (!currentUser) {
    alert('Rezervasyon yapmak için lütfen giriş yapın!');
    window.location.href = 'login.html';
    return;
  }
  const roomId = parseInt(document.getElementById('roomSelect').value);
  const checkIn = document.getElementById('checkIn').value;
  const checkOut = document.getElementById('checkOut').value;
  const guests = parseInt(document.getElementById('guests').value);
  const room = rooms.find(r => r.id === roomId);
  if (!checkIn || !checkOut || !guests) {
    alert('Lütfen tüm alanları doldurun!');
    return;
  }
  if (!room) {
    alert('Seçilen oda artık mevcut değil!');
    return;
  }
  if (guests > room.capacity) {
    alert(`Bu oda en fazla ${room.capacity} kişi kapasitelidir!`);
    return;
  }
  const isAvailable = !reservations.some(res => 
    res.roomId === roomId && 
    !(new Date(checkOut) <= new Date(res.checkIn) || new Date(checkIn) >= new Date(res.checkOut))
  );
  if (!isAvailable) {
    alert('Seçilen tarihlerde bu oda müsait değil!');
    return;
  }
  const days = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
  const totalPrice = days * room.price;
  reservations.push({
    id: reservations.length + 1,
    userId: currentUser.id,
    roomId,
    checkIn,
    checkOut,
    guests,
    totalPrice,
    status: 'pending',
    date: new Date().toISOString()
  });
  saveData();
  alert(`Rezervasyon başarılı! Toplam: ${totalPrice} TL\nFatura: Oda: ${room.name}, Tarih: ${checkIn} - ${checkOut}, Kişi: ${guests}`);
}

// Save Room (Add/Edit)
function saveRoom() {
  if (!currentUser || currentUser.role !== 'admin') {
    alert('Bu işlem için admin yetkisi gerekli!');
    window.location.href = 'login.html';
    return;
  }
  const id = parseInt(document.getElementById('roomId').value) || (rooms.length ? Math.max(...rooms.map(r => r.id)) + 1 : 1);
  const nameInput = document.getElementById('roomName').value;
  const priceInput = document.getElementById('roomPrice').value;
  const capacityInput = document.getElementById('roomCapacity').value;
  const descriptionInput = document.getElementById('roomDescription').value;
  const imageInput = document.getElementById('roomImage');

  // Mevcut bilgileri al (düzenleme modunda)
  const existingRoom = rooms.find(r => r.id === id);
  const currentName = existingRoom ? existingRoom.name : '';
  const currentPrice = existingRoom ? existingRoom.price : 0;
  const currentCapacity = existingRoom ? existingRoom.capacity : 0;
  const currentDescription = existingRoom ? existingRoom.description : '';
  const currentImage = existingRoom ? existingRoom.image : 'images/default_room.jpg';

  // Input boşsa mevcut değerleri kullan
  const name = nameInput || currentName;
  const price = parseInt(priceInput) || currentPrice;
  const capacity = parseInt(capacityInput) || currentCapacity;
  const description = descriptionInput || currentDescription;

  if (!name || !price || !capacity || !description) {
    alert('Lütfen tüm alanları doldurun veya mevcut değerleri kullanın!');
    return;
  }
  const newRoom = {
    id,
    name,
    price,
    capacity,
    description,
    image: currentImage
  };
  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      newRoom.image = e.target.result;
      updateRoom(newRoom);
      alert(rooms.some(r => r.id === id) ? 'Oda güncellendi!' : 'Oda eklendi!');
      resetRoomForm();
      listRooms();
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    updateRoom(newRoom);
    alert(rooms.some(r => r.id === id) ? 'Oda güncellendi!' : 'Oda eklendi!');
    resetRoomForm();
    listRooms();
  }
}

// Update Room
function updateRoom(room) {
  const index = rooms.findIndex(r => r.id === room.id);
  if (index !== -1) {
    rooms[index] = room;
  } else {
    rooms.push(room);
  }
  saveData();
}

// Edit Room
function editRoom(id) {
  if (!currentUser || currentUser.role !== 'admin') {
    alert('Bu işlem için admin yetkisi gerekli!');
    window.location.href = 'login.html';
    return;
  }
  const room = rooms.find(r => r.id === id);
  if (!room) {
    alert('Oda bulunamadı!');
    return;
  }
  // admin.html'ye yönlendir
  window.location.href = 'admin.html';
  // Formu ve mevcut bilgileri doldur
  setTimeout(() => {
    document.getElementById('roomId').value = room.id;
    // Mevcut bilgileri göster
    const currentRoomInfo = document.getElementById('currentRoomInfo');
    currentRoomInfo.classList.remove('hidden');
    document.getElementById('currentRoomName').textContent = room.name;
    document.getElementById('currentRoomPrice').textContent = room.price;
    document.getElementById('currentRoomCapacity').textContent = room.capacity;
    document.getElementById('currentRoomDescription').textContent = room.description;
    document.getElementById('currentRoomImage').src = room.image;
    // Input alanlarını boş bırak
    document.getElementById('roomName').value = '';
    document.getElementById('roomPrice').value = '';
    document.getElementById('roomCapacity').value = '';
    document.getElementById('roomDescription').value = '';
    document.getElementById('roomImage').value = '';
    // Görsel seçimi için olay dinleyicisi
    document.getElementById('roomImage').addEventListener('change', function(e) {
      const preview = document.getElementById('imagePreview');
      if (e.target.files[0]) {
        preview.src = URL.createObjectURL(e.target.files[0]);
        preview.classList.remove('hidden');
      } else {
        preview.classList.add('hidden');
      }
    });
    window.scrollTo(0, 0);
  }, 100); // Kısa gecikme, sayfanın yüklenmesini bekler
}

// Delete Room
function deleteRoom(id) {
  if (!currentUser || currentUser.role !== 'admin') {
    alert('Bu işlem için admin yetkisi gerekli!');
    return;
  }
  if (confirm('Bu odayı silmek istediğinize emin misiniz?')) {
    rooms.splice(rooms.findIndex(r => r.id === id), 1);
    saveData();
    listRooms();
    alert('Oda silindi!');
  }
}

// Reset Room Form
function resetRoomForm() {
  document.getElementById('roomForm').reset();
  document.getElementById('roomId').value = '';
  document.getElementById('currentRoomInfo').classList.add('hidden');
  document.getElementById('imagePreview').classList.add('hidden');
}

// List Reservations (Admin)
function listReservations() {
  const reservationList = document.getElementById('reservationList');
  if (!reservationList) return;
  reservationList.innerHTML = '';
  reservations.forEach(res => {
    const room = rooms.find(r => r.id === res.roomId);
    const user = users.find(u => u.id === res.userId);
    const div = document.createElement('div');
    div.className = 'border p-4 mb-2 rounded';
    if (!room) {
      div.innerHTML = `
        <p><strong>Kullanıcı:</strong> ${user.name}</p>
        <p><strong>Oda:</strong> Silinmiş Oda (ID: ${res.roomId})</p>
        <p><strong>Tarih:</strong> ${res.checkIn} - ${res.checkOut}</p>
        <p><strong>Kişi:</strong> ${res.guests}</p>
        <p><strong>Toplam:</strong> ${res.totalPrice} TL</p>
        <p><strong>Durum:</strong> ${res.status === 'pending' ? 'Onay Bekliyor' : res.status === 'approved' ? 'Onaylandı' : 'Reddedildi'}</p>
        ${res.status === 'pending' ? `
          <button onclick="updateReservation(${res.id}, 'approved')" class="btn-primary mr-2">Onayla</button>
          <button onclick="updateReservation(${res.id}, 'rejected')" class="btn-danger">Reddet</button>
        ` : ''}
      `;
    } else {
      div.innerHTML = `
        <p><strong>Kullanıcı:</strong> ${user.name}</p>
        <p><strong>Oda:</strong> ${room.name}</p>
        <p><strong>Tarih:</strong> ${res.checkIn} - ${res.checkOut}</p>
        <p><strong>Kişi:</strong> ${res.guests}</p>
        <p><strong>Toplam:</strong> ${res.totalPrice} TL</p>
        <p><strong>Durum:</strong> ${res.status === 'pending' ? 'Onay Bekliyor' : res.status === 'approved' ? 'Onaylandı' : 'Reddedildi'}</p>
        ${res.status === 'pending' ? `
          <button onclick="updateReservation(${res.id}, 'approved')" class="btn-primary mr-2">Onayla</button>
          <button onclick="updateReservation(${res.id}, 'rejected')" class="btn-danger">Reddet</button>
        ` : ''}
      `;
    }
    reservationList.appendChild(div);
  });
}

// Update Reservation (Admin)
function updateReservation(id, status) {
  const res = reservations.find(r => r.id === id);
  res.status = status;
  saveData();
  listReservations();
  alert(`Rezervasyon ${status === 'approved' ? 'onaylandı' : 'reddedildi'}!`);
}

// Initialize Pages
if (document.getElementById('roomList')) {
  listRooms();
}
if (document.getElementById('roomSelect')) {
  loadBookingForm();
}
if (document.getElementById('reservationList')) {
  if (!currentUser || currentUser.role !== 'admin') {
    alert('Bu sayfa için admin yetkisi gerekli!');
    window.location.href = 'login.html';
  } else {
    listReservations();
  }
}
if (document.getElementById('bookingList')) {
  listUserBookings();
}
updateNavbar(); // Update navbar on page load