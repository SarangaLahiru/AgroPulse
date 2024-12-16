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
import { FaArrowUp, FaCog, FaCoins, FaEnvelope, FaIdBadge, FaQuestionCircle, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { IoCall, IoDocumentText, IoDownload, IoHelpCircleOutline, IoHome, IoInformationCircleOutline, IoLanguage, IoSettings } from "react-icons/io5";
import { RiMenu2Fill } from "react-icons/ri";
import { TiArrowSortedDown } from "react-icons/ti";
import { FourSquare } from 'react-loading-indicators';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStateContext } from '../../context/contextProvider';
import './header.css';


export default function Header() {
  const [open, setOpen] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState('Language');
  const [selectedNavItem, setSelectedNavItem] = React.useState(null);
  const [openmenu, setOpenmenu] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { setToken, setUser, user } = useStateContext();
  const [credit, setCredit] = React.useState(0);
  const location = useLocation();
  // const [translations, setTranslations] = React.useState({});
  const { setTranslations, translations } = useStateContext();
  const [isDialogOpen, setIsDialogOpen] = React.useState(true);
  const navigate = useNavigate();





  React.useEffect(() => {

    const user = JSON.parse(localStorage.getItem('USER'));
    if (user) {
      setCredit(user.credit);
      // localStorage.setItem('USER', JSON.stringify(user));
    }
  }), [];

  React.useEffect(() => {
    fetchTranslations();

  }, [selectedLanguage]);

  const fetchTranslations = () => {
    setLoading(true)
    axios.get(`http://localhost:5000/get-translations`, { params: { language: selectedLanguage } })
      .then(response => {
        // Handle the response to update translations
        setTranslations(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching translations:', error);
        setLoading(false);
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
  const handleUpgradePlan = () => {
    navigate('/pro')
    handleMenuClose();
  }
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
          maxHeight: 380,
          width: 280,
          marginTop: 70,
          marginLeft: 15,
        },
      }}
    >
      <MenuItem onClick={handleMenuClose}>
        <FaUser className="mr-2" /> {user.name}
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <FaEnvelope className="mr-2" /> {user.email && user.email}
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <FaIdBadge className="mr-2" /> {user.id && user.id}
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <FaCoins className="mr-2" /> Credit: {credit}
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>
        <FaCog className="mr-2" /> Settings
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <FaQuestionCircle className="mr-2" /> Help
      </MenuItem>
      <MenuItem onClick={handleUpgradePlan} style={{ backgroundColor: '#f0f4ff', borderRadius: '4px', margin: '5px 0', padding: '10px 15px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaArrowUp className="mr-2" style={{ color: '#007bff' }} />
          <span style={{ fontWeight: 'bold', color: '#007bff' }}>Upgrade Plan</span>
        </div>
        <span style={{ fontSize: '9px', color: '#555', marginTop: '4px', width: "50px" }}>
          Unlock premium features and increase your credit limit.
        </span>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <FaSignOutAlt className="mr-2" /> Sign Out
      </MenuItem>
    </Menu >
  );

  const pro = (e) => {
    setIsDialogOpen(false);
    // e.preventDefault();

    navigate('/pro');
  }



  return (
    <>
      {loading ? (
        <div className='w-fit'>
          <div className=' fixed top-0' style={{ backgroundColor: "white", width: "100%", height: "100vh", zIndex: "1000" }}>
            <div className='relative top-80 w-20 m-auto'>
              <FourSquare color="#32cd32" size="large" text="Loading..." />
            </div>
          </div>
        </div>

      ) :
        <div>
          <FadeIn>

            <header className=''>
              <h2 className=''> <img src="/images/logo.jpeg" alt="logo" width="219px" height="103px" className='' /> </h2>
              <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8  box">
                <li className={location.pathname === '/' ? 'selected' : ''}>
                  <Link to='/'><Button variant="text" color="success" >{translations.home}</Button></Link>
                </li>
                <li className={location.pathname === '/detection' ? 'selected' : ''}>
                  <Link to='/detection'><Button variant="text">{translations.detection}</Button></Link>
                </li>
                <li className={location.pathname === '/support' ? 'selected' : ''}>
                  <Link to='/support'> <Button variant="text" onClick={() => handleNavItemClick('support')}>{translations.support}</Button></Link>
                </li>
                <li className={selectedNavItem === '/aboutus' ? 'selected' : ''}>
                  <Link to='/aboutus'><Button variant="text" >{translations.about}</Button></Link>
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
                            <option value="Tamil">Tamil</option>
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
                        sx={{ width: 60, height: 60, backgroundColor: "green" }}



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
      }
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full transform transition-all duration-300 ease-in-out scale-100 hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 mr-4">
                <svg
                  className="h-12 w-12 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2zm0 4h2v6h-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Credit Limit</h3>
                <div className="mt-2 text-sm text-gray-600">
                  Your credit limit is <span className="text-green-500 font-bold">{credit}</span>.
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Upgrade to <span className="text-green-500 font-bold">Premiere Plan</span> for more benefits!
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-transform duration-200 ease-in-out transform hover:scale-105"
                onClick={() => setIsDialogOpen(false)}
              >
                OK
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 transition-transform duration-200 ease-in-out transform hover:scale-105"
                onClick={pro}
              >
                Go Premiere Plan
              </button>
            </div>
          </div>
        </div>
      )}



    </>
  );
}
