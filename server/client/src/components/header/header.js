import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./header.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import PetsIcon from '@mui/icons-material/Pets';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Avatar } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { API_URL } from "../../config";

const Header = () => {
  const [userData, setUserData] = useState({
    nombre: "",
    rol: "",
    photo: "default.jpg",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [doctorIconColor, setDoctorIconColor] = useState("inherit");
  const [petsIconColor, setPetsIconColor] = useState("inherit");
  const [usersIconColor, setUsersIconColor] = useState("inherit");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_URL}/verify`, {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUserData({
            nombre: data.user?.nombre || "Usuario",
            rol: data.user?.rol || "Sin rol",
            photo: data.user?.photo || "default.jpg",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (location.pathname === '/doctors') {
      setDoctorIconColor("primary");
      setPetsIconColor("inherit");
      setUsersIconColor("inherit")
    } else if (location.pathname === '/app') {
      setPetsIconColor("primary");
      setDoctorIconColor("inherit");
      setUsersIconColor("inherit")
    }else if (location.pathname === '/users') {
      setPetsIconColor("inherit");
      setDoctorIconColor("inherit");
      setUsersIconColor("primary")
    } else {
      setDoctorIconColor("inherit");
      setPetsIconColor("inherit");
      setUsersIconColor("inherit")
    }
  }, [location]);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        window.location.href = "/iniciar-sesion"; // Redirect to login page
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="navbarSistem">
      <img
        src={require("../../media/profile.jpg")}
        onClick={() => navigate("/")}
        width="40"
        height="40"
        alt="Profile"
      />
      <a className="link" href="#"></a>
    
      <div className="nav-item">
        <IconButton
          size="large"
          aria-label="show profile"
          color={usersIconColor}
          onClick={() => {
            navigate("/users");
          }}
        >
          <div className="button-content">
            <AccountCircleIcon />
            <span className="button-text">Usuarios</span>
          </div>
        </IconButton>
      </div>

      <div className="nav-item">
        <IconButton
          size="large"
          aria-label="show profile"
          color={petsIconColor}
          onClick={() => {
            navigate("/app");
          }}
        >
          <div className="button-content">
            <EventAvailableIcon />
            <span className="button-text">Solicitudes</span>
          </div>
        </IconButton>
      </div>

      <div className="nav-item">
        <IconButton 
          size="large" 
          aria-label="show doctors" 
          color={doctorIconColor}
          onClick={() => {
            navigate("/doctors");
          }}
        >
          <div className="button-content">
            <LocalHospitalIcon />
            <span className="button-text">Doctores</span>
          </div>
        </IconButton>
      </div>

      <div className="profileDiv">
        <Avatar
          className="avatarProfile"
          alt={userData.nombre}
          src={require(`../../media/profile/${userData.photo}`)}
          sx={{ width: 45, height: 45, cursor: 'pointer' }}
          onClick={handleMenuClick}
          aria-controls={open ? 'profile-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        />
        <p className="nameProfile">{userData.nombre}</p>
        <p className="roleProfile">{userData.rol}</p>
        
        <Menu
          id="profile-menu"
          MenuListProps={{
            'aria-labelledby': 'profile-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          TransitionComponent={Fade}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
        </Menu>
      </div>
    </nav>
  );
};

export default Header;
