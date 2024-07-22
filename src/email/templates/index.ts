export const getVerificationEmail = (data, userType, verificationCode) => {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Student Email Verification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #eaf3f9;
                }

                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 20px;
                    box-shadow: rgba(35, 69, 79, 0.08);
                }

                .logo {
                    text-align: center;
                    margin-bottom: 20px;
                    font-size: 32px;
                    font-weight: bold;
                    color: #012C39;
                }

                h2 {
                    color: #012C39;
                    font-size: 24px;
                }

                p {
                    color: #64757B;
                    font-size: 16px;
                }

                @media only screen and (max-width: 600px) {
                    .container {
                        width: 100%;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="logo">Lms</div>
                <h2>${userType.charAt(0).toUpperCase() + userType.slice(1)} Email Verification</h2>
                <p>
                    Dear ${data.firstName},<br><br>
                    Thank you for registering with Lms.<br>
                    Please click on the following link to complete your registration:<br><br>
                    <a href="${data.baseUrl}/${userType}/verify-link?token=${verificationCode}">
                        ${data.baseUrl}/${userType}/verify-link?token=${verificationCode}
                    </a><br><br>
                    If you did not request this verification, please ignore this email.<br><br>
                    Regards,<br>
                    The Lms Team
                </p>
            </div>
        </body>
        </html>
    `;
};
