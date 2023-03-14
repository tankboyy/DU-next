import Seo from "../components/Seo";
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
