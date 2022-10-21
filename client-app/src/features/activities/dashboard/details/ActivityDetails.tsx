import React, { useEffect } from "react"
import { observer } from "mobx-react-lite";
import { useParams, Link } from 'react-router-dom';
import { Card, Image, ButtonGroup, Button } from "semantic-ui-react"
import LoadingComponent from "../../../../app/layout/LoadingComponent";
import { useStore } from "../../../../app/stores/store"

export default observer(function ActivityDetails() {
    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity]);

    if (loadingInitial || !activity) return <LoadingComponent content='Loading...' />;

    return (
        <Card fluid>
            <Image src={`/assets/categoryimages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <ButtonGroup widths='2'>
                    <Button color='blue' content='Edit' as={Link} to={`/manageActivity/${activity.id}`} />
                    <Button color='grey' content='Cancel' as={Link} to='/activities' />
                </ButtonGroup>
            </Card.Content>
        </Card>
    )
})