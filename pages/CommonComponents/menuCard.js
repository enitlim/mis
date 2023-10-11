import React from 'react'
import {
  Box,
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
const MenuCard = (props) => {
  return (
    <>
      <Card
        key={props.quiz.id}
        sx={{
          width: 300,
          padding: "5px",
          margin: "15px",
          backgroundColor: "white",
        }}
      >
        <CardContent>
          <Typography variant="h5" color="initial">
            {props.quiz.name}
          </Typography>
          <Typography variant="h6" color="initial">
            {props.quiz.desc}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body1" color="initial">
              Duration:{" "}
              <span style={{ color: "blue" }}>
                {props.quiz.total_time} mins
              </span>
            </Typography>
            <Typography variant="body1" color="initial">
              Passing Marks:{" "}
              <span style={{ color: "green" }}>{props.quiz.pass_mark}</span>
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => handleQuizStart(props.quiz.id, props.quiz.name)}
          >
            Edit
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default MenuCard