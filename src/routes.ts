import config from './config';

import Container from './components/container';
import Home from './components/home';
import LoginForm from './components/login-form';
import SignupForm from './components/signup-form';
import Profile from './components/profile';

//Public routes
const publicRoutes = [
    { path: config.routes.register, component: SignupForm, layout: Container },
    { path: config.routes.login, component: LoginForm, layout: Container },
    { path: config.routes.home, component: Home, layout: Container },
];

//Protected routes
const protectedRoutes = [{ path: config.routes.profile, component: Profile, layout: Container }];

export { publicRoutes, protectedRoutes };
