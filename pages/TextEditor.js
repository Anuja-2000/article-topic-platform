import React, { useState } from 'react';
import Select from '@material-ui/core/Select';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import ButtonComponent from './ButtonComponent';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f3f7',
        padding: theme.spacing(3),
        marginBottom: theme.spacing(2),
      },
      select: {
        marginLeft: theme.spacing(2),
      },
      button: {
        marginLeft: theme.spacing(2),
      },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const fonts = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Courier New',
  ];

const TextEditor = () => {
  const classes = useStyles();
  const [fileMenuAnchorEl, setFileMenuAnchorEl] = useState(null);
  const [themeMenuAnchorEl, setThemeMenuAnchorEl] = useState(null);
  const [darkTheme, setDarkTheme] = useState(false);
  const [font, setFont] = useState(fonts[0]);
  const [fontSize, setFontSize] = useState(12);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [align, setAlign] = useState('left');
  


  const handleFileClick = (event) => {
    setFileMenuAnchorEl(event.currentTarget);
  };

  const handleThemeClick = (event) => {
    setThemeMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setFileMenuAnchorEl(null);
    setThemeMenuAnchorEl(null);
  };

  const handleThemeChange = () => {
    setDarkTheme(!darkTheme);
  };

  const handleFontChange = (event) => {
    setFont(event.target.value);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  const handleBoldClick = () => {
    setBold(!bold);
  };

  const handleItalicClick = () => {
    setItalic(!italic);
  };

  const handleUnderlineClick = () => {
    setUnderline(!underline);
  };

  const handleAlignClick = (align) => {
    setAlign(align);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

 


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            TEXT EDITOR
          </Typography>
          <Button color="inherit" onClick={handleFileClick}>File</Button>
          <Menu
            anchorEl={fileMenuAnchorEl}
            keepMounted
            open={Boolean(fileMenuAnchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Recent</MenuItem>
            <MenuItem onClick={handleClose}>New File</MenuItem>
            <MenuItem onClick={handleClose}>Open</MenuItem>
          </Menu>
          <Button color="inherit">Auto Save</Button>
          <Switch
            checked={darkTheme}
            onChange={handleThemeChange}
            color="primary"
            name="theme-switch"
            inputProps={{ 'aria-label': 'toggle theme' }}
          />
          <Button color="inherit" onClick={handleThemeClick}>Change Theme</Button>
          <Menu
            anchorEl={themeMenuAnchorEl}
            keepMounted
            open={Boolean(themeMenuAnchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Dark Theme</MenuItem>
            <MenuItem onClick={handleClose}>Light Theme</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <div>
      <Typography>Font:</Typography>
        <Select
          value={font}
          onChange={handleFontChange}
          className={classes.select}
        >
          {fonts.map((f) => (
            <MenuItem key={f} value={f}>{f}</MenuItem>
          ))}
        </Select>
        <Typography>Font Size:</Typography>
        <Select
          value={fontSize}
          onChange={handleFontSizeChange}
          className={classes.select}
        >
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={14}>14</MenuItem>
          <MenuItem value={16}>16</MenuItem>
          <MenuItem value={18}>18</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
        <IconButton
          className={classes.button}
          onClick={handleBoldClick}
          color={bold ? 'primary' : 'default'}
        >
          <FormatBoldIcon />
        </IconButton>
        <IconButton
          className={classes.button}
          onClick={handleItalicClick}
          color={italic ? 'primary' : 'default'}
        >
          <FormatItalicIcon />
        </IconButton>
        <IconButton
          className={classes.button}
          onClick={handleUnderlineClick}
          color={underline ? 'primary' : 'default'}
        >
          <FormatUnderlinedIcon />
        </IconButton>
        <IconButton
          className={classes.button}
          onClick={() => handleAlignClick('left')}
          color={align === 'left' ? 'primary' : 'default'}
        >
          <FormatAlignLeftIcon />
        </IconButton>
        <IconButton
          className={classes.button}
          onClick={() => handleAlignClick('right')}
          color={align === 'right' ? 'primary' : 'default'}
        >
          <FormatAlignRightIcon />
        </IconButton>
        <IconButton
          className={classes.button}
          onClick={() => handleAlignClick('center')}
          color={align === 'center' ? 'primary' : 'default'}
        >
          <FormatAlignCenterIcon />
        </IconButton>
        <IconButton
          className={classes.button}
          onClick={() => handleAlignClick('justify')}
          color={align === 'justify' ? 'primary' : 'default'}
        >
          <FormatAlignJustifyIcon />
        </IconButton>
      </div>
      
      <div>
    
      <ButtonComponent />
    </div>
    </div>
  );
};
export default TextEditor;
