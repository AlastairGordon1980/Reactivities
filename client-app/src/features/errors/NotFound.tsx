import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

export default function NotFound() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                Oops! We've looked everywhere, but can't find what you were looking for!
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/activities' primary>Return to Activities</Button>
            </Segment.Inline>
        </Segment>        
    )
}