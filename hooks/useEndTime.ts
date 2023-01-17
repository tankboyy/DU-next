const useEndTime = (startTime: Date, plus: number): number => {
	const endTime = new Date(startTime)
	endTime.setMinutes(endTime.getMinutes() + plus)
	return Math.floor((endTime.getTime() - new Date().getTime())/ 1000 / 60)
}

export const getTime = (): string => {
	let today = new Date();
	let month: string | number = today.getMonth() + 1
	if (month < 10) month = `0${month}`
	let day: string | number = today.getDate();
	if (day < 10) day = `0${day}`
	let hours: string | number = today.getHours();
	if (hours < 10) hours = `0${hours}`
	let minutes: string | number = today.getMinutes();
	if (minutes < 10) minutes = `0${minutes}`
	return `${month}${day}${hours}${minutes}`
}


export default useEndTime
