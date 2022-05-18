const DrawerReducer = (state, action) => {
    switch (action.type) {
        case 'DRAWER_TOGGLE':
            return {
                isOpen: !state.isOpen
            }
        default:
            return state
    }
}

export default DrawerReducer