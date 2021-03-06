module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  url: env("API_URL", "http://localhost/api"),
  port: env.int("PORT", 1337),
  cron: {
    enabled: true,
  },
  admin: {
    url: env("ADMIN_URL", "http://localhost/dashboard"),
    auth: {
      secret: env("ADMIN_JWT_SECRET", "6692b34a8dcf0071824091a06bca9eb0"),
    },
  },
});
