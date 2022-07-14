import { ReactNode, useEffect, useReducer } from "react";
import { Entry } from "../../interfaces";
import {EntriesContext} from './';
import { entriesReducer } from "./entriesReducer";
import entriesApi from "../../apis/entriesAPI";

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE:EntriesState = {
    entries: [
     
    ],
}

type Props = {
    children: ReactNode
} 

export const EntriesProvider = ({children} : Props) => {

const [state, dispatch] =  useReducer(entriesReducer, Entries_INITIAL_STATE)

const addNewEntry = async(description: string) => {
    
    const {data} = await entriesApi.post<Entry>('/entries',{description})

    dispatch({type:'[Entry] - Add-Entry', payload: data})
}

const updateEntry = (entry: Entry) => {
    dispatch({type:'[Entry] Entry-Updated', payload: entry})
}

const refreshEntries = async () => {
    const {data} = await entriesApi.get<Entry[]>('/entries');
    dispatch({type:'[Entry] Refresh-Data', payload:data})
}

useEffect(() => {
    refreshEntries();
}, [])

return (
   <EntriesContext.Provider value={{
        ...state,
        addNewEntry,
        updateEntry
   }}>
      {children}
   </EntriesContext.Provider>
);
}

