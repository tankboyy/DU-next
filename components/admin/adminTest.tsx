import React, { useEffect, useRef, useState } from 'react';
import DaumPostcode from "react-daum-postcode";


function AdminTest() {
	const [data, setData] = useState("")
	const onClick = () => {
		const a = data.split("\t").map(item => {
			if (item[0] === " ") {
				item = item.slice(1, item.length)
			}
			if (item.includes(",")) {
				return item.split(",")[0]
			}
			return item
		})
		console.log(a)
	}

	const handle = {
		selectAddress: (data: any) => {
			console.log(`
                주소: ${data.address},
                우편번호: ${data.zonecode}
            `)
			console.log(data.autoJibunAddress)
		},
		asd: (data: any) => {
			console.log(data)
		}
	}

return (
	<>
		<div>
			<input type="text" onChange={(e) => setData(e.target.value)}/>
			<button onClick={() => onClick()}>asd</button>
			<DaumPostcode
				onSearch={handle.asd}
				onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
				autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
				defaultQuery='오산로 235' // 팝업을 열때 기본적으로 입력되는 검색어
			/>
		</div>
	</>
);
}

export default AdminTest;
