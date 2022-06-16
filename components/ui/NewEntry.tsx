import { Button, TextField } from "@mui/material"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircle from '@mui/icons-material/AddCircleOutlineOutlined';
import { Box } from "@mui/system";
import { ChangeEvent, useState } from "react";
export const NewEntry = () => {

    const [isAdding, setIsAdding] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);

    const onTextFieldChanged = (event : ChangeEvent <HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    return (
        <Box sx={{marginBottom:2}}>

            {
                isAdding ? (
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
                            onClick={()=>setIsAdding(false)}
                            variant="text">
                                Cancelar
                            </Button>
                            <Button variant="outlined" color="secondary" endIcon={<SaveOutlinedIcon/>}>
                                Guardar
                            </Button>
                        </Box>
                    </>
                ) 
                :
                (
                    <Button
                    onClick={()=> setIsAdding(true)}
                    startIcon={<AddCircle/>} fullWidth variant="outlined">
                        Agregar tarea
                     </Button>
                )
            }
        </Box>
    )
}