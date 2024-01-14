<script>
	export let index;
	export let todo;
</script>

<div class="todo">
	<p>
		{index + 1}. {todo}
	</p>
</div>

<style>
	.todo {
		border-left: 1px solid cyan;
		padding: 8px 14px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
