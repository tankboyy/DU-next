import Seo from "../components/Seo";
import FriendsSearch from "../components/friendsSearch";
import DarkModeToggleButton from "../components/dark-mode";

export default function Home() {
	return (
		<>
			<Seo title="Home"/>
			<div>
				<FriendsSearch/>
			</div>
		</>
	);
}
