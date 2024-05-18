<template>
	<div class="menu">
		<!-- <RouterLink to="/profiles">作品集</RouterLink> -->
		<el-menu class="el-menu-demo" mode="horizontal">
			<el-sub-menu index="1">
				<template #title>Profiles</template>
				<el-menu-item index="1-1">
					<RouterLink to="/profiles">抽獎</RouterLink>
				</el-menu-item>
			</el-sub-menu>
		</el-menu>
	</div>
</template>
<script setup></script>
<style lang="scss" scoped></style>
