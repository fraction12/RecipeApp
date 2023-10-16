import Appbar from './components/Appbar'
import RecipeForm from './components/RecipeForm'
import './App.css';
import React from 'react';
import {  Container } from '@mui/material';
import { useState, useEffect } from 'react';
import DisplayRecipe from './components/DisplayRecipe';
import Login from './components/Login'
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";


function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [recipes, setRecipes] = useState([]);
  

  
  const updateRecipe = () => {
    fetch('http://reci.fyi:8080/recipe/getAll')
      .then(response => response.json())
      .then(result => {
        setRecipes(result);
        console.log(result);
      })
      .catch(error => {
        console.error('There was an error fetching the recipes:', error);
      });
  };



  useEffect(() => {
    updateRecipe();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginWrapper isLoggedIn={isLoggedIn} onLogin={handleLogin} />} />
          <Route path="/" element={<AppWrapper isLoggedIn={isLoggedIn} updateRecipe={updateRecipe} recipes={recipes} />} />
        </Routes>
      </div>
    </Router>
  );
}

function LoginWrapper({ isLoggedIn, onLogin }) {
  return isLoggedIn ? <Navigate to="/" replace /> : <Login onLogin={onLogin} />;
}

function AppWrapper({ isLoggedIn, updateRecipe, recipes }) {
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  
  return (
    <>
      <Appbar />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, marginRight: '16px', flexDirection: 'column', alignItems: 'center' }}>
          <RecipeForm onFetch={updateRecipe} />
        </div>
        <div style={{ flex: 1, marginRight: '16px', flexDirection: 'column', alignItems: 'center' }}>
          <Container style={{ padding: '20px 20px', width: '75%', margin: '10% auto 0', 
                              backgroundColor: '#707070', borderRadius: '10px', position: 'relative'}}>
            <div style={{ overflow: 'auto', maxHeight: '600px' }}>
              <DisplayRecipe onFetch={updateRecipe} recipes={recipes} />
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}



//   return (
//     <Router>
//     <div className="App">
//       <Routes>
//       <Route path="/login">
//             {isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
//           </Route>
//         <Route path="/">
//           {isLoggedIn ? (
//             <>
//             <Appbar />
      
//       <div style={{ display: 'flex' }}>
//       <div style={{ flex: 1, marginRight: '16px', flexDirection: 'column', alignItems: 'center',  }}>
      
//       <RecipeForm onFetch={updateRecipe}/> 
//       </div>
      
//         <div style={{ flex: 1, marginRight: '16px', flexDirection: 'column', alignItems: 'center',  }}>
//         <Container style={{ padding: '20px 20px', width: '75%', margin: '10% auto 0', 
//                             backgroundColor: '#707070', borderRadius: '10px', position: 'relative'}}>
//         <div style={{ overflow: 'auto', maxHeight: '600px' }}>
//       <DisplayRecipe onFetch={updateRecipe} recipes={recipes} />
      
//         </div>
//         </Container>
//         </div>

//       </div>
//           </>
//             ) : (
//               <Navigate to="/login" />
//             )}
//           </Route>

//       </Routes>
//     </div>
//     </Router> 
    
//   );
// }

export default App;
