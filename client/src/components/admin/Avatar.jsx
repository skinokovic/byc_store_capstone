// const INITIAL_COLORS = [
//   "#dc3545",
//   "#fd7e14",
//   "#20c997",
//   "#0dcaf0",
//   "#6f42c1",
//   "#d63384",
// ];

// function getInitials(name = "") {
//   const parts = name.trim().split(/\s+/);
//   if (parts.length === 0 || !parts[0]) return "?";
//   return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
// }

// function getColorForName(name = "") {
//   const charSum = name
//     .split("")
//     .reduce((sum, char) => sum + char.charCodeAt(0), 0);
//   return INITIAL_COLORS[charSum % INITIAL_COLORS.length];
// }

// // The backend stores avatar as a relative path like "/uploads/avatars/x.jpg",
// // which needs the backend's own origin prepended - VITE_API_URL includes
// // "/api", which this strips off, since static files aren't under /api.
// function getAvatarUrl(avatarPath) {
//   if (!avatarPath) return null;
//   const apiOrigin = import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "");
//   return `${apiOrigin}${avatarPath}`;
// }

// function Avatar({ src, name, size = 36 }) {
//   const resolvedSrc = getAvatarUrl(src);

//   if (resolvedSrc) {
//     return (
//       <img
//         src={resolvedSrc}
//         alt={name ? `${name}'s avatar` : "User avatar"}
//         className="rounded-circle flex-shrink-0"
//         style={{ width: size, height: size, objectFit: "cover" }}
//       />
//     );
//   }

//   return (
//     <div
//       className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 fw-semibold text-white"
//       style={{
//         width: size,
//         height: size,
//         backgroundColor: getColorForName(name),
//         fontSize: size * 0.4,
//       }}
//       aria-hidden="true"
//     >
//       {getInitials(name)}
//     </div>
//   );
// }

// export default Avatar;

const INITIAL_COLORS = [
  "#dc3545",
  "#fd7e14",
  "#20c997",
  "#0dcaf0",
  "#6f42c1",
  "#d63384",
];

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return "?";
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
}

function getColorForName(name = "") {
  const charSum = name
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return INITIAL_COLORS[charSum % INITIAL_COLORS.length];
}

// `src` is now a full Cloudinary URL (e.g. "https://res.cloudinary.com/...")
// rather than a relative backend path - no origin-prefixing needed anymore,
// unlike the earlier local-disk version.
function Avatar({ src, name, size = 36 }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name ? `${name}'s avatar` : "User avatar"}
        className="rounded-circle flex-shrink-0"
        style={{ width: size, height: size, objectFit: "cover" }}
      />
    );
  }

  return (
    <div
      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 fw-semibold text-white"
      style={{
        width: size,
        height: size,
        backgroundColor: getColorForName(name),
        fontSize: size * 0.4,
      }}
      aria-hidden="true"
    >
      {getInitials(name)}
    </div>
  );
}

export default Avatar;
