<!-- 2F 時鐘 -->
<template>
	<div class="wrapper">
		<div class="clock">
			<div class="circle">
				<div class="centre"></div>
				<!-- 好難寫的樣式區塊 -->
				<div
					class="outerNum transNum"
					:style="`--i : ` + (key + 1)"
					v-for="(n, key) in range(13, 24)"
				>
					<span>
						{{ n }}
					</span>
				</div>
				<div class="dot" :style="`--i : ` + n" v-for="n in 60">.</div>
				<div class="hourLine" :style="`--i : ` + n" v-for="n in 12"></div>
				<div class="star1" :style="`--i : ` + n" v-for="n in 12"></div>
				<div class="star2" :style="`--i : ` + n" v-for="n in 12"></div>
				<div class="innerNum" :style="`--i : ` + n" v-for="n in 12">
					<span>
						{{ n }}
					</span>
				</div>
			</div>
			<!-- 指針區塊 -->
			<div class="hands">
				<div class="hour" :style="{ transform: 'rotate(' + hour + 'deg)' }">
					<div class="decoration"></div>
				</div>
				<div class="minute" :style="{ transform: 'rotate(' + minute + 'deg)' }">
					<div class="decoration"></div>
					<div class="point"></div>
				</div>
				<div class="second" :style="{ transform: 'rotate(' + second + 'deg)' }">
					<div class="line one"></div>
					<div class="line two"></div>
					<div class="line three"></div>
					<div class="line four"></div>
					<div class="line five"></div>
					<div class="circlePoint">
						<div class="innerPoint"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
	import { ref, onMounted } from "vue";
	const range = (start, end) => {
		return Array.from({ length: end - start + 1 }, (_, i) => i + start);
	};

	const hour = ref(0);
	const minute = ref(0);
	const second = ref(0);

	onMounted(() => {
		const interval = setInterval(() => {
			const date = new Date();
			minute.value = date.getMinutes() * 6;
			// 每一分鐘是6度
			second.value = date.getSeconds() * 6;
			// 每秒鐘是6度
			hour.value = ((date.getHours() % 12) / 12) * 360 + minute.value / 12;
			// 1. 先將24小時轉12小時制
			// 2. 除以12算出一小時度數
			// 3. 再乘上度數算出每小時度數 ＋ 分鐘數走的度數，但度數要再除以12
			// 因為一分鐘走一圈有12個單位，要算出分針走一個單位要移動多少度數
			// console.log(minute.value, second.value);
		}, 1000);
	});
</script>
<style lang="scss" scoped>
	.wrapper {
		background-color: #293b29;
		width: 100%;
		height: calc(100vh - 60px);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.clock {
		background-color: #3d5a45;
		width: 355px;
		height: 355px;
		border-radius: 40px;

		display: flex;
		align-items: center;
		justify-content: center;
		.circle {
			border-radius: 50%;
			border: 5px solid #243311;
			background-color: #293b29;
			width: 325px;
			height: 325px;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.dot {
			background-color: white;
			width: 2px;
			height: 2px;
			border-radius: 50%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%) rotate(calc(var(--i) * (360deg / 60)))
				translate(0, -125px);
		}

		.outerNum {
			color: white;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%) rotate(calc(var(--i) * (360deg / 12)))
				translate(0, -145px);
			font-size: 14px;
			text-align: center;
			span {
				transform: rotate(calc(var(--i) * (-360deg / 12)));
				display: inline-block;
			}
		}
		.innerNum {
			color: white;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%) rotate(calc(var(--i) * (360deg / 12)))
				translate(0, -100px);
			font-size: 14px;
			text-align: center;
			span {
				transform: rotate(calc(var(--i) * (-360deg / 12)));
				display: inline-block;
			}
		}
		.hourLine {
			background-color: #d56b08;
			min-width: 2px;
			min-height: 16px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%) rotate(calc(var(--i) * (360deg / 12)))
				translate(0, -125px);
		}
		.star1 {
			background-color: #d56b08;
			min-width: 7px;
			min-height: 3px;
			border-radius: 50%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%) rotate(calc(var(--i) * 30deg + 15deg))
				translate(0, -134px);
		}
		.star2 {
			background-color: #d56b08;
			min-width: 7px;
			min-height: 3px;
			border-radius: 50%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%) rotate(calc(var(--i) * 30deg + 15deg))
				translate(0, -134px) rotate(90deg);
		}
	}

	.hands {
		// border: 1px solid red;
		position: absolute;
		width: 313px;
		height: 313px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	/** 圓心 */
	.centre {
		min-width: 2px;
		min-height: 2px;
		// background-color: red;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 4;
	}
	/** 指針 */
	.hour {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		// display: none;
		background-color: #fff;
		width: 7px;
		height: 70px;
		transform-origin: bottom center;
		top: 85px;
		left: 151px;
		transform: translateX(-50%) rotate(45deg);
		.decoration {
			position: absolute;
			width: 3px;
			height: 20px;
			background-color: #243311;
			left: 2px;
			top: 2px;
		}
	}
	.minute {
		// display: none;
		position: absolute;
		background-color: #ff7601;
		width: 8px;
		height: 90px;
		border-radius: 20px;
		transform-origin: bottom center;
		top: 67px;
		left: 150px;
		z-index: 3;
        display: flex;
        z-index: 3;
		.decoration {
			position: absolute;
			width: 1px;
			height: 40px;
			background-color: #fff;
			left: 3px;
			bottom: 2px;
		}
		.point {
			position: absolute;
			height: 5px;
			width: 5px;
			background-color: #fff;
			border-radius: 50%;
			bottom: 2px;
			left: 2px;
		}
	}
	.second {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1px;
		height: 100px;
		top: 55px;
		left: 154px;
		transform-origin: bottom center;
		z-index: 5;
		// display: flex;
		// background-color: #affc01;
		.line {
			background-color: #affc01;
			width: 1px;
			position: absolute;
			z-index: 2;
			&.one {
				height: 40px;
				bottom: 0px;
			}
			&.two {
				height: 10px;
				bottom: 37px;
				left: -4px;
				rotate: 105deg;
			}
			&.three {
				height: 35px;
				bottom: 39px;
				left: 2px;
				rotate: 40deg;
			}
			&.four {
				height: 15px;
				bottom: 66px;
				left: 6px;
				rotate: 119deg;
			}
			&.five {
				height: 42px;
				bottom: 77px;
			}
		}
		.circlePoint {
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 10px;
			height: 10px;
			border-radius: 50%;
			border: 1px solid #affc01;
			// background-color: #affc01;
			left: -5px;
			bottom: 120px;
			.innerPoint {
				background-color: #affc01;
				width: 4px;
				height: 4px;
				border-radius: 50%;
			}
		}
	}
</style>
