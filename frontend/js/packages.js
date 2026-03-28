document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('filter-form');
  const results = document.getElementById('package-results');

  async function loadPackages() {
    const keyword = document.getElementById('keyword').value;
    const location = document.getElementById('location').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const minRating = document.getElementById('minRating').value;

    const query = new URLSearchParams();
    if (keyword) query.append('keyword', keyword);
    if (location) query.append('location', location);
    if (maxPrice) query.append('maxPrice', maxPrice);
    if (minRating) query.append('minRating', minRating);

    const data = await request(`/packages?${query.toString()}`);
    results.innerHTML = data.map(p => `
      <article class="card">
        <img src="${p.imageUrl}" alt="${p.title}" />
        <div class="card-body">
          <h3>${p.title}</h3>
          <p>${p.location}</p>
          <p>${p.durationDays} days • <strong>$${p.price}</strong></p>
          <p>⭐ ${p.rating}</p>
          <a class="btn" href="package-details.html?id=${p.id}">Details</a>
        </div>
      </article>
    `).join('') || '<p>No packages found.</p>';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    loadPackages().catch(err => alert(err.message));
  });

  loadPackages().catch(err => results.innerHTML = `<p class="error">${err.message}</p>`);
});
