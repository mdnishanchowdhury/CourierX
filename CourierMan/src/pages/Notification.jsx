const Notification = () => {
    const notifications = [
      "Your parcel has been shipped!",
      "Payment received successfully.",
      "New delivery assigned.",
    ];
  
    const itemClass =
      "px-6 py-4 hover:bg-yellow-100 transition-colors text-base";
  
    return (
      <div className="fixed top-20 right-10 w-[400px] bg-white border border-gray-200 shadow-2xl rounded-2xl z-50">
        <div className="p-6 border-b border-gray-200 font-bold text-gray-900 text-lg">
          Notifications
        </div>
        <ul className="max-h-[400px] overflow-y-auto">
          {notifications.map((note, idx) => (
            <li key={idx} className={itemClass}>
              {note}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Notification;
  