import { Button, TextField } from "@mui/material"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircle from '@mui/icons-material/AddCircleOutlineOutlined';
import { Box } from "@mui/system";
import { ChangeEvent, useContext, useState } from "react";
import { EntriesContext } from "../../context/entries";
import { UIContext, UIProvider } from "../../context/ui";
export const NewEntry = () => {

    const {isAddingEntry, setIsAddingEntry} = useContext(UIContext);
    
    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);

     const {addNewEntry} = useContext(EntriesContext);

    const onTextFieldChanged = (event : ChangeEvent <HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onSave = () => {
        if (inputValue.length === 0) return;

        addNewEntry(inputValue);

        setInputValue('');

        setTouched(false);
        
        setIsAddingEntry(false);

    }

    return (
        <Box sx={{marginBottom:2}}>

            {
                isAddingEntry ? (
                    <>
                        <TextField 
                            fullWidth
                            sx={{
                                marginTop:2,
                                marginBotton:1
                            }}
                            placeholder='Nueva entrada'
                            autoFocus
                            multiline
                            label='Nueva entrada'
                            helperText={inputValue.length <= 0 && touched && 'Ingrese un valor' } 
                            value={inputValue}
                            onChange={onTextFieldChanged}
                            error={inputValue.length <= 0 && touched}
                            onBlur={() => setTouched(true)}
                        />

                        <Box display='flex' justifyContent={'space-between'}>

                            <Button 
                            onClick={()=>setIsAddingEntry(false)}
                            variant="text">
                                Cancelar
                            </Button>
                            <Button onClick={onSave} variant="outlined" color="secondary" endIcon={<SaveOutlinedIcon/>}>
                                Guardar
                            </Button>
                        </Box>
                    </>
                ) 
                :
                (
                    <Button
                    onClick={()=> setIsAddingEntry(true)}
                    startIcon={<AddCircle/>} fullWidth variant="outlined">
                        Agregar tarea
                     </Button>
                )
            }
        </Box>
    )
}