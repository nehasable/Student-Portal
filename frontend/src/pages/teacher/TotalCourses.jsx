import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

const TotalCourses = ({ token, teacherId }) => {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(1, "day"));
  const [statusCounts, setStatusCounts] = useState({
    pending: 0,
    accepted: 0,
    rejected: 0,
  });

  useEffect(() => {
    fetchStatusCounts(startDate, endDate);
  }, [startDate, endDate]);

  const fetchStatusCounts = async (start, end) => {
    try {
      const formattedStartDate = moment(start.toDate()).format("YYYY-MM-DD");
      const formattedEndDate = moment(end.toDate()).format("YYYY-MM-DD");
      console.log(formattedStartDate, formattedEndDate, token);
      const response = await axios.get(
        `http://localhost:8088/course/courses`,
        {
          params: {
            startDate: formattedStartDate,
            endDate: formattedEndDate,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("hiiii");
      console.log("hello", response.data);
      setStatusCounts(
        response.data || { pending: 0, accepted: 0, rejected: 0 }
      );
    } catch (error) {
      console.error("Error fetching status counts:", error);
    }
  };

  const handleStartDate = (date) => {
    setStartDate(date);
    if (endDate.isBefore(date)) {
      setEndDate(date.add(1, "day"));
    }
  };

  const handleEndDate = (date) => {
    setEndDate(date);
    if (date.isBefore(startDate)) {
      setStartDate(date);
    }
  };

  return (
    <div className="status-counts">
      <h2>Status Counts</h2>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="From"
          value={startDate}
          onChange={handleStartDate}
          renderInput={(params) => <input {...params} />}
        />
        <DatePicker
          label="To"
          value={endDate}
          onChange={handleEndDate}
          minDate={startDate}
          renderInput={(params) => <input {...params} />}
        />
      </LocalizationProvider>

      <div className="counts">
        <p>Pending: {statusCounts.pending}</p>
        <p>Accepted: {statusCounts.accepted}</p>
        <p>Rejected: {statusCounts.rejected}</p>
      </div>
    </div>
  );
};

export default TotalCourses;
