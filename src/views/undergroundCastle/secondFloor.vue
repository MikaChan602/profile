<!-- 3F 計算機 -->
<template>
	<div class="wrapper">
		<div class="calculator">
			<div class="top">
				<div class="calculation">{{ combineStr }}</div>
				<div class="result">{{ thousands(combineStr) }}</div>
			</div>
			<div class="keyboard">
				<ul class="row" style="margin-top: 16px">
					<li @click="getNumber($event)">7</li>
					<li @click="getNumber($event)">8</li>
					<li @click="getNumber($event)">9</li>
					<li class="btn">÷</li>
				</ul>
				<ul class="row">
					<li @click="getNumber($event)">4</li>
					<li @click="getNumber($event)">5</li>
					<li @click="getNumber($event)">6</li>
					<li class="btn">×</li>
				</ul>
				<ul class="row">
					<li @click="getNumber($event)">1</li>
					<li @click="getNumber($event)">2</li>
					<li @click="getNumber($event)">3</li>
					<li class="btn">÷</li>
				</ul>
				<ul class="row">
					<li @click="getNumber($event)">0</li>
					<li @click="getNumber($event)">00</li>
					<li @click="getNumber($event)">.</li>
					<li class="btn">+</li>
				</ul>
				<ul class="row">
					<li class="AC" @click="combineStr = '0'">AC</li>
					<li>
						<div class="btnCancel" @click="handleDelNum">⌫</div>
					</li>
					<li style="width: 50%" class="btn equal">=</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script setup>
	import { ref, watchEffect } from "vue";
	import {thousands} from '@/utils/utils.js'
	// const number = ref("");
	const combineStr = ref("0");

	// 組數字
	const getNumber = ($event) => {
		const init = combineStr.value.substr(0);
		// TODO　判斷字串裡面是否有小數點
		if (init === "0") {
			combineStr.value = "";
		}
		console.log("init", init);
		const number = $event.target.innerHTML;
		combineStr.value += number;
		console.log("number", number);
		console.log("combineStr", combineStr.value);
	};

	// 刪除數字
	const handleDelNum = () => {
		console.log("delete");
		const numLen = combineStr.value.length;
		console.log("length", numLen);
		if (numLen === 1 && combineStr.value == "0") {
			return;
		} else if (numLen === 1 && combineStr.value !== "0") {
			combineStr.value = "0";
		} else {
			combineStr.value = combineStr.value.substring(0, numLen - 1);
		}
	};

	
</script>
<style lang="scss" scoped>
	.wrapper {
		background-color: #e8e8e8;
		width: 1280px;
		max-width: 93%;
		height: 800px;
		margin: 0 auto;
		padding-top: 129px;
		color: #fff;
		font-size: 24px;
		// font
		font-family: "Roboto", sans-serif;
		font-weight: 400;
		font-style: normal;
		user-select: none;
	}
	.calculator {
		background-color: #062145;
		width: 350px;
		height: 525px;
		border-radius: 20px;
		margin: 0 auto;
		overflow: hidden;
		.top {
			height: 109px;
			background-color: #041936;
			padding-top: 16px;
			padding-right: 19px;
			padding-left: 19px;
		}
		.calculation {
			color: #00c4ff;
			text-align: right;
			font-size: 16px;
		}
		.result {
			text-align: right;
			font-size: 56px;
			height: 66px;
			line-height: 56px;
		}
	}
	.keyboard {
		color: #fff;
		width: 100%;
		.row {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 16px;
			li {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 25%;
				text-align: center;
				height: 64px;
			}
		}
	}

	.btn {
		display: flex;
		background-color: #041936;
		border-radius: 16px;
		width: 72px;
		height: 64px;
		justify-content: center;
		align-items: center;
		font-size: 24px;
		margin-right: 8px;
		&.equal {
			background: transparent linear-gradient(90deg, #00c4ff 0%, #6c00ff 100%)
				0% 0% no-repeat padding-box;
			justify-content: right !important;
			padding-right: 30px;
		}
	}
	.AC {
		color: #00c4ff;
		font-size: 24px;
	}
	.btnCancel {
		color: #00c4ff;
		font-size: 26px;
	}
</style>
