import { handleUse } from './handleUse.js';
if (document.readyState === 'loading') {
	window.addEventListener('DOMContentLoaded', handleUse);
} else {
	handleUse();
}
