const NotificationsTab = ({
  tabs,
  activeTab,
  handleTabClick,
  handleClickInsideModal,
}) => {
  return (
    <div className="flex items-center w-full" onClick={handleClickInsideModal}>
      {tabs.map((tab) => (
        <div
          className={`text-black cursor-pointer text-base flex justify-between w-full items-center text-center mt-2 ${
            activeTab === tab.id && "border-b-4 border-primary-red-600"
          }`}
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
        >
          <span className={`text-black text-base w-full`}>{tab.label}</span>
        </div>
      ))}
    </div>
  );
};

export default NotificationsTab;
