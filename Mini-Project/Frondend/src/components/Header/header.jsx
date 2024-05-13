import { Avatar, IconButton, Menu, MenuItem, Slide, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import axios from 'axios';
import * as React from 'react';
import FadeIn from 'react-fade-in';
import { IoCall, IoDocumentText, IoDownload, IoHelpCircleOutline, IoHome, IoInformationCircleOutline, IoLanguage, IoSettings } from "react-icons/io5";
import { RiMenu2Fill } from "react-icons/ri";
import { TiArrowSortedDown } from "react-icons/ti";
import { Link, useLocation } from 'react-router-dom';
import { useStateContext } from '../../context/contextProvider';
import './header.css';


export default function Header() {
  const [open, setOpen] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState('Language');
  const [selectedNavItem, setSelectedNavItem] = React.useState(null);
  const [openmenu, setOpenmenu] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { setToken, setUser, user } = useStateContext();
  const location = useLocation();
  // const [translations, setTranslations] = React.useState({});
  const { setTranslations, translations } = useStateContext();


  // Fetch translations when the component mounts or language changes
  React.useEffect(() => {
    fetchTranslations();
  }, [selectedLanguage]);

  const fetchTranslations = () => {
    axios.get(`http://localhost:5000/get-translations`, { params: { language: selectedLanguage } })
      .then(response => {
        // Handle the response to update translations
        setTranslations(response.data);
      })
      .catch(error => {
        console.error('Error fetching translations:', error);
      });
  };

  // Function to handle language change
  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    setOpen(false); // Close language selection dialog
  };

  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const toggleMenu = (newOpen) => () => {
    setOpenmenu(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250, marginTop: 5 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <IoHome />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding >
          <ListItemButton>
            <ListItemIcon>
              <IoDownload />
            </ListItemIcon>
            <ListItemText primary={"Download"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <IoHelpCircleOutline />
            </ListItemIcon>
            <ListItemText primary={"Support"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <IoInformationCircleOutline />
            </ListItemIcon>
            <ListItemText primary={"About us"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding >
          <ListItemButton>
            <ListItemIcon>
              <IoLanguage />
            </ListItemIcon>
            <ListItemText primary={"Language"} />
          </ListItemButton>
        </ListItem>


      </List>
      <Divider />
      <List>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <IoSettings />
            </ListItemIcon>
            <ListItemText primary={"Settings"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <IoDocumentText />
            </ListItemIcon>
            <ListItemText primary={"Policy"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <IoCall />
            </ListItemIcon>
            <ListItemText primary={"Contact us"} />
          </ListItemButton>
        </ListItem>

      </List>
    </Box>
  );

  const handleLanguageButtonClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNavItemClick = (itemName) => {
    setSelectedNavItem(itemName);
  };
  const handleProfileMenuOpen = (event) => {
    // Handle opening profile menu
    setAnchorEl(event.currentTarget);
    console.log('Profile menu opened');
  };
  const handleLogout = (event) => {
    event.preventDefault();
    setUser({})
    setToken(null);


  };
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',

      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        style: {
          maxHeight: 300, // Adjust the maximum height as needed
          width: 220,    // Adjust the width as needed
          marginTop: 70,
          marginLeft: 15,

        },
      }}

    >
      <MenuItem onClick={handleMenuClose}>{user.name}</MenuItem>
      <MenuItem onClick={handleMenuClose}>{user.email && user.email}</MenuItem>
      <MenuItem onClick={handleMenuClose}>{user.id && user.id}</MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>Setting</MenuItem>
      <MenuItem onClick={handleMenuClose}>Help</MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
    </Menu>
  );



  return (
    <div>
      <FadeIn>

        <header className=''>
          <h2 className=''> <img src="/images/logo.jpeg" alt="logo" width="219px" height="103px" /> </h2>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8  box">
            <li className={location.pathname === '/' ? 'selected' : ''}>
              <Link to='/'><Button variant="text" color="success" >{translations.home}</Button></Link>
            </li>
            <li className={location.pathname === '/detection' ? 'selected' : ''}>
              <Link to='/detection'><Button variant="text">{translations.detection}</Button></Link>
            </li>
            <li className={selectedNavItem === 'support' ? 'selected' : ''}>
              <Button variant="text" onClick={() => handleNavItemClick('support')}>{translations.support}</Button>
            </li>
            <li className={selectedNavItem === 'about' ? 'selected' : ''}>
              <Button variant="text" onClick={() => handleNavItemClick('about')}>{translations.about}</Button>
            </li>
            <li>
              <Button variant="contained" className="lang" onClick={handleLanguageButtonClick}>
                {selectedLanguage} <TiArrowSortedDown className="langIcon" />
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                className="langBox"
                sx={{ color: '#014802' }}
                TransitionComponent={Slide}
              >
                <DialogTitle sx={{ bgcolor: "#014802", color: "white" }}>Select Language</DialogTitle>
                <DialogContent sx={{ color: '#014802', }}>
                  <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap', padding: "10px 20px" }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} color='success'>
                      <InputLabel sx={{ color: '#014802' }} color='success'>Language</InputLabel>
                      <Select

                        native
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                        color='success'
                        input={<OutlinedInput label="Language" id="language-select" />}
                        sx={{ color: '#014802', width: "300px", }}
                      >
                        <option value="" disabled>Select a language</option>
                        <option value="English" sx={{ color: '#014802', bgcolor: 'red' }}>English</option>
                        <option value="">Tamil</option>
                        <option value="සිංහල">සිංහල</option>
                      </Select>
                    </FormControl>
                  </Box>
                </DialogContent>
              </Dialog>
            </li>
            <li className='m-1 userIcon'>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {/* <AccountCircle sx={{ color: '#014802', fontSize:'50px'}}/> */}
                <Stack direction="row" spacing={1}>
                  <Avatar
                    sx={{ width: 56, height: 56, backgroundColor: "green" }}



                  >{user.name[0].toUpperCase()}</Avatar>
                </Stack>
              </IconButton>

            </li>

          </div>

          <Button variant="text" className='menuicon' onClick={toggleMenu(true)}><RiMenu2Fill /></Button>
        </header>

        <Drawer open={openmenu} onClose={toggleMenu(false)}>
          {DrawerList}
        </Drawer>
      </FadeIn>
      {renderMenu}
    </div>
  );
}
