<script setup lang="ts">
	import { RouterLink, RouterView } from "vue-router";
	import Menu from "./components/menu.vue";
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
