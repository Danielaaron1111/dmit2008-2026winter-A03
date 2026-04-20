import { useState } from 'react';

import { ThemeContext } from './ThemeContext';


export function ThemeProvider({ children }) {

  // establish some state (which will be shared-access)   
  const [theme, setTheme] = useState('light');

  // simple toggle function
  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  // set up a component that can wrap others & provide access
  // to shared state
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}