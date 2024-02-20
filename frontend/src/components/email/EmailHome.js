import React, { useState } from "react";

import EmailAdmin from "./EmailAdmin";

import EmailInstructor from "./EmailInstructor";
import EmailHistory from "./EmailHistory";

const EmailHome = () => {
  const [currentTab, setCurrentTab] = useState("1");

  const tabs = [
    {
      id: 1,
      tabTitle: "Send Email To Admin",
      content: (
        <div>
          <EmailAdmin />
        </div>
      ),
    },
    {
      id: 2,
      tabTitle: "Send Email To Instructor",
      content: (
        <div>
          <EmailInstructor />
        </div>
      ),
    },
    {
      id: 3,
      tabTitle: "Sent Emails",
      content: (
        <div>
          <EmailHistory />
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
              className="Tabsbutton"
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

export default EmailHome;
