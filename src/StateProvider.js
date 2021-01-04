import React, {createContext, useReducer, useContext} from 'react';

//Prepares Data Layer
export const StateContext = createContext();

//Wrap our app and provides info to each component we send info to
//Data Layer
export const StateProvider = ({reducer, initialState, children})=>(
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

//Pull info from data layaer after changes were made
export const useStateValue = ()=> useContext(StateContext);