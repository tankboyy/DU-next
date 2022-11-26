function useGetYMD(date: Date) {
	const year = date.getFullYear()
	let month: string | number = date.getMonth()

	if (month < 9) {
		month = `0${month + 1}`
	} else month = `${month + 1}`
	let day: string | number = date.getDate()
	if (day < 10) day = `0${day}`
	return `${year}.${month}.${day}`
}

export default useGetYMD
