/**
 * Detects the current shop ('r3' or 'angar') from multiple sources
 * Priority: pathname > env variable > hostname > default (r3)
 * @returns {string} - 'r3' or 'angar'
 */
export const detectShop = () => {
	// 1) If pathname contains shop prefix, use it and persist to localStorage
	if (typeof window !== 'undefined' && window.location && window.location.pathname) {
		const path = window.location.pathname.replace(/^\//, '') // remove leading /
		const first = path.split('/')[0].toLowerCase()
		if (first === 'r3' || first === 'angar') {
			try { window.localStorage.setItem('LAST_SHOP', first) } catch (e) {}
			return first
		}
	}

	// 2) If we have a persisted last shop, use it (this preserves icon after navigating to '/')
	if (typeof window !== 'undefined') {
		try {
			const last = (window.localStorage.getItem('LAST_SHOP') || '').toLowerCase()
			if (last === 'r3' || last === 'angar') return last
		} catch (e) {}
	}

	// 3) Fallback to env variable
	const env = (process.env.REACT_APP_SHOP || '').toLowerCase()
	if (env === 'r3' || env === 'angar') return env

	// 4) Last fallback: hostname contains marker
	if (typeof window !== 'undefined') {
		const host = window.location.hostname.toLowerCase()
		if (host.includes('r3')) return 'r3'
		if (host.includes('angar')) return 'angar'
	}

	return 'r3'
}

/**
 * Gets the shop prefix for URLs (e.g., '/r3' or '/angar')
 * @returns {string} - shop prefix or empty string
 */
export const getShopPrefix = () => {
	if (typeof window === 'undefined' || !window.location) return ''
	const path = window.location.pathname.replace(/^\/+/, '')
	const first = path.split('/')[0].toLowerCase()
	if (first === 'r3' || first === 'angar') return `/${first}`
	return ''
}
