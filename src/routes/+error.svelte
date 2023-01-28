<script>
	import { page } from '$app/stores';
</script>

<div class="text-white bg-black1">
	Что-то пошло не так
	<h1>{$page.status}: {$page.error.message}</h1>
</div>
