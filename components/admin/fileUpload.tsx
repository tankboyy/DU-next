import React, { useRef } from 'react';

const SheetJSFT = [
	"xlsx",
	"xlsb",
	"xlsm",
	"xls",
	"xml",
	"csv",
	"txt",
	"ods",
	"fods",
	"uos",
	"sylk",
	"dif",
	"dbf",
	"prn",
	"qpw",
	"123",
	"wb*",
	"wq*",
	"html",
	"htm"
].map(function(x) {
	return "." + x;
})
	.join(",");

function FileUpload(props: any) {

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files[0]) props.handleFile(files[0]);
	}

	return (
		<>
			<form className="form-inline">
				<div className="form-group">
					<input
						type="file"
						className="form-control"
						id="file"
						accept={SheetJSFT}
						onChange={(e) => handleChange(e)}
					/>
				</div>
			</form>
		</>
	);
}

export default FileUpload;
