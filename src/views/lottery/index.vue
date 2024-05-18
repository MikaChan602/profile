<template>
	<div>
		<el-form label-width="auto" style="max-width: 600px">
			<div>
				<el-form-item label="請輸入獎品" v-show="showInput">
					<el-input
						type="textarea"
						:autosize="{ minRows: 2, maxRows: 4 }"
						placeholder="請輸入獎品，可使用,;作區隔"
						v-model="lotteryStr"
					/>
				</el-form-item>
			</div>
			<div>
				<el-button type="primary" @click="starLottery" :disabled="btnDisable"
					>以此列表開始抽獎</el-button
				>
				<el-button type="danger" @click="clear">清除重填</el-button>
			</div>
		</el-form>
		<el-divider content-position="left">列表結果</el-divider>
		<ul>
			<li v-for="item in fixedData.data">{{ item }}</li>
		</ul>

		<el-divider content-position="left">抽獎專區</el-divider>
		<el-button type="success" style="margin: 3%" @click="drawLots"
			>抽我R！</el-button
		>
		<div class="twoCard">
			<el-card style="margin-right: 2%">
				<template #header>
					<div class="card-header">
						<span>尚未抽出</span>
					</div>
				</template>
				<p
					v-for="(item, key) in listOne.data"
					:key="item"
					v-show="listOne.data.length !== 0"
				>
					<span>{{ key + 1 }}、</span>
					<span> {{ item }}</span>
				</p>
				<p v-show="listOne.data.length === 0">已抽完！</p>
				<template #footer>剩餘數量：{{ listOne.data.length }}</template>
			</el-card>
			<el-card>
				<template #header>
					<div class="card-header">
						<span>已抽出</span>
					</div>
				</template>
				<p v-for="(item2, key) in listTwo.data" :key="key">
					<span>{{ key + 1 }}、</span>
					<span> {{ item2 }}</span>
				</p>
				<template #footer>抽出數量：{{ listTwo.data.length }}</template>
			</el-card>
		</div>
	</div>
</template>
<script setup>
	import { reactive, ref, watchEffect } from "vue";
	import { splitStr } from "../../utils/utils";
	import { ElMessage } from "element-plus";
	const lotteryStr = ref("");
	const lotteryList = reactive({ data: [] });
	const fixedData = reactive({ data: [] });
	const showInput = ref(true);
	const btnDisable = ref(false);
	const listOne = reactive({ data: [] }); // 尚未抽出
	const listTwo = reactive({ data: [] }); // 已抽出
	// 分類
	watchEffect(() => {
		lotteryList.data = splitStr(lotteryStr.value);
	});
	// 以此列表開始抽獎
	// ! 把上部分隱藏
	function starLottery() {
		if (lotteryList.data.length < 2) {
			ElMessage.warning("至少要有兩個項目");
			return;
		}
		showInput.value = false;
		fixedData.data = lotteryList.data;
		listOne.data = [...lotteryList.data];
		btnDisable.value = true;
	}
	/** 清除資料*/
	function clear() {
		lotteryStr.value = "";
		lotteryList.data = [];
		fixedData.data = [];
		showInput.value = true;
		btnDisable.value = false;
	}

	/** 抽籤 */
	function drawLots() {
		if (listOne.data.length === 0) {
			ElMessage.success("已抽完了唷！");
			return;
		}
		const arrLen = listOne.data.length;
		const random = Math.floor(Math.random() * arrLen);
		console.log("random", random);
		ElMessage.success(`抽出的是${listOne.data[random]}`);
		listTwo.data.push(listOne.data[random]);
		listOne.data.splice(random, 1);
		console.log(listOne.data);
		// 隨機抓陣列的數字
		// listOne.data.filter((item)=>{
		//     console.log(item)
		// })
	}
</script>
<style scoped lang="scss">
	ul {
		display: flex;
		li {
			background-color: #ecfaf9;
			margin: 1%;
			padding: 1% 4%;
			border-radius: 14px;
			text-align: center;
		}
	}
	.twoCard {
		display: flex;
		.el-card {
			width: 600px;
		}
	}
</style>
