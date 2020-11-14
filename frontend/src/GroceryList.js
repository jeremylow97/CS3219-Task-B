import './App.css';
import GroceryItem from './GroceryItem';
import React, { useEffect } from "react";
import { useState } from "react";
import AddDialog from './AddDialog';
import groceryApi from "./api"



import { Button, Typography } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';




function GroceryList() {
    const [isAddModalVisible, setAddModalVisible] = useState(false);
    const [groceryItems, setGroceryItems] = useState([]);
    const closeAddModal = () => {
        setAddModalVisible(false);
    }


    useEffect(() => {
        console.log("using effect")
        fetchAllGroceryItems();
    },[])

    const fetchAllGroceryItems = () => {
        console.log("testing")
        groceryApi.getAllGroceryItems()
            .then((response) => {
                const newGroceryItems = [];
                response.data.data.map((item) => {
                    const newGroceryItem = {
                        "name" : item.name,
                        "price" : item.price,
                        "quantity" : item.quantity,
                        "itemId" : item._id
                    }
                    newGroceryItems.push(newGroceryItem);
                    return null;
                })
                setGroceryItems(newGroceryItems)
            })
            .catch((error)=> {
                console.log(error);
            })
    }

    const renderGroceryItems = () => {
        if (groceryItems.length === 0) {
            return <Typography>No grocery items are in the list!</Typography>
        }
        return groceryItems.map(item => {
            return <GroceryItem key={item.itemId} groceryItem={item} fetchAllGroceryItems={fetchAllGroceryItems} />
        })
    }
    

    return (
        <div>
            <div style={styles.header}>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    startIcon={<AddBoxIcon />}
                    onClick={() => setAddModalVisible(true)}
                >
                    Add Grocery Item
                </Button>
            </div>
            {renderGroceryItems()}
            <AddDialog open={isAddModalVisible} handleClose={closeAddModal} fetchAllGroceryItems={fetchAllGroceryItems}/>
        </div>
    );
}

const styles= {
    header: {
        display:"flex",
        flexDirection: "row-reverse",
        margin:20
    }
}

export default GroceryList;
