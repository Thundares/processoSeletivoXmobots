import React from 'react';
import Printer from './createPdf';
import * as aeroDromes from '../aerodromes.json'; 

// component that contains the sidebar from logged page
export default props =>
    <div className='sidebar'>
        <div className='logged-text'>
            <label>Logged as {props.username}</label>
        </div>
        <div className='logged-content'>
            <label>Submit the information</label>
            <input type='file' />
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
            <button onClick={<Printer toBePrinted={aeroDromes}/>}>Create PDF</button>
        </div>
    </div>