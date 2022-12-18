import React, { useEffect, useState } from 'react';
import axios from "axios";

type arrType = {
	[key: string]: string
}

type mountProfitType = [string, arrType][]

function AdminProfit() {

	const [mountProfit, setMountProfit] = useState<{roomName: string, data: {day: number, data: string[]}[]}[]>([]);

	const [check, setCheck] = useState<{roomName: string, data: {day: number, data: boolean[]}[]}[]>([]);

	const [dataArr, setDataArr] = useState<string[]>([]);

	const onClick = async () => {
		await axios.get("/api/profit1").then(({data}: {data: mountProfitType}) => {
			const newData: {roomName: string, data: {day: number, data: string[]}[]}[] = [];
			const newCheckData: {roomName: string, data: {day: number, data: boolean[]}[]}[] = [];

			data.forEach(item => {
				const data: {day: number, data: string[]}[] = []
				const checkData: {day: number, data: boolean[]}[] = []
				Object.keys(item[1]).map(day => {
					let str = item[1][day];
					const strArr = [];
					const boolArr = [];
					while (str.length > 3) {
						const endIndex = str.indexOf(")") + 12;
						strArr.push(str.slice(0, endIndex));
						boolArr.push(false)
						str = str.slice(endIndex);
					}
					data.push({day: parseInt(day), data: strArr})
					checkData.push({day: parseInt(day), data: boolArr})
				})
				newData.push({roomName: item[0], data: data})
				newCheckData.push({roomName: item[0], data: checkData})
			})
			setMountProfit(newData)
			setCheck(newCheckData)
		})
	}

	const onClick2 = () => {
		const newArr = []
		dataArr.forEach(item => {
			console.log(item)
		})
	}

	const handleCheck = (i: number, roomName: string, data: {day: number, data: string[]}) => {
		const strData = `${roomName},${data.day}일,${data.data[i]}`;
		const newArr = [...dataArr];
		if (newArr.includes(strData)) newArr.splice(newArr.indexOf(strData), 1)
		else newArr.push(strData)

		setDataArr(newArr)
	}
	return (
		<>
			<button onClick={() => onClick()}>불러오기</button>
			<button onClick={() => onClick2()}>내보내기</button>
			<div>
				{mountProfit?.length > 0 ?
					<div>
						{
							mountProfit.map((item) => (
								<div>
									<h2>
										{item.roomName}
									</h2>
									<div>
										{item.data.map((data) => (
											<div>

												<div style={{display: 'flex', flexDirection: "row", border: "0.5px solid"}}>
													<h3 style={{textAlign: "center"}}>
														{data.day}일
													</h3>
													<div>
														{data.data.map((p, i) => (
															<div style={{display: 'flex', flexDirection: "row"}}>
																{/*<input onClick={(e) => handleCheck(e)} type="checkbox"/>*/}
																<p style={{
																	color:
																		dataArr
																			.includes(`${item.roomName},${data.day}일,${data.data[i]}`) ? 'red' : undefined
																}} onClick={() => handleCheck(i, item.roomName, data)}>{p}</p>
															</div>
														))}
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							))
						}
					</div>
					:
					<div>
						불러와라
					</div>

				}
			</div>
		</>
	);
}

export default AdminProfit;
