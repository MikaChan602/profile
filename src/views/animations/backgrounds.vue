<template>
	<div class="bgWrapper">
		<img src="https://picsum.photos/1500/800" />
		<Flare />
	</div>
</template>
<script setup>
	import { Flare } from "./components/backgrounds";
</script>
<style lang="scss" scoped>
	.bgWrapper {
		overflow: hidden;
	}
</style>
