const useEndTime = (startTime: Date, plus: number): number => {
	const endTime = new Date(startTime)
	endTime.setMinutes(endTime.getMinutes() + plus)
	return Math.floor((endTime.getTime() - new Date().getTime())/ 1000 / 60)
}

export const getTime = (): string => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const day = today.getDate();
  const formattedDay = day < 10 ? `0${day}` : day;
  const hours = today.getHours();
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const minutes = today.getMinutes();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedMonth}${formattedDay}${formattedHours}${formattedMinutes}`;
}


export default useEndTime
