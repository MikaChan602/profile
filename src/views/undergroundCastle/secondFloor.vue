<!-- 3F 計算機 -->
<template>
	<div class="wrapper">
		<div class="calculator">
			<div class="top">
				<div class="calculation">1,280 x 30 - 200</div>
				<div class="result">38,200</div>
			</div>
			<div class="keyboard">
				<ul class="row" style="margin-top: 16px">
					<li>7</li>
					<li>8</li>
					<li>9</li>
					<li class="btn">÷</li>
				</ul>
				<ul class="row">
					<li>4</li>
					<li>5</li>
					<li>6</li>
					<li class="btn">×</li>
				</ul>
				<ul class="row">
					<li>1</li>
					<li>2</li>
					<li>3</li>
					<li class="btn">÷</li>
				</ul>
				<ul class="row">
					<li>0</li>
					<li>00</li>
					<li>.</li>
					<li class="btn">+</li>
				</ul>
				<ul class="row">
					<li class="AC">AC</li>
					<li>
						<div class="btnCancel">⌫</div>
					</li>
					<li style="width: 50%" class="btn equal">=</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	.wrapper {
		background-color: #e8e8e8;
		width: 1280px;
		height: 800px;
		margin: 0 auto;
		padding-top: 129px;
		color: #fff;
		font-size: 24px;
		// font
		font-family: "Roboto", sans-serif;
		font-weight: 400;
		font-style: normal;
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
		font-size: 32px;
	}
</style>
