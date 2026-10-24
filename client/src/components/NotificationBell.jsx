import { useEffect, useRef, useState } from "react";
import { useNotifications } from "../context/NotificationContext.jsx";
import NotificationDropdown from "./NotificationDropdown.jsx";

export default function NotificationBell() {
  const { state } = useNotifications();
  const { unreadCount } = state;
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    function handleMouseDown(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [open]);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(previousOpen => !previousOpen)}
        style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.3rem", color: "#fff" }}
        aria-label={`Notifications, ${unreadCount} unread`}
      >
        🔔
      </button>
      {unreadCount > 0 && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-4px",
            right: "-4px",
            minWidth: "16px",
            height: "16px",
            padding: "0 3px",
            borderRadius: "999px",
            background: "#ef4444",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.65rem",
            fontWeight: 700,
          }}
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
      {open && <NotificationDropdown onClose={() => setOpen(false)} />}
    </div>
  );
}
