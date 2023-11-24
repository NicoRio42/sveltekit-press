<script lang="ts">
	const posts = [
		{ title: 'Toto', slug: 'toto' },
		{ title: 'Titi', slug: 'titi' }
	];
</script>

<ul>
	{#each posts as post}
		<li><a href={`posts/${post.slug}`}>{post.title}</a></li>
	{/each}
</ul>
