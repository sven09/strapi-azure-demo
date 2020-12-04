module.exports = ({ env }) => ({
  email: {
    provider: env("email_provider", "smtp"),
    providerOptions: {
      host: env("email_host", "smtp.ionos.de"), //SMTP Host
      port: env.int("email_port", 465), //SMTP Port
      secure: env.bool("email_secure", true),
      username: env("email_username", "noreply@events66.com"),
      password: env("email_password", ""),
      rejectUnauthorized: env.bool("email_rejectUnauthorized", true),
      requireTLS: env.bool("email_requireTLS", true),
      connectionTimeout: env.int("email_connectionTimeout", 1),
    },
    settings: {
      from: env("email_from", "noreply@events66.com"),
      replyTo: env("email_replyTo", "noreply@events66.com"),
    },

  },
});
