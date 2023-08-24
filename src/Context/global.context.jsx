/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import { API_URL } from "../utils/API";
import { userList } from "../utils/users";



const initialState = {
  user: {
    username: "",
    password: ""
  },
  api: API_URL,
  registered_users: userList,
  post: []
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
    case 'setPost':
      return {...state, post: action.payload}
    default:
        throw new Error('action type error')
  }
}


const ContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const gePost = useCallback(async () => {
    try {
      const res = await fetch(state.api + 'posts')
      if(res.ok){
        const data = await res.json()
        dispatch({
          type: 'setPost', 
          payload:  data
        })
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() =>{
    gePost();
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

