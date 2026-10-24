import { useMutation } from "@tanstack/react-query";
import { useNotifications } from "../context/NotificationContext.jsx";
import apiClient from "../services/apiClient.js";

export default function NotificationItem({ notification, onClose }) {
  const { dispatch } = useNotifications();
  const { mutate: markRead } = useMutation({
    mutationFn: id => apiClient.patch(`/api/notifications/${id}/read`),
    onMutate: id => {
      dispatch({ type: "MARK_READ", payload: id });
    },
    onError: error => {
      console.error("[NotificationItem] mark-read error:", error);
      apiClient
        .get("/api/notifications")
        .then(response =>
          dispatch({ type: "LOAD_NOTIFICATIONS", payload: response.data })
        )
        .catch(fetchError =>
          console.error("[NotificationItem] rollback fetch error:", fetchError)
        );
    },
  });

  function handleClick() {
    if (!notification.isRead) {
      markRead(notification.id);
    }
    onClose();
  }

  return (
    <li
      onClick={handleClick}
      onKeyDown={event => {
        if (event.key === "Enter" || event.key === " ") handleClick();
      }}
      role="button"
      tabIndex={0}
      style={{
        display: "flex",
        gap: "0.75rem",
        padding: "0.85rem 1rem",
        borderBottom: "1px solid #f3f4f6",
        cursor: "pointer",
        background: notification.isRead ? "#fff" : "#eff6ff",
      }}
    >
      {!notification.isRead && (
        <span
          aria-label="Unread"
          style={{
            flexShrink: 0,
            width: 8,
            height: 8,
            marginTop: 6,
            borderRadius: "50%",
            background: "#3b82f6",
          }}
        />
      )}
      <div>
        <p style={{ margin: "0 0 2px", fontSize: "0.875rem" }}>
          {notification.message}
        </p>
        <time style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
          {new Date(notification.createdAt || notification.timestamp).toLocaleString()}
        </time>
      </div>
    </li>
  );
}
