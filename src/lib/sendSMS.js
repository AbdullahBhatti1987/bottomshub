// lib/sendSMS.js
import smpp from 'smpp';

export async function sendSMS({ mobile, message }) {
  return new Promise((resolve) => {
    const session = smpp.connect({
      url: `${process.env.ZONG_SMPP_HOST}:${process.env.ZONG_SMPP_PORT}`,
    });

    session.on('error', (error) => {
      console.error('SMPP Error:', error);
      resolve({ success: false, error: 'SMPP Connection Error' });
    });

    session.bind_transceiver(
      {
        system_id: process.env.ZONG_SMPP_SYSTEM_ID,
        password: process.env.ZONG_SMPP_PASSWORD,
      },
      (pdu) => {
        if (pdu.command_status !== 0) {
          resolve({ success: false, error: 'Failed to bind SMPP session' });
          session.close();
          return;
        }

        session.submit_sm(
          {
            destination_addr: mobile,
            short_message: message,
            source_addr: process.env.ZONG_SMPP_SENDER_ID || 'BottomsHub',
          },
          (pdu) => {
            if (pdu.command_status === 0) {
              resolve({ success: true });
            } else {
              resolve({ success: false, error: 'SMS sending failed' });
            }
            session.close();
          }
        );
      }
    );
  });
}
