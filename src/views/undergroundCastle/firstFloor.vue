<!-- 2F 時鐘 -->
<template>
	<div class="wrapper">
		<div class="clock">
			<div class="circle">
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
				<div class="dot" :style="`--i : ` + n" v-for="n in 72">.</div>
				<div class="hourLine" :style="`--i : ` + n" v-for="n in 12"></div>
				<div class="star1" :style="`--i : ` + n" v-for="n in 12"></div>
				<div class="star2" :style="`--i : ` + n" v-for="n in 12"></div>
				<div class="innerNum" :style="`--i : ` + n" v-for="n in 12">
					<span>
						{{ n }}
					</span>
				</div>
				<!-- 指針區塊 -->
				<div class="hour">
					<div class="decoration"></div>
				</div>
				<div class="minute"></div>
				<div class="second"></div>
			</div>
		</div>
	</div>
</template>
<script setup>
	const range = (start, end) => {
		return Array.from({ length: end - start + 1 }, (_, i) => i + start);
	};
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
		width: 350px;
		height: 350px;
		border-radius: 40px;

		display: flex;
		align-items: center;
		justify-content: center;
		.circle {
			border-radius: 50%;
			border: 5px solid #243311;
			background-color: #293b29;
			width: 320px;
			height: 320px;
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
			transform: translate(-50%, -50%) rotate(calc(var(--i) * (360deg / 72)))
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
				translate(0, -105px);
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
			min-height: 20px;
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
				translate(0, -125px);
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
				translate(0, -125px) rotate(90deg);
		}
	}
	/** 指針 */
	.hour {
		background-color: #fff;
		width: 5px;
		height: 50px;
		transform: translate(-50%, -50%);
		.decoration {
			width: 1px;
			height: 15px;
		
		}
	}
</style>
