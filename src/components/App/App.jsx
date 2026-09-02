import React, { Suspense, useEffect } from 'react'
import '../../styles/index.scss'


// components
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import AppRoutes from './AppRoutes'
import Preloader from '../Preloader/Preloader'
import { useLocation } from 'react-router-dom'
import { useShopItems } from '../../hooks/useShopitems'
import disksData from '../../utils/disks_all.json'

const App = () => {
	const location = useLocation()
	const { items: shopItems } = useShopItems()

	// Нормалізація назви для порівняння по повній назві `name`
	const normalizeDiskName = (name) => {
		if (!name) return ''

		return name
			.trim()
			.toLowerCase()
			.normalize('NFKD')
			.replace(/[\u0300-\u036f]/g, '')
			.replace(/[^a-zа-яё0-9\s]/g, ' ')
			.replace(/\s+/g, ' ')
			.trim()
	}

	// Перевірка яких дисків немає на сайті (по повній назві `name`)
	useEffect(() => {
		if (shopItems.length > 0) {
			const allDiskNames = disksData.div.items
				.map(disk => normalizeDiskName(disk.name))
				.filter(Boolean)
			const uniqueAllNames = [...new Set(allDiskNames)]

			const shopDiskNames = shopItems
				.map(item => normalizeDiskName(item.title))
				.filter(Boolean)
			const uniqueShopNames = [...new Set(shopDiskNames)]

			const matchedDiskNames = uniqueAllNames.filter(name => uniqueShopNames.includes(name))
			const missingDiskNames = uniqueAllNames.filter(name => !uniqueShopNames.includes(name))

			console.group('📊 СТАТИСТИКА ДИСКІВ ПО NAME')
			console.log(`Всього позицій в JSON: ${disksData.div.items.length}`)
			console.log(`Унікальних назв в JSON: ${uniqueAllNames.length}`)
			console.log(`Всього товарів на сайті: ${shopItems.length}`)
			console.log(`Унікальних назв на сайті: ${uniqueShopNames.length}`)
			console.log(`Назв, які є на сайті: ${matchedDiskNames.length}`)
			console.log(`Назв, яких немає на сайті: ${missingDiskNames.length}`)
			console.log('Перші 10 назв з JSON:', uniqueAllNames.slice(0, 10))
			console.log('Перші 10 назв з сайту:', uniqueShopNames.slice(0, 10))
			console.log('Назви, які є на сайті (по повній name):', matchedDiskNames)
			console.log('Назви, яких немає на сайті (по повній name):', missingDiskNames)
			console.groupEnd()

			if (missingDiskNames.length > 0) {
				console.group('❌ ВІДСУТНІ НАЗВИ ДИСКІВ НА САЙТІ')
				missingDiskNames.forEach((name, index) => {
					const originalName = disksData.div.items.find(disk => normalizeDiskName(disk.name) === name)?.name
					console.log(`${index + 1}. ${originalName}`)
				})
				console.groupEnd()
			} else {
				console.log('✅ Всі назви дисків присутні на сайті!')
			}
		}
	}, [shopItems])

	return (
		<Suspense fallback={<Preloader />} className='app'>
			<Header />
			<AppRoutes />
			{
				location.key === 'default' ?  '' : <Footer />
			}
			
		</Suspense>
		
	)
}

export default App