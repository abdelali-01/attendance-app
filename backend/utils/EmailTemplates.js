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
          <a href="${process.env.BASE_URL}/verification/${verificationToken}" target="_blank" style="
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
              ${process.env.BASE_URL}/verification/${verificationToken}
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

export const subscriptionEndedTemplate = (renewalLink) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Subscription Expired</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f8f8; color: #353535; line-height: 1.6;">
    
    <!-- Main Container -->
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); overflow: hidden;">
    
        <!-- Header -->
        <div style="background-color: #ff5a5f; color: white; padding: 20px 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Your Subscription Has Ended</h1>
        </div>
    
        <!-- Body -->
        <div style="padding: 30px; text-align: center;">
            <p style="font-size: 18px; color: #353535; margin-bottom: 20px;">
                Your subscription has expired. Renew now to continue enjoying our services without interruption.
            </p>
    
            <!-- Renew Button -->
            <a href="${renewalLink}" target="_blank" style="
                display: inline-block;
                padding: 12px 24px;
                background-color: #ff5a5f;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin: 20px 0;">
                Renew Subscription
            </a>
    
            <p style="font-size: 14px; color: #353535; margin-top: 20px;">
                If you have any questions or need assistance, feel free to contact us.
            </p>
    
            <p style="word-wrap: break-word; font-size: 14px; color: #ff5a5f;">
                If the button above doesn't work, copy and paste this link into your browser: <br>
                <a href="${renewalLink}" style="color: #ff5a5f; word-break: break-all;">${renewalLink}</a>
            </p>
        </div>
    
        <!-- Footer -->
        <div style="background-color: #f8f8f8; padding: 15px; text-align: center; color: #666666; font-size: 12px;">
            <p style="margin: 0;">&copy; 2025 Attendance App. All rights reserved.</p>
            <p style="margin: 0;">Need help? <a href="mailto:support@yourcompany.com" style="color: #ff5a5f; text-decoration: none;">Contact Support</a></p>
        </div>
    
    </div>
    
    </body>
    </html>`;
};

export const paymentSuccessTemplate = (plan, duration, dashboardLink) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Successful</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f8f8; color: #353535; line-height: 1.6;">
    
    <!-- Main Container -->
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); overflow: hidden;">
    
        <!-- Header -->
        <div style="background-color: #28a745; color: white; padding: 20px 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Payment Successful</h1>
        </div>
    
        <!-- Body -->
        <div style="padding: 30px; text-align: center;">
            <p style="font-size: 18px; color: #353535; margin-bottom: 20px;">
                Thank you for your payment! Your subscription has been successfully activated.
            </p>

            <p style="font-size: 16px; color: #353535; margin-bottom: 20px;">
                <strong>Plan:</strong> ${plan} <br>
                <strong>Duration:</strong> ${duration} months
            </p>
    
            <!-- Go to Dashboard Button -->
            <a href="${dashboardLink}" target="_blank" style="
                display: inline-block;
                padding: 12px 24px;
                background-color: #28a745;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin: 20px 0;">
                Go to Dashboard
            </a>
    
            <p style="font-size: 14px; color: #353535; margin-top: 20px;">
                If you have any questions or need assistance, feel free to contact us.
            </p>
    
            <p style="word-wrap: break-word; font-size: 14px; color: #28a745;">
                If the button above doesn't work, copy and paste this link into your browser: <br>
                <a href="${dashboardLink}" style="color: #28a745; word-break: break-all;">${dashboardLink}</a>
            </p>
        </div>
    
        <!-- Footer -->
        <div style="background-color: #f8f8f8; padding: 15px; text-align: center; color: #666666; font-size: 12px;">
            <p style="margin: 0;">&copy; 2025 Attendance App. All rights reserved.</p>
            <p style="margin: 0;">Need help? <a href="mailto:support@yourcompany.com" style="color: #28a745; text-decoration: none;">Contact Support</a></p>
        </div>
    
    </div>
    
    </body>
    </html>`;
};

export const paymentFailedTemplate = (retryLink) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Failed</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f8f8; color: #353535; line-height: 1.6;">
    
    <!-- Main Container -->
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); overflow: hidden;">
    
        <!-- Header -->
        <div style="background-color: #dc3545; color: white; padding: 20px 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Payment Failed</h1>
        </div>
    
        <!-- Body -->
        <div style="padding: 30px; text-align: center;">
            <p style="font-size: 18px; color: #353535; margin-bottom: 20px;">
                Unfortunately, your payment was not successful. Please try again to complete your transaction.
            </p>
    
            <!-- Retry Payment Button -->
            <a href="${retryLink}" target="_blank" style="
                display: inline-block;
                padding: 12px 24px;
                background-color: #dc3545;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin: 20px 0;">
                Retry Payment
            </a>
    
            <p style="font-size: 14px; color: #353535; margin-top: 20px;">
                If you continue to experience issues, please contact our support team for assistance.
            </p>
    
            <p style="word-wrap: break-word; font-size: 14px; color: #dc3545;">
                If the button above doesn't work, copy and paste this link into your browser: <br>
                <a href="${retryLink}" style="color: #dc3545; word-break: break-all;">${retryLink}</a>
            </p>
        </div>
    
        <!-- Footer -->
        <div style="background-color: #f8f8f8; padding: 15px; text-align: center; color: #666666; font-size: 12px;">
            <p style="margin: 0;">&copy; 2025 Attendance App. All rights reserved.</p>
            <p style="margin: 0;">Need help? <a href="mailto:support@yourcompany.com" style="color: #dc3545; text-decoration: none;">Contact Support</a></p>
        </div>
    
    </div>
    
    </body>
    </html>`;
};


export const reminderEmailTemplate = (className, module, reminderTime) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Class Reminder</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f8f8; color: #353535; line-height: 1.6;">
  
    <!-- Main Container -->
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); overflow: hidden;">
  
        <!-- Header -->
        <div style="background-color: #007bff; color: white; padding: 20px 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Class Reminder</h1>
        </div>
  
        <!-- Body -->
        <div style="padding: 30px; text-align: center;">
            <p style="font-size: 18px; color: #353535; margin-bottom: 20px;">
                This is a reminder for your upcoming class.
            </p>
  
            <p style="font-size: 16px; color: #353535; margin-bottom: 20px;">
                <strong>Class:</strong> ${className} <br>
                <strong>Module:</strong> ${module} <br>
                <strong>Time:</strong> ${reminderTime}
            </p>
  
            <p style="font-size: 14px; color: #353535; margin-top: 20px;">
                Please be on time and mark attendance accordingly.
            </p>
        </div>
  
        <!-- Footer -->
        <div style="background-color: #f8f8f8; padding: 15px; text-align: center; color: #666666; font-size: 12px;">
            <p style="margin: 0;">&copy; 2025 Attendance App. All rights reserved.</p>
            <p style="margin: 0;">Need help? <a href="mailto:support@yourcompany.com" style="color: #007bff; text-decoration: none;">Contact Support</a></p>
        </div>
  
    </div>
  
    </body>
    </html>`;
  };
  

