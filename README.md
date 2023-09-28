The rate limit on emails if you don't have a custom SMTP server set up is 4 emails per hour. That means that you will only be able to sign up 4 users per hour.

Set up Custom SMTP to increase the rate:

Go to the Auth Settings Page in your Supabase project.

Under the SMTP Provider section, click on "Enable Custom SMTP".

Fill in the fields with the relevant details obtained from your custom SMTP provider. The fields are:

SMTP Host
SMTP Port
SMTP User
SMTP Password
SMTP Sender Name
SMTP Admin Email

Click on "Save Changes" to save your SMTP settings.
Configure Your Own Email Provider

To configure your own email provider, you will need to use a production-ready SMTP server for sending emails. You can use any major SMTP provider of your choosing, such as AWS SES or Twilio SendGrid. Here are the steps to configure your own email provider:

Sign up for an account with your chosen SMTP provider.
Obtain the SMTP credentials from your SMTP provider. The credentials typically include the following:

SMTP Host
SMTP Port
SMTP User
SMTP Password

Update the environment variables in your Supabase project with the SMTP credentials obtained from your SMTP provider. The environment variables are:

SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASS
SMTP_SENDER_NAME
SMTP_ADMIN_EMAIL

Restart all services to pick up the new configuration.

Once you have configured your own email provider, you can send more than 30 new users per hour via your own email provider's SMTP server. You can still use the resetPasswordForEmail method to send password reset emails, but the emails will be sent using your own email provider's SMTP server.
