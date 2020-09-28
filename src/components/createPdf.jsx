import React from 'react';
import ReactPDF, { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';


export default function createPDF (props) {

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#e4e4e4'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    });

    const Formatted = () => (
        <Document>
            <Page size='A4' style={styles.page}>
                <View style={styles.section}>
                    <Text>
                        Aerodromes
                    </Text>
                </View>
                {props.toBePrinted.aerodromes.forEach(element => (
                    <View style={styles.section}>
                        {'Name: ' + element.name}
                        {'City: ' + element.city}
                        {'Description: ' + element.description}
                        {'Created at: ' + element.created_at}
                        {'Runways: ' + element.runways}
                    </View>
                ))}
            </Page>
        </Document>
    );

    ReactPDF.render(<Formatted />, '../backend/data.pdf');
}