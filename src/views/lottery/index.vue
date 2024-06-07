<template>
	<div class="wrapper">
		<el-form label-width="auto">
			<div v-show="showInput">
				<div class="title">
					<span class="text">請輸入預進行亂數抽獎的資料</span>
					<el-button
						class="start"
						type="primary"
						plain
						@click="startLottery"
						:disabled="fixedData.data.length !== 0"
						>以此列表開始抽獎</el-button
					>
				</div>

				<el-form-item>
					<el-input
						type="textarea"
						:autosize="{ minRows: 4, maxRows: 10 }"
						placeholder="請輸入獎品，可使用,;作區隔"
						v-model="lotteryStr"
					/>
				</el-form-item>
			</div>
			<!-- 抽獎畫面執行區塊 -->
			<div v-show="showInput === false">
				<div class="title">
					<span class="text">亂數抽獎資料</span>
					<div>
						<el-button type="danger" plain @click="clear">清除重填</el-button>
						<el-button type="success" plain @click="handleReset"
							>下面重抽</el-button
						>
					</div>
				</div>
				<div class="listArea">
					<h3>
						列表結果 : 共
						<span style="color: crimson; font-size: 16px">
							{{ fixedData.data.length }} 個</span
						>項目
					</h3>
					<ul>
						<li v-for="item in fixedData.data">
							{{ item }}
						</li>
					</ul>
				</div>

				<div class="title">
					<span class="text">抽獎專區</span>
					<el-button type="success" style="margin: 3%" @click="drawLots"
						>抽我R！</el-button
					>
				</div>
				<div v-show="fixedData.data.length !== 0">
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
			</div>
		</el-form>
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
		// TODO:追加防呆
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

	function handleReset() {
		console.log("重抽");
		// 處理資料
		listOne.data = [...listOne.data, ...listTwo.data];
		listTwo.data = [];
		console.log("listone", listOne.data);
		console.log("listtwo", listTwo.data);
		// 處理localStorage
		localStorage.setItem("listOne", JSON.stringify(listOne.data));
		localStorage.setItem("listTwo", JSON.stringify(listTwo.data));
		ElMessage.success("可以重抽了唷！");
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

	.wrapper {
		width: 1200px;
		max-width: 93%;
		margin: 0 auto;
		background-color: #f0e5de;
		color: #1f4e5f;
		padding: 3%;
		border-radius: 14px;
		box-shadow: 1px 2px 3px rgba(155, 130, 129, 0.5);
	}
	.title {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 3%;
		.text {
			font-weight: 500;
			font-size: 26px;
		}
		.start {
			margin-left: 3%;
		}
	}
	.twoCard {
		// display: flex;
		.el-card {
			max-width: 100%;
		}
	}
	.listArea {
		background-color: #fffff3;
		padding: 3%;
		border-radius: 4px;
		ul {
			height: 200px;
			overflow: scroll;
			display: flex;
		li {
			padding-left: 2%;
			padding-right: 2%;
			margin-right: 1%;
			// background-color: #754f44;
			// color: #fffff3;
			// text-align: center;
			border-radius: 4px;
		}
	}
	}
</style>
