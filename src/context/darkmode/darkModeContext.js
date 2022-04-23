import { createContext, useReducer, useEffect } from "react"
import DarkModeReducer from "./darkModeReducer"

const INITIAL_STATE = {
    darkMode: JSON.parse(localStorage.getItem("darkmode")) || false,
    dispatch: (type: any)=>{}
}

export const DarkModeContext = createContext(INITIAL_STATE)

export const DarkModeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE)

    useEffect(() => {
        localStorage.setItem("darkmode", JSON.stringify(state.darkMode))
    }, [state.darkMode])

    return (
        <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
            {children}
        </DarkModeContext.Provider>
    )
}
