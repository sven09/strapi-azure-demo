module.exports = ({ env }) => ({
  email: {
    provider: "smtp",
    providerOptions: {
      host: "smtp.ionos.de", //SMTP Host
      port: 465, //SMTP Port
      secure: true,
      username: "noreply@events66.com",
      password: "j5ar9ViOZwphGRUdGkCe",
      rejectUnauthorized: true,
      requireTLS: true,
      connectionTimeout: 1,
    },
    settings: {
      from: "noreply@events66.com",
      replyTo: "noreply@events66.com",
    },
  },
});
