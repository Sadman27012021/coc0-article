<script>
	let email = '';
	import { db } from '../../lib/firebase';
	import { doc, onSnapshot } from 'firebase/firestore';
	let docRef = doc(db, 'users', 'VaH2ErpbFJUkQDbAraXwyBfy7do1');
	const unsubDoc = onSnapshot(docRef, (doc) => {
		console.log(doc.data(), doc.id);
		let data = doc.data();
		email = data.email;
		console.log(email);
	});
</script>

<h1>{email}</h1>
