import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BrowserAPI } from "../models/BrowserAPI";
import { GDC } from "../models/GDC";
// import { useLocation } from "react-router-dom";



	
const AddGuest = ({addGuest, setAddGuest, firstName, lastName, setFirstName, setLastName}) => {
	return <div />

	// if (addGuest){
	// 	return (
	// 		<div>
	// 			<h2>Add Guest</h2>
	// 			<table cellPadding="0" cellSpacing="0" border="0" className="form_table badge_form">
	// 				<tbody>
	// 					<tr>
	// 						<td className="input">
	// 							<input type="text" id='companion_first_name' name="companion_first_name" className="demographic input required cap" onChange={(e) => setFirstName(e.target.value)} value={firstName}  placeholder="First Name *" />
	// 						</td>
	// 						<td className="input">
	// 							<input type="text" name="companion_last_name" id='companion_last_name' className="demographic input required cap"   onChange={(e) => setLastName(e.target.value)}  value={lastName} placeholder="Last Name *" />
	// 						</td>
	// 					</tr>
	// 					<tr>
	// 						<td colSpan="2" >
	// 							<button className="small_btn small_button red" onClick={() => setAddGuest(false)}>Remove Guest</button>
	// 						</td>
	// 					</tr>
	// 				</tbody>
	// 			</table>
	// 		</div>
	// 	)
	// } else {
	// 	return (
	// 		<div>
	// 			<br />
	// 			Did you bring a guest today?
	// 			<br />
	// 			<button className="small_btn" onClick={() => setAddGuest(true)}>Add Guest</button>
	// 		</div>
	// 	);
	// }
}

