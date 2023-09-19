const customerRegisterBody = ({ verificationLink, currentYear }) => {
    return `
    <!DOCTYPE html >
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Verification</title>
        <style>
            /* Add your email styling here */
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }

            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }

            .header {
                text-align: center;
            }

            .logo {
                max-width: 150px;
                margin: 0 auto;
            }

            .content {
                margin-top: 20px;
            }

            .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 12px;
                color: #888;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <!-- You can replace the src attribute with your logo URL -->
                <img class="logo" src="https://via.placeholder.com/150" alt="Logo">
                <h1>Account Verification</h1>
            </div>
            <div class="content">
                <p>Dear user,</p>
                <p>Click the following link to verify your account:</p>
                <p><a href="${verificationLink}">${verificationLink}</a></p>
            </div>
            <div class="footer">
                <p>This email was sent from My App. &copy; ${currentYear}</p>
            </div>
        </div>
    </body>
    </html>
`;
};
export default customerRegisterBody;
//# sourceMappingURL=email.template.js.map