export default function authHeader() {
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;
  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token };
  } else {
    return {};
  }
}