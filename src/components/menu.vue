<template>
	<div class="menu">
		<el-menu class="el-menu-demo" mode="horizontal">
			<el-sub-menu :index="key" v-for="(parent, key) in menu.data">
				<template #title>{{ parent.name }}</template>
				<el-menu-item index="1-1" v-for="(child, key2) in parent.children">
					<RouterLink :to="child.path">{{ child.name }}</RouterLink>
				</el-menu-item>
			</el-sub-menu>
		</el-menu>
	</div>
</template>
<script setup>
	import { reactive } from "vue";
	import { RouterLink, RouterView } from "vue-router";
	import router from "../router";
	const menu = reactive({ data: [...router.options.routes] });
	console.log("hi", menu);
</script>
<style lang="scss" scoped>
	a {
		display: block;
		width: 100%;
	}
</style>
