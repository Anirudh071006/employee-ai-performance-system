import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);

  const [aiResult, setAiResult] = useState("");
  const [searchDepartment, setSearchDepartment] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    skills: "",
    performanceScore: "",
    experience: "",
  });

  const searchEmployees = async () => {
    try {
      const response = await axios.get(
        `https://employee-ai-performance-system.onrender.com/api/employees/search?department=${searchDepartment}`
      );

      setEmployees(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "https://employee-ai-performance-system.onrender.com/api/employees"
      );

      setEmployees(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://employee-ai-performance-system.onrender.com/api/employees",
        {
          ...formData,
          skills: formData.skills.split(","),
        }
      );

      alert("Employee Added Successfully");

      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  const updatePerformance = async (id) => {
    const newScore = prompt("Enter New Performance Score");

    if (!newScore) return;

    try {
      await axios.put(
        `https://employee-ai-performance-system.onrender.com/api/employees/${id}`,
        {
          performanceScore: newScore,
        }
      );

      alert("Performance Updated");

      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(
        `https://employee-ai-performance-system.onrender.com/api/employees/${id}`
      );

      alert("Employee Deleted Successfully");

      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  const getAIRecommendation = async (employee) => {
    try {
      const response = await axios.post(
        "https://employee-ai-performance-system.onrender.com/api/ai/recommend",
        employee
      );

      setAiResult(response.data.recommendation);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">
        AI Employee Performance Analytics System
      </h1>

      {/* FORM */}

      <div className="form-container">
        <h2>Add Employee</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <input
              type="text"
              name="name"
              placeholder="Employee Name"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />

            <input
              type="text"
              name="department"
              placeholder="Department"
              onChange={handleChange}
            />

            <input
              type="text"
              name="skills"
              placeholder="Skills (comma separated)"
              onChange={handleChange}
            />

            <input
              type="number"
              name="performanceScore"
              placeholder="Performance Score"
              onChange={handleChange}
            />

            <input
              type="number"
              name="experience"
              placeholder="Years of Experience"
              onChange={handleChange}
            />
          </div>

          <br />

          <button type="submit">Add Employee</button>
        </form>
      </div>

      {/* SEARCH + VIEW */}

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "25px",
          marginBottom: "25px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <button onClick={fetchEmployees}>
          View All Employees
        </button>

        <input
          type="text"
          placeholder="Search by Department"
          value={searchDepartment}
          onChange={(e) => setSearchDepartment(e.target.value)}
        />

        <button onClick={searchEmployees}>
          Search
        </button>

        <button onClick={fetchEmployees}>
          Reset
        </button>
      </div>

      {/* EMPLOYEE LIST */}

      <div className="employee-section">
        <h2>Employee List</h2>

        <div className="employee-grid">
          {employees.map((employee) => (
            <div className="employee-card" key={employee._id}>
              <h3>{employee.name}</h3>

              <p>
                <strong>Email:</strong> {employee.email}
              </p>

              <p>
                <strong>Department:</strong> {employee.department}
              </p>

              <p>
                <strong>Skills:</strong>{" "}
                {employee.skills.join(", ")}
              </p>

              <p>
                <strong>Performance:</strong>{" "}
                {employee.performanceScore}
              </p>

              <p>
                <strong>Experience:</strong>{" "}
                {employee.experience} years
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() =>
                    getAIRecommendation(employee)
                  }
                >
                  Get AI Recommendation
                </button>

                <button
                  style={{
                    backgroundColor: "green",
                  }}
                  onClick={() =>
                    updatePerformance(employee._id)
                  }
                >
                  Update Score
                </button>

                <button
                  style={{
                    backgroundColor: "red",
                  }}
                  onClick={() =>
                    deleteEmployee(employee._id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI RESULT */}

      <div className="ai-box">
        <h2>AI Recommendation</h2>

        <p>{aiResult}</p>
      </div>
    </div>
  );
}

export default App;