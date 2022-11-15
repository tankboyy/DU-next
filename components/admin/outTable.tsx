import React from 'react';

function OutTable(props: {index: number, arr: number[][], cols: any[], data: any[], setArr: React.Dispatch<React.SetStateAction<number[][]>>}) {

	const pushArr = (i: number) => {
		const newArr = [...props.arr]
		if (!newArr[props.index].includes(i)) {
			newArr[props.index] = [...newArr[props.index], i]
			props.setArr([...newArr])
		} else {
			newArr[props.index].splice(newArr[props.index].indexOf(i), 1)
			props.setArr([...newArr])
		}
	}

	return (
		<div className="table-responsive">
			<table style={{borderSpacing: "0"}} className="table table-striped">
				<thead>
				<tr>
					{props.cols.map((c: any) => (
						<th key={c.key} style={{}}>{c.name}</th>
					))}
				</tr>
				</thead>
				<tbody>
				{props.data.map((r: any, i: any) => (
					<tr key={i} style={{
						background: i % 2 === 1 ? '#f9f9f9' : "",
						color: props.arr[props.index].includes(i) ? "#A4A4A4" : "black"
					}} onClick={() => pushArr(i)}>
						{props.cols.map((c: any) => (
							<td key={c.key}
									style={{padding: "8px", borderTop: "2px solid #ddd", verticalAlign: "top"}}>{r[c.key]}</td>
						))}
					</tr>
				))}
				</tbody>
			</table>
		</div>
	);
}

export default OutTable;
