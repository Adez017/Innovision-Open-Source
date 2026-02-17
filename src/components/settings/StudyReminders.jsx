"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Bell, BellOff, Plus, Trash2, Clock, Calendar,
  CheckCircle, XCircle, AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import {
  isNotificationSupported,
  requestNotificationPermission,
  getNotificationPermission,
  getReminders,
  addReminder,
  deleteReminder,
  toggleReminder,
  sendNotification,
  startReminderChecker,
  getRandomReminderMessage,
} from "@/lib/notifications";

const DAYS = [
  { value: 0, label: "Sun" },
  { value: 1, label: "Mon" },
  { value: 2, label: "Tue" },
  { value: 3, label: "Wed" },
  { value: 4, label: "Thu" },
  { value: 5, label: "Fri" },
  { value: 6, label: "Sat" },
];

export default function StudyReminders() {
  const [permission, setPermission] = useState("default");
  const [reminders, setReminders] = useState([]);
  const [selectedHour, setSelectedHour] = useState("09");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedPeriod, setSelectedPeriod] = useState("AM");
  const [selectedDays, setSelectedDays] = useState([1, 2, 3, 4, 5]); // Mon-Fri default
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    setIsSupported(isNotificationSupported());
    setPermission(getNotificationPermission());
    setReminders(getReminders());

    // Start the reminder checker
    if (getNotificationPermission() === "granted") {
      startReminderChecker();
    }
  }, []);

  const handleRequestPermission = async () => {
    const result = await requestNotificationPermission();
    setPermission(result.permission || "denied");

    if (result.granted) {
      toast.success("Notifications enabled!");
      startReminderChecker();

      // Send a test notification
      sendNotification("Notifications Enabled! 🎉", {
        body: "You'll now receive study reminders at your scheduled times.",
      });
    } else {
      toast.error("Notification permission denied");
    }
  };

  const handleAddReminder = () => {
    if (selectedDays.length === 0) {
      toast.error("Please select at least one day");
      return;
    }

    // Convert to 24-hour format
    let hour = parseInt(selectedHour);
    if (selectedPeriod === "PM" && hour !== 12) hour += 12;
    if (selectedPeriod === "AM" && hour === 12) hour = 0;
    const time24 = `${String(hour).padStart(2, "0")}:${selectedMinute}`;

    const reminder = addReminder({
      time: time24,
      displayTime: `${selectedHour}:${selectedMinute} ${selectedPeriod}`,
      days: selectedDays,
    });

    setReminders([...reminders, reminder]);
    toast.success("Reminder added!");
  };

  const handleDeleteReminder = (id) => {
    deleteReminder(id);
    setReminders(reminders.filter(r => r.id !== id));
    toast.success("Reminder deleted");
  };

  const handleToggleReminder = (id) => {
    toggleReminder(id);
    setReminders(reminders.map(r =>
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ));
  };

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const formatDays = (days) => {
    if (days.length === 7) return "Every day";
    if (days.length === 5 && !days.includes(0) && !days.includes(6)) return "Weekdays";
    if (days.length === 2 && days.includes(0) && days.includes(6)) return "Weekends";
    return days.map(d => DAYS.find(day => day.value === d)?.label).join(", ");
  };

  const sendTestNotification = () => {
    sendNotification("Test Notification 🔔", {
      body: "Your study reminders are working correctly!",
    });
    toast.success("Test notification sent!");
  };

  if (!isSupported) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellOff className="h-5 w-5 text-muted-foreground" />
            Study Reminders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Your browser doesn't support notifications. Try using a modern browser like Chrome or Firefox.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-blue-500" />
          Study Reminders
        </CardTitle>
        <CardDescription>
          Set up notifications to remind you to study at your preferred times
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Permission Status */}
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-3">
            {permission === "granted" ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : permission === "denied" ? (
              <XCircle className="h-5 w-5 text-red-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-yellow-500" />
            )}
            <div>
              <p className="font-medium">
                {permission === "granted"
                  ? "Notifications Enabled"
                  : permission === "denied"
                    ? "Notifications Blocked"
                    : "Notifications Not Enabled"}
              </p>
              <p className="text-sm text-muted-foreground">
                {permission === "granted"
                  ? "You'll receive study reminders"
                  : permission === "denied"
                    ? "Please enable in browser settings"
                    : "Enable to receive study reminders"}
              </p>
            </div>
          </div>
          {permission !== "granted" && (
            <Button onClick={handleRequestPermission} size="sm">
              Enable
            </Button>
          )}
          {permission === "granted" && (
            <div className="flex gap-2">
              <Button onClick={sendTestNotification} variant="outline" size="sm">
                Test
              </Button>
              <Button
                onClick={() => {
                  const message = getRandomReminderMessage();
                  sendNotification(message.title, { body: message.body });
                  toast.success("Notification sent!");
                }}
                variant="outline"
                size="sm"
              >
                Send Now
              </Button>
            </div>
          )}
        </div>

        {permission === "granted" && (
          <>
            {/* Add New Reminder */}
            <div className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Reminder
              </h4>

              {/* Time Selection */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  Time
                </Label>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedHour}
                    onChange={(e) => setSelectedHour(e.target.value)}
                    className="h-10 px-3 rounded-md border bg-background text-sm"
                  >
                    {Array.from({ length: 12 }, (_, i) => {
                      const hour = String(i + 1).padStart(2, "0");
                      return <option key={hour} value={hour}>{hour}</option>;
                    })}
                  </select>
                  <span className="text-lg font-bold">:</span>
                  <select
                    value={selectedMinute}
                    onChange={(e) => setSelectedMinute(e.target.value)}
                    className="h-10 px-3 rounded-md border bg-background text-sm"
                  >
                    {Array.from({ length: 60 }, (_, i) => {
                      const min = String(i).padStart(2, "0");
                      return <option key={min} value={min}>{min}</option>;
                    })}
                  </select>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="h-10 px-3 rounded-md border bg-background text-sm"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>

              {/* Day Selection */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Repeat on
                </Label>
                <div className="flex gap-1.5 flex-wrap">
                  {DAYS.map((day) => (
                    <Button
                      key={day.value}
                      variant={selectedDays.includes(day.value) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleDay(day.value)}
                      className="w-11 h-9"
                    >
                      {day.label}
                    </Button>
                  ))}
                </div>
              </div>

              <Button onClick={handleAddReminder} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Reminder
              </Button>
            </div>

            {/* Existing Reminders */}
            <div className="space-y-3">
              <h4 className="font-medium">Your Reminders</h4>

              {reminders.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No reminders set</p>
                  <p className="text-sm">Add a reminder to get started</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {reminders.map((reminder) => (
                    <div
                      key={reminder.id}
                      className={`flex items-center justify-between p-3 rounded-lg border ${reminder.enabled ? "bg-card" : "bg-muted/50 opacity-60"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={reminder.enabled}
                          onCheckedChange={() => handleToggleReminder(reminder.id)}
                        />
                        <div>
                          <p className="font-medium">{reminder.displayTime || reminder.time}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDays(reminder.days)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteReminder(reminder.id)}
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
