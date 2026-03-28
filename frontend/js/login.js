document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const msg = document.getElementById('message');

  loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      email: document.getElementById('login-email').value,
      password: document.getElementById('login-password').value
    };

    try {
      const data = await request('/auth/login', { method: 'POST', body: JSON.stringify(payload) });
      saveAuth(data);
      window.location.href = 'dashboard.html';
    } catch (err) {
      msg.textContent = err.message;
      msg.className = 'message error';
    }
  });

  registerForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const password = document.getElementById('reg-password').value;
    if (password.length < 6) {
      msg.textContent = 'Password must be at least 6 characters.';
      msg.className = 'message error';
      return;
    }

    const payload = {
      fullName: document.getElementById('reg-name').value,
      email: document.getElementById('reg-email').value,
      password
    };

    try {
      const data = await request('/auth/register', { method: 'POST', body: JSON.stringify(payload) });
      saveAuth(data);
      window.location.href = 'dashboard.html';
    } catch (err) {
      msg.textContent = err.message;
      msg.className = 'message error';
    }
  });
});
