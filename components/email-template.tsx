import React from 'react'
interface EmailTemplateProps {
    firstName: string;
    message:string;
    subject:string;
  }
  export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
    subject,
    message,
  }) => (
    <div>
      <h1 className='text-2xl'>Welcome, {firstName}!</h1>
      <h1 className='text-2xl'>{subject}!</h1>
      <p className='text-sm text-muted-foreground'>{message}</p>
    </div>
  );