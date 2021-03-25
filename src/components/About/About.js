import { Component } from 'react';

import Title from '../UI/FormCard/Title/Title';
import Message from '../UI/FormCard/Message/Message';
import FormCard from '../UI/FormCard/FormCard';
import NavLink from '../UI/NavLink/NavLink';

class About extends Component {

    render() {
        return (
            <FormCard addClass='wide'>
                <Title addClass='mb'>About Us</Title>
                <Message addClass='mb'>
                    We strive to provide a platform for people to share - thoughts, feelings, experiences... everything and anything that comes to your mind.
                 Other platforms with similar functions might be bigger but none of them would provide the freedom we are willing to provide our users. No posts or comments will ever be deleted unless you do it yourself. We are able to provide you with this freedom only because we consider people responsible for what they say and do.       </Message>
                <NavLink href='/contact' addClass='btn'>Contact US</NavLink>
            </FormCard>
        );
    }
}

export default About;