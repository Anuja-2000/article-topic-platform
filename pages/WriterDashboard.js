import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import TextEditor from './TextEditor';

import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import PendingIcon from '@mui/icons-material/Pending';
import BarChartIcon from '@mui/icons-material/BarChart';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TableRow from "@material-ui/core/TableRow";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Paper,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
    
  },
  table: {
    minWidth: 650,
  },
  cell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  menu: {
    backgroundColor: '#00489D', 
    width: '100%',
    maxWidth: '300px',
  },
  
  menuItem: {
    paddingTop: '25px',
    paddingBottom: '12px',
    paddingLeft: '16px',
    paddingRight: '16px',
    '&:not(:last-child)': {
      borderBottom: '15px',
    },
    '&:hover': {
      backgroundColor: '#3944F7',
    },
  },
  
  menuIcon: {
    color: '#fff',
  },
  menuText: {
    fontWeight: 'bold',
    fontSize: '1rem',
    color: '#fff',
  },
  menuItemSelected: {
    color: "white",
  },
  menuButton: {

  },

  middleContent: {
    height: "750px",
    width:"100%",
  
  },
  rightContent: {
    backgroundColor: "#f5f5f5",
    height: "100%",
    marginLeft: "-16px",
  },
  largeIcon: {
    width: '8em',
    height: '8em',
    align: "center",
  },
  
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  },
  image: {
    maxWidth: "100%",
    width: "65%",
  },
  profileIcon: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
 
 
  
}));
function createData(name, value) {
  return { name, value };
}

const rows = [
  createData("Total Published Articles", "2"),
  createData("Total Pending Articles", "2"),
  createData("Drafts", "2"),
];

const WriterDashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <div className={classes.menu}>
      <div style={{ width: drawerWidth, height: "110px", backgroundColor: "#00489D" }}></div>       
        <List className={classes.menu}>
        <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuIcon}>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary="Create New Article" className={classes.menuText} />
      </ListItem> 
      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuIcon}>
          <DriveFileRenameOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" className={classes.menuText} />
      </ListItem>
      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuIcon}>
          <PendingIcon />
        </ListItemIcon>
        <ListItemText primary="Pending Articles" className={classes.menuText} />
      </ListItem>
      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuIcon}>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Statistics" className={classes.menuText} />
      </ListItem>
      <ListItem button className={classes.menuItem}>
        <ListItemIcon className={classes.menuIcon}>
          <CloudDoneIcon />
        </ListItemIcon>
        <ListItemText primary="Published Aricles" className={classes.menuText} />
      </ListItem>
    </List>

      </div>
      <div style={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item
 xs={8}>
            <Paper className={classes.middleContent}>

  <div style={{ padding: "20px", fontFamily: "Poppins" }}> </div>
  <div style={{ padding: "20px", fontFamily: "Poppins", textAlign: "center", fontWeight: "bold", fontSize: "25px" }}>Welcome to Writer's Dashboard!</div>
 

<div className={classes.imageContainer}>
        <img
          src="https://img.freepik.com/free-vector/hands-character-writing-letter-desk-with-papers-pencil-envelopes-coffee-cup_74855-10720.jpg?w=1060&t=st=1679983864~exp=1679984464~hmac=8d38957c73e0aa3eb241ea19c9f51d75cea843c0c040dab444589eaacbfe4e37"
          alt="My Image"
          className={classes.image}
        />
      </div>

<div>
<TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

</div>
  
</Paper>

            
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.rightContent}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', fontFamily: 'Poppins' }}>
      <span>Log out</span>
      <ArrowForwardIosIcon />
    </div>

            
        
            
              <div style={{ padding: "20px" }}> </div>
              <div style={{ padding: "20px" }}> </div>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <AccountCircleIcon className={classes.largeIcon} /></div>

              <div style={{ padding: '0px', fontSize: '20px', fontFamily: 'Poppins', textAlign: 'center' }}>Upeksha Erandi</div>
              <div style={{ padding: '0px', fontSize: '10px', fontFamily: 'Poppins', textAlign: 'center' }}>upekshaerandi99@gmail.com</div>
            
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default WriterDashboard;