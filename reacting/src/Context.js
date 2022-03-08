import React, { createContext, useEffect, useReducer } from "react";

const initialState = 
{
    token: '',
    username: ''
}

const Context = createContext(initialState);

// Reducer to handle dispatched actions that change context
const reducer = (state, action) => {
  const { type, payload } = action;
  const obj = {...state, ...payload};
  if(typeof(obj.title) !== 'string')
    obj.title = 'Unknown Title'
  localStorage.setItem('sidebar', JSON.stringify(obj));

  switch (type) {
    case "CHANGE _": {
      return {
        ...state,
        ...payload
      };
    }
    default:
      return state;
  }
};

const ContextProvider = props => {
  const [context, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    // Re-render react grid layout
    // for (let t = 0; t <= 400; t += 400) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 400)
    // }
  }, [context.collapsed])
  return (
    <Context.Provider value={{ context, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };