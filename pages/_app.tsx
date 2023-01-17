import { RecoilRoot } from "recoil";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// staleTime: 1000

		}
	}
});


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
