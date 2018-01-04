export default function(initialWait, retryCount) {
  return (retryCount + 1) * initialWait;
}
