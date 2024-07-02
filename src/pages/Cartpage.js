import React,  {useEffect, useState}  from 'react';
import Header from '../components/Header';
import LPHeader from '../components/LPHeader';
import Cart from '../components/Cart';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const email = localStorage.getItem('email');
    if (token && email) {
      setIsAuthenticated(true);
    }
  }, []);

  return isAuthenticated;
};

const CartPage= () => {
  const isAuthenticated = useAuth();
  return (
    <div className="CartPage">
      {isAuthenticated ? <Header /> : <LPHeader />}
      <Cart />
      {/* <Footer /> */}
    </div>
  );
}

export default CartPage;
