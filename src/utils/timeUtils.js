export function formatTime(timestamp) {
  const currentTime = new Date();
  const postTime = new Date(timestamp);

  const diffInMilliseconds = currentTime - postTime;
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));

  if (diffInHours < 1) {
    return "Just now";
  } else {
    return `${diffInHours} hours ago`;
  }
}

export const formatDate = (timeString) => {
  const date = new Date(timeString);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const period = hours < 12 ? "AM" : "PM";

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthName = monthNames[month];

  return `${formattedHours}:${formattedMinutes} ${period} ‧ ${monthName} ${day}, ${year}`;
};
