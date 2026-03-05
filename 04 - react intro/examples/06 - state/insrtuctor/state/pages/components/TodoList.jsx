import {useState} from 'react';

// MUI components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


export default function TodoList() {

    /* [stateVariable, stateVariableSetter] = useState(defaultValue) 
        
        [variable, function] -> think [noun, verb]

        The setter is the *only* thing allowed to change the value of the state variable.

        When the setter function fires (i.e. data in the state variable changes), the component
        automatically re-renders.
    */
    const [todoText, setTodoText] = useState("")
    const [todoList, setTodoList] = useState([])

    const onTodoTextChange = (event) => {
        console.log(event.target.value)
        // Call the state variable's setter with a new value to write to the state variable.
        setTodoText(event.target.value)
    }

    const onAddTodoClick = () => {
        console.log("button clicked!")
        
        // When the add button is clicked, take the input field text (from the state variable todoText)
        const newTodos = [...todoList, todoText] // spread operator -> unpacks an array into its individual terms
        console.log(newTodos)

        // and add it to the stateful array (state variable todoList) using its setter.
        setTodoList(newTodos)

        // as a detail-oriented UX courtesy, reset the input field upon submission
        setTodoText("")

    }

    return <Box sx={{ flexGrow: 1 }}>

        <Grid container spacing={2}>

            {/* much like in Bootstrap, or flexboxes in general,
                MUI flex-capable layout components use a 12-column grid.

                If I wanted to work with explicit single-direction rows or columns,
                I'd use the Stack component.
            */}
            <Grid size={12}>
              <Typography variant="h2" component="h2">
                Our Todo List
              </Typography>
            </Grid>

            <Grid size={10}>  
                <TextField
                    id="standard-basic"
                    label="New Todo Item"
                    variant="standard"
                    sx={{ width: '100%' }}
                    onChange={onTodoTextChange}
                    value={todoText}
                />
            </Grid>

            <Grid size={2}>
              <Button
                variant="contained"
                onClick={onAddTodoClick}
              >Add Todo</Button>
            </Grid>


            <List sx={{ width: '100%' }}>
                {todoList.map(
                    (todoItem, index) => {
                        return <ListItem key={index}>
                            <ListItemText>
                                <Typography>
                                    {todoItem}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    }
                )}
            </List>

        </Grid>
    </Box>
}
