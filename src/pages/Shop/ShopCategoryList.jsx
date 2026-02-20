import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShopItems } from '../../hooks/useShopitems';
import { getShopPrefix } from '../../utils/shopDetect';

const ShopCategoryList = ({ filtered, setFiltered, selectedSize, selectedPCD, setIsFilterOpenBurger }) => {
  const { items = [] } = useShopItems();
  const navigate = useNavigate();

  const sizes = useMemo(() => {
    const unique = [...new Set(items.map(item => item.size).filter(Boolean))];
    // sort by numeric portion (e.g. R14, R16)
    unique.sort((a, b) => {
      const na = parseInt(a.replace(/[^\d]/g, ''), 10);
      const nb = parseInt(b.replace(/[^\d]/g, ''), 10);
      return na - nb;
    });
    return unique;
  }, [items]);

  const pcds = useMemo(() => {
    if (!selectedSize) return [];
    const filteredItems = items.filter(item => item.size === selectedSize);
    const uniq = [...new Set(filteredItems.map(item => item.pcd).filter(Boolean))];
    // sort PCD values numerically if they contain digits
    uniq.sort((a, b) => {
      const na = parseInt(a.replace(/[^\d]/g, ''), 10);
      const nb = parseInt(b.replace(/[^\d]/g, ''), 10);
      if (!isNaN(na) && !isNaN(nb)) {
        return na - nb;
      }
      return a.localeCompare(b);
    });
    return uniq;
  }, [selectedSize, items]);

  useEffect(() => {
    let result = items;

    if (selectedSize) {
      result = result.filter(item => item.size === selectedSize);
    }

    if (selectedPCD) {
      result = result.filter(item => item.pcd === selectedPCD);
    }

    setFiltered(result);
  }, [selectedSize, selectedPCD, items, setFiltered]);

  const handleSizeClick = (size) => {
    const newSize = size === selectedSize ? null : size;
    const prefix = getShopPrefix()
    navigate(newSize ? `${prefix}/shop/${newSize}` : `${prefix}/shop`);
  };

 const handlePCDClick = (pcd) => {
  const newPCD = pcd === selectedPCD ? null : pcd;
  const prefix = getShopPrefix()
  if (!newPCD) {
    navigate(`${prefix}/shop/${selectedSize}`);
  } else {
    navigate(`${prefix}/shop/${selectedSize}/${newPCD}`);
  }
};


  return (
    <div className='shop-list__category'>

        <button className="shop-list__category-toggle"  onClick={() => setIsFilterOpenBurger(true)}>
  <i className="shop-list__category-toggle_image"></i>
  Фільтр

</button>
     {!selectedSize && (
  <div style={{ marginBottom: '10px' }}>
 
    <div className='shop-list__category-row'>

      
      {sizes.map((size, idx) => (
        <button
          key={idx}
          className={`shop-list__category-item`}
          onClick={() => handleSizeClick(size)}
        >
          {`R${size.replace(/[^\d]/g, '')}`}
        </button>
      ))}
    </div>
  </div>
)}


      {selectedSize && (
        <div>
          
          <div className='shop-list__category-row'>
             <button
        onClick={() => navigate(`${getShopPrefix()}/shop`)}
         className={`shop-list__category-item`}
          
      >
        Змінити розмір
      </button>
            {pcds.map((pcd, idx) => (
              <button
                key={idx}
                className={`shop-list__category-item ${selectedPCD === pcd ? 'active' : ''}`}
                onClick={() => handlePCDClick(pcd)}
              >
                {pcd}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopCategoryList;

