<script>
	import { onMount } from 'svelte';
	import { auth, db } from '../lib/firebase';
	import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
	import { authStore } from '../store/store';

	const AuthRoutes = ['/user-dashboard'];

	onMount(() => {
		console.log('Mounting');
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			const currentPath = window.location.pathname;

			if (!user && AuthRoutes.includes(currentPath)) {
				window.location.href = '/';
				return;
			}

			if (user && currentPath === '/auth') {
				window.location.href = '/user-dashboard';
				return;
			}

			if (!user) {
				return;
			}

			let dataToSetToStore;
			const listRef = doc(db, 'ref', 'colRef');
			const docRef = doc(db, 'users', user.email);
			const docSnap = await getDoc(docRef);
			if (!docSnap.exists()) {
				console.log('Creating User');
				const userRef = doc(db, 'users', user.email);
				dataToSetToStore = {
					email: user.email,
					todos: []
				};
				await setDoc(userRef, dataToSetToStore, { merge: true });
			} else {
				console.log('Fetching User');
				const userData = docSnap.data();
				dataToSetToStore = userData;
			}
			getDoc(listRef)
				.then((docSnapshot) => {
					if (docSnapshot.exists() && !docSnapshot.data().array.includes(user.email)) {
						console.log(user.email);
						const existingArray = docSnapshot.data().array || [];
						const updatedArray = [...existingArray, user.email];

						// Update the 'array' field
						return updateDoc(listRef, { array: updatedArray });
					} else {
						console.log('Document does not exist.');
					}
				})
				.then(() => {
					console.log('Element added successfully!');
				})
				.catch((error) => {
					console.error('Error adding element:', error);
				});

			authStore.update((curr) => {
				return {
					...curr,
					user,
					data: dataToSetToStore,
					loading: false
				};
			});
		});
		return unsubscribe;
	});
</script>

<div class="mainContainer">
	<slot />
</div>

<style>
	.mainContainer {
		min-height: 100vh;
		/* background: linear-gradient(to right, #000428, #000046); */
		/* color: white; */
		position: relative;
		display: flex;
		flex-direction: column;
	}
</style>
