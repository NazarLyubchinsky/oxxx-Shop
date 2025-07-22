
import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useParams } from 'react-router-dom'
import Preloader from '../../components/Preloader/Preloader'
import Section from '../../components/Section/Section'
import PageTitle from '../../components/Title/PageTitle'
import { useShopItems } from '../../hooks/useShopitems'



// components
import ShopCard from './ShopCard'
import ShopCategoryList from './ShopCategoryList'
import ShopFilters from './ShopFilters'

const ShopPage = () => {
  const { items = [], isLoading } = useShopItems()
  const [searchParams, setSearchParams] = useSearchParams()

  // з URL беремо size і pcd
  const { size: paramSize, pcd: paramPCD,  } = useParams()

  const [filtered, setFiltered] = useState([])
  const [sortOrder, setSortOrder] = useState('asc')
 const [selectedDia, setSelectedDia] = useState(() => {
  const urlDia = searchParams.get('dia');
  return urlDia ? urlDia.split(',') : [];
});

  // з URL беремо параметри ET
  const etFromParam = searchParams.get('etFrom') || ''
  const etToParam = searchParams.get('etTo') || ''

  const [filterEtFrom, setFilterEtFrom] = useState(etFromParam)
  const [filterEtTo, setFilterEtTo] = useState(etToParam)

  // оновлюємо локальний стан при зміні URL
  useEffect(() => {
    setFilterEtFrom(etFromParam)
    setFilterEtTo(etToParam)
  }, [etFromParam, etToParam])

  const baseItems = filtered.length ? filtered : items

  // фільтрація по ET
  const filteredByEt = useMemo(() => {
    if (!filterEtFrom && !filterEtTo) return baseItems

    const from = filterEtFrom ? Number(filterEtFrom) : -Infinity
    const to = filterEtTo ? Number(filterEtTo) : Infinity

    return baseItems.filter(el => {
      const match = el.title.match(/ET\s?(\d+)/i)
      if (!match) return false

      const etValue = Number(match[1])
      return etValue >= from && etValue <= to
    })
  }, [baseItems, filterEtFrom, filterEtTo])

  // сортування dia
 const filteredByDia = useMemo(() => {
  if (selectedDia.length === 0) return filteredByEt;
  return filteredByEt.filter(item => selectedDia.includes(item.dia));
}, [filteredByEt, selectedDia]);

  // сортування по ціні
const sortedItems = useMemo(() => {
  return [...filteredByDia].sort((a, b) => {
    return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
  });
}, [filteredByDia, sortOrder]);

  // зміни полів ET
  const handleEtFromChange = e => {
    const val = e.target.value
    setFilterEtFrom(val)

    const params = Object.fromEntries(searchParams.entries())
    if (val) params.etFrom = val
    else delete params.etFrom

    setSearchParams(params)
  }

  const handleEtToChange = e => {
    const val = e.target.value
    setFilterEtTo(val)

    const params = Object.fromEntries(searchParams.entries())
    if (val) params.etTo = val
    else delete params.etTo

    setSearchParams(params)
  }

  const handleClearEtFilter = () => {
    setFilterEtFrom('')
    setFilterEtTo('')
    const params = Object.fromEntries(searchParams.entries())
    delete params.etFrom
    delete params.etTo
    setSearchParams(params)
  }

  // удаляємо фільтрацію по ступиці
  const handleClearDia = () => {
   setSelectedDia([]); // очищаємо стан
  const params = Object.fromEntries(searchParams.entries());
  delete params.dia; // видаляємо з URL
  setSearchParams(params);
  }

//  сортування діа 



const toggleDia = (diaValue) => {
  const updated = selectedDia.includes(diaValue)
    ? selectedDia.filter(d => d !== diaValue)
    : [...selectedDia, diaValue];

  setSelectedDia(updated);

  const params = Object.fromEntries(searchParams.entries());
  if (updated.length) {
    params.dia = updated.join(',');
  } else {
    delete params.dia;
  }
  setSearchParams(params);
};

  
  return (
    <Section className="shop-section page">
      <div className="container">
        <PageTitle text="Shop" />
        {/* <PageTitle image='/images/0-02-05-2ea2b8646444959a9191c5feec65ae5a543694a138425375e851378babbf180d_f52cd4cd5a29a098.jpg' /> */}

        {isLoading ? (
          <Preloader />
        ) : (
          <div className='shop-block'>
   <ShopFilters
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

           <div>
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


