import React, { DetailedHTMLProps, HTMLAttributes, useEffect, useRef, useState } from 'react';
import FileUpload from "./admin/fileUpload";
import { read, utils } from "xlsx";
import ArrView from "./admin/arrView";
import {
	Button, Checkbox, Dialog, DialogActions,
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

interface nameType {
	name: string
	i: number
}

function KhyGift() {
	const [sN, setSN] = useState<string[]>([])
	const [wb, setWb] = useState<any>()
	const [arr, setArr] = useState<number[][]>([])
	const [selectData, setSelectData] = useState<any[][]>([])
	const [resultData, setResultData] = useState<any[][]>([])
	const [select, setSelect] = useState("")
	const [data, setData] = useState<any>()
	const [cols, setCols] = useState<any>()
	const [index, setIndex] = useState(0)
	const [open, setOpen] = useState(false);
	const [programsName, setProgramsName] = useState<any[]>()
	const [checkbox, setCheckbox] = useState<boolean[][]>([])


	const make_cols = (refstr: any) => {
		let o = [],
			C = utils.decode_range(refstr).e.c + 1;
		for (var i = 0; i < C; ++i) o[i] = {name: utils.encode_col(i), key: i};
		return o;
	};


	const getResult = (data: any[][]) => {
		const result: any[] = Array.from({length: 19}).fill(0)
		let first: string[] = []
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
		result[2] = data.length
		result[1] = "메롱"
		result[0] = "정리"
		const newFirst: string[] = []
		first.forEach((item) => {
			if (!newFirst.includes(String(item))) newFirst.push(String(item))
		})
		// newFirst.sort((a, b) => a - b)
		result[3] = newFirst.join(", ")
		const title = ["", "", "", "일시", "계", "소계", "초등", "중등", "고등", "대학", "비학", "남", "여", "소계", "성인", "아동", "남", "여", "비율"]
		return [title, [...result]]
	}

	const handleClickOpen = () => {
		const newArr = [...selectData];
		setResultData([])
		sN?.map((item, i) => {
			if (arr[i].length === 0) return
			const ws = wb.Sheets[item];
			const data = utils.sheet_to_json(ws, {header: 1});
			const pushData = arr[i].map(item => data[item + 2]);
			newArr[i] = pushData
		})
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
			const programsArr: any[] = []
			data.shift()
			data.shift()
			data.map((item: any, i) => {
				if (item[1] === "프로그램명") return
				if (item[1] !== undefined) programsArr.push([item[1], i])
			})
			setProgramsName(programsArr)
			setData(data)
			setCols(make_cols(cols))
			if (checkbox[sN.indexOf(select)].length === 0) {
				const newArr = programsArr.map(() => false)
				const newCheckBox = [...checkbox]
				newCheckBox[sN.indexOf(select)] = newArr
				setCheckbox(newCheckBox)
			}
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
			const newCheckArr = wb.SheetNames.map(() => [])
			setCheckbox(newCheckArr)
		};
		if (rABS) reader.readAsBinaryString(file);
		else reader.readAsArrayBuffer(file);

	}

	const pushArr = (i: number[]) => {
		const prevArr = [...arr]
		// @ts-ignore
		const newArr = [...new Set([...arr[sN.indexOf(select)], i].flat())]
		newArr.sort((a, b) => a - b)
		prevArr[sN.indexOf(select)] = [...newArr]
		setArr(prevArr)
	}

	const checkOut = () => {
		const prevArr = [...arr];
		prevArr[sN.indexOf(select)] = [];
		setArr(prevArr)
		const prevCheck = [...checkbox];
		const newCheck = prevCheck[sN.indexOf(select)].map(() => false)
		prevCheck[sN.indexOf(select)] = newCheck
		setCheckbox(prevCheck)
	}

	const unPushArr = (i: number[]) => {
		const prevArr = [...arr]
		const newArr = prevArr[sN.indexOf(select)]
		newArr.splice(newArr.indexOf(i[0]), i.length)
		newArr.sort((a, b) => a - b)
		prevArr[sN.indexOf(select)] = [...newArr]
		setArr(prevArr)
	}

	const checkNames = (name: string | undefined) => {
		if (name === undefined || name === "계") return false
		return true
	}

	const pushPrograms = (name: any[], checked: boolean, i: number) => {
		// 마지막 체크박스 클릭했을시
		console.log(name, checked, i, [name[1]], data, programsName)
		const startIndex: number = name[1]
		const arr: number[] = []
		if (checked) {
			if (programsName?.indexOf(name)! + 1 === programsName?.length) {
				for (let i = startIndex; i <= data.length - 1; i++) {
					checkNames(data[i][2]) ? arr.push(i) : null
				}
				checkbox[sN.indexOf(select)][i] = !checkbox[sN.indexOf(select)][i]
			} else {
				for (let i = startIndex; i < programsName![programsName?.indexOf(name)! + 1][1]; i++) {
					checkNames(data[i][2]) ? arr.push(i) : null
				}
				checkbox[sN.indexOf(select)][i] = !checkbox[sN.indexOf(select)][i]
			}
			pushArr(arr)
		} else {
			if (programsName?.indexOf(name)! + 1 === programsName?.length) {
				for (let i = startIndex; i <= data.length - 1; i++) {
					checkNames(data[i][2]) ? arr.push(i) : null
				}
				checkbox[sN.indexOf(select)][i] = !checkbox[sN.indexOf(select)][i]
			} else {
				for (let i = startIndex; i < programsName![programsName?.indexOf(name)! + 1][1]; i++) {
					checkNames(data[i][2]) ? arr.push(i) : null
				}
				checkbox[sN.indexOf(select)][i] = !checkbox[sN.indexOf(select)][i]
			}
			unPushArr(arr)
		}
	}

	return (
		<div>
			<div style={{display: 'flex', flexDirection: "row"}}>
				<FileUpload handleFile={handleFile}/>
				<FormControl sx={{m: 1, minWidth: 120}} size="small">
					<InputLabel id="demo-select-small">선택해쥬</InputLabel>
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
				<Button variant="outlined" onClick={handleClickOpen}>
					버튼
				</Button>
				<Button variant="outlined" onClick={() => checkOut()}>
					해제
				</Button>

				<Button variant="outlined"
								onClick={() => setArr(Array.from({length: wb.SheetNames.length}, () => Array().fill([])))
								}>
					모두 해제
				</Button>
				<ArrView arr={arr} sN={sN}/>
			</div>
			<div style={{display: "flex", flexDirection: "row", fontSize: "11px"}}>
				{programsName?.map((name, i) => (
					<div key={i} style={{display: "flex", flexDirection: "row"}}>
						<Checkbox
							checked={checkbox[sN.indexOf(select)][i]}
							onChange={(e) => pushPrograms(name, e.target.checked, i)}/>
						<div>{name[0]}</div>
					</div>
				))}
			</div>
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
