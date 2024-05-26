<template>
	<div class="menu">
		<!-- <RouterLink to="/profiles">作品集</RouterLink> -->
		<el-menu class="el-menu-demo" mode="horizontal">
			<el-sub-menu index="1">
				<template #title>小工具</template>
				<el-menu-item index="1-1">
					<RouterLink to="/lottery">抽獎</RouterLink>
				</el-menu-item>
				<el-menu-item>
					<RouterLink to="/calendar">日曆</RouterLink>
				</el-menu-item>
			</el-sub-menu>
			<!-- <el-sub-menu index="1">
				<template #title>讀書會</template>
				<el-menu-item index="1-1">
					<RouterLink to="/lottery">抽獎</RouterLink>
				</el-menu-item>
				<el-menu-item>
					<RouterLink to="/calendar">日曆</RouterLink>
				</el-menu-item>
			</el-sub-menu> -->
		</el-menu>
	</div>
</template>
<script setup>
	import { RouterLink, RouterView } from "vue-router";
</script>
<style lang="scss" scoped>
	a {
		display: block;
		width: 100%;
	}
</style>
