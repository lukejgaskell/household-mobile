export function getScore(activity, userId) {
  return activity
    .filter(a => a.createdById !== userId)
    .reduce((acc, curr) => {
      return acc + curr?.points;
    }, 0);
}
