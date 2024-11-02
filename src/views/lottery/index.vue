<template>
	<div>
		<div class="wrapper" style="margin-top: 15px; color: #3f4b3b">
			<el-row :gutter="20">
				<el-col :span="20" :xs="24" style="margin-top: 5px">
					<h1>抽獎專區</h1>
				</el-col>
				<!-- TODO 匯出抽獎結果 -->
				<el-col :span="4" :xs="24" style="margin-top: 5px">
					<el-button
						@click="downloadFile"
						plain
						type="primary"
						class="btn"
						v-show="listOne.data.length === 0"
					>
						匯出抽獎結果
					</el-button>
				</el-col>
			</el-row>

			<!-- </div> -->
			<el-divider border-style="dashed" style="margin-top: 15px" />
		</div>
		<div class="wrapper">
			<el-row :gutter="20">
				<el-col :span="8" :xs="24" style="margin-top: 5px">
					<div class="list">
						<div class="title">抽出獎池 {{ fixedData.data.length }}</div>
						<div class="content">
							<ul>
								<li v-for="item in fixedData.data">
									{{ item }}
								</li>
							</ul>
							<div class="none">
								<span v-show="fixedData.data.length === 0">無資料</span>
							</div>
						</div>
					</div>
				</el-col>
				<el-col :span="8" :xs="24" style="margin-top: 5px">
					<div class="list">
						<div class="title">剩餘內容 {{ listOne.data.length }}</div>
						<div class="content">
							<ul>
								<li v-for="item in listOne.data">
									{{ item }}
								</li>
							</ul>
							<div class="none">
								<span v-show="listOne.data.length === 0">無資料</span>
							</div>
						</div>
					</div>
				</el-col>
				<el-col :span="8" :xs="24" style="margin-top: 5px">
					<div class="list">
						<div class="title">抽獎結果 {{ listTwo.data.length }}</div>
						<div class="content" v-show="!forOwnerParams.isNeed">
							<ul>
								<li v-for="item in listTwo.data">
									{{ item }}
								</li>
							</ul>
							<div class="none">
								<span v-show="listTwo.data.length === 0">無資料</span>
							</div>
						</div>
						<div class="content" v-show="forOwnerParams.isNeed">
							<ul>
								<li v-for="(item, key) in showList" :key="key">
									{{ item }}
								</li>
							</ul>
							<div class="none">
								<span v-show="fixedData.data.length === 0">無資料</span>
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
		<div
			class="wrapper"
			v-show="fixedData.data.length == 0"
			style="margin-top: 2%"
		>
			<el-divider border-style="dashed" content-position="left">
				獎池 (被抽出內容)
			</el-divider>
			<el-row :gutter="20">
				<el-col :span="20" :xs="24" style="margin-top: 5px">
					<el-form-item>
						<el-input
							type="textarea"
							:autosize="{ minRows: 2, maxRows: 5 }"
							placeholder="請輸入內容，可使用,;、換行作區隔"
							v-model="lotteryStr"
							:disabled="fixedData.data.length !== 0"
						/>
					</el-form-item>
				</el-col>
				<el-col
					:span="4"
					:xs="24"
					style="display: flex; text-align: right; align-items: center"
					><el-button
						type="primary"
						plain
						@click="startLottery"
						:disabled="fixedData.data.length !== 0"
						>確定</el-button
					>
				</el-col>
			</el-row>
		</div>
		<div class="wrapper" style="margin-top: 2%">
			<el-checkbox
				v-model="forOwnerParams.isNeed"
				:disabled="forOwnerParams.disabled"
				>是否需要有比照列表</el-checkbox
			>
		</div>
		<div class="wrapper" style="margin-top: 2%" v-show="forOwnerParams.isNeed">
			<el-divider border-style="dashed" content-position="left">
				請輸入抽獎列表（兩列表長度必須相等）
			</el-divider>
			<el-row :gutter="20">
				<el-col :span="20" :xs="24" style="margin-top: 5px">
					<el-form-item>
						<el-input
							type="textarea"
							:autosize="{ minRows: 2, maxRows: 5 }"
							placeholder="請輸入內容，可使用,;、換行作區隔"
							v-model="forOwnerParams.str"
							:disabled="forOwnerParams.disabled"
						/>
					</el-form-item>
				</el-col>
				<el-col
					:span="4"
					:xs="24"
					style="display: flex; text-align: right; align-items: center"
					><el-button
						type="primary"
						plain
						@click="handleConfirmOwner"
						:disabled="forOwnerParams.disabled"
						>確定</el-button
					>
				</el-col>
			</el-row>
		</div>

		<div class="wrapper" style="margin-top: 2%; margin-bottom: 2%">
			<el-divider />
			<div class="buttons">
				<el-row :gutter="20">
					<el-col :span="8">
						<el-button @click="clear" plain type="danger" class="btn">
							全部清除
						</el-button>
					</el-col>
					<el-col :span="8">
						<el-button @click="drawLots" plain type="primary" class="btn">
							抽獎
						</el-button>
					</el-col>
					<el-col :span="8">
						<el-button @click="handleReset" plain type="success" class="btn">
							重抽
						</el-button>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>
