import { createContext, useReducer } from 'react'
import DrawerReducer from './drawerReducer'

const INITIAL_STATE = {
    isOpen: true,
    dispatch: (type: any) => {}
}

export const DrawerContext = createContext(INITIAL_STATE)

export const DrawerContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(DrawerReducer, INITIAL_STATE)

    return (
        <DrawerContext.Provider
            value={{
                isOpen: state.isOpen,
                dispatch
            }}
        >
            {children}
        </DrawerContext.Provider>
    )
}
