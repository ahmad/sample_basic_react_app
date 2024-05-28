
export function LoadingOverlay({isShown}){
	function showThankyou (){
		console.log("Show thank you")
		// setShowThankyou(true);
		// setIsLoading(false);

		// setTimeout(() => {
		// 	setShowThankyou(false)
		// }, 2000);
	}

	if (isShown === false){
		return <div />
	}
	return (
		<div>
			<div id="overlay" ></div>
			<div id="spinner" >
				<img src="image/spinner.gif" alt="Badge printing" />
				<br />
				<br />
				<h1>Please wait while badge is being printed</h1>

				<br />
				<br />
				<button onClick={showThankyou} className="btn_sm green" >Done</button>
			</div>
		</div>
	);
}