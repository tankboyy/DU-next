export const checkedGameName = (gameName: string) => {
	if (gameName === "책마루" || gameName === "보드게임") return false
	return true
}
