import FriendsSearch from "../components/friendsSearch";
import Seo from "../components/Seo";

export default function MainPage() {
  return (
    <>
      <Seo title={"예약페이지"} />
      <FriendsSearch />
    </>
  );
}

// export async function getServerSideProps(){
// 	const data = await (await fetch("http://52.79.98.159:3001/game")).json()
// 	return {
// 		props: {
// 			data
// 		}
// 	}
// }
