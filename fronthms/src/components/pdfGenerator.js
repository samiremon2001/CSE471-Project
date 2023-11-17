

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


export const downloadPDF = (doctorName, doctorEmail, patientName, patientNumber, patientEmail, description, age, sex, date) => {
    const docDefinition = {
        content: [
            { text: 'Prescription', style: 'header' },
            { text: 'Mediwave Hospital', style: 'subheader' },
            { text: `Date: ${date}`, style: 'details' },
            { text: `Prescribed by: Dr. ${doctorName}`, style: 'details' },
            { text: `Doctor Email:  ${doctorEmail}`, style: 'details' },

            { text: 'Patient Details', style: 'sectionHeader' },
            {
                columns: [
                    { text: `Name: ${patientName}`, style: 'details' },
                    { text: `Age: ${age} Sex: ${sex}`, style: 'details' }
                ]
            },
            { text: `Patient Contact: ${patientNumber}`, style: 'details' },
            { text: `Patient Email: ${patientEmail}`, style: 'details' },
            { text: 'Prescription', style: 'sectionHeader' },
            { text: description, style: 'prescriptionText' },
            
            
        ],
        styles: {
            header: {
                fontSize: 22,
                bold: true,
                margin: [0, 0, 0, 10],
                alignment: 'center'
            },
            subheader: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 20],
                alignment: 'center'
            },
            sectionHeader: {
                bold: true,
                fontSize: 16,
                margin: [0, 20, 0, 5]
            },
            details: {
                margin: [0, 2]
            },
            prescriptionText: {
                margin: [0, 5, 0, 15]
            },
            signature: {
                bold: true,
                margin: [0, 20, 0, 5],
                alignment: 'left',
                italics: true
            },
            signatureLine: {
                margin: [0, 2, 0, 10],
                alignment: 'left'
            },
            doctorInfo: {
                margin: [0, 5],
                fontSize: 10
            },
            disclaimer: {
                margin: [0, 30, 0, 15],
                fontSize: 8,
                italics: true
            }
        },
        defaultStyle: {
            columnGap: 20
        }
    };

    pdfMake.createPdf(docDefinition).download(`Prescription-${patientName}.pdf`);
};


const getStyles = () => ({
    hospitalName: {
        fontSize: 24,
        bold: true,
        margin: [0, 0, 0, 10],
        alignment: 'center',
        color: '#007bff'
    },
    hospitalInfo: {
        fontSize: 14,
        margin: [0, 5, 0, 15],
        alignment: 'center'
    },
    header: {
        fontSize: 22,
        bold: true,
        margin: [0, 20, 0, 10],
        alignment: 'center',
        color: '#333333'
    },
    table: {
        margin: [0, 5, 0, 15],
        border: 1,
        layout: 'lightHorizontalLines'
    },
    footer: {
        fontSize: 12,
        margin: [0, 10, 0, 0],
        alignment: 'center',
        color: '#888888'
    }
});

const createHospitalHeader = () => ({
    stack: [
        { text: 'MediWave Hospital', style: 'hospitalName' },
        { text: '15 Rankin Street, Wari, Dhaka 1203', style: 'hospitalInfo' },
        { text: 'Email: mediwave@hospital.bd', style: 'hospitalInfo' }
    ],
    margin: [0, 0, 0, 20]
});

const createBillTable = (billDetails) => ({
    style: 'table',
    table: {
        widths: ['auto', '*'],
        body: [
            ['Ward/Cabin No:', `${billDetails.ward_no || billDetails.cabin_no}`],
            ['Floor No:', `${billDetails.floor_no}`],
            ['Total Days:', `${billDetails.total_days}`],
            ['Total Bill:', `${billDetails.total_bill}  Taka`]
        ]
    }
});

const createFooter = () => ({
    text: 'Thank you for choosing MediWave Hospital!',
    style: 'footer'
});

