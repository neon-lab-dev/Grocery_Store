/**
 * CHECK FOR USER AUTHENTICATION
 * UNAUTHENTICATED -> REDIRECT TO AUTHNAVIGATION
 * AUTHENTICATED -> REDIRECT TO APPNAVIGATION
 */
import React from 'react';
import {useSelector} from 'react-redux';
import AppNavigation from './AppNavigation';
import AuthNavigation from './AuthNavigation';

const RootNavigation: React.FC = () => {
  const user = useSelector(state => state.user);

  return user.isLoggedIn ? <AppNavigation /> : <AuthNavigation />;
};

export default RootNavigation;
