export const GDC = (function(){
	const appUrl   	= null
	const eventId  	= null;
	const appToken  = null;
	
	return {
		search(keyword) {
			keyword = encodeURIComponent(keyword)
			return new Promise((resolve, reject) => {
				fetch(`${appUrl}/${appToken}/events/${eventId}/leads/search?query=${keyword}&limit=7`, {
					method: "get",
					mode:"cors"
				})
				.catch(error => reject(error))
				.then(res => res.json())
				.then(data => resolve(data));
			});
		},


		updateOption(leadId, optionId, name, value){
			return new Promise((resolve, reject) => {
				const endpoint = `${appUrl}/${appToken}/events/${eventId}/leads/${leadId}/options/${optionId}`;
				console.log(endpoint)

				fetch(endpoint, {
					method: "put",
					body: JSON.stringify({
						name: name,
						value: value
					}),
					headers: new Headers({
						'Content-Type': 'application/json'
					})
				})
				.then(res => res.json())
				.then(data => resolve(data));
			});
		},


		addProfile(profile){
			return new Promise((resolve, reject) => {
				const endpoint = `${appUrl}/${appToken}/events/${eventId}/leads`;
				console.log(endpoint)

				fetch(endpoint, {
					method: "post",
					body: JSON.stringify(profile),
					headers: new Headers({
						'Content-Type': 'application/json'
					})
				})
				.catch(error => reject(error))
				.then(res => res.json())
				.then(data => resolve(data));
			});
		},

		notify(phone, firstName, lastName){
			return new Promise((resolve, reject) => {
				const endpoint = `${appUrl}/app/message`;
				
				const date = new Date();
				const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).replace(' ', '');

				// phone = "3475278553";
				const message = {
					type: "SMS",
					to: phone,
					message: `${firstName} ${lastName} checked in at ${time}`
				}

				fetch(endpoint, {
					method: "post",
					body: JSON.stringify(message),
					headers: new Headers({
						'Content-Type': 'application/json'
					})
				})
				.catch(error => reject(error))
				.then(res => res.json())
				.then(data => resolve(data));

				// return reject(new Error("SMS currently disabled!"));
			});
		}
	}

})();