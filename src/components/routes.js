import { Home } from './components/Home.js';
import { Register } from './components/Register.js',
import { Login } from './components/Login.js';

const routes = {
  '/': Home,
  '/register': Register,
  '/login': Login,
};

export const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );

  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }

  rootDiv.appendChild(routes[pathname]());
};
