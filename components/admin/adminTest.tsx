import React, { useEffect, useState } from 'react';
import axios from "axios";
import { chosungIncludes } from "@toss/hangul";

function AdminTest() {

	const [users, setUsers] = useState<any[]>()
	const [filteredIds, setFilteredIds] = useState<any[]>()


	console.log(filteredIds)
	//
	async function getUsersData() {
		await axios.get(`api/users`).then(({data}) => (setUsers(data)));
	}

	function filteredId(cho: string) {
		const arr: any[] = []
		users!.forEach(user => {
			if(chosungIncludes(user.userId, cho)) arr.push(user)
		})
		setFilteredIds(arr)
	}


	// useEffect(() => {
	//
	// 	getUsersData()
	// }, [])
	return (
		<div>
			<input onChange={e => filteredId(e.target.value)} />
			<button onClick={getUsersData}>asd</button>
		</div>
	);
}

export default AdminTest;
