import React from "react";
import { IoIosMore } from "react-icons/io";

import { useStateContext } from "../contexts/ContextProvider";
import Button from "./Button";
import product9 from "../data/product9.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
// import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const Bid = () => {
  const { currentColor, currentMode } = useStateContext();

  const authUser = useSelector((state) => state.user.authUser);
  const [noAccount, setNoAccount] = useState(false);

  const account = useSelector((state) => state.web3.account);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #fff",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const [tenderId, setTenderId] = React.useState(0);
  const handleOpen = (id) => {
    setOpen(true);
    console.log("This is the id = ", id);
    setTenderId(id);
  };
  const handleClose = () => setOpen(false);

  const [tenders, setTenders] = useState([]);
  const [filteredTenders, setFilteredTenders] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    contactNumber: "",
    bidAmount: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const GetTenders = async () => {
    // e.preventDefault();
    try {
      // const url = "http://localhost:5000/viewAllTenders";
      const url = "http://localhost:5000/getAllTenders";

      const response = await axios.get(url);

      if (response.status === 200) {
        const responseData = response.data;
        // Handle the responseData as needed
        console.log(responseData);
        setTenders(responseData.tenders);
      } else {
        alert("Task cannot be added");
      }
    } catch (error) {
      // Handle errors here
      console.error("There was a problem with the axios request:", error);
    } finally {
      console.log("finally");
    }
  };

  const BidTender = async () => {
    // e.preventDefault();

    if (!account) {
      alert("Please connect your wallet first");
      return;
    }

    const data = {
      tenderId: tenderId,
      name: authUser.user.name,
      companyName: formData.companyName,
      contactNumber: formData.contactNumber,
      bid: formData.bidAmount,
      account,
    };

    console.log("This is the data = ", data);

    try {
      const response = await axios.post("http://localhost:5000/placeBid", data);
      if (response.status === 200) {
        alert("Bid Placed Successfully");
        handleClose();
      }
    } catch (error) {
      alert("There was a problem with the axios request:", error);
      handleClose();
      console.error("There was a problem with the axios request:", error);
    }
  };

  useEffect(() => {
    GetTenders();
  }, []);

  // console.log(tenders);
  console.log(formData);

  useEffect(() => {
    if (!account) {
      setNoAccount(true);
    }
  }, [account]);

  console.log("This is the account = ", account);

  console.log("This is the no account = ", tenders);
  useEffect(() => {
    if (!tenders) {
      return;
    }

    const filtered = tenders.filter(
      (item) =>
        item.active === true &&
        item.endDate > new Date().toISOString().split("T")[0]
    );
    console.log("This is the filtered = ", filtered);

    setFilteredTenders(filtered);
  }, [tenders]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Place Bid
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              BidTender();
            }}
          >
            {/* <div className="mt-2">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.name}
                onChange={handleChange}
              />
            </div> */}
            <div className="mt-2">
              <label htmlFor="companyName">Company Name:</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>
            <div className="mt-2">
              <label htmlFor="contactNumber">Contact Number:</label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </div>
            <div className="mt-2">
              <label htmlFor="bidAmount">Bid Amount:</label>
              <input
                type="number"
                id="bidAmount"
                name="bidAmount"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.bidAmount}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-500 px-4 text-center py-2 rounded-lg text-white hover:bg-blue-600"
            >
              Place Bid
            </button>
          </form>
        </Box>
      </Modal>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {filteredTenders &&
          filteredTenders.map((item, index) => (
            <div
              className="w-auto bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3"
              key={index}
            >
              <div className="flex justify-between">
                <p className="text-xl font-semibold">Tender</p>
                <button
                  type="button"
                  className="text-xl font-semibold text-gray-500"
                >
                  <IoIosMore />
                </button>
              </div>
              <div className="mt-10">
                {/* <img className="md:w-96 h-50 " src={product9} alt="" /> */}
                <div className="mt-8">
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="text-gray-400 ">By {item.contract_title}</p>
                  <p className="mt-8 text-sm text-gray-400">
                    {item.description}
                  </p>
                  <div className="mt-10 text-start">
                    <button
                      color="white"
                      bgColor={currentColor}
                      // onClick={() => BidTender(item.id)}
                      onClick={() => handleOpen(item.id)}
                      // text="Bid Tender"
                      // borderRadius="10px"
                      className="text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Bid Tender
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Bid;
