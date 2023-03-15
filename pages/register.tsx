import Seo from "../components/Seo";
import NewRegister from "../components/newComponents/newRegister";
import Register from "../components/register";

export default function RegisterPage() {

	return (
		<>
			<Seo title={"회원가입"}/>
			<NewRegister/>
			{/*<Register />*/}
		</>
	);
}