<script setup>
	import { onMounted, reactive, ref, watchEffect, computed } from "vue";
	import { splitStr } from "../../utils/utils";
	import { ElMessage, ElMessageBox } from "element-plus";
	import { excelExport } from "../../utils/excelExport";
	const lotteryStr = ref("");
	const lotteryList = reactive({ data: [] });
	const forOwnerParams = reactive({
		disabled: false,
		isNeed: false,
		str: "",
		data: [],
		count: 0,
	}); // 得獎者用參數
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
		if (forOwnerParams.isNeed && forOwnerParams.data < 2) {
			ElMessage.warning("因有勾選得獎者故請添加後再確認");
			return;
		}
		if (lotteryList.data.length < 2) {
			ElMessage.warning("抽獎資料至少要有兩個項目");
			return;
		}
		if (
			forOwnerParams.isNeed &&
			forOwnerParams.data.length !== lotteryList.data.length
		) {
			ElMessage.error("抽獎人和獎品數量不一致");
			return;
		}
		showInput.value = false;
		fixedData.data = lotteryList.data;
		listOne.data = [...lotteryList.data];
		btnDisable.value = true;
		// 存 local storage
		localStorage.setItem("listOne", JSON.stringify(listOne.data));
		localStorage.setItem("allData", JSON.stringify(fixedData.data));
		// console.log(localStorage.getItem("allData"));
	}
	/** 清除資料*/
	function clear() {
		ElMessageBox.confirm(
			"如確定清除資料需重新填寫資料，確定要清除嗎？",
			"Warning",
			{
				confirmButtonText: "確定",
				cancelButtonText: "取消",
				type: "warning",
				center: true,
			}
		)
			.then(() => {
				ElMessage({
					type: "success",
					message: "已清除",
				});

				// 清除local storage
				localStorage.setItem("listTwo", JSON.stringify([]));
				localStorage.setItem("listOne", JSON.stringify([]));
				localStorage.setItem("allData", JSON.stringify([]));
				localStorage.setItem(
					"forOwnerParams",
					JSON.stringify({
						disabled: false,
						isNeed: false,
						str: "",
						data: [],
						count: 0,
					})
				);

				// 重置上方搜尋
				lotteryStr.value = "";
				lotteryList.data = [];
				// 重置陣列
				fixedData.data = [];
				listOne.data = [];
				listTwo.data = [];
				forOwnerParams.data = [];

				// 重置狀態
				showInput.value = true;
				btnDisable.value = false;
				forOwnerParams.isNeed = false;
				forOwnerParams.disabled = false;
			})
			.catch(() => {
				ElMessage({
					type: "info",
					message: "取消",
				});
			});
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
		// console.log("random", random);
		ElMessage.success(`抽出的是${listOne.data[random]}`);
		// 處理資料
		listTwo.data.push(listOne.data[random]);
		listOne.data.splice(random, 1);
		// 處理localStorage
		localStorage.setItem("listOne", JSON.stringify(listOne.data));
		localStorage.setItem("listTwo", JSON.stringify(listTwo.data));
	}

	/** 既有列表重抽 */
	function handleReset() {
		console.log("重抽");
		ElMessageBox.confirm("將重設抽獎中項目，確定重置?", "Warning", {
			confirmButtonText: "確定",
			cancelButtonText: "取消",
			type: "warning",
			center: true,
		})
			.then(() => {
				ElMessage({
					type: "success",
					message: "已重置",
				});
				// 處理資料
				listOne.data = [...listOne.data, ...listTwo.data];
				listTwo.data = [];
				console.log("listone", listOne.data);
				console.log("listtwo", listTwo.data);
				// 處理localStorage
				localStorage.setItem("listOne", JSON.stringify(listOne.data));
				localStorage.setItem("listTwo", JSON.stringify(listTwo.data));
				ElMessage.success("可以重抽了唷！");
			})
			.catch(() => {
				ElMessage({
					type: "info",
					message: "取消",
				});
			});
	}

	async function downloadFile() {
		console.log("showList", showList.value);
		console.log("欄位", forOwnerParams.disabled);
		let obj;
		if (forOwnerParams.disabled) {
			obj = {
				name: "Table",
				ref: "A2", // 表格起始位置
				columns: [
					{ name: "序號" },
					{ name: "得獎者", filterButton: true },
					{ name: "獎品", filterButton: true },
				],
				rows: [],
			};
			showList.value.forEach((item, key) => {
				const arr = item.split("-");
				arr.unshift(key + 1);
				obj.rows.push(arr);
				console.log(arr);
			});
		} else {
			obj = {
				name: "TableTest",
				ref: "A2", // 表格起始位置
				columns: [{ name: "序號" }, { name: "獎品", filterButton: true }],
				rows: [],
			};

			showList.value.forEach((item, key) => {
				const arr = [item.split("-")[1]];
				arr.unshift(key + 1);
				obj.rows.push(arr);
			});
		}
		console.log("obj", obj);
		excelExport(obj);
	}

	/** 確定抽獎人選 */
	function handleConfirmOwner() {
		const result = splitStr(forOwnerParams.str);
		forOwnerParams.data = [...result];
		forOwnerParams.disabled = true;
		localStorage.setItem("forOwnerParams", JSON.stringify(forOwnerParams));
	}

	/** 用於顯示 */
	const showList = computed(() => {
		return fixedData.data.map((_, key) => {
			const owner = forOwnerParams.data[key] || "";
			const gotItem = listTwo.data[key] || "";
			return `${owner} - ${gotItem}`;
		});
	});

	onMounted(() => {
		const one = JSON.parse(localStorage.getItem("listOne")) || [];
		const two = JSON.parse(localStorage.getItem("listTwo")) || [];
		const allData = JSON.parse(localStorage.getItem("allData")) || [];
		const owner = JSON.parse(localStorage.getItem("forOwnerParams")) || {
			disabled: false,
			isNeed: false,
			str: "",
			data: [],
			count: 0,
		};

		// console.log(allData.length);
		if (allData.length !== 0) {
			fixedData.data = allData;
			listOne.data = one;
			showInput.value = false;
		}
		if (two !== null) {
			listTwo.data = two;
		}

		if (owner !== null) {
			const { disabled, isNeed, str, data, count } = owner;
			forOwnerParams.data = data;
			forOwnerParams.isNeed = isNeed;
			forOwnerParams.str = str;
			forOwnerParams.count = count;
			forOwnerParams.disabled = disabled;
		}
	});
