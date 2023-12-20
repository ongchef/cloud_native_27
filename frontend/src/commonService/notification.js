import { useEffect, useState } from 'react';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Box, Divider, IconButton } from '@mui/material';
import FetchData from '../authService/fetchData';
import moment from 'moment';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
function NotiList({event}){
    console.log(event)
    return(
        <>
            <MenuItem >
                <ListItemIcon >
                    <EventAvailableIcon/>
                    您在{event.date.split("T")[0]}有一場活動在{event.location}-{event.court_name}
                </ListItemIcon>
            </MenuItem>
        </>
    )
}
function onGoingEvent(eventList){
    const onGoingList = eventList.filter((event)=>{
        if(moment(event.date)>moment.now()){
            console.log(event)
            return event
        }
    })
    return onGoingList
}
export default function SimpleBadge() {
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
      };
    
    const [onGoingList, setOngoinList] = useState([])
    useEffect(()=>{
        FetchData.getData("api/users/appointment/histories")
        .then((res)=>{
            console.log(res)
            setOngoinList(onGoingEvent(res))
        })
    },[])
    useEffect(()=>{
        console.log(onGoingList.length)
    },[onGoingList])
  return (
    <>
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
    <IconButton 
        // onClick={()=>onGoingList.length!==0&&setOpen(!open)}
        onClick={handleClick}
        aria-controls={open ? 'notification' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
            >
        <Badge badgeContent={onGoingList.length} color="warning" showZero>
            <MailIcon color="action" />
        </Badge>
    </IconButton>
    </Box>
    <Menu
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        id="notification"
        // open={open}   
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        // onClose={()=>setOpen(false)}
        // onClick={()=>setOpen(!open)}
    
  >
    {
        onGoingList&&(onGoingList.map((event)=><NotiList event={event}/>))
    }
    
    
  </Menu>
  </>
  );
}