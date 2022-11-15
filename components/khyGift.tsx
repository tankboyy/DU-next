import React, { useEffect, useState } from 'react';
import FileUpload from "./admin/fileUpload";
import { read, utils } from "xlsx";
import ArrView from "./admin/arrView";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import OutTable from "./admin/outTable";

function KhyGift() {
	const [sN, setSN] = useState<string[]>()
	const [wb, setWb] = useState<any>()
	const [arr, setArr] = useState<number[][]>([])
	const [selectData, setSelectData] = useState<any[][]>([])
	const [select, setSelect] = useState("")
	const [data, setData] = useState<any>()
	const [cols, setCols] = useState<any>()
	const [index, setIndex] = useState(0)

	const make_cols = (refstr: any) => {
		let o = [],
			C = utils.decode_range(refstr).e.c + 1;
		for (var i = 0; i < C; ++i) o[i] = {name: utils.encode_col(i), key: i};
		return o;
	};

	useEffect(() => {
		const choiceWs = (wsName: string) => {

			if (wsName === "") return
			const ws = wb.Sheets[wsName]
			const data = utils.sheet_to_json(ws, {header: 1})
			const cols = ws["!ref"]
			setData(data)
			setCols(make_cols(cols))
		}
		choiceWs(select)
		if (sN) setIndex(sN.indexOf(select))
	}, [select])

	const handleFile = (file: any) => {
		const reader = new FileReader();
		const rABS = !!reader.readAsBinaryString;
		reader.onload = (e: any) => {
			const bstr = e.target.result;
			const wb = read(bstr,
				{type: rABS ? "binary" : "array"}
			)
			setWb(wb)
			setSN(wb.SheetNames)
			setArr(Array.from({length: wb.SheetNames.length}, () => Array().fill([])))
			setSelectData(Array.from({length: wb.SheetNames.length}, () => Array().fill([])))
		};
		if (rABS) reader.readAsBinaryString(file);
		else reader.readAsArrayBuffer(file);

	}

	return (
		<div>
			<div style={{display: 'flex', flexDirection: "row"}}>
				<FileUpload handleFile={handleFile}/>
				<ArrView arr={arr}/>
			</div>
			<FormControl sx={{m: 1, minWidth: 120}} size="small">
				<InputLabel id="demo-select-small">골라라ㅋ</InputLabel>
				<Select
					labelId="demo-select-small"
					id="demo-select-small"
					value={select}
					label="sheet"
					onChange={(e: any) => setSelect(e.target.value)}
				>
					{sN?.map((item, i) => {
						return <MenuItem key={i} value={item}>{item}</MenuItem>
					})}
				</Select>
			</FormControl>
			<div className="row">
				<div className="col-xs-12">
					{data ? <OutTable data={data} cols={cols} arr={arr} setArr={setArr} index={index}/> : null}
				</div>
			</div>
		</div>
	);
}

export default KhyGift;
