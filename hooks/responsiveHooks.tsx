import React from "react"
import { useMediaQuery } from "react-responsive"

export const Mobile = ({children}: {children: React.ReactNode}) => {
	const isMobile = useMediaQuery({
		query: "(max-width:768px)"
	});
	return <>{isMobile && children}</>
}

export const Pc = ({children}: {children: React.ReactNode}) => {
	const isPc = useMediaQuery({
		query: "(min-width:769px)"
	});
	return <>{isPc && children}</>
}
