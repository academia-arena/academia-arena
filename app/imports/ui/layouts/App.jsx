import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import HomePage from '../pages/HomePage';
import ViewCardsAdmin from '../pages/ViewCardsAdmin';
import AddCard from '../pages/AddCard';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import LoadingSpinner from '../components/LoadingSpinner';
import ListTCard from '../pages/ListTCard';
import ListPublicTrade from '../pages/ListPublicTrade';
import ListForTrade from '../pages/ListForTrade';
import ViewWishlist from '../pages/ViewWishlist';
import CardPull from '../pages/CardPull';
import EditCard from '../pages/EditCard';
import ManageAccountsAdmin from '../pages/ManageAccountsAdmin';
import Settings from '../pages/Settings';
import AdminAsking from '../pages/AdminAsking';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const { ready, loggedIn } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    const user = Meteor.user();
    return {
      ready: rdy,
      loggedIn: !!user,
    };
  });
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <Routes>
          {loggedIn ? (
            <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          ) : (
            <Route path="/home" element={<Landing />} />
          )}
          <Route exact path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/landing" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
          <Route path="/list" element={<ProtectedRoute><ListTCard /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><ViewWishlist /></ProtectedRoute>} />
          <Route path="/add" element={<AdminProtectedRoute ready={ready}><AddCard /></AdminProtectedRoute>} />
          <Route path="/trade" element={<ProtectedRoute><ListPublicTrade /></ProtectedRoute>} />
          <Route path="/listtrade/:_id" element={<ProtectedRoute><ListForTrade /></ProtectedRoute>} />
          <Route path="/pull" element={<ProtectedRoute><CardPull /></ProtectedRoute>} />
          <Route path="/edit/:_id" element={<ProtectedRoute><EditCard /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminProtectedRoute ready={ready}><ViewCardsAdmin /></AdminProtectedRoute>} />
          <Route path="/adminmanage" element={<AdminProtectedRoute ready={ready}><ManageAccountsAdmin /></AdminProtectedRoute>} />
          <Route path="/settings" element={<AdminProtectedRoute ready={ready}><Settings /></AdminProtectedRoute>} />
          <Route path="/adminasking/:_id" element={<AdminProtectedRoute ready={ready}><AdminAsking /></AdminProtectedRoute>} />
          <Route path="/each/:_id" element={<AdminProtectedRoute ready={ready}><ViewCardsAdmin /></AdminProtectedRoute>} />
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

export default App;
