export const emailVerificationTemplate = (verificationToken) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f8f8; color: #353535; line-height: 1.6;">
  
  <!-- Main Container -->
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); overflow: hidden;">
  
      <!-- Header -->
      <div style="background-color: #5A57FF; color: white; padding: 20px 0; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">Verify Your Email</h1>
      </div>
  
      <!-- Body -->
      <div style="padding: 30px; text-align: center;">
          <p style="font-size: 18px; color: #353535; margin-bottom: 20px;">
              Thank you for signing up! Please click the button below to verify your email address and activate your account.
          </p>
  
          <!-- Verification Button -->
          <a href="${process.env.BASE_URL}verify/${verificationToken}" target="_blank" style="
              display: inline-block;
              padding: 12px 24px;
              background-color: #5A57FF;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              font-size: 16px;
              font-weight: bold;
              margin: 20px 0;">
              Verify My Email
          </a>
  
          <p style="font-size: 14px; color: #353535; margin-top: 20px;">
              If the button above doesn't work, copy and paste the following link into your browser:
          </p>
          <p style="word-wrap: break-word; font-size: 14px; color: #5A57FF;">
              ${process.env.BASE_URL}verify/${verificationToken}
          </p>
      </div>
  
      <!-- Footer -->
      <div style="background-color: #f8f8f8; padding: 15px; text-align: center; color: #666666; font-size: 12px;">
          <p style="margin: 0;">&copy; 2025 Your Company. All rights reserved.</p>
          <p style="margin: 0;">Need help? <a href="mailto:support@yourcompany.com" style="color: #5A57FF; text-decoration: none;">Contact Support</a></p>
      </div>
  
  </div>
  
  </body>
  </html>
  `;
};


export const resetPasswordTemplate = (link) => {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Password</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f8f8; color: #353535; line-height: 1.6;">
  
  <!-- Main Container -->
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); overflow: hidden;">
  
      <!-- Header -->
      <div style="background-color: #5A57FF; color: white; padding: 20px 0; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">Reset Your Password</h1>
      </div>
  
      <!-- Body -->
      <div style="padding: 30px; text-align: center;">
          <p style="font-size: 18px; color: #353535; margin-bottom: 20px;">
              We received a request to reset your password. Click the button below to proceed.
          </p>
  
          <!-- Reset Button -->
          <a href="${link}" target="_blank" style="
              display: inline-block;
              padding: 12px 24px;
              background-color: #5A57FF;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              font-size: 16px;
              font-weight: bold;
              margin: 20px 0;">
              Reset My Password
          </a>
  
          <p style="font-size: 14px; color: #353535; margin-top: 20px;">
              If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
          </p>
  
          <p style="word-wrap: break-word; font-size: 14px; color: #5A57FF;">
              If the button above doesn't work, copy and paste this link into your browser: <br>
              <a href="${link}" style="color: #5A57FF; word-break: break-all;">${link}</a>
          </p>
      </div>
  
      <!-- Footer -->
      <div style="background-color: #f8f8f8; padding: 15px; text-align: center; color: #666666; font-size: 12px;">
          <p style="margin: 0;">&copy; 2025 Attendance App. All rights reserved.</p>
          <p style="margin: 0;">Need help? <a href="mailto:support@yourcompany.com" style="color: #5A57FF; text-decoration: none;">Contact Support</a></p>
      </div>
  
  </div>
  
  </body>
  </html>`;
};
