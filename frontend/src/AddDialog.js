import React from "react";
import { useState } from "react";
import groceryApi from "./api"

import { TextField, DialogContent, Button, DialogActions, Dialog, DialogTitle, InputAdornment } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';


const AddDialog = (props) => {
    const { open, handleClose } = props;
    const [newGroceryName, setGroceryName] = useState("");
    const [newGroceryPrice, setGroceryPrice] = useState("");
    const [newGroceryQuantity, setGroceryQuantity] = useState("");

    const handleSubmit = () => {
        console.log(newGroceryName);
        console.log(newGroceryPrice);
        console.log(newGroceryQuantity);
        if (newGroceryName.trim()==="" || newGroceryPrice.trim()===""|| newGroceryQuantity.trim()==="") {
            alert("All fields must be filled in!")
        } else {
            const groceryDetails = {
                "name" : newGroceryName,
                "price" : newGroceryPrice,
                "quantity" : newGroceryQuantity
            }
            groceryApi.addGroceryItem(groceryDetails)
                .then(response=>{
                    setGroceryName("");
                    setGroceryPrice("");
                    setGroceryQuantity("");
                    handleClose();
                    props.fetchAllGroceryItems();
                })
                .catch(error => console.log(error))
        }
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Grocery Item</DialogTitle>
                <DialogContent style={styles.form}>
                    <TextField
                        required
                        style={styles.textField}
                        id="name"
                        label="Grocery Name"
                        fullWidth
                        value={newGroceryName}
                        onChange={(event) => setGroceryName(event.target.value)}
                    />
                    <div style={styles.numbers}>
                        <TextField
                            required
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
                            required
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
                        Add
          </Button>
                </DialogActions>
            </Dialog>
        </div>


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
export default AddDialog;
