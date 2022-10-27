import axios from "axios";
import { User } from "../components/friendsSearch";
import { chosungIncludes } from "@toss/hangul";

type IdSearchType = {
	userData: User[]
	cho: string
}

export const useIdSearchToss = (props: {search: string; userData: User[] | undefined}) => {
		const users = props.userData
		const arr: User[] = []
		const filIds: string[] = []
	if (props.search !== "") {
		users!.forEach(user => {
			if (chosungIncludes(user.userId, props.search)) {
				arr.push(user)
				filIds.push(user.userId)
			}
		})

	}
		return {arr, filIds}
}
