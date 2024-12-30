import React, { useState, useEffect } from "react";
import Transaction from "./Transaction";

const UserFunction = ({ reservations, handleDetailClick }) => {
  const tabs = [
    { name: "Lịch sử giao dịch", id: "transaction" },
    { name: "Thông tin cá nhân", id: "profile" },
    { name: "Thông báo", id: "notification" },
    { name: "Quà tặng", id: "reward" },
    { name: "Chính sách", id: "policy" },
  ];

  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const currentHash = window.location.hash.replace("#", "") || tabs[0].id;
    setActiveTab(currentHash);
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    window.location.hash = `#${tabId}`;
  };

  const renderContent = () => {
    switch (activeTab) {
      case "transaction":
        return (
          <Transaction
            reservations={reservations}
            handleDetailClick={handleDetailClick}
          />
        );
      case "profile":
        return <div>Profile Information Content</div>;
      case "notification":
        return <div>Notifications Content</div>;
      case "reward":
        return <div>Rewards Content</div>;
      case "policy":
        return <div>Policy Content</div>;
      default:
        return <div>Select a tab to view its content.</div>;
    }
  };

  return (
    <div className="account-nav relative">
      <ul
        className="flex flex-nowrap mb-0 list-none flex-row whitespace-nowrap"
        role="tablist"
      >
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`px-2 pb-2 flex-auto text-center transition-all duration-300 cursor-pointer relative border-b border-[#a0a3a7] ${
              activeTab === tab.id ? "text-[#034EA2] font-bold" : ""
            }`}
            role="presentation"
          >
            <a
              className={`text-base not-italic block leading-normal transition-all duration-300 capitalize ${
                activeTab === tab.id ? "text-[#034EA2]" : "text-[#a0a3a7]"
              }`}
              href={`#${tab.id}`}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.name}
            </a>
            {activeTab === tab.id && (
              <div className="w-8 h-[2px] bg-[#034EA2] duration-300 transition-all ease-in-out absolute bottom-0 left-[50%] -translate-x-2/4"></div>
            )}
          </li>
        ))}
      </ul>

      <div className="tab-content mt-4">{renderContent()}</div>
    </div>
  );
};

export default UserFunction;
