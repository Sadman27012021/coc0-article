<script>
	import { db } from '../../lib/firebase';
	import { collection, query, onSnapshot } from 'firebase/firestore';
	const colRef = collection(db, 'users');
	const q = query(colRef);
	let emails = [];
	onSnapshot(q, (snapshot) => {
		let books = [];
		snapshot.docs.forEach((doc) => {
			books.push({ ...doc.data(), id: doc.id });
		});
		console.log(books);
		emails = [];
		for (let i in books) {
			emails.push(books[i].email);
			console.log(emails);
		}
	});
</script>

<main>
	{#each emails as email}
		<h2>{email}</h2>
	{/each}
</main>
