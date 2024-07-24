import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../../components/Navbar";
import "./Classes.css";

const Classes = ({ studentId }) => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);
  const itemsPerPage = 3;

  useEffect(() => {
    // Cleanup function to clear the debounce timer
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  useEffect(() => {
    // Fetch courses with debounce effect
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(() => {
      fetchCourses();
    }, 500); // Debounce delay of 500ms

    setDebounceTimer(timer);
  }, [search, currentPage]);

  const fetchCourses = async () => {
    if (!studentId) {
      console.error("Invalid student ID");
      return;
    }

    console.log("Fetching courses for student ID:", studentId);
    console.log(search);
    try {
      const response = await axios.get(
        `http://localhost:8088/course/${studentId}`,
        {
          params: {
            page: currentPage,
            limit: itemsPerPage,
            search: search,
          },
        }
      );

      console.log("Fetched courses:", response.data);
      setCourses(response.data.courses || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <div className="container">
      <Navbar />

      <h2>My Courses</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <ul className="courseList">
        {courses.map((course) => (
          <div className="courseItem" key={course._id}>
            <p>Course Name: {course.name}</p>
            <p>Teacher Name: {course.teachers?.name}</p>
            <p>Mobile No: {course.teachers?.mobileNo}</p>
          </div>
        ))}
      </ul>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Classes;
