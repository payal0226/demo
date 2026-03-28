document.addEventListener('DOMContentLoaded', async () => {
  requireLogin();

  const welcome = document.getElementById('welcome');
  const tableBody = document.getElementById('booking-history');
  welcome.textContent = `Welcome, ${localStorage.getItem('fullName') || 'Traveler'}!`;

  document.getElementById('logout-btn').addEventListener('click', logout);

  try {
    const bookings = await request('/bookings/me');
    tableBody.innerHTML = bookings.map(b => `
      <tr>
        <td>${b.packageTitle}</td>
        <td>${b.location}</td>
        <td>${b.travelers}</td>
        <td>${b.travelDate}</td>
        <td>${new Date(b.createdAt).toLocaleString()}</td>
      </tr>
    `).join('') || '<tr><td colspan="5">No bookings yet.</td></tr>';
  } catch (err) {
    tableBody.innerHTML = `<tr><td colspan="5" class="error">${err.message}</td></tr>`;
  }
});
