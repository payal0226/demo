function saveAuth(data) {
  localStorage.setItem('token', data.token);
  localStorage.setItem('role', data.role);
  localStorage.setItem('fullName', data.fullName);
}

function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}

function requireLogin() {
  if (!localStorage.getItem('token')) {
    window.location.href = 'login.html';
  }
}
