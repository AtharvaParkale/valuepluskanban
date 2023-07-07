import React, { useState, useEffect } from "react";
import "./Board.css";
import Box from "@mui/material/Box";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import DraggableCard from "./DraggableCard/DraggableCard";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function Board() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cardId, setCardId] = useState("");
  const [loader, setLoader] = useState(true);

  const [openPopUp, setOpenPopUp] = useState(false);

  //Getting all the cards from backend
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:4003/api/v1/cards");
      setData(response.data.cards);
      setLoader(false);
    } catch (e) {
      console.log("Error while fetching the data !");
    }
  };

  //Onclick delete a card
  const handleDeleteCard = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4003/api/v1/card/${id}`
      );
      setData(response.data.cards);
      console.log("Data deleted successfully !");
    } catch (err) {
      console.log("Error in deleting the card!");
    }
  };

  //Add a new card
  const handleAddCard = async () => {
    try {
      const card = {
        title: title,
      };

      const response = await axios.post(
        "http://localhost:4003/api/v1/card/new",
        card
      );
      setTitle("");

      setData(response.data.cards);
    } catch (err) {
      console.log(err);
    }
  };

  //Add a new task here
  const handleAddTask = async (id) => {
    try {
      const card = {
        description,
      };

      const response = await axios.put(
        `http://localhost:4003/api/v1/card/task/${id}`,
        card
      );
      setDescription("");
      setCardId("");

      setData(response.data.cards);
      setOpenPopUp(false);
    } catch (err) {
      console.log(err);
    }
  };

  //Delete a task

  const handleDeleteTask = async (dataId, taskId) => {
    try {
      const task = {
        id: taskId,
      };
      const response = await axios.put(
        `http://localhost:4003/api/v1/card/subTask/${dataId}`,
        task
      );
      setData(response.data.cards);
      console.log("Task updated successfully !");
    } catch (err) {
      console.log(err);
      console.log("Error in deleting the task!");
    }
  };

  //Code to open popup to add a new task

  const handleClickOpenPopUp = (id) => {
    setCardId(id);
    setOpenPopUp(true);
  };

  const handleClosePopUp = () => {
    setDescription("");
    setCardId("");
    setOpenPopUp(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {}, [title, description, cardId]);

  return (
    <Box>
      <Box
        sx={{
          // border: "2px solid red",
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        <Box
          className="add-card-container"
          sx={{
            width: "55%",
            height: "7vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginTop: "5vh !important",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 20px",
            border: "1px solid rgb(198, 210, 217)",
            marginBottom: "3vh !important",
          }}
        >
          <input
            type="text"
            placeholder="Add a new board"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              handleAddCard();
            }}
          >
            Add
          </Button>
        </Box>

        {loader ? (
          <Box
            className="loader_container"
            sx={{
              // border: "2px solid red",
              height: "75vh",
              width: "90%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <CircularProgress />
            {/* <h5>Loading</h5> */}
          </Box>
        ) : (
          <Box
            className="card-holder-container"
            sx={{
              // border: "2px solid red",
              height: "100%",
              width: "95%",
              overflow: "hidden",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: {xs:"center",sm:"flex-start"},
              flexDirection: "row",
              padding: "1vh",
              flexWrap: "wrap",
              overflowY: "scroll",
            }}
          >
            {data.map((card) => (
              <DraggableCard
                id={data._id}
                data={card}
                handleDeleteCard={handleDeleteCard}
                handleClickOpenPopUp={handleClickOpenPopUp}
                handleDeleteTask={handleDeleteTask}
              />
            ))}
          </Box>
        )}
      </Box>

      <Box>
        <Dialog open={openPopUp} onClose={handleClosePopUp}>
          <DialogTitle>Add Task</DialogTitle>
          <DialogContent>
            <DialogContentText>{/* Add your task here */}</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePopUp}>Cancel</Button>
            <Button
              onClick={() => {
                handleAddTask(cardId);
              }}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default Board;
