/*
 runtime-config.js
 Sets window.__API_BASE__ at runtime. By default it is empty (frontend will use relative /api paths).
 To override at container start:
  echo "window.__API_BASE__ = 'https://your-backend-host:8080'" > /usr/share/nginx/html/runtime-config.js
*/
window.__API_BASE__ = window.__API_BASE__ || '';
