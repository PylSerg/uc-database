import { useState, useEffect } from "react";
import axios from "axios";

export default function Main() {
	const [usersList, setUsersList] = useState();
	const [newUser, setNewUser] = useState("");
	const [extraUser, setExtraUser] = useState("");

	const BASE_URL = "https://script.google.com/macros/s/AKfycbxqid34_IMl-iMPjoWZ4qju4l8h6byz5-ScmuYNmJGTH6_pT668kg8AC9oFNiwDvXQS/exec";

	useEffect(() => {
		getRequest();
	}, [usersList]);

	async function getRequest() {
		const request = await axios.get(`${BASE_URL}?id=all`);

		setUsersList(request.data.data);
	}

	async function postRequest(r = false) {
		await axios.post(`${BASE_URL}?name=${newUser}${extraUser}&remove=${r}`);
	}

	function changeNewUser(e) {
		setNewUser(e.currentTarget.value);
	}

	function changeExtraUser(e) {
		setExtraUser(e.currentTarget.value);
	}

	function addUser() {
		setNewUser("");
		postRequest();
		setUsersList();
	}

	function deleteUser() {
		setExtraUser("");
		postRequest(true);
		setUsersList();
	}

	return (
		<div>
			<ul>
				<u>Users List:</u>
				{usersList && usersList.map(user => <li>{user}</li>)}
			</ul>

			<br />

			<input type="text" value={newUser} onChange={changeNewUser} />

			<button type="button" onClick={addUser}>
				POST
			</button>

			<br />
			<br />

			<input type="text" value={extraUser} onChange={changeExtraUser} />

			<button type="button" onClick={deleteUser}>
				Delete
			</button>
		</div>
	);
}
