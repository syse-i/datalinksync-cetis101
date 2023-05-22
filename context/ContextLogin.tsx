import { createContext } from "react"

export const AuthContext = createContext(null);
export const AuthDispatchContext = createContext(null);

export const authReducer = (data, action) => {
  switch (action.type) {
    case 'changed': {
      return { ...data, key: action.key }
    }
    case 'setNetwork': {
      const network = { ...data?.network, ...action?.network }
      return { ...data, network }
    }
    case 'deleted': {
      return null
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}