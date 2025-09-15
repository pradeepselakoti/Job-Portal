import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () =>{
  const context = useContext(AuthContext);
  if(!context){
    throw new Error("useAuth must be used within an AuthProvider ")
  }
  return context;
};

export const AuthProvider  = ({ children }) =>{
 const [ user, setUser ] = useState(null);
 const [loading, setLoading] = useState(true);
 const  [isAuthenticated, setIsAuthenticated ] = useState(false);

 const checkAuthStatus = async () =>{
  try {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user'));
    if (token && userData) {
      setUser(userData);
      setIsAuthenticated(true);
    }
  } catch (error) {
    console.error('Auth check failed:',error);
    logout();
  }finally {
    setLoading(false);
  }
};

 useEffect(() =>{
  checkAuthStatus();
 }, []);

const login = (userData, token) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user',JSON.stringify(userData));

  setUser(userData);
  setIsAuthenticated(true);
};

const logout = () =>{
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');

  setUser(null);
  setIsAuthenticated(false);
  window.location.href = '/'
};

const updateUser = (updateUserData) =>{
  const newUserData = {...user, ...updateUserData};
  localStorage.setItem('user', JSON.stringify(newUserData));
  setUser(newUserData);
}


const value = {
  user,
  loading,
  isAuthenticated,
  login,
  logout,
  updateUser,
  checkAuthStatus,

};
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}