export function AddProfile() {
	let firstNameDefault = "";
	let lastNameDefault = "";
	const location = useLocation()

	if (location.state){
		const { search } = location.state;
		if (search && search.length > 0){
			const split = search.split(" ");

			if (split.length == 1){
				lastNameDefault = split[0];
			} else {
				firstNameDefault = split[0]
				lastNameDefault = split[1]
			}
		}
	}


	const [firstName, setFirstName] = useState(firstNameDefault)
	const [lastName, setLastName] = useState(lastNameDefault)

	const [company, setCompany] = useState("")
	// const [title, setTitle] = useState("")
	// const [phone, setPhone] = useState("")
	// const [email, setEmail] = useState("")
	// const [address, setAddress] = useState("")
	// const [city, setCity] = useState("")
	// const [state, setState] = useState("")
	// const [zip, setZip] = useState("")
	const [type, setType] = useState("Client");


	const [addCompanion, setAddCompanion] = useState(false);

	const [companionFirstName, setCompanionFirstName] = useState("");
	const [companionLastName, setCompanionLastName] = useState("");

	const [showAlert, setShowAlert] = useState(false);
	const [alertInfo, setAlertInfo] = useState({
		title: "",
		message: "",
		callback: null
	});

	const attanteeTypeChanged = (e) => {
		const attendeeType = e.target.value;
		setType(attendeeType);

		if (attendeeType === "Employee"){
			setCompany("Chase");
		}
	}

	return (
		<div id="content" className="clear">
			<Alert info={alertInfo} showAlert={showAlert} setShowAlert={setShowAlert} />


			<div className="searchscreen"  >
				<h1 className="searchscreen_title">Attendee Registration</h1>
				<div id="register" >
					{/* Plese complete the form below to print your badge */}
					{/* <br /> */}
					<br />
						<table cellPadding="0" cellSpacing="0" border="0" className="form_table badge_form">
							<tbody>
								<tr>
									<td colSpan={2} >
										Attendee Type
										<div className="flex flex-center mt-10" >
											<div className="padd" >
												<label htmlFor="type_client" >
													<input id="type_client" onChange={attanteeTypeChanged} type="radio" value="Client" name="type" checked={type === "Client"} />
													<span>Client</span>
												</label>
											</div>
											
											<div className="padd" >
												<label htmlFor="type_guest" >
													<input id="type_guest" onChange={attanteeTypeChanged} type="radio" value="Guest" name="type" checked={type === "Guest"} />
													<span>Guest</span>
												</label>
											</div>
											
											<div className="padd" >
												<label htmlFor="type_employee" >
													<input id="type_employee" onChange={attanteeTypeChanged} type="radio" value="Employee" name="type" checked={type === "Employee"} />
													<span>Employee</span>
												</label>
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<td className="input big-input">
										<input type="text" id='first_name' name="first_name" className="demographic input required cap" onChange={(e) => setFirstName(e.target.value)} value={ firstName } placeholder="First Name *" />
									
									</td>
								</tr>
								<tr>
									<td className="input big-input">
										<input type="text" name="last_name" id='last_name' className="demographic input required cap" onChange={(e) => setLastName(e.target.value)} value={ lastName } placeholder="Last Name *" />
									</td>
								</tr>
								<tr>
									{type !== "Guest" && 
										<td className="input big-input">
											<input type="text" id='company' name="company" className="demographic input required cap"  onChange={(e) => setCompany(e.target.value)} value={ company } placeholder="Company *" />
										</td>
									}

									{/* { type === "Guest" &&
										<td className="input big-input">
											<input type="text" id='company' name="company" className="demographic input cap"  onChange={(e) => setCompany(e.target.value)} value={ company } placeholder="Company" />
										</td>
									} */}
									

									{/* <td className="input">
										<input type="text" id='title' name="title" className="demographic input cap"  onChange={(e) => setTitle(e.target.value)} value={ title } placeholder="Title" />
									</td> */}
								</tr>
								{/* <tr>
									<td className="input">
										<input type="text" name="phone" className=" input phone" id='phone'  onChange={(e) => setPhone(e.target.value)} value={ phone } placeholder="Phone" />
									</td>
									<td className="input">
										<input type="email" name="email" className="demographic input email" id='email'  onChange={(e) => setEmail(e.target.value)} value={ email } placeholder="Email" />
									</td>
								</tr>
								<tr>
									<td className="input">
										<input type="text" id='address1' name="address1" className="input"  onChange={(e) => setAddress(e.target.value)} value={ address } placeholder="Address"/>
									</td>
									
									<td className="input">
										<input type="text" name="city" id='city' className=" input"  onChange={(e) => setCity(e.target.value)} value={ city } placeholder="City" />
									</td>
								</tr>
								<tr>
									<td className="input">
										<input type="text" name="state" id='state' className=" input" onChange={(e) => setState(e.target.value)} value={ state } placeholder="State" />
									</td>
									<td className="input">
										<input type="text" name="zip" className=" input " id='zip'  onChange={(e) => setZip(e.target.value)} value={ zip } placeholder="Zip" />
									</td>
								</tr> */}
								
								<tr>
									<td colSpan="2">
										<AddGuest addGuest={addCompanion} setAddGuest={setAddCompanion} firstName={companionFirstName} lastName={companionLastName} setFirstName={setCompanionFirstName} setLastName={setCompanionLastName} />
									</td>
								</tr>
							</tbody>
						</table>
				</div>
				<div id="privateevent_businessCardSection" >
					<div className="submitarea">
						<PrintButton />
					</div>
				</div>
			</div>
		</div>
	);


	function PrintButton(){
		// const navigate = useNavigate();

		const isValid = () => {

			if (firstName.length === 0 || lastName.length === 0 || (type !== "Guest" && company.length === 0)){
				let message = "Please ensure that both First Name and Last Name is provided."
				if (type === "Client"){
					message = "Please ensure that First Name, Last Name and Company are provided"
				}

				setAlertInfo({
					title: "Registration Error",
					message: message
				})
				setShowAlert(true);
				return false;
			}

			
			if (addCompanion === true){
				if (companionFirstName.length === 0 || companionLastName.length === 0){

					setAlertInfo({
						title: "Registration Error",
						message: "Please ensure that both first and last name is provided for guest."
					})
					setShowAlert(true);

					return false;
				}
			}

			return true;
		}


		const printBadges = async () => {
			if (isValid()){

				let badgesToPrint = [
					{
						firstName: firstName,
						lastName: lastName,
						company: company
					}
				];

				if (addCompanion === true){
					badgesToPrint.push({
						firstName: companionFirstName,
						lastName: companionLastName
					});
				}

				// Printing badges
				BrowserAPI.print(badgesToPrint);

				try {
					await GDC.addProfile({
						firstName: firstName,
						lastName: lastName,
						// title: title,
						company: company,
						// phone: phone,
						// email: email,
						// address1: address,
						// city: city,
						// state: state,
						// postal: zip,
						options: [
							{
								name: "Attandee Type",
								value: type
							},{
								name: "Printed",
								value: "Yes"
							}, {
								name: "Picked Up",
								value: "Yes"
							}
						]
					});

					// if (addCompanion === true){
					// 	const { _id: guestOf } = addClient;
					// 	await GDC.addProfile({
					// 		firstName: companionFirstName,
					// 		lastName: companionLastName,
					// 		options: [
					// 			{
					// 				name: "Attandee Type",
					// 				value: "Guest"
					// 			},{
					// 				name: "Printed",
					// 				value: "Yes"
					// 			}, {
					// 				name: "Picked Up",
					// 				value: "Yes"
					// 			}, {
					// 				name: "Guest Of",
					// 				value: guestOf
					// 			}
					// 		]
					// 	});
					// }

					setFirstName("");
					setLastName("");
					// setTitle("");
					setCompany("");
					// setPhone("");
					// setEmail("");
					// setAddress("");
					// setCity("");
					// setState("");
					// setZip("");
					setType("Client")

					

					// 
					// setCompanionFirstName("");
					// setCompanionLastName("");
				
					// setAddCompanion(false);

					// navigate("/", { replace: true })
				} catch (error){
					console.log("Unable to add client:", error);
				}
				
			} else {
				// TODO: Alert invalid
				console.log("Invalid form");
			}
		}

		if (addCompanion === true) {
			return (
				<button className="btn_sm green" onClick={printBadges}>
					Print Badges
				</button>
			);
		} else {
			return (
				<button className="btn_sm green" onClick={printBadges}>
					Print Badge
				</button>
			);
		}
	}
}


export const Alert = ({info, showAlert, setShowAlert}) => {
	const dismiss = () => {
		setShowAlert(false);
	}

	if (showAlert === true){
		return (
			<div>
				<div className="popup-background" ></div>
				<div className="popup-alert" >
					<div className="popup-title" >{info.title}</div>
					<div className="popup-body" >{info.message}</div>
					<button onClick={dismiss} >Okay</button>
				</div>
			</div>
		);
	}

	return <div />
}