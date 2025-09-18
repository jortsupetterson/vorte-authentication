import { handleUser } from './handleUser.js';
if (document.readyState === 'loading') {
	window.addEventListener('DOMContentLoaded', handleUser);
} else {
	handleUser();
}
