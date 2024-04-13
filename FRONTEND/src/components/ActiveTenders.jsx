import React, { useEffect, useState } from "react";
import { TendersData } from "../data/dummy";
import Tender from "./Tender";
import axios from "axios";

const ActiveTenders = () => {
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

  useEffect(() => {
    GetTenders();
  }, []);

  return (
    <>
      <div className="">
        {/* <span className="bg-black text-white font-bold p-3 m-[40px] rounded-lg">
          Found {tenders.length} Tender(s)
        </span> */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {tenders &&
            tenders.map((item, index) => {
              return (
                <Tender
                  key={index}
                  title={item.name}
                  author={item.contract_title}
                  description={item.description}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ActiveTenders;
