<script lang="ts">
	export let paraConverter: number;
	console.log(paraConverter);
</script>

<label class="card flex flex-col items-center p-4 gap-2">
	<span>NUMERO ROMANO</span>
	<input
		class="input h-10 p-4"
		type="text"
		placeholder="Digite um numero"
		bind:value={paraConverter}
	/>
</label>
