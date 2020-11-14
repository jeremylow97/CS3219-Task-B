import React from "react";
import { useState } from "react";


import { TextField, DialogContent, Button, DialogActions, Dialog, DialogTitle, InputAdornment} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import groceryApi from "./api"



const EditDialog = (props) => {
  const { groceryInformation, open, handleClose } = props;
  const [newGroceryName, setGroceryName] = useState(groceryInformation.name);
  const [newGroceryPrice, setGroceryPrice] = useState(groceryInformation.price);
  const [newGroceryQuantity, setGroceryQuantity] = useState(groceryInformation.quantity);

  const handleSubmit = () => {
    console.log(newGroceryName);
    console.log(newGroceryPrice);
    console.log(newGroceryQuantity);
    if (newGroceryName.trim() === "" || newGroceryPrice === "" || newGroceryQuantity === "") {
      alert("All fields must be filled in!")
    } else {
      const groceryDetails = {
        "name" : newGroceryName,
        "price" : newGroceryPrice,
        "quantity" : newGroceryQuantity
    }
      groceryApi.editGroceryItem(groceryInformation.itemId, groceryDetails)
        .then(response=> {
          console.log(response);
          props.fetchAllGroceryItems();
          handleClose();
        })
        .catch(error=> console.log(error))
    }

  }



  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Grocery Item</DialogTitle>
      <DialogContent style={styles.form}>
        <TextField
          style={styles.textField}
          id="name"
          label="Grocery Name"
          fullWidth
          value={newGroceryName}
          onChange={(event) => setGroceryName(event.target.value)}
        />
        <div style={styles.numbers}>
          <TextField
            id="price"
            style={styles.textFieldPrice}
            label="Grocery Price"
            type="number"
            value={newGroceryPrice}
            onChange={(event) => setGroceryPrice(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoneyIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="quantity"
            style={styles.textFieldQuantity}
            label="Grocery Quantity"
            type="number"
            value={newGroceryQuantity}
            onChange={(event) => setGroceryQuantity(event.target.value)}

          />
        </div>

      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleSubmit}>
          Finish
          </Button>
      </DialogActions>
    </Dialog>
  )



}


const styles = {
  form: {
    padding: 30
  },
  numbers: {
    display: "flex",
    justifyContent: "space=between"
  },
  textField: {
    marginBottom: 30,
  },
  textFieldPrice: {
    width: "150px",
    marginRight: "20px"
  },
  textFieldQuantity: {
    width: "150px"
  }
}
export default EditDialog;
