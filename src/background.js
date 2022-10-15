chrome.runtime.onStartup.addListener(() => {
	initialize()
})

// Clean local storage on install.
chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.local.clear()
	initialize()
})

// Perform updates on settings changes.
chrome.storage.sync.onChanged.addListener((changes) => {
	for (const key of Object.keys(changes)) {
		switch (key) {
			case 'iconColor':
			case 'defaultIconColor':
				setIcon()
				break
		}
	}
})

function initialize() {
	setIcon()
}

// Updates the action icon to match current theme/icon settings.
function setIcon() {
	chrome.storage.sync.get(['iconColor', 'defaultIconColor']).then(({ iconColor, defaultIconColor }) => {
		const path = new Path2D('M 8.6 4.5 H 7.4 V 8.6 L 10.1 10.9 L 11 10 L 8.6 8 V 4.5 M 8 1.5 A 6.5 6.5 90 0 0 1.5 8 H 0 L 2.3 10.5 L 4.5 8 H 3 A 5 5 90 0 1 8 3 A 5 5 90 0 1 13 8 A 5 5 90 0 1 8 13 A 5 5 0 0 1 4.3 11.4 L 3.1 12.4 A 6.5 6.5 0 0 0 8 14.5 A 6.5 6.5 90 0 0 14.5 8 A 6.5 6.5 90 0 0 8 1.5')
		const canvas = new OffscreenCanvas(16, 16)
		const context = canvas.getContext('2d')
		context.clearRect(0, 0, canvas.width, canvas.height)
		context.fillStyle = iconColor === 'auto' ? defaultIconColor : iconColor
		context.fill(path)

		chrome.action.setIcon({ imageData: context.getImageData(0, 0, 16, 16) })
	})
}
