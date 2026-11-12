<?php
// Front controller: WordPress core lives in /wp (installed by Composer).
define('WP_USE_THEMES', true);
require __DIR__ . '/wp/wp-blog-header.php';
