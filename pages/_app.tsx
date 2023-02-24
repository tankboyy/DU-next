import { RecoilRoot } from "recoil";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const queryClient = new QueryClient();


export default function MyApp({Component, pageProps}: AppProps) {


	return (
		<>
			<RecoilRoot>
				<ThemeProvider attribute="class">
					<QueryClientProvider client={queryClient}>
						<ReactQueryDevtools initialIsOpen={true} />
						<Component {...pageProps}/>
					</QueryClientProvider>
				</ThemeProvider>
			</RecoilRoot>
		</>
	);
}
