document.addEventListener('DOMContentLoaded', () => {
  requireLogin();
  if (localStorage.getItem('role') !== 'ADMIN') {
    alert('Admin access only.');
    window.location.href = 'index.html';
    return;
  }

  const form = document.getElementById('admin-form');
  const list = document.getElementById('admin-packages');
  const msg = document.getElementById('admin-message');
  const packageCache = new Map();

  async function loadPackages() {
    const data = await request('/packages');
    packageCache.clear();

    list.innerHTML = data.map(p => {
      packageCache.set(p.id, p);
      return `
      <article class="card">
        <img src="${p.imageUrl}" alt="${p.title}" />
        <div class="card-body">
          <h3>${p.title}</h3>
          <p>$${p.price} • ⭐ ${p.rating}</p>
          <button class="btn" data-action="edit" data-id="${p.id}">Edit</button>
          <button class="btn secondary" data-action="delete" data-id="${p.id}">Delete</button>
        </div>
      </article>`;
    }).join('');
  }

  list.addEventListener('click', async (event) => {
    const button = event.target.closest('button');
    if (!button) return;

    const id = Number(button.dataset.id);
    const action = button.dataset.action;

    if (action === 'edit') {
      const p = packageCache.get(id);
      if (!p) return;

      document.getElementById('pkg-id').value = p.id;
      document.getElementById('title').value = p.title;
      document.getElementById('location').value = p.location;
      document.getElementById('description').value = p.description;
      document.getElementById('durationDays').value = p.durationDays;
      document.getElementById('price').value = p.price;
      document.getElementById('rating').value = p.rating;
      document.getElementById('imageUrl').value = p.imageUrl;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (action === 'delete') {
      if (!confirm('Delete this package?')) return;
      await request(`/admin/packages/${id}`, { method: 'DELETE' });
      msg.textContent = 'Package deleted.';
      await loadPackages();
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('pkg-id').value;
    const payload = {
      title: document.getElementById('title').value,
      location: document.getElementById('location').value,
      description: document.getElementById('description').value,
      durationDays: Number(document.getElementById('durationDays').value),
      price: Number(document.getElementById('price').value),
      rating: Number(document.getElementById('rating').value),
      imageUrl: document.getElementById('imageUrl').value
    };

    if (id) {
      await request(`/admin/packages/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
      msg.textContent = 'Package updated.';
    } else {
      await request('/admin/packages', { method: 'POST', body: JSON.stringify(payload) });
      msg.textContent = 'Package created.';
    }

    form.reset();
    document.getElementById('pkg-id').value = '';
    await loadPackages();
  });

  loadPackages().catch(err => {
    msg.textContent = err.message;
    msg.className = 'message error';
  });
});
