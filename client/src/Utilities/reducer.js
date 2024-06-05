export const reducer = (state, action) => {
    if (action.type === 'showAlert') {
        return {
            ...state,
            alert: {
                condition: true,
                type: action.payload.type,
                msg: action.payload.msg,
            }
        }
    }
    if (action.type === 'hideAlert') {
        return {
            ...state,
            alert: {
                ...state.alert,
                condition: false,
            }
        }
    }
    // if (action.type === 'showSideBar') {
    //     return {
    //         ...state,
    //         sideBar: true
    //     }
    // }
    if (action.type === 'changeSideBar') {
        return {
            ...state,
            sideBar: !state.sideBar
        }
    }
    if (action.type === 'updateInfo') {
        return {
            ...state,
            userDetails: {
                ...state.userDetails,
                type: action.payload.type,
                name: action.payload.name,
                myID: action.payload.myID,
            }
        }
    }
    return state
}