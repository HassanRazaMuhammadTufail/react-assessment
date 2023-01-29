import React, { useEffect, useState } from 'react';
import './style.css';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

const SimpleDialog = (props) => {
  const { onClose, selectedItems, open } = props;
  const [ list, setList ] = useState([]);

  const handleClose = () => {
    onClose(false);
  };

  useEffect(()=>{
    console.log(selectedItems)
    setList(Object.values(selectedItems));
  },[selectedItems])
  console.log(list)
  return (
    <Dialog onClose={handleClose} open={open} className="container">
      <DialogTitle align='center'>Submitted</DialogTitle>
      <div className='line-break' />
      <List sx={{ pt: 0 }}>
        {list && list.map((item) => (
          <ListItem disableGutters>
              <ListItemAvatar>
                <Avatar src={item.photoUrL} />
             </ListItemAvatar>
              <ListItemText className='text-item' primary={item.categoryTitle} secondary={item.title} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedItems: PropTypes.object.isRequired,
};

export default SimpleDialog;
