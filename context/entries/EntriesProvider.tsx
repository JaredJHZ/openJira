import { ReactNode, useReducer } from "react";
import { Entry } from "../../interfaces";
import {v4 as uuidv4} from 'uuid';
import {EntriesContext} from './';
import { entriesReducer } from "./entriesReducer";

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE:EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description:'pendiente:  asdasadasdasdasddasdad',
            status:'pending',
            createdAt: Date.now()
        },
        {
            _id: uuidv4(),
            description:'in progress qweqweqweqweqweqw',
            status:'in-progress',
            createdAt: Date.now() - 1000000
        },
        {
            _id: uuidv4(),
            description:'terminados nbfbdbfdgfdfgdfgdf',
            status:'finished',
            createdAt: Date.now() - 10000
        }
    ],
}

type Props = {
    children: ReactNode
} 

export const EntriesProvider = ({children} : Props) => {

const [state, dispatch] =  useReducer(entriesReducer, Entries_INITIAL_STATE)

const addNewEntry = (description: string) => {
    const newEntry: Entry = {
        description,
        _id: uuidv4(),
        createdAt:Date.now(), 
        status:'pending'
    }

    dispatch({type:'[Entry] - Add-Entry', payload: newEntry})
}

const updateEntry = (entry: Entry) => {
    dispatch({type:'[Entry] Entry-Updated', payload: entry})
}

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

