// import { useEffect, useState } from "react";

// function DashboardHeader({ user }) {
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const greeting = () => {
//     const hour = currentTime.getHours();

//     if (hour < 12) return "Good Morning";
//     if (hour < 17) return "Good Afternoon";
//     return "Good Evening";
//   };

//   const formattedDate = currentTime.toLocaleDateString("en-NG", {
//     weekday: "long",
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });

//   const formattedTime = currentTime.toLocaleTimeString("en-NG", {
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: true,
//   });

//   return (
//     <div className="admin-card mb-4">
//       <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
//         <div>
//           <h3 className="fw-bold mb-1">
//             {greeting()}, {user?.name?.split(" ")[0]} 👋
//           </h3>

//           <p className="text-secondary mb-0">{formattedDate}</p>
//         </div>

//         <div className="text-end">
//           <h2
//             className="fw-bold text-danger mb-0"
//             style={{
//               fontFamily: "monospace",
//               letterSpacing: "2px",
//             }}
//           >
//             {formattedTime}
//           </h2>

//           <small className="text-secondary">Last updated: Live</small>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DashboardHeader;

import { useEffect, useState } from "react";
import { Wifi, Clock, RefreshCcw } from "lucide-react";

function DashboardHeader({ user }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastSync, setLastSync] = useState(new Date());

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate live synchronization every 15 seconds
  useEffect(() => {
    const sync = setInterval(() => {
      setLastSync(new Date());
    }, 15000);

    return () => clearInterval(sync);
  }, []);

  function getTimeAgo(date) {
    const diff = Math.floor((Date.now() - date.getTime()) / 1000);

    if (diff < 5) return "Just now";
    if (diff < 60) return `${diff} sec ago`;

    const mins = Math.floor(diff / 60);

    if (mins < 60) return `${mins} min ago`;

    const hrs = Math.floor(mins / 60);

    return `${hrs} hr ago`;
  }

  const greeting = () => {
    const hour = currentTime.getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
      {/* Left Side */}
      <div>
        {/* <h3 className="fw-bold mb-1">Dashboard</h3> */}

        <p className="text-secondary mb-0">Welcome back Admin.</p>
        <div>
          {" "}
          <h4 className="fw-bold mb-1">
            {greeting()}, {user?.name?.split(" ")[0]} 👋
          </h4>
        </div>
      </div>

      {/* Right Side */}
      <div className="d-flex flex-wrap align-items-center gap-3">
        {/* LIVE */}
        <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill bg-success-subtle">
          <span
            className="rounded-circle bg-success"
            style={{
              width: 10,
              height: 10,
              animation: "pulse 1.5s infinite",
            }}
          ></span>

          <span className="fw-semibold text-success">LIVE</span>
        </div>

        {/* Clock */}
        <div className="d-flex align-items-center gap-2 text-secondary">
          <Clock size={18} />

          <span>{currentTime.toLocaleTimeString()}</span>
        </div>

        {/* Date */}
        <div className="text-secondary">
          {currentTime.toLocaleDateString(undefined, {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>

        {/* Sync */}
        <div className="d-flex align-items-center gap-2 text-secondary">
          <RefreshCcw size={17} />

          <small>Last sync: {getTimeAgo(lastSync)}</small>
        </div>

        {/* Connection */}
        <div className="d-flex align-items-center gap-2 text-success">
          <Wifi size={18} />

          <small>Connected</small>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
