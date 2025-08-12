import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShopItems } from '../../hooks/useShopitems';

const ShopCategoryList = ({ filtered, setFiltered, selectedSize, selectedPCD, setIsFilterOpenBurger }) => {
  const { items = [] } = useShopItems();
  const navigate = useNavigate();

  const sizes = useMemo(() => [...new Set(items.map(item => item.size).filter(Boolean))], [items]);

  const pcds = useMemo(() => {
    if (!selectedSize) return [];
    const filteredItems = items.filter(item => item.size === selectedSize);
    return [...new Set(filteredItems.map(item => item.pcd).filter(Boolean))];
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
    navigate(newSize ? `/shop/${newSize}` : '/shop');
  };

 const handlePCDClick = (pcd) => {
  const newPCD = pcd === selectedPCD ? null : pcd;

  if (!newPCD) {
    navigate(`/shop/${selectedSize}`);
  } else {
    navigate(`/shop/${selectedSize}/${newPCD}`);
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
        onClick={() => navigate('/shop')}
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
