<template>
	<div>
		<button class="btn">確定送出</button>
	</div>
</template>
<style lang="scss" scoped>
	.btn {
		width: 200px;
		padding: 0;
		margin: 0;
		display: inline-block;
		position: relative;
		overflow: hidden;
		text-align: center;
		transition: 0.5s;
		background: linear-gradient(to bottom, #333, #000 50%);
		box-shadow: 0 5px 3px rgba(0, 0, 0, 0.2);
		border-radius: 5px;
		line-height: 2.4;
		color: #fff;
		font-size: 20px;
		letter-spacing: 2px;
		cursor: pointer;
		overflow: hidden;
		&:hover {
			background: linear-gradient(to right, #04ba84, rgb(5, 97, 5));
		}
		&:after {
			content: "";
			background: linear-gradient(
				125deg,
				rgba(255, 255, 255, 0) 0%,
				rgba(255, 255, 255, 0) 20%,
				white 60%,
				rgba(255, 255, 255, 0) 80%,
				rgba(255, 255, 255, 0) 100%
			);
			position: absolute;
			top: 0;
			left: -100%;
			width: 100%;
			height: 100%;
			transition: 1s;
			animation: Shine 2s ease infinite;
		}
	}

	// Animations..........
	@keyframes Shine {
		0% {
			left: -100%;
		}
		50%,
		100% {
			left: 100%;
		}
	}
</style>
