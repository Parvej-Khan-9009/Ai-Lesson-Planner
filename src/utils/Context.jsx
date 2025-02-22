import {createContext, useState } from 'react'

const ThemeContext = createContext();

export function ThemeContextProvider( {children} ){
    const[isDark, setIsDark] = useState(false);

    return(
        <ThemeContext.Provider value={{isDark: isDark, setIsDark: setIsDark}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext;
