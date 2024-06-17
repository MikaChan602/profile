<template>
	<footer>
		<span> 瀏覽人數:{{ analyticsData }} </span>
	</footer>
</template>
<script setup>
	import { ref, onMounted } from "vue";
	const CLIENT_ID = "G-RV51L209QF"; // 將此替換為你的 OAuth 2.0 客戶端 ID
	const DISCOVERY_DOCS = [
		"https://analyticsreporting.googleapis.com/$discovery/rest?version=v4",
	];
	const SCOPES = "https://www.googleapis.com/auth/analytics.readonly";

	const isSignedIn = ref(false);
	const analyticsData = ref(null);

	onMounted(() => {
		gapi.load("client:auth2", initClient);
		console.log(analyticsData);
	});

	function initClient() {
		gapi.client
			.init({
				discoveryDocs: DISCOVERY_DOCS,
				clientId: CLIENT_ID,
				scope: SCOPES,
			})
			.then(() => {
				gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
				updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
			});
	}

	function updateSigninStatus(isSignedInStatus) {
		isSignedIn.value = isSignedInStatus;
		if (isSignedInStatus) {
			getAnalyticsData();
		} else {
			analyticsData.value = null;
		}
	}

	function authorize() {
		gapi.auth2.getAuthInstance().signIn();
	}

	function signOut() {
		gapi.auth2.getAuthInstance().signOut();
	}

	async function getAnalyticsData() {
		try {
			const response = await gapi.client.analyticsreporting.reports.batchGet({
				requestBody: {
					reportRequests: [
						{
							viewId: "YOUR_VIEW_ID", // 將此替換為你的 View ID
							dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
							metrics: [{ expression: "ga:sessions" }],
						},
					],
				},
			});

			analyticsData.value = response.result.reports[0].data.totals[0].values[0];
		} catch (error) {
			console.error("Error fetching analytics data:", error);
		}
	}
</script>
<style lang="scss" scoped>
	footer {
		background-color: rgb(173, 212, 212);
		margin-top: calc(100vh - 60px - 60px);
		height: 60px;
		text-align: right;
		line-height: 60px;
		span {
			margin-right: 20px;
		}
	}
</style>
