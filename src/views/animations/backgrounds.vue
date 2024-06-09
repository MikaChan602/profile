<template>
	<div class="bgWrapper">
		<div class="tags">
			<el-check-tag
				v-for="(item, key) in animationBG.data"
				type="warning"
				@Click="now = item.name"
			>
				{{ item.name }}
			</el-check-tag>
		</div>
		<el-image :src="'https://picsum.photos/1500/1000'" :fit="'cover'" />
		<div>
			<Flare v-show="now === 'Flare'" />
			<div v-show="now === 'Snow'">snow</div>
		</div>
	</div>
</template>
<script setup>
	import { reactive, ref } from "vue";
	import { Flare } from "./components/backgrounds";

	const now = ref("Flare");
	const animationBG = reactive({
		data: [
			{
				name: "Flare",
			},
			{
				name: "Snow",
			},
		],
	});
</script>
<style lang="scss" scoped>
	.bgWrapper {
		overflow: hidden;
	}
	.tags {
		margin-top: 3px;
		margin-bottom: 3px;
		padding-left: 3px;
		.el-check-tag {
			margin-right: 3px;
		}
	}
</style>
