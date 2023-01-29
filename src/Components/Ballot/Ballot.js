import React, { useState, useEffect } from 'react';
import api from '../../Api/Api';
import './style.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAlert from '@mui/material/Alert';
import { Accordion,
        AccordionSummary,
        AccordionDetails,
        Card,
        CardContent,
        CardMedia,
        CardActionArea, 
        CardActions, 
        Button,
        Fab,
        Snackbar,
        Typography } from '@mui/material';
import SimpleDialog from '../Dialog/Dialog';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Ballot = () => {
  const [data, setData] = useState(null);
  // const [selected, setSelection] = useState({"best-picture":{"title":"Nomadland","photoUrL":"https://variety.com/wp-content/uploads/2020/12/nomadland_ver2.jpg","id":"nomadland","categoryTitle":"Best Picture"},"best-visual-effects":{"title":"The Invisible Man","photoUrL":"https://variety.com/wp-content/uploads/2020/12/invisible_man.jpg","id":"the-invisible-man","categoryTitle":"Best Visual Effects"},"best-supporting-actress":{"title":"Maria Bakalova for Borat Subsequent Moviefilm","photoUrL":"https://variety.com/wp-content/uploads/2020/12/borat_two_ver2.jpg","id":"maria-bakalova","categoryTitle":"Best Supporting Actress"},"best-supporting-actor":{"title":"Daniel Kaluuya for Judas and the Black Messiah","photoUrL":"https://variety.com/wp-content/uploads/2020/12/judas_and_the_black_messiah.jpg","id":"daniel-kaluuya","categoryTitle":"Best Supporting Actor"},"best-actress":{"title":"Vanessa Kirby for Pieces of a Woman","photoUrL":"https://variety.com/wp-content/uploads/2020/12/pieces_of_a_woman.jpg","id":"vanessa-kirby","categoryTitle":"Best Actress"},"best-actor":{"title":"Chadwick Boseman for Ma Rainey's Black Bottom","photoUrL":"https://variety.com/wp-content/uploads/2020/12/ma_raineys_black_bottom_ver2.jpg","id":"chadwick-boseman","categoryTitle":"Best Actor"},"best-director":{"title":"Chloé Zhao for Nomadland","photoUrL":"https://variety.com/wp-content/uploads/2020/12/nomadland_ver2.jpg","id":"chloe-zhao","categoryTitle":"Best Director"}});
  // const [dialogToggle, setDialogToggle] = useState(true);
  const [selected, setSelection] = useState({});
  const [dialogToggle, setDialogToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const [submission, setSubmission] = useState(true);

  const submit = () => {
    if(Object.keys(selected).length !== data.items.length){
      setOpen(true);
    }
    else {
      setDialogToggle(true);
      setSubmission(false)
    }
  }

  const toggleNomineeSelection = (item, nominee) => {
    // console.log(item,nominee)
    if(!selected[item.id]) setSelection({...selected, [item.id]: {...nominee, categoryTitle: item.title}});
    else delete selected[item.id];
    let updatedItems = data.items.map(_item => {
      if(_item.id === item.id) {
        if(_item.selectedId) {
          delete _item.selectedId;
          return _item;
        } else {
          return {
            ..._item,
            selectedId: nominee.id
          }
        }
      } else {
        return _item;
      }
    })
    // console.log(updatedItems);
    setData({items: updatedItems});
  }


  useEffect(() => {
    let data = api.getBallotData();
    data.then( d => {
      let itemsObj = d.items.map(item => { return {...item, selectedId:""}})
      d.items = itemsObj;
      setData(d);
    })
  }, [])
  console.log(data, JSON.stringify(selected) ,"data")
  return (
    <div className='ballot'>
    {data && data.items && data.items.map(item => {
      return(
        <Accordion className='accordion' key={item.id}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{item.title}</Typography>
        </AccordionSummary>
        <AccordionDetails className='accordion-detail'>
          {item && item.items && item.items.map(nominee => {
            return(
              <Card sx={{ maxWidth: 345, minWidth: 345 }} className='card' key={nominee.id}>
                <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  {nominee.title}
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  image={nominee.photoUrL}
                  alt={nominee.title}
                />
                </CardActionArea>
                <CardActions>
                  <Button size="small" fullWidth variant='contained' disabled={!!item.selectedId && item.selectedId !== nominee.id} onClick={()=>toggleNomineeSelection(item,nominee)}>
                    {(item.selectedId === nominee.id) ? 'Unselect' : 'Select'}
                  </Button>
                </CardActions>
              </Card>
            )
          })}
        </AccordionDetails>
        </Accordion>
      )
    })}
    <Fab 
      variant='extended' 
      color='primary' 
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
      }} 
      className='submit-button'
      disabled={!submission}
      onClick={submit}>
      Submit Ballot
    </Fab>
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
    >
      <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: '100%' }}>
        Select from all categories!
      </Alert>
    </Snackbar>
    <SimpleDialog open={dialogToggle} onClose={setDialogToggle} selectedItems={selected} />
    </div>
  )
}

export default Ballot;