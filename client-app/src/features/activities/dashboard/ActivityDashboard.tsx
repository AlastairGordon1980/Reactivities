import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Grid, List } from 'semantic-ui-react';
import { useStore } from "../../../app/stores/store";
import ActivityList from "./ActivityList";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityFilters from "./ActivityFilters";

export default observer(function ActivityDashboard() {
	const { activityStore } = useStore();
	const { loadActivities, activityRegistry } = activityStore;

	useEffect(() => {
		 if (activityRegistry.size <= 1) loadActivities();
	}, [activityRegistry.size, loadActivities]);

	if (activityStore.loadingInitial) return <LoadingComponent content='Loading App' />

	return (
		<Grid>
			<Grid.Column width='10'>
				<List>
					{ <ActivityList /> }
				</List>
			</Grid.Column>
			<Grid.Column width='6'>
				<ActivityFilters />
			</Grid.Column>
		</Grid>
	)
})