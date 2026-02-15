import * as React from 'react';
import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from '@react-email/components';

interface BookingConfirmationProps {
    userName: string;
    eventName: string;
    ticketId: string;
    date: string;
    ticketLink: string;
}

export const BookingConfirmation = ({
    userName,
    eventName,
    ticketId,
    date,
    ticketLink,
}: BookingConfirmationProps) => (
    <Html>
        <Head />
        <Preview>Your tickets for {eventName} are ready!</Preview>
        <Body style={main}>
            <Container style={container}>
                <Heading style={h1}>You're Going!</Heading>
                <Text style={text}>Hi {userName},</Text>
                <Text style={text}>
                    Your booking for <strong>{eventName}</strong> is confirmed.
                </Text>
                <Section style={details}>
                    <Text style={detailText}>Date: {date}</Text>
                    <Text style={detailText}>Ticket ID: {ticketId}</Text>
                </Section>
                <Section style={btnContainer}>
                    <Link href={ticketLink} style={btn}>
                        Download Tickets
                    </Link>
                </Section>
                <Text style={footer}>
                    Securely powered by Velo.
                </Text>
            </Container>
        </Body>
    </Html>
);

// Styles
const main = {
    backgroundColor: '#ffffff',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
    width: '560px',
};

const h1 = {
    textAlign: 'center' as const,
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
};

const text = {
    fontSize: '16px',
    lineHeight: '26px',
    color: '#333',
};

const details = {
    marginTop: '20px',
    backgroundColor: '#f4f4f4',
    padding: '20px',
    borderRadius: '5px',
};

const detailText = {
    margin: '0',
    fontSize: '14px',
    color: '#555',
};

const btnContainer = {
    textAlign: 'center' as const,
    marginTop: '30px',
};

const btn = {
    backgroundColor: '#000',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    width: '100%',
    padding: '12px',
};

const footer = {
    color: '#898989',
    fontSize: '12px',
    lineHeight: '22px',
    marginTop: '12px',
    textAlign: 'center' as const,
};

export default BookingConfirmation;
