import React from "react";
import { Box, Button, Card, Divider, Popover, Typography } from "@mui/material";
import { useState } from "react";
import Draggable from "react-draggable";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import "./DraggableCard.css";

import DeleteIcon from "@mui/icons-material/Delete";

const DraggableCard = ({
  data,
  handleDeleteCard,
  handleClickOpenPopUp,
  handleDeleteTask,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  //Delete a card
  const handleDelete = (id) => {
    handleDeleteCard(id);
  };

  //This Opens the popup
  const openPopUp = (id) => {
    handleClickOpenPopUp(id);
  };

  //Delete task
  const handleDeleteSubTask = (cardId, taskId) => {
    handleDeleteTask(cardId, taskId);
  };

  //Code to open delete popup
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Draggable>
      <Card
        style={{
          width:"21vw",
          backgroundColor: "rgb(235 236 240)",
          color: "black",
          height: "73vh",
          marginLeft: "2vh !important",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "column",
          // marginRight:"2vh !important"
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15) !important",
          border: "1px solid #d7d7d7",
        }}
      >
        <Box
          className="card-header-container"
          sx={{
            borderBottom:"2px solid #c7c7c7",
            width: "85%",
            height: "7%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom:"1.3vh"
          }}
        >
          <Box
            className="header-div-1"
            sx={{
              // border: "2px solid black",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                color: "#000000a6 !important",
              }}
            >
              {data.title}
            </Typography>
          </Box>
          <Box
            className="header-div-1"
            sx={{
              // border: "2px solid black",
            }}
          >
            <MoreHorizIcon
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
              sx={{
                color: "#000000a6 !important",
                ":hover": {
                  cursor: "pointer",
                },
              }}
            />
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Box
                className="delete-card-container"
                sx={{
                  // border: "1px solid black",
                  marginTop: "0.8vh !important",
                  marginBottom: "0.8vh !important",
                  marginLeft: "1.5vh !important",
                  marginRight: "1.5vh !important",
                }}
              >
                {" "}
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "red",
                    fontWeight: "500",
                    ":hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => {
                    handleDelete(data._id);
                  }}
                >
                  Delete
                </Typography>
              </Box>
            </Popover>
          </Box>
        </Box>

        <Box
          className="card-tasks-container"
          sx={{
            // border: "2px solid black",
            width: "85%",
            height: "76%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          {data.tasks.length === 0 ? (
            <Box>No Tasks ! </Box>
          ) : (
            <Box>
              {data.tasks.map((task) => (
                <Box
                  className="task-container"
                  sx={{
                    width: "19vw",
                    minHeight: "8vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    backgroundColor: "white",
                    borderRadius: "5px",
                    marginBottom: "2vh !important",
                    // border: "1px solid red",
                  }}
                >
                  <Box
                    className="task-description-container"
                    sx={{
                      // border: "2px solid black",
                      width: "100%",
                      height: "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      className="task-text-holder"
                      sx={{
                        // border: "2px solid black",
                        width: "90%",
                        height: "auto",
                        lineHeight: "1.8",
                        wordWrap: "break-word",
                        fontWeight: "400",
                      }}
                    >
                      <p>{task.description}</p>
                      <Divider />
                    </Box>
                  </Box>
                  <Box
                    className="task-delete-container"
                    sx={{
                      // border: "2px solid black",
                      width: "90%",
                      minHeight: "3.8vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      ":hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    <DeleteIcon
                      sx={{
                        fontSize: "17px",
                        color:"#000000a6!important"
                      }}
                      onClick={() => {
                        handleDeleteSubTask(data._id, task._id);
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Box
          className="add-tasks-container"
          sx={{
            // border: "2px solid black",
            width: "85%",
            height: "7%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Box
            sx={{
              // border: "2px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ":hover": {
                cursor: "pointer",
                fontWeight: "600",
              },
            }}
            onClick={() => {
              openPopUp(data._id);
            }}
          >
            <AddIcon
              sx={{
                fontSize: "18px",
                color: "#000000a6 !important",
              }}
            />
            <Typography
              variant="p"
              sx={{
                fontSize: "15px",
                fontWeight: "500 !important",
                marginLeft: "1vh !important",
                color: "#000000a6 !important",
              }}
            >
              Add Task
            </Typography>
          </Box>
        </Box>
      </Card>
    </Draggable>
  );
};

export default DraggableCard;
