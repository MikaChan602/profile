<template>
	<div class="wrapper">
		<ul class="row">
			<li class="header">
				<div class="title">
					<div class="lineBlock">
						<div>x</div>
						<div class="line"></div>
						<div>x</div>
					</div>
					<div class="main">
						<p>九九乘法表</p>
						<p>MULTIPLICATION CHART</p>
					</div>
					<div class="lineBlock">
						<div>x</div>
						<div class="line"></div>
						<div>x</div>
					</div>
				</div>
			</li>
			<li class="card">
				<span class="num">2</span>
				<span v-for="n in 9">2 x {{ n }} = {{ n * 2 }}</span>
			</li>
			<li class="card">
				<span class="num">3</span>
				<span v-for="n in 9">3 x {{ n }} = {{ n * 3 }}</span>
			</li>
		</ul>
		<ul class="row">
			<li class="card">
				<span class="num">4</span>
				<span v-for="n in 9">4 x {{ n }} = {{ n * 4 }}</span>
			</li>
			<li class="card">
				<span class="num">5</span>
				<span v-for="n in 9">5 x {{ n }} = {{ n * 5 }}</span>
			</li>
			<li class="card">
				<span class="num">6</span>
				<span v-for="n in 9">6 x {{ n }} = {{ n * 6 }}</span>
			</li>
		</ul>
		<ul class="row">
			<li class="card">
				<span class="num">7</span>
				<span v-for="n in 9">7 x {{ n }} = {{ n * 7 }}</span>
			</li>
			<li class="card">
				<span class="num">8</span>
				<span v-for="n in 9">8 x {{ n }} = {{ n * 8 }}</span>
			</li>
			<li class="card">
				<span class="num">9</span>
				<span v-for="n in 9">9 x {{ n }} = {{ n * 9 }}</span>
			</li>
		</ul>
	</div>
	<footer>Copyright © 2019 HexSchool. All rights reserved.</footer>
</template>

<script setup></script>

<style lang="scss" scoped>
	.wrapper {
		width: 1280px;
		margin: 0 auto;
		padding: 85px 80px;
		color: #2eb738;
		background-color: #f0f0f0;
		font-family: "Helvetica Neue", sans-serif;
		ul {
			li {
				list-style: none;
				text-align: left;
				margin: 3px;
			}
		}
	}
	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 40px;
	}
	.header {
		.title {
			.lineBlock {
				display: flex;
				align-items: center;
				color: #2eb738;
				font-size: 24px;
				.line {
					width: 280px;
					border-top: 1px solid #2eb738;
					margin-left: 21px;
					margin-right: 21px;
				}
			}
			.main {
				text-align: center;
				p:nth-child(1) {
					font-size: 56px;
					margin-top: 114px;
				}
				p:nth-child(2) {
					font-size: 24px;
					margin-bottom: 118px;
				}
			}
		}
	}

	.card {
		padding-top: 34px;
		padding-bottom: 63px;
		padding-left: 40px;
		padding-right: 40px;
		margin-top: 40px;
		width: 350px;
		height: 366px;
		background-color: #fff;
		border-radius: 100px 0px 30px 0px;
		border: none;
		box-shadow: 3px 0px 10px #d8d8d8;
		font-size: 24px;
		color: #2eb738;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		span:nth-child(5) {
			padding-top: 38px;
		}
	}
	.num {
		font-size: 128px;
		margin-left: 21px;
		margin-right: 60px;
		width: 71px;
		height: 153px;
		line-height: 153px;
		text-shadow: 4px 3px 0px #f0f0f0;
		-webkit-text-stroke: 2px #fff;
		font-weight: bold;
	}
	footer {
		width: 100%;
		position: relative;
		top: 0px;
		bottom: 0;
		background-color: #2eb738;
		color: #f0f0f0;
		height: 34px;
		text-align: right;
		padding-right: 85px;
		padding-top: 8px;
		padding-bottom: 8px;
		width: 1280px;
		margin: 0 auto;
	}
</style>
