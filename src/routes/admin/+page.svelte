<script>
	import { db } from '../../lib/firebase';
	import { authHandlers, authStore } from '../../store/store';
	import { getDoc, doc, setDoc } from 'firebase/firestore';
	import TodoItem from '../../components/TodoItemAdmin.svelte';
	import { PUBLIC_DB_KEY } from '$env/static/public';
	let form = true;
	let content = false;
	let inputkey = '';
	function handleAuthenticate() {
		console.log(inputkey);
		if (inputkey == PUBLIC_DB_KEY) {
			form = false;
			content = true;
		} else {
			console.log('False');
		}
		return;
	}

	let todoList = [];
	let currTodo = '';
	let error = false;

	authStore.subscribe((curr) => {
		todoList = curr.data.todos;
	});

	function addTodo() {
		error = false;
		if (!currTodo) {
			error = true;
		}
		todoList = [...todoList, currTodo];
		currTodo = '';
	}

	function editTodo(index) {
		let newTodoList = [...todoList].filter((val, i) => {
			console.log(i, index, i !== index);
			return i != index;
		});
		currTodo = todoList[index];
		todoList = newTodoList;
	}

	function removeTodo(index) {
		let newTodoList = [...todoList].filter((val, i) => {
			console.log(i, index, i !== index);
			return i != index;
		});
		todoList = newTodoList;
	}

	async function saveTodos() {
		try {
			const userRef = doc(db, 'users', $authStore.user.uid);
			await setDoc(
				userRef,
				{
					todos: todoList
				},
				{ merge: true }
			);
		} catch (err) {
			console.log('There was an error saving your information');
		}
	}
</script>

{#if form}
	<pre>{JSON.stringify(inputkey, null, 2)}</pre>
	<form>
		<label>
			<input bind:value={inputkey} type="text" placeholder="Key" />
			<button on:click={handleAuthenticate} type="button" class="submitBtn">Submit </button>
		</label>
	</form>
{/if}

{#if content}
	<div class="mainContainer">
		<div class="headerContainer">
			<h1>Todo List</h1>
			<div class="headerBtns">
				<button on:click={saveTodos}>
					<i class="fa-regular fa-floppy-disk" />
					<p>Save</p></button
				>
				<button on:click={authHandlers.logout}>
					<i class="fa-solid fa-right-from-bracket" />
					<p>Logout</p></button
				>
			</div>
		</div>
		<main>
			{#if todoList.length === 0}
				<p>You have nothing to do!</p>
			{/if}
			{#each todoList as todo, index}
				<TodoItem {todo} {index} {removeTodo} {editTodo} />
			{/each}
		</main>
	</div>
{/if}

<style>
	.mainContainer {
		background: linear-gradient(to right, #000428, #000046);
		color: white;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		gap: 24px;
		padding: 24px;
		width: 100%;
		max-width: 1000px;
		margin: 0 auto;
	}

	.headerContainer {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.headerBtns {
		display: flex;
		align-items: center;
		gap: 14px;
	}

	.headerContainer button {
		background: #003c5b;
		color: white;
		padding: 10px 18px;
		border: none;
		border-radius: 4px;
		font-weight: 700;
		display: flex;
		align-items: center;
		gap: 10px;
		cursor: pointer;
	}

	.headerContainer button i {
		font-size: 1.1rem;
	}

	.headerContainer button:hover {
		opacity: 0.7;
	}

	main {
		display: flex;
		flex-direction: column;
		gap: 8px;
		flex: 1;
	}
</style>
