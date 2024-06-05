import React, {useReducer,useContext} from 'react'
import { reducer } from './reducer'
const AppContext = React.createContext();
const defaultState = {
    userDetails: {
        name: '',
        myID: '',
        type: ''
    },
    loading: false,
    sideBar: true,
    alert: {
        condition: false,
        type: '',
        msg: ''
    }
}
const AppProvider = ({children}) => {
const [state,dispatch] = useReducer(reducer,defaultState);
const showAlert = ({ msg, type }) => { dispatch({ type: 'showAlert', payload: { msg, type } }) }
const startLoading = () => { dispatch({ type: 'startLoading' }) }
const endLoading = () => { dispatch({ type: 'endLoading' }) }
const hideAlert = () => { dispatch({ type: 'hideAlert' }) }
const changeSideBar = () => { dispatch({ type: 'changeSideBar' }) }
const updateInfo = ({type,name,myID}) => dispatch({type: 'updateInfo', payload: {type,name,myID}})
    return (
<AppContext.Provider
        value={{
            ...state,
            updateInfo,
            showAlert,
            hideAlert,
            changeSideBar,
            startLoading,
            endLoading,
        }}
    >
        {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => {
    return useContext(AppContext)
}
export { AppProvider,
AppContext}