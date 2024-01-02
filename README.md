# strapi-plugin-audit-trail
A comprehensive audit trail plugin for Strapi that tracks user activities.

This plugin utilizes a middleware to create an audit log of user activities. The audit log is accessible in the Audit Trail content type. The admin page provides a functionality to clear audit trails.

# How to use
To enable this plugin, put the following code in `/config/plugin.js`:
```
  'audit-trail': {
    enabled: true,
  },
```
Add in /config/middleware.js
```
module.exports = ({ env }) => [
  \\ other middleware
  'plugin::audit-trail.logActivity'
];
```

# Road Map
- provide config for audit items