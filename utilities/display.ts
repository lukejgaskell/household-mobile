export function displayDate(val: string | undefined) {
  if (!val) {
    return '';
  }

  const date = new Date(val);
  const [year, month, day] = date.toISOString().substring(0, 10).split('-');
  return `${month}/${day}/${year}`;
}
