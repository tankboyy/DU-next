import Login from "../components/login";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/user";
import firebase from "../hooks/firebase";

export default function loginPage() {
	const {email, password} = {email: "heodange@naver.com", password: "wl2rn5tp"};
	const testF = async () => {
		const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
		const user = userCredential.user;
		const token = await user?.getIdToken();
		return token;
	};

	testF().then(data => console.log(data))
		.catch(err => console.log(err));

	const userValue = useRecoilValue(userState);
	return (
		<div>
			<Login/>
		</div>
	);
}
