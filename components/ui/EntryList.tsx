import { List, Paper } from "@mui/material";
import { DragEvent, useContext, useMemo } from "react";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./EntryCard";
import styles from './EntryList.module.css';

interface Props {
    status: EntryStatus
}


export const EntryList = ({status}: Props) => {

    const {entries, updateEntry} = useContext(EntriesContext);

    const {isDragging, endDragging} = useContext(UIContext);

    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status) , [entries]);

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();

    }

    const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('text');
        const entry = entries.find(e => e._id === id )!;
        entry.status = status;
        updateEntry(entry);
        endDragging();
    } 
    
    return (
        <div 
        
        onDrop={onDropEntry}

        onDragOver={allowDrop}

        className={isDragging ? styles.dragging : ''}
        
        >
            <Paper sx={{ height: '90vh', overflow:'hidden', backgroundColor:'transparent', padding:'7px' }}>
                <List sx={{opacity: isDragging ? 0.2 : 1 , transition: 'all .3s'  }}>
                    {
                        entriesByStatus.map(
                            entry => (
                                <EntryCard key={entry._id} entry={entry} />
                            )
                        )
                    }
                </List>
            </Paper>
        </div>
    );
}