</script>
<style scoped lang="scss">
	// new design
	.list {
		border: 1px solid #3f4b3b;
		border-radius: 4px;
		box-shadow: 2px 2px 2px rgba(63, 75, 59, 0.3);
		.title {
			font-size: 16px;
			font-weight: 590;
			color: #44633f;
			border-bottom: 1px solid #3f4b3b;
			padding: 10px;
		}
		.content {
			min-height: 300px;
			max-height: 300px;
			overflow-y: auto;
			padding: 10px;
		}
	}

	.buttons {
		text-align: center;
		max-width: 93%;
		margin: 0 auto;
	}

	.btn {
		width: 180px;
		height: 50px;
		font-size: 16px;
		font-weight: 700;
		border-radius: 12px;
	}

	.wrapper {
		max-width: 93%;
		margin: 0 auto;
	}
	li {
		height: 35px;
		line-height: 35px;
		padding-left: 20px;
		background-color: rgb(211 212 210 / 40%);
		color: rgba(63, 75, 59);
		margin-bottom: 10px;
		border-radius: 10px;
		font-size: 14px;
		margin-left: 0px;
	}
	ul {
		padding-left: 0px;
	}
	.none {
		display: flex;
		align-items: center;
		height: 250px;
		span {
			margin: auto;
			font-size: 18px;
			font-weight: 390;
			color: rgba(63, 75, 59);
		}
	}
</style>
