import './App.css';
import React from "react";


import { Container, Typography } from '@material-ui/core';
import GroceryList from './GroceryList';


function App() {
  return (
    <Container>
      <Typography variant="h2" align="center" style={styles.title}>
        Grocery List
      </Typography>
      <GroceryList />
    </Container>
  );
}

const styles = {
  title: {
    margin: 30
  }
}


export default App;
