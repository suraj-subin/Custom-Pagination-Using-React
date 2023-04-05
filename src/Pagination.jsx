import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import "./Pagination.css";
import { Button } from "@mui/material";
import axios from "axios";

const Pagination = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const APIURL = "https://jsonplaceholder.typicode.com/posts";

  const ApiData = async () => {
    try {
      const Res = await axios.get(APIURL);
      setUserData(Res.data);
      setTotalPages(Math.ceil(Res.data.length / 20));
    } catch (error) {
      // Error Message
    }
  };

  useEffect(() => {
    ApiData();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const preDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;

  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDiaplay = userData.slice(startIndex, endIndex);
  return (
    <>
      {itemsToDiaplay && itemsToDiaplay.length > 0
        ? itemsToDiaplay.map((item) => {
            return (
              <h3 key={item.id}>
                {item.id} {item.title}
              </h3>
            );
          })
        : ""}
      <div className="Parent-Div">
        <div onClick={handlePrevClick} disabled={preDisabled} className="Arrow">
          <Icon icon="ic:outline-keyboard-arrow-left" width="35" height="35" />
        </div>
        {Array.from({ length: totalPages }, (_, i) => {
          return (
            <Button
              variant="outlined"
              onClick={() => handlePageChange(i + 1)}
              key={i}
              disabled={i + 1 === currentPage}
              className="NumberBtn"
            >
              {i + 1}
            </Button>
          );
        })}

        <div
          onClick={handleNextClick}
          disabled={nextDisabled}
          className="Arrow"
        >
          <Icon icon="ic:outline-keyboard-arrow-right" width="35" height="35" />
        </div>
      </div>
    </>
  );
};

export default Pagination;
