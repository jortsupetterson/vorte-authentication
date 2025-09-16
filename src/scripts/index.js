import { handleTurnstile } from './handleTurnstile';
if (document.readyState === 'loading') {
	window.addEventListener('DOMContentLoaded', handleTurnstile);
} else {
	handleTurnstile();
}
