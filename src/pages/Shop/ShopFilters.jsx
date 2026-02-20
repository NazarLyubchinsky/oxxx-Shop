import { useMemo } from "react";

const ShopFilters = ({
  sortOrder,
  setSortOrder,
  filterEtFrom,
  filterEtTo,
  handleEtFromChange,
  handleEtToChange,
  handleClearEtFilter,
  selectedDia,
isBurgerAndShopFilter,
handleClearDia,
toggleDia,
baseItems,

}) => {
 

  

const diaOptions = useMemo(() => {
  const uniq = [...new Set(baseItems.map(item => item.dia))].filter(Boolean);
  // sort numeric values ascending (handles decimals)
  uniq.sort((a, b) => parseFloat(a) - parseFloat(b));
  return uniq;
}, [baseItems]);





return (
   <div className={`shop-filters__container ${isBurgerAndShopFilter === 'false' ? 'shopAndHamburger' : 'shopAndHamburgerNone'}`}>
     {/* <div className={`shop-filters__container`} > */}
     <div className="shop-filters__body">

       
     <div className="shop-filters__block">
        
        <label className="shop-filters__label">Сортувати за ціною:</label>
        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
          className="shop-filters__input"
        >
          <option value="asc">Від дешевших до дорожчих</option>
          <option value="desc">Від дорожчих до дешевших</option>
        </select>
      </div>
      <div className="shop-filters__block">
        <label className="shop-filters__label">Виліт (ET):</label>
       <div className="shop-filters__wrapper">
         <input
          type="number"
          placeholder="40"
          value={filterEtFrom}
          onChange={handleEtFromChange}
          className="shop-filters__input"
          min={0}
        />
        <span>-</span>
        <input
          type="number"
          placeholder="50"
          value={filterEtTo}
          onChange={handleEtToChange}
          className="shop-filters__input"
          min={0}
        />
       </div>
      </div>
      {/* <div className="shop-filters__block">
        <label className="shop-filters__label">Виліт ET до:</label>
        
      </div> */}

      <button onClick={handleClearEtFilter} className="shop-filters__button">
        Скинути фільтр ET
      </button>

      <div className="shop-filters__block">
        <label className="shop-filters__label">DIA (ступиця):</label>
        {diaOptions.map((diaValue) => (
          <label key={diaValue} className="shop-filters__checkbox-label">
            <input
              type="checkbox"
              value={diaValue}
              checked={selectedDia.includes(diaValue)}
              onChange={() => toggleDia(diaValue)}
            />
            {` ${diaValue}`}
          </label>
        ))}


          <button
            onClick={handleClearDia}
            style={{ marginBottom: '8px' }}
            className="shop-filters__button"
          >
            Скинути DIA
          </button>
        
      </div>
      </div>
       
    </div>
  );
};

export default ShopFilters;

