import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, protectedRoutes } from './routes';
import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                                path={route.path}
                            />
                        );
                    })}

                    {protectedRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                                path={route.path}
                            />
                        );
                    })}
                </Routes>
                <div>
                    <ToastContainer
                        position="top-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover={false}
                        theme="colored"
                    />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
