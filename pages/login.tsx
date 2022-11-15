import Login from "../components/login";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/user";

export default function loginPage() {
	const userValue = useRecoilValue(userState)
	return (
		<div>
			<Login/>
		</div>
	);
}
