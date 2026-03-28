document.addEventListener('DOMContentLoaded', async () => {
  requireLogin();

  const form = document.getElementById('booking-form');
  const msg = document.getElementById('message');
  const packageId = new URLSearchParams(window.location.search).get('packageId');

  if (packageId) {
    document.getElementById('packageId').value = packageId;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
      packageId: Number(document.getElementById('packageId').value),
      travelers: Number(document.getElementById('travelers').value),
      travelDate: document.getElementById('travelDate').value
    };

    if (!payload.packageId || !payload.travelers || !payload.travelDate) {
      msg.textContent = 'Please fill all fields.';
      msg.className = 'message error';
      return;
    }

    try {
      await request('/bookings', { method: 'POST', body: JSON.stringify(payload) });
      msg.textContent = 'Booking successful!';
      msg.className = 'message';
      form.reset();
    } catch (err) {
      msg.textContent = err.message;
      msg.className = 'message error';
    }
  });
});
