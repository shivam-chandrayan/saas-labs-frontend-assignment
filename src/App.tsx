// App.tsx
import React, { useState, useEffect } from "react";
import "./App.css";

interface Project {
  "s.no": number;
  "percentage.funded": number;
  "amt.pledged": number;
  blurb: string;
  by: string;
  country: string;
  currency: string;
  "end.time": string;
  location: string;
  "num.backers": string;
  state: string;
  title: string;
  type: string;
  url: string;
}

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const recordsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
        );
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(projects.length / recordsPerPage);
  const displayedProjects = projects.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="app-container">
      <h1 className="heading">Kickstarter Projects</h1>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : projects.length > 0 ? (
        <div className="table-container">
          <table className="table">
            <thead className="table-heading">
              <tr>
                <th>S.NO.</th>
                <th>PERCENTAGE FUNDED</th>
                <th>AMOUNT PLEDGED</th>
              </tr>
            </thead>
            <tbody>
              {displayedProjects.map((project, index) => (
                <tr key={project["s.no"]}>
                  <td>{(currentPage - 1) * recordsPerPage + index + 1}</td>
                  <td className="percent">{project["percentage.funded"]}%</td>
                  <td>
                    {`₹${new Intl.NumberFormat("en-IN").format(
                      project["amt.pledged"]
                    )}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <div className="page-marker">
              <p>
                {`Showing ${
                  (currentPage - 1) * recordsPerPage + 1
                } - ${Math.min(
                  currentPage * recordsPerPage,
                  projects.length
                )} of ${projects.length}`}
              </p>
            </div>

            <div className="pagination-btns">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                <img src="./chevron-left-solid.svg" alt="" />
              </button>
              <p className="page-number">
                {currentPage} / {totalPages}
              </p>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                <img src="chevron-right-solid.svg" alt="" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-data">No projects available</div>
      )}
    </div>
  );
};

export default App;
