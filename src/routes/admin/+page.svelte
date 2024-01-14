<script>
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
	<h1>content</h1>
{/if}
