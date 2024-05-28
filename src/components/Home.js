import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Home.css"
import { GDC } from "../models/GDC"


const Person = (data) => {
	const { _id, firstName, lastName, company } = data;

	let printed = {}, type = {}, collected = {}, notify = [];

	if (data != null && data.options != null){
		data.options.forEach(option => {
			if (option.name === "Attandee Type"){
				type = option;
			} else if (option.name === "Printed"){
				printed = option;
			} else if (option.name === "Picked Up"){
				collected = option;
			} else if (option.name.indexOf('Contact #') === 0){
				notify.push(option.value);
			}
		});
	}

	return {
		_id: _id,
		firstName: firstName,
		lastName: lastName,
		company: company,
		printed: printed,
		type: type,
		collected: collected,
		notify: notify
	};
}

function ResultRow({result}){
	const person = Person(result);

	return (
		<div className="result-row">
			<Link to="/found" state={{ person: person }}>
				<div className="flex" >
					<div className="" >
						
						<div className="name" >{result.firstName} {result.lastName}</div>
						<div className="subhead" >{result.company ?? person.type.value}</div>
					</div>
					<div className="right-arrow" >
						<img src="./image/right_black.png" alt="Go to profile" />
					</div>
				</div>
			</Link>
		</div>
	)
}

function SearchResult ({query, results, isLoading}){
	if (query.length === 0){
		return <div />
	}

	if (isLoading){
		return (
			<div id="search-loading">
				<img src="./image/spinner.gif" height="30px" alt="Search Loading" />
			</div>
		);
	}


	if (results.length > 0){
		return (
			<div className="results">
				<div className="results-list" >
					{results.map((res, i) => {
						return <ResultRow key={i} result={res} />
					})}
				</div>
				<div className="manual-entry" >
					<Link to="/add" state={{search: query}} >
						<div className="flex" >
							<div className="" >
								<p>Can't find who you're looking for?</p>
								<h3>Add Client Or Guest</h3>
							</div>
							
							<div className="right-arrow" >
								<img src="./image/right_white.png" alt="Go to profile" />
							</div>
						</div>
					</Link>
				</div>
			</div>
		);
	} else {
		return (
			<div className="results" >

				<div className="no-results" >
					<p>No results found</p>
				</div>
				
				<div className="manual-entry" >
					<Link to="/add" state={{search: query}} >
						<div className="flex" >
							<div className="" >
								<p>Can't find the client you're looking for?</p>
								<h3>Manually Add Client</h3>
							</div>
							
							<div className="right-arrow" >
								<img src="./image/right_white.png" alt="Go to profile" />
							</div>
						</div>
					</Link>
				</div>
			</div>
		)
	}

}

export function Home() {
	const [search, setSearch] = useState("");
	const [results, setResults] = useState([]);
	const [isLoading, setIsLoading] = useState(true);


	const queryChanged = (query) => {
		setSearch(query);

		if (query.length === 0){
			setResults([]);
			return;
		}

		setIsLoading(true);
		GDC.search(query)
		.then(data => {
			setResults(data);
			setIsLoading(false);
		})
		.catch(error => {
			console.log("MAJOR: ERROR", error);
		});
	}

	const ClearButton = () => {
		if (search.length > 0){
			return (
				<div id="search-clear" >
					<img src="./image/clear.png" onClick={() => setSearch("")} alt="Clear" />
				</div>					
			)
		}
		return <div />
	}

	return (
		<div>

			<div id="search" >
				<h1 id="search-message">NADA 2024</h1>
				<div id="search-box" >
					<div className="search-area" >
						<input type="text" name="search" value={search} onChange={(e) => queryChanged(e.target.value)} placeholder="Start Typing Client Or Guest Name" autoComplete="off" autoCorrect="off" autoCapitalize="off" autoFocus spellCheck="false" />						
					</div>
					<ClearButton />
					<div id="search-result" >
						<SearchResult query={search} results={results} isLoading={isLoading} />
					</div>
				</div>
				<div id="add-button" >
					<AddRecordButton query={search} />
				</div>
			</div>
		</div>
	);
}

const AddRecordButton = ({ query }) => {

	const navigate = useNavigate();
	const gotoAdd = () => {
		navigate("/add",  {replace: true});
	}

	if (query.length > 0) {
		return <div />
	}

	return (
		<button onClick={gotoAdd} className="btn_sm green" >Add Guest or Client</button>
	);
}