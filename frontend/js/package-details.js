document.addEventListener('DOMContentLoaded', async () => {
  const details = document.getElementById('package-details');
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    details.innerHTML = '<p class="error">Package id is missing.</p>';
    return;
  }

  try {
    const p = await request(`/packages/${id}`);
    details.innerHTML = `
      <article class="card">
        <img src="${p.imageUrl}" alt="${p.title}" />
        <div class="card-body">
          <h2>${p.title}</h2>
          <p>${p.location} • ${p.durationDays} days</p>
          <p>${p.description}</p>
          <p><strong>$${p.price}</strong> • ⭐ ${p.rating}</p>
          <a class="btn" href="booking.html?packageId=${p.id}">Book Now</a>
        </div>
      </article>
    `;
  } catch (err) {
    details.innerHTML = `<p class="error">${err.message}</p>`;
  }
});
