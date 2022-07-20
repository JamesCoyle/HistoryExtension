import Popup from './Popup.svelte'
import { defaultIconColor } from './stores/settings'

const app = new Popup({
	target: document.body,
})

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
	if (!e.matches) return
	defaultIconColor.set('#f1f3f4')
})

window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
	if (!e.matches) return
	defaultIconColor.set('#5f6368')
})

export default app
