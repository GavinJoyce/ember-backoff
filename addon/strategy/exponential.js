export default function(initialWait, retryCount) {
 return Math.pow(2, retryCount) * initialWait;
}
