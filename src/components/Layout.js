import { Outlet, Link } from "react-router-dom";

export function Layout(props){
	return (
		<div className="App">
			<div id="addProfile" >
				<div className="wrap">
					<div className="main">
						<div className="header">
							<div className="left" >
								<Link to="/" >
									<img src="./image/logo.png" className="header_logo" alt="" />
								</Link>
							</div>
							<div className="right" >
								<Link to="/" >
									<img src="./image/home_button.png" className="home_button" alt="" />
								</Link>
							</div>
						</div>
						<div className="content">
							<Outlet />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}