document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('featured-packages');
  if (!list) return;

  request('/packages')
    .then(packages => {
      list.innerHTML = packages.slice(0, 3).map(p => `
        <article class="card">
          <img src="${p.imageUrl}" alt="${p.title}" />
          <div class="card-body">
            <h3>${p.title}</h3>
            <p>${p.location} • ${p.durationDays} days</p>
            <p><strong>$${p.price}</strong> <span class="badge">⭐ ${p.rating}</span></p>
            <a class="btn" href="package-details.html?id=${p.id}">View</a>
          </div>
        </article>
      `).join('');
    })
    .catch(() => {
      list.innerHTML = '<p class="error">Failed to load packages. Start backend server.</p>';
    });
});
