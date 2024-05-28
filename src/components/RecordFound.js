import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GDC } from "../models/GDC";
import { BrowserAPI } from "../models/BrowserAPI";
import { Alert } from "./AddProfile";




// const PrintCompanionBadgeButton = ({person, setAddGuest, printGuestBadge}) => {
// 	if (person.printed){
// 		return (
// 			<tr>
// 				<td colSpan="2" >
// 					<button className="small_btn small_button" onClick={printGuestBadge} >Print Guest Badge</button>
// 					<button className="small_btn small_button red" onClick={() => setAddGuest(false)}  >Remove Guest</button>
// 				</td>
// 			</tr>
// 		)
// 	}

// 	else {
// 		return <tr />
// 	}
// }


const AddGuest = ({addGuest, setAddGuest, person, firstName, lastName, setFirstName, setLastName, setShowAlert}) => {
	return <div />

	// const printGuestBadge = async () => {
	// 	if (firstName.length === 0 || lastName.length === 0){
	// 		setShowAlert(true);
	// 		return;
	// 	}

	// 	// Print badge
	// 	BrowserAPI.print([
	// 		{
	// 			firstName: firstName,
	// 			lastName: lastName
	// 		}
	// 	]);

	// 	try {
	// 		const addGuest = await GDC.addProfile({
	// 			firstName: firstName,
	// 			lastName: lastName,
	// 			options: [
	// 				{
	// 					name: "Attandee Type",
	// 					value: "Guest"
	// 				},{
	// 					name: "Printed",
	// 					value: "Yes"
	// 				}, {
	// 					name: "Picked Up",
	// 					value: "Yes"
	// 				}, {
	// 					name: "Guest Of",
	// 					value: person._id
	// 				}
	// 			]
	// 		});

	// 		setFirstName("");
	// 		setLastName("");

	// 		setAddGuest(false);
	// 		console.log(addGuest);
	// 	} catch (error){
	// 		console.log("Error");
	// 	}
	// }

	// if (addGuest){
	// 	return (
	// 		<div>
	// 			<h2>Add Guest</h2>
	// 			<table cellPadding="0" cellSpacing="0" border="0" className="form_table badge_form">
	// 				<tbody>
	// 					<tr>
	// 						<td className="input">
	// 							<input type="text" id='first_name' name="first_name" className="demographic input required cap" onChange={(e) => setFirstName(e.target.value)} value={firstName} placeholder="First Name *" />
	// 						</td>
	// 						<td className="input">
	// 							<input type="text" name="last_name" id='last_name' className="demographic input required cap" onChange={(e) => setLastName(e.target.value)}   value={lastName}  placeholder="Last Name *" />
	// 						</td>
	// 					</tr>
	// 					<PrintCompanionBadgeButton person={person} setAddGuest={setAddGuest} printGuestBadge={printGuestBadge} />
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

export function RecordFound () {
	const location = useLocation()
	const { person } = location.state;
	const { firstName, lastName, company } = person;

	const [printed, setPrinted] = useState(person.printed);
	const [collected, setCollected] = useState(person.collected);
	const [attandeeType] = useState(person.type);

	const [companionFirstName, setCompanionFirstName] = useState("");
	const [companionLastName, setCompanionLastName] = useState("");
	const [addCompanion, setAddCompanion] = useState(false)


	const [showAlert, setShowAlert] = useState(false);
	const [alertInfo] = useState({
		title: "Add Guest Error",
		message: "Both first and last names are required for guest.",
		callback: null
	});

	
	const printBadge = () => {
		setPrinted({
			...printed,
			value: "Yes"
		})
		BrowserAPI.print([
			{
				firstName: firstName,
				lastName: lastName,
				company: company
			}
		]);
	}

	const printBadges = () => {
		BrowserAPI.print([
			{
				firstName: firstName,
				lastName: lastName,
				company: company
			},
			{
				firstName: companionFirstName,
				lastName: companionLastName
			}
		]);
	}	
	

	const PrintButton = ({printed}) => {
		if (printed){
			return (
				<button className="btn_sm small_button red"  onClick={printBadge} >Reprint {attandeeType.value} Badge</button>
			);
		} else {

			if (addCompanion === true) {
				return (
					<button  className="btn_sm small_button green" onclick={printBadges} >Print Badges</button>
				);
			} else {
				return (
					<button  className="btn_sm small_button green" onClick={printBadge} >Print Badge</button>
				);
			}
		}
	}

	const MarkedPickedUp = ({collected}) => {
		const navigate = useNavigate();
		const pickUp = async () => {
			if (person && person._id){
				const col = collected.value === "Yes" ? "No" : "Yes";
				setCollected({
					...collected,
					value: col
				})
			
				await GDC.updateOption(person._id, collected._id, "Picked Up", col).then(data => {
					console.log(data.options);
				});

				const { firstName, lastName, notify } = person;
				if (notify.length >= 0){
					notify.forEach(async item => {
						try {
							await GDC.notify(item, firstName, lastName)
						} catch (error) {
							console.log(error);
						}
						
					});
				}

				// redirect to home
				navigate("/", { replace: true});
			} else {
				alert("Unable to update status!");
			}
		}

		if (collected.value === "Yes"){
			return <></>
		}

		return (
			<span>
				<button className="small_btn small_button" onClick={pickUp}>Mark As Collected</button>
			</span>
		);
	}

	return (
		<div>
			<Alert info={alertInfo} showAlert={showAlert} setShowAlert={setShowAlert} />

			<div id="search" >
				<div className="guest-info" >
					<table>
						<tbody>
							<tr>
								<td>Name</td>
								<td>{person.firstName} {person.lastName}</td>
							</tr>

							{person.company &&
								<tr>
									<td>Company</td>
									<td>{person.company}</td>
								</tr>
							}					
							
							<tr>
								<td>Type</td>
								<td>{attandeeType.value ?? ""}</td>
							</tr>
							<tr>
								<td>Printed</td>
								<td>{printed.value ?? ""}</td>
							</tr>
							<tr>
								<td>Notify</td>
								<td>{person.notify.join(', ')}</td>
							</tr>
							<tr>
								<td>Collected</td>
								<td>
									{collected.value ?? ""}

								</td>
							</tr>

							<tr>
								<td colSpan={2} className="mark-as-collected" >
									
									<MarkedPickedUp collected={collected} />
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="companion" >
					<AddGuest 
						person={person} 
						addGuest={addCompanion} 
						setAddGuest={setAddCompanion} 
						firstName={companionFirstName} 
						lastName={companionLastName} 
						setFirstName={setCompanionFirstName}
						setLastName={setCompanionLastName}
						setShowAlert={setShowAlert}
						/>
				</div>
				<div className="print" >
					<PrintButton printed={printed.value === "Yes" ? true : false} />
				</div>
			</div>
		</div>
	);

}