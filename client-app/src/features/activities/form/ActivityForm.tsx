import React, { ChangeEvent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { v4 as uuid } from 'uuid';

export default observer(function ActivityForm() {
    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();

    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity]);

    function handleSubmit() {
        if (activity.id.length === 0) {
            let newActivity = { ...activity, id: uuid() };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }  
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }

    if (loadingInitial) <LoadingComponent content='Loading...' />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder="Title" value={activity.title} name='title' onChange={handleInputChange}></Form.Input>
                <Form.TextArea placeholder="Description" value={activity.description} name='description' onChange={handleInputChange}></Form.TextArea>
                <Form.Input placeholder="Category" value={activity.category} name='category' onChange={handleInputChange}></Form.Input>
                <Form.Input type='date' placeholder="Date" value={activity.date} name='date' onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder="City" value={activity.city} name='city' onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder="Venue" value={activity.venue} name='venue' onChange={handleInputChange}></Form.Input>
                <Button floated='right' positive content='Submit' type='submit' loading={loading} />
                <Button floated='right' type='button' content='Cancel' as={Link} to='/activities' />
            </Form>
        </Segment>
    )
})