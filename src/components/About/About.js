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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis a odit, temporibus ullam vero suscipit eum eveniet veniam nobis quisquam pariatur, corporis quod adipisci, aut delectus. Voluptates rem nulla quidem commodi fuga unde minima, laboriosam, id repellendus quibusdam amet vero qui illo hic voluptas vitae officiis velit dolorem excepturi dignissimos molestias ullam! Eius, sapiente pariatur. Tempore at, laudantium consequuntur magni similique possimus perferendis. Incidunt suscipit similique ab excepturi voluptates, esse blanditiis numquam. Quas cupiditate id veniam iste ducimus nostrum autem amet, labore dolorem vitae corrupti aut tenetur aperiam. Nostrum blanditiis ad vitae accusamus assumenda possimus ducimus, quidem rem libero aperiam.
                </Message>
                <NavLink href='/contact' addClass='btn'>Contact US</NavLink>
            </FormCard>
        );
    }
}

export default About;