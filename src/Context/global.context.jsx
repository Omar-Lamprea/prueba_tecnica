/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";
import { API_URL } from "../utils/API";
import { userList } from "../utils/users";



const initialState = {
  user: {
    username: "",
    password: ""
  },
  api: API_URL,
  registered_users: userList
}

const ContextGlobal = createContext('')

const reducer = (state, action) => {
  switch (action.type){
    case 'setUser':
      localStorage.setItem('user', JSON.stringify(action.payload))
      return {...state, user: action.payload}
    case 'logout':
      localStorage.removeItem('user')
      return {...state, user: false}
    default:
        throw new Error('action type error')
  }
}


const ContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  // const getList = useCallback(async () => {
  // }, []);

  useEffect(() =>{
    // getList();
  },[])
  
  
  return (
    <ContextGlobal.Provider value={{state, dispatch}}>
      {children}
    </ContextGlobal.Provider>
  )
}

export default ContextProvider
// eslint-disable-next-line react-refresh/only-export-components
export const useContextGlobal = () => useContext(ContextGlobal)

