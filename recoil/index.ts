import { uniqWith } from "@toss/utils";
import { atom, selector } from "recoil";

export const playersState = atom<string[]>({
	key: 'playersState',
	default: []
})

export const filterPlayers = selector<string[]>({
	key: 'filterPlayers',
	get: ({get}) => {

		const prev = get(playersState);

		return uniqWith<string>(prev, (a, b) => a === b)
	}
})
