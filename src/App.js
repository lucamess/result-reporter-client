import React from "react"
import { HashRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider, createGlobalStyle } from "styled-components"
import { RecoilRoot } from "recoil"
import { Toaster } from "react-hot-toast"

import StudentLoginPage from "src/views/login/StudentLoginPage"
import DashboardPage from "src/views/dashboard/DashboardPage"
import ResultPage from "src/views/dashboard/ResultPage"
import AdminLoginPage from "src/views/login/AdminLoginPage"
import AdminDashboardPage from "src/views/dashboard/AdminDashboardPage"
import { colors, routePathList } from "./config"

const GlobalStyle = createGlobalStyle`
	:root {
		--primary: ${props => props.theme.primary};
		--primary-lighter: ${props => props.theme.primaryLighter};
		--primary-darker: ${props => props.theme.primaryDarker};
		--secondary: ${props => props.theme.secondary};
		--text0: ${props => props.theme.text0};
		--text1: ${props => props.theme.text1};
		--text2: ${props => props.theme.text2};
		--text3: ${props => props.theme.text3};
		--dark: ${props => props.theme.dark};
		--light: ${props => props.theme.light};
		--light-darker: ${props => props.theme.lightDarker};
	}

	body {
		padding: 0;
		margin: 0;
		border: 0;
		outline: 0;
		// background: #f0f0ff;
	}

	* {
		box-sizing: border-box;
		font-family: sans-serif;
	}
`

const App = () => {
	return (
		<RecoilRoot>
			<ThemeProvider theme={colors}>
				<HashRouter>
					<GlobalStyle />
					<Toaster />
					<Routes>
						<Route path={routePathList.studentLogin} element={<StudentLoginPage />} exact />
						<Route path={routePathList.studentDashboard} element={<DashboardPage />} />
						<Route path={routePathList.studentResult} element={<ResultPage />} />
						<Route path={routePathList.adminLogin} element={<AdminLoginPage />} />
						<Route path={routePathList.adminDashboard} element={<AdminDashboardPage />} />
					</Routes>
				</HashRouter>
			</ThemeProvider>
		</RecoilRoot>
	)
}

export default App
