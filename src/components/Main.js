import { useState, useEffect } from "react";
import axios from "axios";

export default function Main() {
	const [usersList, setUsersList] = useState({ refresh: false, data: null });
	const [newUser, setNewUser] = useState("");
	const [editableUser, setEditableUser] = useState({ id: null, name: "" });
	const [extraUser, setExtraUser] = useState("");
	const [message, setMessage] = useState("Loading users list...");

	const BASE_URL = "https://script.google.com/macros/s/AKfycbymV2xWA7SI27-MM8t6xPsf5v6GXmniaVLYBA4THSOb3LCSN0n0GrOqqFy99_T5hoCM/exec";

	useEffect(() => {
		getAllUsers();

		console.log(`\x1b[32m All users have been loaded`);
	}, [usersList.refresh]);

	/* 
		GET request 
	*/
	async function getAllUsers() {
		console.log(`\x1b[33m Getting all users...`);

		const request = await axios
			.get(`${BASE_URL}?id=all`)
			.then(console.log(`\x1b[32m Status: 200 OK`))
			.catch(error => console.log(error));

		setUsersList({ refresh: false, data: request.data.data });
		setMessage("");
	}

	/*
		POST requests
	*/

	// Adds user
	async function addNewUserToDatabase() {
		console.log(`\x1b[33m Adding new user...`);

		await axios
			.post(`${BASE_URL}?name=${newUser}`)
			.then(console.log(`\x1b[32m Status: 200 OK`))
			.catch(error => console.log(error));

		setUsersList({ ...usersList, refresh: true });
	}

	// Edits user
	async function editUserAtDatabase() {
		console.log(`\x1b[33m Editing user...`);

		await axios
			.post(`${BASE_URL}?id=${editableUser.id}&name=${editableUser.name}&edit=true`)
			.then(console.log(`\x1b[32m Status: 200 OK`))
			.catch(error => console.log(error));

		setUsersList({ ...usersList, refresh: true });
	}

	// Deletes user
	async function deleteUserFromDatabase() {
		console.log(`\x1b[33m Deleting user...`);

		await axios
			.post(`${BASE_URL}?name=${extraUser}&remove=true`)
			.then(console.log(`\x1b[32m Status: 200 OK`))
			.catch(error => console.log(error));

		setUsersList({ ...usersList, refresh: true });
	}

	/*
		Other functions
	*/
	function changeNewUser(e) {
		setNewUser(e.currentTarget.value);
	}

	function changeExtraUser(e) {
		setExtraUser(e.currentTarget.value);
	}

	function addUser() {
		setNewUser("");
		setMessage("Adding new user...");
		addNewUserToDatabase();
	}

	function editUser(e) {
		const id = Number(e.currentTarget.id);

		for (let i = 0; i < usersList.data.length; i++) {
			if (usersList.data[i].id === id) {
				usersList.data[i].name = e.currentTarget.value;
				setEditableUser({ id: usersList.data[i].id, name: e.currentTarget.value });
			}
		}
	}

	function saveChanges() {
		if (editableUser.name === "") return;

		editUserAtDatabase();
		setEditableUser();
		setMessage("Saving changes...");
	}

	function deleteUser() {
		setExtraUser("");
		deleteUserFromDatabase();
		setMessage("Deleting user...");
	}

	return (
		<div>
			{message && (
				<div className="modal-message">
					<p className="message">{message}</p>
				</div>
			)}

			<div className="control-block">
				<div className="control-field">
					<input type="text" value={newUser} onChange={changeNewUser} />

					<button type="button" onClick={addUser}>
						Add
					</button>
				</div>

				<div className="control-field">
					<input type="text" value={extraUser} onChange={changeExtraUser} />

					<button type="button" onClick={deleteUser}>
						Delete
					</button>
				</div>
			</div>

			<h3>Users List:</h3>
			<table>
				<tbody>
					<tr>
						<th>id</th>
						<th>name</th>
					</tr>

					{usersList.data &&
						usersList.data.map(user => (
							<tr key={user.id}>
								<td>
									<b>{user.id}</b>
								</td>
								<td>
									<input type="text" id={user.id} value={user.name} onChange={editUser} onBlur={saveChanges} />
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}
