import useGetYMD from "./useGetYMD";

const useGetYMDHM = (date: Date) => {
	const YMD = useGetYMD(date)
	let hours: string | number = date.getHours()
	if (hours < 10) hours = `0${hours}`
	let minutes: string | number = date.getMinutes()
	if (minutes < 10) minutes = `0${minutes}`
	let seconds: string | number = date.getSeconds()
	if (minutes < 10) seconds = `0${seconds}`
	return `${YMD} ${hours}:${minutes}`
}

export default useGetYMDHM
