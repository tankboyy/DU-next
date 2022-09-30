import AdminRoot from "../components/admin";
import Seo from "../components/Seo";

export default function AdminPage() {
	return (
		<>
			<Seo title={"관리자"}/>
			<AdminRoot/>
		</>
	);
}
