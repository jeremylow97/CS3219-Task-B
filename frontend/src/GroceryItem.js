import './App.css';
import React from "react";
import { useState } from "react";
import groceryApi from "./api"


import { Card, Typography, Button, CardContent, } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import EditDialog from './EditDialog';

const GroceryItem = (props) => {

  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const closeEditModal = () => {
    setEditModalVisible(false);
  }

  const deleteGroceryItem = () => {
    groceryApi.deleteGroceryItem(props.groceryItem.itemId);
    props.fetchAllGroceryItems();
  }

  return (
    <div>
      <Card style={styles.container}>
        <CardContent style={styles.groceryInformation}>
          <Typography variant="h4">
            {props.groceryItem.name}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Price: ${props.groceryItem.price}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Quantity: {props.groceryItem.quantity}
          </Typography>
        </CardContent>
        <CardContent style={styles.controls}>
          <Button
            size="small"
            variant="contained"
            style={styles.editButton}
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => setEditModalVisible(true)}
          >
            Edit
      </Button>
          <Button
            size="small"
            variant="contained"
            style={styles.doneButton}
            startIcon={<DoneIcon />}
            onClick={() => {
              deleteGroceryItem();
              props.fetchAllGroceryItems();
            }}
          >
            Bought
      </Button>
        </CardContent>
      </Card>
      <EditDialog groceryInformation={props.groceryItem} open={isEditModalVisible} handleClose={closeEditModal} fetchAllGroceryItems={props.fetchAllGroceryItems} />
    </div>

  )
}

const styles = {
  container: {
    margin: 20,
    display: "flex",
    justifyContent: "space-between"
  },
  groceryInformation: {
    padding: "20px"
  },
  controls: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingRight: "30px"
  },
  doneButton: {
    backgroundColor: "#00cc00",
    margin: 5
  },
  editButton: {
    margin: 5
  },

}

export default GroceryItem;