export const downloadSingleWardBillPDF = (wardBill) => {
    const docDefinition = {
        content: [
            createHospitalHeader(),
            { text: 'Ward Bill Detail', style: 'header' },
            createBillTable(wardBill),
            createFooter()
        ],
        styles: getStyles()
    };

    pdfMake.createPdf(docDefinition).download(`ward-bill-${wardBill.ward_no}.pdf`);
};

export const downloadSingleCabinBillPDF = (cabinBill) => {
    const docDefinition = {
        content: [
            createHospitalHeader(),
            { text: 'Cabin Bill Detail', style: 'header' },
            createBillTable(cabinBill),
            createFooter()
        ],
        styles: getStyles()
    };

    pdfMake.createPdf(docDefinition).download(`cabin-bill-${cabinBill.cabin_no}.pdf`);
};


// Styles used in PDFs for ward and cabin bills
// const getStyles = () => ({
//     header: {
//         fontSize: 18,
//         bold: true,
//         margin: [0, 0, 0, 10],
//         alignment: 'center'
//     },
//     subheader: {
//         fontSize: 15,
//         bold: true,
//         margin: [0, 10, 0, 5]
//     },
//     detail: {
//         margin: [0, 5, 0, 5]
//     },
//     table: {
//         margin: [0, 5, 0, 15]
//     },
//     details: {
//         margin: [0, 2]
//     },
//     hospitalName: {
//         fontSize: 20,
//         bold: true,
//         margin: [0, 0, 0, 20],
//         alignment: 'center',
//         color: '#007bff' // Customizable color
//     }
// });

// // Function to download single ward bill PDF
// export const downloadSingleWardBillPDF = (wardBill, hospitalName) => {
//     const docDefinition = {
//         content: [
//             { text: hospitalName, style: 'hospitalName' },
//             { text: 'Ward Bill Detail', style: 'header' },
//             { text: `Ward No: ${wardBill.ward_no}`, style: 'subheader' },
//             { text: `Floor No: ${wardBill.floor_no}`, style: 'detail' },
//             { text: `Total Days: ${wardBill.total_days}`, style: 'detail' },
//             { text: `Total Bill: ৳${wardBill.total_bill}`, style: 'detail' }
//         ],
//         styles: getStyles()
//     };

//     pdfMake.createPdf(docDefinition).download(`ward-bill-${wardBill.ward_no}.pdf`);
// };


// export const downloadSingleCabinBillPDF = (cabinBill, hospitalName) => {
//     const docDefinition = {
//         content: [
//             { text: hospitalName, style: 'hospitalName' },
//             { text: 'Cabin Bill Detail', style: 'header' },
//             { text: `Cabin No: ${cabinBill.cabin_no}`, style: 'subheader' },
//             { text: `Floor No: ${cabinBill.floor_no}`, style: 'detail' },
//             { text: `Total Days: ${cabinBill.total_days}`, style: 'detail' },
//             { text: `Total Bill: ৳${cabinBill.total_bill}`, style: 'detail' }
//         ],
//         styles: getStyles()
//     };

//     pdfMake.createPdf(docDefinition).download(`cabin-bill-${cabinBill.cabin_no}.pdf`);
// };

// // Function to download all cabin bills PDF
// export const downloadAllCabinBillsPDF = (cabinBills, hospitalName) => {
//     const docDefinition = {
//         content: [
//             { text: hospitalName, style: 'hospitalName' },
//             { text: 'Cabin Bill Details', style: 'header' },
//             ...cabinBills.map(cabinBill => [
//                 { text: `Cabin No: ${cabinBill.cabin_no}`, style: 'subheader' },
//                 {
//                     style: 'table',
//                     table: {
//                         body: [
//                             ['Floor No', 'Total Days', 'Total Bill'],
//                             [`${cabinBill.floor_no}`, `${cabinBill.total_days}`, `৳${cabinBill.total_bill}`]
//                         ]
//                     }
//                 },
//                 { text: '', style: 'details' } // For spacing
//             ]).reduce((acc, curr) => [...acc, ...curr], []) // Flatten the array
//         ],
//         styles: getStyles()
//     };

