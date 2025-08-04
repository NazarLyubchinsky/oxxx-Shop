import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { MENU } from '../../utils/constants'

// components
import Icon from '../Icon/Icon'
import Logo from '../Logo/Logo'
import ShopFilters from '../../pages/Shop/ShopFilters'
import { useShopFilters } from '../../pages/Shop/useShopFilters'
import { useShopItems } from '../../hooks/useShopitems'

const Hamburger = () => {
	const [isOpen, setIsOpen] = useState(false)
  const { items = [] } = useShopItems()
	 const {
		sortOrder,
		setSortOrder,
		filterEtFrom,
		filterEtTo,
		handleEtFromChange,
		handleEtToChange,
		handleClearEtFilter,
		selectedDia,
		setSelectedDia,
		baseItems,
		handleClearDia,
		toggleDia,
		
    filtered,
    setFiltered,
    sortedItems
	  } = useShopFilters(items)

	const toggleMenu = () => {
		setIsOpen((prev) => !prev)
	}
	return (
		<div className="menu-mobile">
			<div className="menu-mobile__button" onClick={toggleMenu}>
				<Icon name="round-menu" />
			</div>

			<nav className={`menu-mobile__list ${isOpen ? "opened" : ""}`}>
				<div onClick={toggleMenu}>
					<Logo onClick={toggleMenu} />
				</div>

				<ul className="menu-mobile__items">
					{MENU.map(({ link, name }, i) => (
						<li key={i} className="menu-mobile__item">
							<NavLink
								className={({ isActive }) =>
									!link.startsWith("#") && isActive ? "active" : ""
								}
								to={`/${link}`}
								onClick={toggleMenu}
							>
								{name}
							</NavLink>
						</li>
					))}
				</ul>
 {/* <ShopFilters isBurgerAndShopFilter='true'
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              filterEtFrom={filterEtFrom}
              filterEtTo={filterEtTo}
              handleEtFromChange={handleEtFromChange}
              handleEtToChange={handleEtToChange}
              handleClearEtFilter={handleClearEtFilter}
              selectedDia={selectedDia}
              setSelectedDia={setSelectedDia}
              baseItems={baseItems}
              handleClearDia={handleClearDia}
              toggleDia={toggleDia}
            /> */}
				<div className="menu-mobile__button" onClick={toggleMenu}>
					<Icon name="round-close" />
				</div>

			
			</nav>
			
		</div>
	)
}

export default Hamburger