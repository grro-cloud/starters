<?php
/**
 * Plugin Name: Grro Cloud
 * Description: Small fixes for running WordPress on Grro Cloud.
 */

// The default themes ship with core in /wp/wp-content/themes; register that
// folder too, so they work without copying them into wp-content.
register_theme_directory(ABSPATH . 'wp-content/themes');
