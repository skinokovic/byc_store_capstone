function Button({ variant = "solid-btn", className = "", children, style }) {
  return (
    <button className={`${variant} ` + className} style={style}>
      {children}
    </button>
  );
}

export default Button;
