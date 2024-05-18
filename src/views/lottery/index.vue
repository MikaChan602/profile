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
				<el-button
					type="primary"
					@click="startLottery"
					:disabled="fixedData.data.length !== 0"
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
	import { onMounted, reactive, ref, watchEffect } from "vue";
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
	function startLottery() {
		if (lotteryList.data.length < 2) {
			ElMessage.warning("至少要有兩個項目");
			return;
		}
		showInput.value = false;
		fixedData.data = lotteryList.data;
		listOne.data = [...lotteryList.data];
		btnDisable.value = true;
		// 存 local storage
		localStorage.setItem("listOne", JSON.stringify(listOne.data));
		localStorage.setItem("allData", JSON.stringify(fixedData.data));
		console.log(localStorage.getItem("allData"));
	}
	/** 清除資料*/
	function clear() {
		// 清除local storage
		localStorage.setItem("listTwo", JSON.stringify([]));
		localStorage.setItem("listOne", JSON.stringify([]));
		localStorage.setItem("allData", JSON.stringify([]));

		// 重製上方搜尋
		lotteryStr.value = "";
		lotteryList.data = [];
		// 重製陣列
		fixedData.data = [];
		listOne.data = [];
		listTwo.data = [];
		// 重製狀態
		showInput.value = true;
		btnDisable.value = false;
	}

	/** 抽籤 */
	function drawLots() {
		if (listOne.data.length === 0) {
			ElMessage.error("已抽完了唷！");
			return;
		}
		// 名單總長
		const arrLen = listOne.data.length;
		// 隨機碼
		const random = Math.floor(Math.random() * arrLen);
		console.log("random", random);
		ElMessage.success(`抽出的是${listOne.data[random]}`);
		// 處理資料
		listTwo.data.push(listOne.data[random]);
		listOne.data.splice(random, 1);
		// 處理localStorage
		localStorage.setItem("listOne", JSON.stringify(listOne.data));
		localStorage.setItem("listTwo", JSON.stringify(listTwo.data));
	}

	onMounted(() => {
		const one = JSON.parse(localStorage.getItem("listOne")) || [];
		const two = JSON.parse(localStorage.getItem("listTwo")) || [];
		const allData = JSON.parse(localStorage.getItem("allData")) || [];
		console.log(allData.length);
		if (allData.length !== 0) {
			fixedData.data = allData;
			listOne.data = one;
			showInput.value = false;
		}
		if (two !== null) {
			listTwo.data = two;
		}
	});
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