//     pdfMake.createPdf(docDefinition).download('cabin-bill-details.pdf');
// };

// Updated PDF Generator





// // Function to download single ward bill PDF
// export const downloadSingleWardBillPDF = (wardBill) => {
//     const docDefinition = {
//         content: [
//             { text: 'Ward Bill Detail', style: 'header' },
//             { text: `Ward No: ${wardBill.ward_no}`, style: 'subheader' },
//             { text: `Floor No: ${wardBill.floor_no}`, style: 'detail' },
//             { text: `Total Days: ${wardBill.total_days}`, style: 'detail' },
//             { text: `Total Bill: $${wardBill.total_bill}`, style: 'detail' }
//         ],
//         styles: getStyles()
//     };

//     pdfMake.createPdf(docDefinition).download(`ward-bill-${wardBill.ward_no}.pdf`);
// };

// // Function to download all ward bills PDF
// export const downloadAllWardBillsPDF = (wardBills) => {
//     const docDefinition = {
//         content: [
//             { text: 'Ward Bill Details', style: 'header' },
//             { text: '', style: 'details' }, // For spacing
//             ...wardBills.map(wardBill => [
//                 { text: `Ward No: ${wardBill.ward_no}`, style: 'subheader' },
//                 {
//                     style: 'table',
//                     table: {
//                         body: [
//                             ['Floor No', 'Total Days', 'Total Bill'],
//                             [`${wardBill.floor_no}`, `${wardBill.total_days}`, `$${wardBill.total_bill}`]
//                         ]
//                     }
//                 },
//                 { text: '', style: 'details' } // For spacing
//             ]).reduce((acc, curr) => [...acc, ...curr], []) // Flatten the array
//         ],
//         styles: getStyles()
//     };

//     pdfMake.createPdf(docDefinition).download('ward-bill-details.pdf');
// };

// // Function to download single cabin bill PDF
// export const downloadSingleCabinBillPDF = (cabinBill) => {
//     const docDefinition = {
//         content: [
//             { text: 'Cabin Bill Detail', style: 'cabinHeader' },
//             { text: `Cabin No: ${cabinBill.cabin_no}`, style: 'cabinSubheader' },
//             { text: `Floor No: ${cabinBill.floor_no}`, style: 'cabinDetail' },
//             { text: `Total Days: ${cabinBill.total_days}`, style: 'cabinDetail' },
//             { text: `Total Bill: $${cabinBill.total_bill}`, style: 'cabinDetail' }
//         ],
//         styles: getCabinStyles()
//     };

//     pdfMake.createPdf(docDefinition).download(`cabin-bill-${cabinBill.cabin_no}.pdf`);
// };

// // Function to download all cabin bills PDF
// export const downloadAllCabinBillsPDF = (cabinBills) => {
//     const docDefinition = {
//         content: [
//             { text: 'Cabin Bill Details', style: 'cabinHeader' },
//             { text: '', style: 'cabinDetails' }, // For spacing
//             ...cabinBills.map(cabinBill => [
//                 { text: `Cabin No: ${cabinBill.cabin_no}`, style: 'cabinSubheader' },
//                 {
//                     style: 'cabinTable',
//                     table: {
//                         body: [
//                             ['Floor No', 'Total Days', 'Total Bill'],
//                             [`${cabinBill.floor_no}`, `${cabinBill.total_days}`, `$${cabinBill.total_bill}`]
//                         ]
//                     }
//                 },
//                 { text: '', style: 'cabinDetails' } // For spacing
//             ]).reduce((acc, curr) => [...acc, ...curr], []) // Flatten the array
//         ],
//         styles: getCabinStyles()
//     };

//     pdfMake.createPdf(docDefinition).download('cabin-bill-details.pdf');
// };

