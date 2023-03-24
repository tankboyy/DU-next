export default function useAge(birthYear: string) {
  const currentYear = new Date().getFullYear();
  return currentYear - parseInt(birthYear);
}
