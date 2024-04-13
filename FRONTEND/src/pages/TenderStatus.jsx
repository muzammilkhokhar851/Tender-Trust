import React from "react";
import { TendersData } from "../data/dummy";
import Tender from "../components/Tender";
import StausTender from "../components/StausTender";
import axios from "axios";
import { useEffect, useState } from "react";

const Public_tenders = () => {
  const [tenders, setTenders] = useState([]);

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
    }
  };

  useEffect(() => {
    GetTenders();
  }, []);
  console.log("This is alll tenders", tenders);

  return (
    <>
      <div className="">
        <h3 className="bg-white inline text-black font-bold p-3 mt-[170px] rounded-lg">
          Found {tenders.length} Tenders
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {tenders.map((item, index) => {
            return (
              <StausTender
                key={index}
                title={item.title}
                author={item.author}
                description={item.description}
                tenderID={item.id}
                startDate={item.startDate}
                endDate={item.endDate}
                status={item.active}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Public_tenders;
