import * as React from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { Container ,Paper, Button} from '@mui/material';


const StyledForm = styled('form')({
  display: 'grid',
  gridTemplateColumns: '1fr',  // One column for the form
  gap: '10px',  // Spacing between elements
  margin: '10 auto',  // Center the form
  backgroundColor: 'white',
  padding: '20px 20px',
  borderRadius: '10px',
  
});

const headingStyle ={
    color: 'white',
    margin: '10'
};


export default function RecipeForm({onFetch}) {
    // PaperStyle for the form
    const paperStyle={padding: '20px 20px', width: '45%', margin: '10% auto 0', backgroundColor: 'black', borderRadius: '10px'};
    // useState for the form
    const[recipeTitle, setRecipeTitle] = useState('');
    const[cookTime, setCookTime] = useState('');
    const[directions, setDirections] = useState('');
    const[ingredients, setIngredients] = useState('');
    const [shake, setShake] =useState(false);
    

    // handleSubmit for the form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!recipeTitle || !cookTime || !directions || !ingredients) {
            console.log("Please fill in all fields");
            setShake(true);
            setTimeout(() => setShake(false), 500);
            return;
          }
        const recipe={recipeTitle, cookTime, directions, ingredients};
        console.log(recipe);
        fetch("http://reci.fyi:8080/recipe/add", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(recipe)
        }).then(() => {
          setRecipeTitle('');
          setCookTime('');
          setDirections('');
          setIngredients('');
          
            onFetch(); // update display
            console.log("New Recipe Added"); 
        });
        
    }
    
  return (
    //Main Container
    <Container >
        <Paper elevation={10} style={paperStyle} className={shake ? 'shake-animation' : ''}>
            <h1 style={headingStyle}>Add to Reci.Fyi</h1>
    <StyledForm noValidate autoComplete="off">
    <TextField id="outlined-basic" label="Reci.Pe Title" variant="outlined" 
    value={recipeTitle}
    onChange={(e) => setRecipeTitle(e.target.value)}
    />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
      <TextField id="outlined-basic" label="Cook Time" variant="outlined" 
      value={cookTime}
      onChange={(e) => setCookTime(e.target.value)}
      />
      <TextField id="outlined-basic" label="URL" variant="outlined" 
      value={directions}
      onChange={(e) => setDirections(e.target.value)}
      />
    </div>
    <TextField id="outlined-basic" label="Notes" variant="outlined" multiline rows={4}
    value={ingredients}
    onChange={(e) => setIngredients(e.target.value)}
    />
    <Button 
        variant="contained" sx={{backgroundColor: 'black', 
            '&:hover': {backgroundColor: '#313131'}}}
            onClick={handleSubmit}>
                Submit
        </Button>
  </StyledForm>
  </Paper>
  </Container>   
  );
}
