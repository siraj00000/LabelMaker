'use client'
import { firebaseAction } from '@/firebase/clientApp';
import { ConfirmationResult, } from 'firebase/auth';
import React, { useState } from 'react';

const PhoneAuth = () => {
  const { auth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } = firebaseAction
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState<string>();

  const handleSendCode = () => {
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'send-code-button', {
      size: 'invisible',
    });

    signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
      .then((verificationId: ConfirmationResult) => {
        setVerificationId(verificationId.verificationId);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const handleVerifyCode = () => {
    if (!verificationId) return;

    const credential = PhoneAuthProvider.credential(verificationId, verificationCode);

    signInWithCredential(auth, credential)
      .then((userCredential) => {
        // User signed in successfully
        console.log(userCredential);

      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <button id="send-code-button" onClick={handleSendCode}>Send Code</button>
      <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
      {phoneNumber}
      <button onClick={handleVerifyCode}>Verify Code</button>
    </>
  );
};

export default PhoneAuth;
