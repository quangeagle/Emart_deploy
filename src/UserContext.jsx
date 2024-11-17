import React, { createContext, useState, useContext } from 'react';

// Tạo Context
const UserContext = createContext();

// Tạo Provider
export function UserProvider({ children }) {
  const [user, setUser] = useState({ id: null, email: null });

  const updateUserInfo = (id, email) => {
    // console.log('Cập nhật UserContext:', { id, username }); // Log trước khi cập nhật
    setUser({ id, email }); // Cập nhật đối tượng user
  };

  return (
    <UserContext.Provider value={{ user, updateUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook tùy chỉnh để sử dụng context
export function useUser() {
  return useContext(UserContext);
}
