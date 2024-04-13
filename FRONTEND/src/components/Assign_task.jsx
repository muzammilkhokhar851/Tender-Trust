import React from "react";
import { IoIosMore } from "react-icons/io";

import { useStateContext } from "../contexts/ContextProvider";
import Button from "./Button";
import product9 from "../data/product9.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const Assign_task = () => {
  const { currentColor, currentMode } = useStateContext();

  const [tenders, setTenders] = useState([]);

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

  const [tenderID, setTenderID] = React.useState(0);
  const [winnerContractor, setWinnerContractor] = React.useState("");
  const [bidAmount, setBidAmount] = React.useState(0);
  const [assignedTender, setAssignedTender] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = (id) => {
    setOpen(true);
    console.log("This is the id = ", id);
    setTenderID(id);
  };
  const handleClose = () => setOpen(false);

  const [openT, setOpenT] = React.useState(false);
  const handleOpenT = () => setOpenT(true);
  const handleCloseT = () => setOpenT(false);

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
        const filtered = responseData.tenders.filter(
          (item) =>
            item.active === true &&
            item.endDate > new Date().toISOString().split("T")[0]
        );
        setTenders(filtered);
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

  const Assign_Tender = async (e) => {
    e.preventDefault();

    if (!account) {
      alert("Please connect your wallet first");
      return;
    }

    const data = {
      tenderId: tenderID,
      account,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/assignContract",
        data
      );
      console.log("Thid id redponse :", response.data);
      if (response.status === 200) {
        handleClose();
        setWinnerContractor(response.data.response.contractorId);
        setBidAmount(response.data.response.bid);
        setAssignedTender(response.data.response.tenderId);


        handleOpenT();
      }
    } catch (error) {
      console.error("There was a problem with the axios request:", error);
    }
  };

  useEffect(() => {
    GetTenders();
  }, []);

  return (
    <>
      <Modal
        open={openT}
        onClose={handleCloseT}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Tender ID
          </Typography>
          <Typography sx={{ mt: 1 }}>{assignedTender}</Typography>

          <Typography variant="h6" component="h2" className="mt-4">
            Winner Contractor
          </Typography>
          <Typography sx={{ mt: 1 }}>{winnerContractor}</Typography>
          <Typography variant="h6" component="h2" className="mt-4">
            Bid Amount
          </Typography>
          <Typography sx={{ mt: 1 }}>{bidAmount}</Typography>
        </Box>
      </Modal>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Assign Tender Verification
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure to assign this tender automatically to highest bidder?
          </Typography>
          <button
            type="submit"
            onClick={Assign_Tender}
            className="mt-4 bg-blue-500 px-4 text-center py-2 rounded-lg text-white hover:bg-blue-600"
          >
            Assign Tender
          </button>
        </Box>
      </Modal>
      <div className="flex flex-wrap">
        {tenders &&
          tenders.map((item, index) => (
            <div
              key={index}
              className="w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/3 p-3"
            >
              <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6">
                <div className="flex my-1 justify-between">
                  <p className="text-xl font-semibold">
                    Contractor Name : <span className="">{item.name}</span>
                  </p>
                </div>
                <div className="">
                  {/* <p className="font-semibold my-1 text-lg">
                    No Of Bids : <span>5</span>
                  </p> */}
                  <p className="font-semibold my-1 text-lg">
                    Tender Description :{" "}
                  </p>
                  <p className="mt-3 text-sm text-gray-400">
                    {item.description}
                  </p>
                  <div className="mt-3 text-center">
                    {/* You can customize the Button component as needed */}
                    <button
                      color="white"
                      bgColor={currentColor}
                      // onClick={() => Assign_Tender(item.id)/}
                      onClick={() => handleOpen(item.id)}
                      // text="Bid Tender"
                      // borderRadius="10px"
                      className="text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Assign Tender
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

export default Assign_task;
