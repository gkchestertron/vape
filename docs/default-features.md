# Default Features
Vape comes with a lot of cool stuff built in, in addition to a straightforward plugin architecture that lets you add all the other things you might need.

## Auth
Authentication and Authorization come built in using json web tokens and postgresql's built in role-based and row-level security. A few simple rest-style routes have been added (via the extensions folder).

### Authentication
On your db schema, you will find functions for registering, verifying, and resetting accounts (see your schema folder -- the file ending in "auth.sql". In your extensions folder), you will find some added rest-syle endpoints:
<pre>

...
|--<strong>extensions</strong>
   |--index.js
   |--register.js
   |--reset.js
   |--verify.js
...

</pre>
These handle extending the posqgresql functions with the mail-client. By default, they use the simple-mail client that relies on google's insecure apps feature, but it uses nodemailer, and the interface will not change if that is replaced with another email service.

Default pages that utilize these endpoints are also provided, (see pages/signup and pages/login (for reset)). The verify endpoint is hit directly and simply redirects to the root of your app.


### Authorization
Controlling access to certain things in your application should be data-driven. Access to everything can be controlled at the db level with grants to the different roles.

## Great Dev Environment
The built-in dev server provides hot-swapping. Automatically generates index files for your pages, components and plugins - so you just have to worry about writing your code, not how it gets picked up by the framework.
