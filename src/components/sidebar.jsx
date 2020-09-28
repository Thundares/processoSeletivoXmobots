import React from 'react';
import ReactPDF, { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import * as aeroDromes from '../aerodromes.json'; 

// NOT WORKING CODE TO CRETE PDF
function createPDF () {

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
                {aeroDromes.aerodromes.forEach(element => (
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
// END OF NOT WORKING CODE

// component that contains the sidebar from logged page
export default props =>
    <div className='sidebar'>
        <div className='logged-text'>
            <label>Logged as {props.username}</label>
        </div>
        <div className='logged-content'>
            <label>Submit the information</label>
            <input type='file' onChange={(e)=> {
                let reader = new FileReader();
                reader.readAsText(e.target.files[0]);
                console.log(reader.result);
            }}/>
            <table>
                {/* Thead with the correct information */}
                <thead>
                    <tr>
                        <th scope='col'>
                            Name
                        </th>
                        <th scope='col'>
                            City
                        </th>
                        <th scope='col'>
                            dms
                        </th>
                        <th scope='col'>
                            Since
                        </th>
                        <th scope='col'>
                            Runways
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* tbody with 'Lorem ipsum' text */}
                    <tr>
                        <th scope='row'>
                            Gotham's Airport
                        </th>
                        <td>
                            Gotham
                        </td>
                        <td>
                            66.666N/66.666W
                        </td>
                        <td>
                            1920
                        </td>
                        <td>
                            5
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className='PDF-part'>
            <button onClick={createPDF}>Create PDF</button>
        </div>
    </div>