// Study Reminder Notifications using Web Push API

const NOTIFICATION_KEY = "studyReminders";
const PERMISSION_KEY = "notificationPermission";

// Check if notifications are supported
export const isNotificationSupported = () => {
  return typeof window !== "undefined" && "Notification" in window;
};

// Request notification permission
export const requestNotificationPermission = async () => {
  if (!isNotificationSupported()) {
    return { granted: false, reason: "not_supported" };
  }

  try {
    const permission = await Notification.requestPermission();
    localStorage.setItem(PERMISSION_KEY, permission);
    return { granted: permission === "granted", permission };
  } catch (error) {
    console.error("Error requesting notification permission:", error);
    return { granted: false, reason: "error" };
  }
};

// Check current permission status
export const getNotificationPermission = () => {
  if (!isNotificationSupported()) return "not_supported";
  return Notification.permission;
};

// Send a notification
export const sendNotification = (title, options = {}) => {
  if (!isNotificationSupported() || Notification.permission !== "granted") {
    return null;
  }

  const defaultOptions = {
    icon: "/InnoVision_LOGO-removebg-preview.png",
    badge: "/InnoVision_LOGO-removebg-preview.png",
    vibrate: [200, 100, 200],
    tag: "study-reminder",
    renotify: true,
    ...options,
  };

  try {
    const notification = new Notification(title, defaultOptions);

    notification.onclick = () => {
      window.focus();
      notification.close();
      if (options.onClick) options.onClick();
    };

    return notification;
  } catch (error) {
    console.error("Error sending notification:", error);
    return null;
  }
};

// Get saved reminders
export const getReminders = () => {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem(NOTIFICATION_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Save reminders
export const saveReminders = (reminders) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(NOTIFICATION_KEY, JSON.stringify(reminders));
};

// Add a new reminder
export const addReminder = (reminder) => {
  const reminders = getReminders();
  const newReminder = {
    id: Date.now().toString(),
    enabled: true,
    createdAt: new Date().toISOString(),
    ...reminder,
  };
  reminders.push(newReminder);
  saveReminders(reminders);
  return newReminder;
};

// Update a reminder
export const updateReminder = (id, updates) => {
  const reminders = getReminders();
  const index = reminders.findIndex(r => r.id === id);
  if (index !== -1) {
    reminders[index] = { ...reminders[index], ...updates };
    saveReminders(reminders);
    return reminders[index];
  }
  return null;
};

// Delete a reminder
export const deleteReminder = (id) => {
  const reminders = getReminders();
  const filtered = reminders.filter(r => r.id !== id);
  saveReminders(filtered);
  return filtered;
};

// Toggle reminder enabled state
export const toggleReminder = (id) => {
  const reminders = getReminders();
  const reminder = reminders.find(r => r.id === id);
  if (reminder) {
    return updateReminder(id, { enabled: !reminder.enabled });
  }
  return null;
};

// Study reminder messages
const REMINDER_MESSAGES = [
  { title: "Time to Learn! 📚", body: "Your daily study session awaits. Let's make progress!" },
  { title: "Study Break Over! ⏰", body: "Ready to continue your learning journey?" },
  { title: "Don't Break Your Streak! 🔥", body: "Keep your streak alive with a quick study session." },
  { title: "Knowledge Awaits! 🧠", body: "A few minutes of learning can make a big difference." },
  { title: "Level Up Time! ⚡", body: "Earn XP and climb the leaderboard!" },
  { title: "Your Course Misses You! 💡", body: "Continue where you left off." },
];

// Get a random reminder message
export const getRandomReminderMessage = () => {
  return REMINDER_MESSAGES[Math.floor(Math.random() * REMINDER_MESSAGES.length)];
};

// Check and trigger due reminders
export const checkReminders = () => {
  const reminders = getReminders();
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const currentDay = now.getDay(); // 0 = Sunday, 6 = Saturday

  reminders.forEach(reminder => {
    if (!reminder.enabled) return;

    // Check if current day is in reminder days
    if (reminder.days && !reminder.days.includes(currentDay)) return;

    // Check if current time matches reminder time (within 1 minute window)
    if (reminder.time === currentTime) {
      const message = getRandomReminderMessage();
      sendNotification(message.title, {
        body: message.body,
        onClick: () => {
          window.location.href = "/roadmap";
        },
      });
    }
  });
};

// Start reminder checker (call this on app init)
let reminderInterval = null;

export const startReminderChecker = () => {
  if (reminderInterval) return;

  // Check every minute
  reminderInterval = setInterval(checkReminders, 60000);

  // Also check immediately
  checkReminders();
};

export const stopReminderChecker = () => {
  if (reminderInterval) {
    clearInterval(reminderInterval);
    reminderInterval = null;
  }
};
