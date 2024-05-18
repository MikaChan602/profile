<script setup lang="ts">
	import { RouterLink, RouterView } from "vue-router";
	import Menu from "./components/menu.vue";
</script>

<template>
	<div>
		<div>
			<Menu />
		</div>
		<div class="main">
			<RouterView />
		</div>
	</div>
</template>

<style scoped lang="scss">
.main{
	width: 93%;
	margin: 0 auto;
	margin-top: 5%;
}
</style>
