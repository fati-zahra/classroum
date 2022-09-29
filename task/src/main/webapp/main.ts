import('./bootstrap').catch(err => console.error(err));
import { defineCustomElements } from '@teamhive/lottie-player/loader';

defineCustomElements(window);
