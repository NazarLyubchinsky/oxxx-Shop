
import {  useParams } from 'react-router-dom'
import Preloader from '../../components/Preloader/Preloader'
import Section from '../../components/Section/Section'
import PageTitle from '../../components/Title/PageTitle'
import { useShopItems } from '../../hooks/useShopitems'



// components
import ShopCard from './ShopCard'
import ShopCategoryList from './ShopCategoryList'
import ShopFilters from './ShopFilters'
import { useShopFilters } from './useShopFilters'

const ShopPage = () => {
  const { items = [], isLoading } = useShopItems()
  const { size: paramSize, pcd: paramPCD } = useParams()
console.log(items.imageCollection?.items || [])

// const Images = product.imageCollection?.items || [];

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
  
  return (
    <Section className="shop-section page">
      <div className="container">
        <PageTitle text="Shop" />

        {isLoading ? (
          <Preloader />
        ) : (
          <div className='shop-block'>
   <ShopFilters
             isBurgerAndShopFilter='false'
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
            />

           <div className='shop-block_content'>
             <ShopCategoryList
              filtered={filtered}
              setFiltered={setFiltered}
              selectedSize={paramSize}
              selectedPCD={paramPCD}
            />


            <ul className="shop-list">
              {sortedItems.map(el => (
                <ShopCard key={el.sys.id} el={el} />
              ))}
            </ul>
           </div>
          </div>
        )}
      </div>
    </Section>
  )
}

export default ShopPage


