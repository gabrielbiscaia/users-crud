"use client";

import React, { createContext, useContext, useState } from "react";

interface UserUpdateContextType {
  lastUpdate: number;
  triggerUpdate: () => void;
}

const UserUpdateContext = createContext<UserUpdateContextType | undefined>(
  undefined,
);

export const UserUpdateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lastUpdate, setLastUpdate] = useState(0);

  const triggerUpdate = () => {
    setLastUpdate(Date.now());
  };

  return (
    <UserUpdateContext.Provider value={{ lastUpdate, triggerUpdate }}>
      {children}
    </UserUpdateContext.Provider>
  );
};

export const useUserUpdate = () => {
  const context = useContext(UserUpdateContext);
  if (context === undefined) {
    throw new Error("useUserUpdate must be used within a UserUpdateProvider");
  }
  return context;
};
