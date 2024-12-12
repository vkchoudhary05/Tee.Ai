import React, { useState, useContext } from "react";
import "../styles/Dashboard.css";
import ChatWindow from "../components/Chatwindow";
import ChatHistory from "../components/ChatHistory";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

// Import Icons from React Icons
import { FaComments, FaHistory, FaFilePdf, FaImage, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMenuOption, setSelectedMenuOption] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleMenuClick = (menu) => {
    if (menu === "logout") {
      setUser(null);
      localStorage.removeItem("user");
      navigate("/");
    } else {
      setSelectedMenuOption(menu);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button
          className="toggle-btn"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "Close Menu" : "Open Menu"}
        </button>
        {isSidebarOpen && (
          <nav className="sidebar-menu">
            <a href="#chat" onClick={() => handleMenuClick("chat")}>
              <FaComments /> Chat with Tee.Ai
            </a>
            <a href="#chatHistory" onClick={() => handleMenuClick("chatHistory")}>
              <FaHistory /> Chat History
            </a>
            <a href="#askpdf" onClick={() => handleMenuClick("askpdf")}>
              <FaFilePdf /> Ask to PDF
            </a>
            <a href="#imageGenerate" onClick={() => handleMenuClick("imageGenerate")}>
              <FaImage /> Image Generate
            </a>
            <a href="#subscriptionInfo" onClick={() => handleMenuClick("subscriptionInfo")}>
              <FaInfoCircle /> Subscription Info
            </a>
            <a href="#termsCondition" onClick={() => handleMenuClick("termsCondition")}>
              <FaInfoCircle /> Terms & Conditions
            </a>
            <a href="#logout" onClick={() => handleMenuClick("logout")}>
              <FaSignOutAlt /> Logout
            </a>
          </nav>
        )}
      </div>

      <div className="dashboard">
        {/* Left Half: AI Image */}
        <div className="left-half">
          <img
            src="https://as1.ftcdn.net/v2/jpg/08/00/83/48/1000_F_800834842_jDSnC9OboQNpdupItFDNzam3U8aTBqp2.webp"
            alt="AI Robot"
            className="ai-image"
          />
        </div>

        {/* Right Half: Conditionally Render Logic */}
        <div className="right-half">
          {selectedMenuOption === "chat" ? (
            <ChatWindow user={user} />
          ) : selectedMenuOption === "chatHistory" ? (
            <ChatHistory />
          ) : (
            <div className="default-section">
            <h3>Welcome to Tee.Ai</h3>
            <p>
              {user ? (
                `User Information: ${user.countryCode} ${user.phoneNumber}`
              ) : (
                "No user information found. Please log in."
              )}
            </p>
            <p className="typing-text">How can I help you today?</p>
          </div>
          
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;














// import React, { useState, useContext } from "react";
// import "../styles/Dashboard.css";
// import ChatWindow from "../components/Chatwindow";
// import ChatHistory from "../components/ChatHistory";
// import { UserContext } from "../context/UserContext";
// import { useNavigate } from "react-router-dom";

// // Import Icons from React Icons
// import {
//   FaComments,
//   FaHistory,
//   FaFilePdf,
//   FaImage,
//   FaInfoCircle,
//   FaSignOutAlt,
//   FaUser,
// } from "react-icons/fa";

// const Dashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [selectedMenuOption, setSelectedMenuOption] = useState("");
//   const { user, setUser } = useContext(UserContext);
//   const navigate = useNavigate();

//   const handleMenuClick = (menu) => {
//     if (menu === "logout") {
//       setUser(null);
//       localStorage.removeItem("user");
//       navigate("/");
//     } else {
//       setSelectedMenuOption(menu);
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       {/* Sidebar */}
//       <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
//         <button
//           className="toggle-btn"
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         >
//           {isSidebarOpen ? "Close Menu" : "Open Menu"}
//         </button>
//         {isSidebarOpen && (
//           <nav className="sidebar-menu">
//             <a href="#chat" onClick={() => handleMenuClick("chat")}>
//               <FaComments /> Chat with Tee.Ai
//             </a>
//             <a href="#chatHistory" onClick={() => handleMenuClick("chatHistory")}>
//               <FaHistory /> Chat History
//             </a>
//             <a href="#askpdf" onClick={() => handleMenuClick("askpdf")}>
//               <FaFilePdf /> Ask to PDF
//             </a>
//             <a href="#imageGenerate" onClick={() => handleMenuClick("imageGenerate")}>
//               <FaImage /> Image Generate
//             </a>
//             <a href="#subscriptionInfo" onClick={() => handleMenuClick("subscriptionInfo")}>
//               <FaInfoCircle /> Subscription Info
//             </a>
//             <a href="#termsCondition" onClick={() => handleMenuClick("termsCondition")}>
//               <FaInfoCircle /> Terms & Conditions
//             </a>
//             <a href="#logout" onClick={() => handleMenuClick("logout")}>
//               <FaSignOutAlt /> Logout
//             </a>
//           </nav>
//         )}
//       </div>

//       <div className="dashboard">
//         {/* Left Half: AI Image */}
//         <div className="left-half">
//           <img
//             src="https://as1.ftcdn.net/v2/jpg/08/00/83/48/1000_F_800834842_jDSnC9OboQNpdupItFDNzam3U8aTBqp2.webp"
//             alt="AI Robot"
//             className="ai-image"
//           />
//         </div>

//         {/* Right Half: Conditionally Render Logic */}
//         <div className="right-half">
//           {/* User Info at Top-Right */}

//           {/* {selectedMenuOption!=="chat" && selectedMenuOption!=="chatHistory" &&( */}
          
//           <div className="user-info">
//             <FaUser className="user-info-icon" />
//             <span className="user-info-text">
//               {user
//                 ? `${user.countryCode} ${user.phoneNumber}`
//                 : "Guest User"}
//             </span>
//           </div>
//           {/* )} */}

//           {selectedMenuOption === "chat" ? (
//             <ChatWindow user={user} />
//           ) : selectedMenuOption === "chatHistory" ? (
//             <ChatHistory />
//           ) : (
//             <div className="default-section">
//               <h3>Welcome to Tee.Ai</h3>
//               <p className="typing-text">How can I help you today?</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
