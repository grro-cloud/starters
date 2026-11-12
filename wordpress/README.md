# WordPress

The blog and website builder, with a MySQL database you attach.

WordPress on PHP with nginx and PHP-FPM, installed with Composer from
[`grro-cloud/starters/wordpress`](https://github.com/grro-cloud/starters/tree/main/wordpress) at a pinned commit.

## Set it up

1. Deploy the template.
2. In the project, create a MySQL database and attach it as `DATABASE_URL`.
3. Redeploy, open your address and follow the WordPress installer.

## Good to know

- Grro generates the WordPress keys and salts and keeps them encrypted.
- The filesystem resets when the app restarts. Add themes and plugins to the
  repository, and use a storage plugin so media uploads are kept.
- The app sleeps when nobody visits and wakes on the next visit. Set the
  minimum scale to 1 if you need it always awake.

Software: https://github.com/WordPress/WordPress  
Licence: GPL-2.0-or-later
