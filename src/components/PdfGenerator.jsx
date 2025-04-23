import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import QRCode from 'qrcode'; 
import logo from '../assets/logo.png';

function PdfGenerator({ document }) {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  useEffect(() => {
    const generateQrCode = async () => {
      try {
        const url = await QRCode.toDataURL(document.id);
        setQrCodeUrl(url);
      } catch (err) {
        console.error(err);
      }
    };
    
    generateQrCode();
  }, [document.id]);

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    section: {
      margin: 10,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 250,
    },
    text: {
      fontSize: 10,
    },
    qrCodeContainer: {
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    qrCode: {
      height: 200,
      width: 200,
    },
  });

  return (
    <div>
      <PDFViewer className="h-screen w-full">
        <Document
          title={document.subject}
          author="FCSUPT NAHUM B TARROZA"
          creator="SFO1 Geofrey R Bazar"
          pageLayout="singlePage"
        >
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Image src={logo} style={styles.image} />
              <Text style={styles.text}>Republic of the Philippines</Text>
              <Text style={styles.text}>Department of the Interior and Local Government</Text>
              <Text style={styles.text}>BUREAU OF FIRE PROTECTION</Text>
              <Text style={styles.text}>NATIONAL CAPITAL REGION - REGIONAL OFFICE</Text>
              <Text style={styles.text}>Ermin Garcia St. Brgy Pinagkaisahan, Cubao, Quezon City</Text>
              <Text style={styles.text}>email: fcos.ncr@bfp.gov.ph</Text>
            </View>
            <View style={styles.section}>
              <Text>Document Tracking Number </Text>
            </View>
            {qrCodeUrl && (
              <View style={styles.qrCodeContainer}>
                <Image src={qrCodeUrl} style={styles.qrCode} />
              </View>
            )}
            
            <Text>{document.id}</Text>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}

export default PdfGenerator;
