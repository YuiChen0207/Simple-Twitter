export function formatTime(timestamp) {
  const currentTime = new Date();
  const postTime = new Date(timestamp);

  const diffInMilliseconds = currentTime - postTime;
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));

  if (diffInHours < 1) {
    return "剛剛";
  } else {
    return `${diffInHours}小時`;
  }
}
