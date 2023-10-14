import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export default function DisplayRecipe({onFetch, recipes}) {
  const cardClickHandler = (recipeId) => {
    console.log('TestRunCardClicked' + recipeId);
  };
    //Learn More URL

    const handleLearnMore = (directions) => {
        console.log(directions);
        if (!directions.startsWith('https://')) {
        directions = 'https://' + directions;
        }
        window.open(directions, '_blank');
      };

    

      //Delete a recipe
      const deleteRecipe = (recipeId) => {
        // Make a request to delete the recipe from the database
        fetch(`http://localhost:8080/recipe/delete/${recipeId}`, {
          method: 'DELETE'
        })
        .then(response => {
          if (response.ok) {
            // Recipe deleted successfully
            // Update the recipes state by removing the deleted recipe
            onFetch(recipes.filter(recipe => recipe.id !== recipeId));
          } else {
            // Handle error case
            console.error('Error deleting recipe');
          }
        })
        .catch(error => {
          console.error('Error deleting recipe:', error);
        });
      };


    

    
  return (
    
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
       
           
         
      {recipes.map((recipe) => (
        

        <div onClick={() => cardClickHandler(recipe.id)} key={recipe.id}>
        <Card key={recipe.id} sx={{ minWidth: 200, marginBottom: '16px', borderRadius: '10px', boxShadow: 5, border: '1px solid white', '&:hover':{
          boxShadow: 10, transition: "0.2s", borderColor: 'black', 
        }}} >
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Reci.Pe: {recipe.id}
            </Typography>
            <Typography variant="h5" component="div">
              <b>{recipe.recipeTitle}</b>
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Cook Time: {recipe.cookTime}
            </Typography>
            <Typography variant="body2">
              <u>Notes:</u> {recipe.ingredients}
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => handleLearnMore(recipe.directions)} sx={{color: 'black', display: 'flex', justifyContent: 'left', flex: 2}}>Learn More</Button>
            <Button size="small" onClick={() => deleteRecipe(recipe.id)} sx={{color: 'darkred', display: 'flex', justifyContent: 'right', flex: 1}}>Delete</Button>
          </CardActions>
        </Card>
        </div>
        
      ))}
      
    </div>
    
    
  );
}
