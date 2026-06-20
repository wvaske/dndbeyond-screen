'use strict';

require('../css/app.css');

// Import jQuery BEFORE Bootstrap (Bootstrap depends on jQuery)
const $ = require('jquery');
// Make jQuery global for Bootstrap
global.$ = global.jQuery = $;

// Import Popper.js (required by Bootstrap 4)
require('popper.js');

import CharacterUpdater from './CharacterUpdater';
import TimeSince from './TimeSince';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

$(document).ready(() => {
  // Init the tooltips we have for various properties.
  $('body').tooltip({
    container: 'body',
    selector: '[data-toggle="tooltip"]',
  });
  // Init the popovers we use to show spell information.
  $('body').popover({
    container: 'body',
    selector: '[data-toggle="popover"]',
    trigger: 'focus',
  });

  // Bootstrap collapse should auto-initialize from data attributes
  // But we need to ensure the click handler is attached for dynamically loaded content
  // Use event delegation on document for collapse toggles
  $(document).on('click', '[data-toggle="collapse"]', function(e) {
    e.preventDefault();
    const target = $(this).data('target');
    $(target).collapse('toggle');
  });

  let character_updaters = {};
  // Start the automatic refreshing for all available characters.
  document.querySelectorAll('.character[data-character-id]').forEach((card) => {
    let character_id = parseInt(card.getAttribute('data-character-id'));
    character_updaters[character_id] = new CharacterUpdater(character_id);
  });

  (new TimeSince());
});
