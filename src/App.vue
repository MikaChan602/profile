<script setup lang="ts">
	import { RouterLink, RouterView } from "vue-router";
	import Menu from "./components/menu.vue";

	console.log(
		"%cHello World!",
		"font-size:50px; color:#285943; font-family:Arial,sans-serif;background-color:#8CD790"
	);
	console.log("%cIt's Mika.", "font-size:16px; color:#285943");
	console.log(
		"%cMy Github Page : https://github.com/MikaChan602",
		"color:#285943;font-size:16px; ",
	);
</script>

<template>
	<div>
		<div>
			<Menu />
		</div>
		<div>
			<RouterView />
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
