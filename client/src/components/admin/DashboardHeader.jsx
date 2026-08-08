// import { useEffect, useState } from "react";
// import { Wifi, Clock, RefreshCcw } from "lucide-react";

// function DashboardHeader({ user }) {
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [lastSync, setLastSync] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     const sync = setInterval(() => {
//       setLastSync(new Date());
//     }, 15000);

//     return () => clearInterval(sync);
//   }, []);

//   function getTimeAgo(date) {
//     const diff = Math.floor((Date.now() - date.getTime()) / 1000);

//     if (diff < 5) return "Just now";
//     if (diff < 60) return `${diff}s ago`;

//     const mins = Math.floor(diff / 60);

//     if (mins < 60) return `${mins}m ago`;

//     const hrs = Math.floor(mins / 60);

//     return `${hrs}h ago`;
//   }

//   const greeting = () => {
//     const hour = currentTime.getHours();

//     if (hour < 12) return "Good Morning";
//     if (hour < 17) return "Good Afternoon";
//     return "Good Evening";
//   };

//   return (
//     <div className="card border-0 shadow-sm mb-4">
//       <div className="card-body">
//         <div className="row g-3 align-items-center">
//           {/* LEFT */}
//           <div className="col-12 col-lg-5">
//             <p className="text-secondary mb-1 small">Welcome back Admin.</p>

//             <h3 className="fw-bold mb-0">
//               {greeting()}, {user?.name?.split(" ")[0]} 👋
//             </h3>
//           </div>

//           {/* RIGHT */}
//           <div className="col-12 col-lg-7">
//             <div className="d-flex flex-wrap gap-2 justify-content-lg-end">
//               <div className="badge rounded-pill bg-success-subtle text-success px-3 py-2 d-flex align-items-center gap-2">
//                 <span
//                   className="rounded-circle bg-success"
//                   style={{
//                     width: 8,
//                     height: 8,
//                     animation: "pulse 1.5s infinite",
//                   }}
//                 />
//                 LIVE
//               </div>

//               <div className="badge bg-body-secondary text-body px-3 py-2 d-flex align-items-center gap-2">
//                 <Clock size={14} />
//                 {currentTime.toLocaleTimeString()}
//               </div>

//               <div className="badge bg-body-secondary text-body px-3 py-2">
//                 {currentTime.toLocaleDateString(undefined, {
//                   weekday: "short",
//                   day: "numeric",
//                   month: "short",
//                 })}
//               </div>

//               <div className="badge bg-body-secondary text-body px-3 py-2 d-flex align-items-center gap-2">
//                 <RefreshCcw size={14} />

//                 {getTimeAgo(lastSync)}
//               </div>

//               <div className="badge bg-success-subtle text-success px-3 py-2 d-flex align-items-center gap-2">
//                 <Wifi size={14} />
//                 Connected
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DashboardHeader;

import { useEffect, useState } from "react";
import { Wifi, Clock, RefreshCcw, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./DashboardHeader.css";

function DashboardHeader({ user }) {
  const navigate = useNavigate();

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
    <div className="dashboard-header d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
      {/* LEFT SIDE */}
      <div>
        <p className="text-secondary mb-0">Welcome back Admin.</p>

        <h4 className="fw-bold mb-1">
          {greeting()}, {user?.name?.split(" ")[0]} 👋
        </h4>
      </div>

      {/* RIGHT SIDE */}
      <div className="d-flex flex-wrap align-items-center gap-2">
        {/* VIEW STORE BUTTON */}
        <button
          type="button"
          className="dashboard-home-btn"
          onClick={() => navigate("/")}
        >
          <Store size={17} />
          <span>View Store</span>
        </button>

        {/* LIVE */}
        <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill bg-success-subtle">
          <span
            className="rounded-circle bg-success"
            style={{
              width: 10,
              height: 10,
              animation: "pulse 1.5s infinite",
            }}
          />

          <span className="fw-semibold text-success">LIVE</span>
        </div>

        {/* CLOCK */}
        <div className="d-flex align-items-center gap-2 text-secondary">
          <Clock size={18} />

          <span>{currentTime.toLocaleTimeString()}</span>
        </div>

        {/* DATE */}
        <div className="text-secondary">
          {currentTime.toLocaleDateString(undefined, {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>

        {/* SYNC */}
        <div className="d-flex align-items-center gap-2 text-secondary">
          <RefreshCcw size={17} />

          <small>Last sync: {getTimeAgo(lastSync)}</small>
        </div>

        {/* CONNECTION */}
        <div className="d-flex align-items-center gap-2 text-success">
          <Wifi size={18} />

          <small>Connected</small>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
