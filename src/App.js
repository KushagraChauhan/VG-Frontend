import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginOrRegisterPage from './pages/LoginOrRegisterPage';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import AllCoursesPage from './pages/AllCoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import CourseSectionsPage from './pages/CourseSectionPage';
import UserProfilePage from './pages/UserProfilePage';
import CartPage from './pages/Cartpage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicRoute />}>
            <Route index element={<LandingPage />} />
            <Route path="welcome" element={<LoginOrRegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path='forgot-password' element={<ForgotPasswordPage />} />
            <Route path='reset-password' element={<ResetPasswordPage />} />
          </Route>
          {/* Private Routes */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<UserProfilePage/>} />
            <Route path="courses/:id/section/:sectionId" element={<CourseSectionsPage />} />
          </Route>
          {/* All Courses Page Route */}
          <Route path="courses" element={<AllCoursesPage />} />
          <Route path="courses/:id/*" element={<CourseDetailsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="privacypolicy" element={<PrivacyPolicyPage />} />
          <Route path='termsconditions' element={<TermsAndConditionsPage />} />
          {/* Redirect to home if path is not recognized */}
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
