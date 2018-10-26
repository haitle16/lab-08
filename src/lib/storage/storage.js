'use strict';

import memoryStorage from './memory.js';
import fileStorage from './filesystem.js';

let storageModule = {};

switch(process.env.STORAGE) {
    case 'filesystem':
        storageModule = fileStorage;
        break;
    default:
        storageModule = memoryStorage;
        break;
}

export default storageModule;