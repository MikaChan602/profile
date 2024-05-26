<template>
	<div class="calendar">
		<div class="title">
			<div class="left" @click="preMonth">{{ "<" }}</div>
			<div>
				<span>{{ year }}年</span>
				<span>{{ month + 1 }}月</span>
			</div>
			<div class="right" @click="nextMonth">
				{{ ">" }}
			</div>
		</div>
		<div class="body">
			<div class="row gray">
				<p>日</p>
				<p>一</p>
				<p>二</p>
				<p>三</p>
				<p>四</p>
				<p>五</p>
				<p>六</p>
			</div>
			<div class="row" v-for="(value, key) in dateArr.data" :key="key">
				<p
					v-for="element in value"
					class="circle"
					:class="thisDate === element.info ? 'clicked' : ''"
					@click="showDate(element.info)"
				>
					<span :class="element.class">
						{{ element.date }}
					</span>
				</p>
			</div>
		</div>
	</div>
	<div>
		<h1>你選擇的日期：{{ thisDate }}</h1>
	</div>
</template>
<script setup>
	import { ref, reactive, watchEffect } from "vue";
	import dayjs from "dayjs";

	const year = ref(dayjs().year());
	const month = ref(dayjs().month());
	const day = ref(dayjs().date());
	const thisDate = ref("");
	const dateArr = reactive({ data: [] });

	function nextMonth() {
		if (month.value === 11) {
			year.value++;
			month.value = 0;
		} else {
			month.value++;
		}
	}

	function preMonth() {
		if (month.value === 0) {
			year.value--;
			month.value = 11;
		} else {
			month.value--;
		}
	}
	// 閏年、非閏年月份天數
	const leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	const normalYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	// 算月曆中的日期
	watchEffect(() => {
		dateArr.data = [];
		const thisDay = year.value + "-" + (month.value + 1) + "-" + "1";
		let monthDays, preMonthDays; // 本月、上個月、下個月
		// 判斷是不是leap year
		const isLeapYear = year.value % 4;
		if (isLeapYear === 0) {
			console.log("整除", year.value);
			monthDays = leapYear[month.value]; // 本月有幾天？
			// 前一個月有幾天？
			if (month.value == 0) {
				preMonthDays = 31;
			} else {
				preMonthDays = leapYear[month.value - 1];
			}
		} else {
			console.log("不整除", year.value);
			const preMonthValue = month.value - 1 || 0;
			monthDays = normalYear[month.value]; // 本月有幾天？
			// 前一個月有幾天？
			if (month.value == 0) {
				preMonthDays = 31;
			} else {
				preMonthDays = normalYear[month.value - 1];
			}
		}

		const whatFirstDay = dayjs(thisDay).day(); // 當月第一天是星期幾？

		// 取得當月最後一天必要參數
		const lastDay = year.value + "-" + (month.value + 1) + "-" + monthDays;
		const whatLastDay = dayjs(lastDay).day(); // 當月最後一天是星期幾？
		let dayArr = [];

		// 第一步：把當月總天數丟進月曆裡面
		for (let i = 1; i <= monthDays; i++) {
			const innerDate = year.value + "-" + (+month.value + 1) + "-" + i;
			dayArr.push({ date: i, info: innerDate, class: "normal" });
		}

		// 第二步：算回去上個月補足第一個禮拜使其滿足週七天
		if (whatFirstDay !== 0) {
			// 若當月第一天是星期日則不需要執行
			let innerLastMonthDay = preMonthDays;
			let innerYear = year.value;
			month.value === 0 ? innerYear-- : "";
			let preMonth;
			if (month.value === 0) {
				preMonth = 12;
			} else {
				preMonth = month.value;
			}
			for (let i = whatFirstDay; i > 0; i--) {
				const preDate = innerYear + "-" + preMonth + "-" + innerLastMonthDay;
				dayArr.unshift({
					date: innerLastMonthDay,
					info: preDate,
					class: "gray",
				});
				console.log(innerLastMonthDay);
				innerLastMonthDay--;
			}
			console.log("arr", dayArr);
		}

		// 第三步：算下去下個月補足最後一個禮拜使其滿足七天
		if (whatLastDay !== 6) {
			console.log("what last day", whatLastDay);
			let day = 1;
			// +1 是因為自己本身不能算
			let innerYear = year.value;
			month.value === 11 ? innerYear++ : innerYear;
			let nextMonth;
			if (month.value === 11) {
				nextMonth = 1;
			} else {
				nextMonth = month.value + 2;
			}
			for (let i = whatLastDay; i < 6; i++) {
				const innerDate = innerYear + "-" + nextMonth + "-" + day;
				dayArr.push({ date: day, info: innerDate, class: "gray" });
				day++;
			}
		}

		// 切一排一組
		for (let i = 0; i < dayArr.length; i += 7) {
			dateArr.data.push(dayArr.slice(i, i + 7));
		}
		console.log(dateArr.data);
	});
	function showDate(day) {
		thisDate.value = day;
		console.log(day);
	}
</script>
<style lang="scss">
	.calendar {
		background: navy;
		color: white;
		border: 1px solid #ccc;
		border-radius: 15px;
		width: 400px;
		margin: 0 auto;
		margin-top: 5%;
		padding: 3%;
		user-select: none;
	}
	.title {
		display: flex;
		justify-content: space-between;
		.left,
		.right {
			cursor: pointer;
		}
	}

	.row {
		display: flex;
		justify-content: space-around;
	}
	.normal {
	}
	.gray {
		color: #716aa1;
	}
	.circle {
		text-align: center;
		width: 30px;
        height: 30px;
		padding: 1%;
		border-radius: 50% 50%;
		cursor: pointer;
		&.clicked {
			background-color: white;
			color: navy;
		}
	}
    h1{
        color: navy;
    }
</style>
