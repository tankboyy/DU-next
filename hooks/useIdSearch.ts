import hangul from "hangul-js";

interface types {
	search: string;
	cho: string[];
	userIds: string[];
}

type Ftype = (props: types) => string[]

export const useIdSearch: Ftype = (props) => {

	let arr: string[] = []
	if (props.search.split(" ").length > 1) {
		console.log(props.search.split(" "))
	}
	if (props.search !== "") {
		if (hangul.isConsonant(props.search)) {
			props.cho.forEach((item, i) => {
				if (item.includes(props.search)) arr.push(props.userIds[i])
			})
		} else {
			const result = (props.userIds.filter(id => id.includes(props.search)));
			arr = [...result];
		}
	} else arr = [];
	return arr
}