// // Styles used in PDFs for ward bills
// const getStyles = () => ({
//     header: {
//         fontSize: 18,
//         bold: true,
//         margin: [0, 0, 0, 10],
//         alignment: 'center'
//     },
//     subheader: {
//         fontSize: 15,
//         bold: true,
//         margin: [0, 10, 0, 5]
//     },
//     detail: {
//         margin: [0, 5, 0, 5]
//     },
//     table: {
//         margin: [0, 5, 0, 15]
//     },
//     details: {
//         margin: [0, 2]
//     }
// });

// Styles used in PDFs for cabin bills
// const getCabinStyles = () => ({
//     cabinHeader: {
//         fontSize: 18,
//         bold: true,
//         margin: [0, 0, 0, 10],
//         alignment: 'center'
//     },
//     cabinSubheader: {
//         fontSize: 15,
//         bold: true,
//         margin: [0, 10, 0, 5]
//     },
//     cabinDetail: {
//         margin: [0, 5, 0, 5]
//     },
//     cabinTable: {
//         margin: [0, 5, 0, 15]
//     },
//     cabinDetails: {
//         margin: [0, 2]
//     }
// });


















// =----=
    // import pdfMake from 'pdfmake/build/pdfmake';
    // import pdfFonts from 'pdfmake/build/vfs_fonts';
    // pdfMake.vfs = pdfFonts.pdfMake.vfs;
    
    // export const downloadPDF = (doctorName, doctorEmail, patientName, patientNumber, patientEmail, description, age, sex, date) => {
    //     const docDefinition = {
    //         content: [
    //             { text: 'Prescription', style: 'header' },
    //             { text: 'Mediville Clinic', style: 'subheader' },
    //             { text: `Date: ${date}`, style: 'details' },
    //             { text: `Prescribed by: Dr. ${doctorName}`, style: 'details' },
    //             { text: 'Patient Details', style: 'sectionHeader' },
    //             {
    //                 columns: [
    //                     { text: `Name: ${patientName}`, style: 'details' },
    //                     { text: `Age: ${age} Sex: ${sex}`, style: 'details' }
    //                 ]
    //             },
    //             { text: `Patient Contact: ${patientNumber}`, style: 'details' },
    //             { text: `Patient Email: ${patientEmail}`, style: 'details' },
    //             { text: 'Prescription', style: 'sectionHeader' },
    //             { text: description, style: 'prescriptionText' },
                
                
    //         ],
    //         styles: {
    //             header: {
    //                 fontSize: 22,
    //                 bold: true,
    //                 margin: [0, 0, 0, 10],
    //                 alignment: 'center'
    //             },
    //             subheader: {
    //                 fontSize: 18,
    //                 bold: true,
    //                 margin: [0, 0, 0, 20],
    //                 alignment: 'center'
    //             },
    //             sectionHeader: {
    //                 bold: true,
    //                 fontSize: 16,
    //                 margin: [0, 20, 0, 5]
    //             },
    //             details: {
    //                 margin: [0, 2]
    //             },
    //             prescriptionText: {
    //                 margin: [0, 5, 0, 15]
    //             },
    //             signature: {
    //                 bold: true,
    //                 margin: [0, 20, 0, 5],
    //                 alignment: 'left',
    //                 italics: true
    //             },
    //             signatureLine: {
    //                 margin: [0, 2, 0, 10],
    //                 alignment: 'left'
    //             },
    //             doctorInfo: {
    //                 margin: [0, 5],
    //                 fontSize: 10
    //             },
    //             disclaimer: {
    //                 margin: [0, 30, 0, 15],
    //                 fontSize: 8,
    //                 italics: true
    //             }
    //         },
    //         defaultStyle: {
    //             columnGap: 20
    //         }
    //     };
    
    //     pdfMake.createPdf(docDefinition).download(`Prescription-${patientName}.pdf`);
    // };
    
    
    
    // export const downloadSingleWardBillPDF = (wardBill) => {
    //     const docDefinition = {
    //         content: [
    //             { text: 'Ward Bill Detail', style: 'header' },
    //             { text: `Ward No: ${wardBill.ward_no}`, style: 'subheader' },
    //             { text: `Floor No: ${wardBill.floor_no}`, style: 'detail' },
    //             { text: `Total Days: ${wardBill.total_days}`, style: 'detail' },
    //             { text: `Total Bill: $${wardBill.total_bill}`, style: 'detail' }
    //         ],
    //         styles: getStyles()
    //     };
      
    //     pdfMake.createPdf(docDefinition).download(`ward-bill-${wardBill.ward_no}.pdf`);
    //   };
      
    //   // Function to download all ward bills PDF
    //   export const downloadAllWardBillsPDF = (wardBills) => {
    //     const docDefinition = {
    //         content: [
    //             { text: 'Ward Bill Details', style: 'header' },
    //             { text: '', style: 'details' }, // For spacing
    //             ...wardBills.map(wardBill => [
    //                 { text: `Ward No: ${wardBill.ward_no}`, style: 'subheader' },
    //                 {
    //                     style: 'table',
    //                     table: {
    //                         body: [
    //                             ['Floor No', 'Total Days', 'Total Bill'],
    //                             [`${wardBill.floor_no}`, `${wardBill.total_days}`, `$${wardBill.total_bill}`]
    //                         ]
    //                     }
    //                 },
    //                 { text: '', style: 'details' } // For spacing
    //             ]).reduce((acc, curr) => [...acc, ...curr], []) // Flatten the array
    //         ],
    //         styles: getStyles()
    //     };
      
    //     pdfMake.createPdf(docDefinition).download('ward-bill-details.pdf');
    //   };
      
    //   // Styles used in PDFs
    //   const getStyles = () => ({
    //     header: {
    //         fontSize: 18,
    //         bold: true,
    //         margin: [0, 0, 0, 10],
    //         alignment: 'center'
    //     },
    //     subheader: {
    //         fontSize: 15,
    //         bold: true,
    //         margin: [0, 10, 0, 5]
    //     },
    //     detail: {
    //         margin: [0, 5, 0, 5]
    //     },
    //     table: {
    //         margin: [0, 5, 0, 15]
    //     },
    //     details: {
    //         margin: [0, 2]
    //     }
    //   });

