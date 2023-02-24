import Seo from "../components/Seo";
import FriendsSearch from "../components/friendsSearch";
import DarkModeToggleButton from "../components/dark-mode";
import { useMediaQuery } from "react-responsive";
import { Mobile, Pc } from "../hooks/responsiveHooks";
import MobileView from "../components/mobile/mobileView";
import PcView from "../components/pc/index"

export default function Home() {
	return (
		<>
			<Seo title="Home"/>
			<div>
				<Pc>
					<PcView />
				</Pc>
				<Mobile>
					<MobileView />
				</Mobile>
			</div>
		</>
	);
}
