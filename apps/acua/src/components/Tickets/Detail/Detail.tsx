/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import React from 'react';

/* eslint-disable-next-line */
export interface DetailProps {}

export function Detail(props: DetailProps) {
  const [status, setStatus] = React.useState('Open');
  const [createDate, setCreateDate] = React.useState('2023-12-29');
  const [updateDate, setUpdateDate] = React.useState('2023-12-29');
  const [author, setAuthor] = React.useState('John Doe');
  const [location, setLocation] = React.useState('Apartment 2, Kitchen');
  const [title, setTitle] = React.useState('Broken sink');
  const [description, setDescription] = React.useState(
    "My sink is broken and the water won't drain out properly. Please come and fix it. Thank you!"
  );

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  return (
    <Container>
      <Paper>
        <Box
          sx={{
            my: 2,
            p: 2,
          }}
        >
          <Typography variant="h4">{title}</Typography>
          <Divider variant="middle" />
          <Box sx={{ my: 2 }}>
            <Typography variant="h6">Repair Request Details</Typography>
            <Typography variant="body1">Status: {status}</Typography>
            <Typography variant="body1">Created on: {createDate}</Typography>
            <Typography variant="body1">Last updated: {updateDate}</Typography>
            <Typography variant="body1">From: {author}</Typography>
            <Typography variant="body1">Location: {location}</Typography>
          </Box>
          <Divider variant="middle" />
          <Box sx={{ my: 2 }}>
            <Typography variant="h6">Description</Typography>
            <p>{description}</p>
          </Box>
          <Divider variant="middle" />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <FormControl
              sx={{
                my: 2,
                ml: 'auto',
                width: 200,
              }}
            >
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value={'Open'}>Open</MenuItem>
                <MenuItem value={'Pending'}>Pending</MenuItem>
                <MenuItem value={'In Progress'}>In Progress</MenuItem>
                <MenuItem value={'Completed'}>Completed</MenuItem>
                <MenuItem value={"Won't fix"}>Won't fix</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Detail;
