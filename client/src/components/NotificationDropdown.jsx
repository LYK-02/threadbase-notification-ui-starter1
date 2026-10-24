import { useNotifications } from "../context/NotificationContext.jsx";
import NotificationItem from "./NotificationItem.jsx";

export default function NotificationDropdown({ onClose }) {
  const { state, dispatch } = useNotifications();
  const { notifications } = state;

  return (
    <div
      role="dialog"
      aria-label="Notifications"
      style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        right: 0,
        width: "360px",
        maxWidth: "calc(100vw - 2rem)",
        background: "#fff",
        color: "#1e293b",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
        zIndex: 50,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.8rem 1rem",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <strong>Notifications</strong>
        <button
          type="button"
          onClick={() => dispatch({ type: "MARK_ALL_READ" })}
          style={{
            border: "none",
            background: "none",
            color: "#4f46e5",
            cursor: "pointer",
            fontSize: "0.75rem",
          }}
        >
          Mark all as read
        </button>
      </div>
      {notifications.length > 0 ? (
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {notifications.map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onClose={onClose}
            />
          ))}
        </ul>
      ) : (
        <p style={{ margin: 0, padding: "1.25rem", color: "#64748b", fontSize: "0.875rem" }}>
          No notifications yet.
        </p>
      )}
    </div>
  );
}
