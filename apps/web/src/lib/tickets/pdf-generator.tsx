import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30,
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        paddingBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        width: 100,
        fontSize: 10,
        color: '#888',
        marginBottom: 2,
    },
    value: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    qrContainer: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    qrImage: {
        width: 200,
        height: 200,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'center',
        color: '#AAA',
        fontSize: 10,
    },
});

interface TicketPDFProps {
    eventTitle: string;
    eventDate: string;
    eventVenue: string;
    seat: string;
    ticketId: string;
    qrDataURL: string;
    userName: string;
}

export const TicketPDF = ({ eventTitle, eventDate, eventVenue, seat, ticketId, qrDataURL, userName }: TicketPDFProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.title}>VELO TICKET</Text>
                <Text style={styles.subtitle}>Your Access Pass</Text>
            </View>

            <View style={styles.section}>
                <Text style={{ fontSize: 20, marginBottom: 20 }}>{eventTitle}</Text>

                <View style={styles.row}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>DATE & TIME</Text>
                        <Text style={styles.value}>{eventDate}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>VENUE</Text>
                        <Text style={styles.value}>{eventVenue}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>SEAT</Text>
                        <Text style={styles.value}>{seat}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>TICKET ID</Text>
                        <Text style={styles.value}>{ticketId}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>ATTENDEE</Text>
                        <Text style={styles.value}>{userName}</Text>
                    </View>
                </View>

                <View style={styles.qrContainer}>
                    {/* Note: React-PDF Image src can be a base64 data URL */}
                    <Image src={qrDataURL} style={styles.qrImage} />
                    <Text style={{ fontSize: 10, color: '#666', marginTop: 10 }}>Scan at entry</Text>
                </View>
            </View>

            <Text style={styles.footer}>
                Powered by Velo • {ticketId} • Do not share this ticket
            </Text>
        </Page>
    </Document>
);
