import React, { useEffect, useRef, useState } from 'react';
import DaumPostcode from "react-daum-postcode";
import axios from "axios";
import { GAMETYPE } from "../types";
import { useQuery } from "react-query";
import { queryClient } from "../../pages/_app";


function AdminTest() {
	const [users, setUsers] = useState<any[]>([]);
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
	const getUsers = async () => {
		await axios.get(`https://www.osan.go.kr/culturehome/facilitiesRent/calForm.do?kind=multipurposeRoom&mId=0402010100`)
			.then((data) => console.log(data))
	}

	const test = () => {
		// if(users.length === 0) return
		let user: string = "오석중"
		let userData: any[]
		users.map(item => {
			if (user === item.userId) {
				console.log(userData, item)
			}
			userData = item
			user = item.userId
		})
	}


	return (
		<>
			<div>
				{/*<button onClick={() => getUsers()}>GetUsers</button>*/}
				{/*<button onClick={() => test()}>22</button>*/}
				{/*<input type="text" onChange={(e) => setData(e.target.value)}/>*/}
				{/*<button onClick={() => onClick()}>asd</button>*/}
				{/*<DaumPostcode*/}
				{/*	onSearch={handle.asd}*/}
				{/*	onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트*/}
				{/*	autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정*/}
				{/*	defaultQuery='오산로 235' // 팝업을 열때 기본적으로 입력되는 검색어*/}
				{/*/>*/}
			</div>
		</>
	);
}

export default AdminTest;
