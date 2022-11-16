import React, { useEffect, useState } from 'react';
import FileUpload from "./admin/fileUpload";
import { read, utils } from "xlsx";
import ArrView from "./admin/arrView";
import {
	Button, Dialog, DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select, Slide
} from "@mui/material";
import OutTable from "./admin/outTable";
import LastTable from "./admin/lastTable";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function KhyGift() {
	const [sN, setSN] = useState<string[]>()
	const [wb, setWb] = useState<any>()
	const [arr, setArr] = useState<number[][]>([])
	const [selectData, setSelectData] = useState<any[][]>([])
	const [resultData, setResultData] = useState<any[][]>([])
	const [select, setSelect] = useState("")
	const [data, setData] = useState<any>()
	const [cols, setCols] = useState<any>()
	const [index, setIndex] = useState(0)
	const [open, setOpen] = useState(false);


	const make_cols = (refstr: any) => {
		let o = [],
			C = utils.decode_range(refstr).e.c + 1;
		for (var i = 0; i < C; ++i) o[i] = {name: utils.encode_col(i), key: i};
		return o;
	};

	const getResult = (data: any[][]) => {
		const result: any[] = Array.from({length: 19}).fill(0)
		const first: string[] = []
		data.map((item, i) => {
			first.push(item[3])
			result[6] += item[6]
			result[7] += item[7]
			result[8] += item[8]
			result[9] += item[9]
			result[10] += item[10]
			result[11] += item[11]
			result[12] += item[12]
			result[14] += item[14]
			result[15] += item[15]
			result[16] += item[16]
			result[17] += item[17]
		})
		result[5] = result.slice(6, 11).reduce((a, b) => a + b)
		result[13] = result[14] + result[15]
		result[4] = result[5] + result[13]
		result[3] = first.join(", ")
		const title = ["", "", "", "일시", "계", "소계", "초등", "중등", "고등", "대학", "비학", "남", "여", "소계", "성인", "아동", "남", "여", "비율"]
		return [title, [...result]]
	}

	const handleClickOpen = () => {
		const newArr = [...selectData];
		console.log("sele", newArr)
		setResultData([])
		sN?.map((item, i) => {
			if(arr[i].length === 0) return
			const ws = wb.Sheets[item];
			const data = utils.sheet_to_json(ws, {header: 1});
			const pushData = arr[i].map(item => data[item]);
			newArr[i] = pushData
		})
		console.log("map",[getResult(newArr.flat()), newArr.flat()])
		setResultData([getResult(newArr.flat()), newArr.flat()])
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
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
				<Button variant="outlined" onClick={handleClickOpen}>
					버튼
				</Button>
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
			<Dialog
				fullWidth={true}
				maxWidth={"xl"}
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle style={{display: "flex", flexDirection: "row"}}>{"안농"}
					<div>
						<button>일자</button>
						<div>
							{/*총갯수 : {selectData.flat().length}*/}
						</div>
						<div>
						</div>

					</div>
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						{resultData.length !== 0 ? <LastTable data={resultData.flat()} cols={cols}/> : null}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Disagree</Button>
					<Button onClick={handleClose}>Agree</Button>
				</DialogActions>
			</Dialog>
			<div className="row">
				<div className="col-xs-12">
					{data ? <OutTable data={data} cols={cols} arr={arr} setArr={setArr} index={index}/> : null}
				</div>
			</div>
		</div>
	);
}

export default KhyGift;
