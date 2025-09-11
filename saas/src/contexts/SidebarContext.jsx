import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const isOpen = window.innerWidth > 760 ;
  const [sidebarOpen, setSidebarOpen] = useState(isOpen);
  const toggleSidebar = () => setSidebarOpen((open) => !open);

  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
} 