const Tabs = ({ tabs, activeTab, handleTabClick }) => {
  return (
    <>
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          className={
            activeTab === tab.id
              ? `w-max pl-4 pr-8 h-[51px] text-[15px] text-black font-semibold bg-white rounded-t-lg clip-path z-20 flex items-center ${
                  activeTab === tab.id && index > 0 ? "-ml-[26px]" : "ml-0"
                }`
              : `w-max pl-5 pr-8 text-[15px] h-[40px] text-black bg-[#E4E4E4] rounded-t-lg border border-white flex items-center ${
                  index > 0 ? "-ml-6" : "ml-0"
                }`
          }
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </>
  );
};

export default Tabs;
