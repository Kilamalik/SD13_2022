import React, { useState } from "react";

import AdminUpdate from "../Admin/AdminUpdate";
import AdminCreate from "../Admin/AdminCreate";
import InstructorUpdate from "../Instructor/InstructorUpdate";
import InstructorView from "../Instructor/InstuctorView";
import InstructorCreate from "../Instructor/InstructorCreate";
import AdminView from "../Admin/AdminView";

const Home = () => {
  const [currentTab, setCurrentTab] = useState("1");

  const tabs = [
    {
      id: 1,
      tabTitle: "View All Admin",
      content: (
        <div>
          <AdminView />
        </div>
      ),
    },
    {
      id: 2,
      tabTitle: "View All Instructors",
      content: (
        <div>
          <InstructorView />
        </div>
      ),
    },
    {
      id: 3,
      tabTitle: "Admin",
      
      title: "Create Admin",
      content: (
        <div>
          <AdminCreate />
        </div>
      ),
    },
    {
      id: 4,
      tabTitle: "Instructor",
      title: "Create Instructor",
      content: (
        <div>
          <InstructorCreate />
        </div>
      ),
    },
    {
      id: 5,
      title: "Update Admin",
      tabTitle: "Update Admin",
      content: (
        <div>
          <AdminUpdate />
        </div>
      ),
    },
    {
      id: 6,
      tabTitle: "Update Instructor",
      title: "Update Instructor",
      content: (
        <div>
          <InstructorUpdate />
        </div>
      ),
    },
  ];

  const handleTabClick = (e) => {
    setCurrentTab(e.target.id);
  };

  return (
    <div>
      <div className="myTabs">
        <div className="tabs">
          {tabs.map((tab, i) => (
            <button
              className="btn btn-primary"
              key={i}
              id={tab.id}
              disabled={currentTab === `${tab.id}`}
              onClick={handleTabClick}
            >
              {tab.tabTitle}
            </button>
          ))}
        </div>
        <div className="content">
          {tabs.map((tab, i) => (
            <div key={i}>
              {currentTab === `${tab.id}` && (
                <div>
                  <h3 className="title">{tab.title}</h3>
                  {tab.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
