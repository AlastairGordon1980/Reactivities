import React from "react"
import { Card, Image, ButtonGroup, Button } from "semantic-ui-react"
import LoadingComponent from "../../../../app/layout/LoadingComponent";
import { useStore } from "../../../../app/stores/store"

export default function ActivityDetails() {
    const { activityStore } = useStore();
    const { selectedActivity: activity, openForm, cancelSelectedActivity } = activityStore;

    if (!activity) return <LoadingComponent content='Loading...' />;

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
                    <Button color='blue' content='Edit' onClick={() => openForm(activity.id)} />
                    <Button color='grey' content='Cancel' onClick={cancelSelectedActivity} />
                </ButtonGroup>
            </Card.Content>
        </Card>
    )
}