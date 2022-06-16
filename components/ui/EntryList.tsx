import { List, Paper } from "@mui/material";
import { useContext, useMemo } from "react";
import { EntriesContext } from "../../context/entries";
import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./EntryCard";

interface Props {
    status: EntryStatus
}


export const EntryList = ({status}: Props) => {

    const {entries} = useContext(EntriesContext);

    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status) , [entries]);

    
    return (
        //aqui haremos drop
        <div>
            <Paper sx={{ height: '90vh', overflow:'hidden', backgroundColor:'transparent', padding:'7px' }}>
                <List sx={{opacity:1}}>
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