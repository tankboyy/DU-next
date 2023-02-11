import Seo from "../components/Seo";
import FriendsSearch from "../components/friendsSearch";
import DarkModeToggleButton from "../components/dark-mode";
import { useMediaQuery } from "react-responsive";
import { Mobile, Pc } from "../hooks/responsiveHooks";
import MobileView from "../components/mobile/mobileView";

export default function Home() {
	return (
		<>
			<Seo title="Home"/>
			<div>
				<Pc>
					<FriendsSearch />
				</Pc>
				<Mobile>
					<MobileView />
				</Mobile>
			</div>
		</>
	);
}
