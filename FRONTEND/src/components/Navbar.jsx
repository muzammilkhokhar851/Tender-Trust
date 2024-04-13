import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { SiShopware } from "react-icons/si";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import avatar from "../data/avatar.jpg";
import { Cart, Chat, Notification, UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";
import { useSelector, useDispatch } from "react-redux";
import { setUserProfile } from "../Toolkit/Slices/booleanSlice";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoLogInOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { TiUserAdd } from "react-icons/ti";
import Wallet from "./Wallet";
import { setUser } from "../Toolkit/Slices/authUserSlice";
import { setpublic } from "../Toolkit/Slices/booleanSlice";
import { setMetaMaskCred } from "../Toolkit/Slices/Web3Slice";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <button
    type="button"
    onClick={() => customFunc()}
    style={{ color }}
    className="relative text-xl rounded-full p-3 hover:bg-light-gray"
  >
    <span
      style={{ background: dotColor }}
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
    />
    {icon}
  </button>
);

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout function
  const HandleLogout = () => {
    dispatch(setUser(null));
    dispatch(setpublic(true));
    dispatch(
      setMetaMaskCred({
        web3: null,
        contract: null,
        account: null,
      })
    );
    navigate("/");
  };

  // State Variables
  const isPublic = useSelector((state) => state.bool.isPublic);
  const user = useSelector((state) => state.bool.userProfile);
  const authUser = useSelector((state) => state.user.authUser);

  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickk = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  // Navbar Transition on Scroll
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      // style={{ backgroundColor: "darkorchid" }}
      className="flex justify-between p-2 z-50"
      // className={`fixed flex justify-between top-0 left-0 p-2 w-full ${
      //   scrolling ? "bg-black" : "bg-transparent"
      // } transition-all duration-300 ease-in-out z-50 `}
    >
      {isPublic ? (
        <Link
          to="/"
          className="items-center gap-3 ml-3 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
        >
          <SiShopware /> <span>Tender Trust</span>
        </Link>
      ) : (
        <NavButton
          title="Menu"
          customFunc={handleActiveMenu}
          color={currentColor}
          icon={<AiOutlineMenu />}
        />
      )}
      {isPublic ? (
        <ul class="flex flex-row my-auto">
          <h4 className="mx-4">
            <Link
              class="items-center mx-4 flex text-xl tracking-tight dark:text-white text-slate-900"
              to="/"
            >
              Tenders
            </Link>
          </h4>
          <h4 className="mx-4">
            <Link
              to="/tender-insights"
              class="items-center mx-4  flex text-xl tracking-tight dark:text-white text-slate-900"
              href="#"
            >
              Tender Insights
            </Link>
          </h4>
          <h4 className="mx-4">
            <Link
              to="/tender-status"
              class="items-center mx-4 flex text-xl tracking-tight dark:text-white text-slate-900"
              href="#"
            >
              Tender Status
            </Link>
          </h4>
        </ul>
      ) : (
        ""
      )}

      <div className="flex">
        {/* <NavButton
          title="Notification"
          dotColor="rgb(254, 201, 15)"
          customFunc={() => handleClick("notification")}
          color={currentColor}
          icon={<RiNotification3Line />}
        /> */}
        <div
          className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
          onClick={() => dispatch(setUserProfile(!user))}
        >
          <img
            className="rounded-full w-8 h-8"
            src={avatar}
            alt="user-profile"
          />
          {authUser && (
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClickk}
            >
              <span className="text-gray-400 text-14">Hi,</span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-14">
                {authUser.user.name}
              </span>
            </Button>
          )}
          <MdKeyboardArrowDown className="text-gray-400 text-14" />
        </div>

        {/* {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />} */}
        {/* {isClicked.userProfile && <UserProfile />} */}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {authUser ? (
                <>
                  <div>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: currentColor }}
                      endIcon={<BiLogOut />}
                      onClick={HandleLogout}
                      className="w-full my-1"
                    >
                      <Link to="/signup">Logout</Link>
                    </Button>
                  </div>
                  <div className="my-2">
                    <Wallet />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: currentColor }}
                      endIcon={<TiUserAdd />}
                      className="w-full my-1"
                    >
                      <Link to="/signup">Sign-Up</Link>
                    </Button>
                  </div>
                  <div>
                    <Button
                      style={{ backgroundColor: currentColor }}
                      variant="contained"
                      endIcon={<IoLogInOutline />}
                      className="w-full my-1"
                    >
                      <Link to="/login">Login</Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </MenuItem>
        </Menu>

        {/* {user && <UserProfile />} */}
      </div>
    </div>
  );
};

export default Navbar;
