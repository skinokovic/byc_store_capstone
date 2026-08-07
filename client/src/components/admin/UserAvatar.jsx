// Deterministic color per user - same name always gets the same color,
// so an avatar doesn't randomly change color on re-render.
const AVATAR_COLORS = [
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
  return AVATAR_COLORS[charSum % AVATAR_COLORS.length];
}

function UserAvatar({ name, size = 36 }) {
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

export default UserAvatar;