// ----------------------------------------














































// export const downloadWardBillPDF = (patientName, patientEmail, wardBills) => {
//   const docDefinition = {
//       content: [
//           { text: 'Ward Bill Details', style: 'header' },
//           { text: `Patient Name: ${patientName}`, style: 'subheader' },
//           { text: `Patient Email: ${patientEmail}`, style: 'subheader' },
//           { text: '', style: 'details' }, // For spacing

//           wardBills.map(wardBill => {
//               return [
//                   { text: `Ward No: ${wardBill.ward_no}`, style: 'subheader' },
//                   {
//                       style: 'table',
//                       table: {
//                           body: [
//                               ['Floor No', 'Total Days', 'Total Bill'],
//                               [`${wardBill.floor_no}`, `${wardBill.total_days}`, `$${wardBill.total_bill}`]
//                           ]
//                       }
//                   },
//                   { text: '', style: 'details' } // For spacing between wards
//               ];
//           }).reduce((acc, curr) => [...acc, ...curr], []) // Flatten the array
//       ],
//       styles: {
//           header: {
//               fontSize: 18,
//               bold: true,
//               margin: [0, 0, 0, 10],
//               alignment: 'center'
//           },
//           subheader: {
//               fontSize: 15,
//               bold: true,
//               margin: [0, 10, 0, 5]
//           },
//           table: {
//               margin: [0, 5, 0, 15]
//           },
//           details: {
//               margin: [0, 2]
//           }
//       },
//       defaultStyle: {
//           columnGap: 20
//       }
//   };

//   pdfMake.createPdf(docDefinition).download(`ward-bill-details-${patientName.replace(/\s+/g, '-')}.pdf`);
// };
