const ShopFilters = ({
  sortOrder,
  setSortOrder,
  filterEtFrom,
  filterEtTo,
  handleEtFromChange,
  handleEtToChange,
  handleClearEtFilter,
  selectedDia,
setSelectedDia,
handleClearDia,
toggleDia,
baseItems
}) => {
  const containerStyle = {
    color: 'black',
    padding: '16px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '10px',
    maxWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    fontFamily: 'sans-serif',
  };

  const blockStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  };

  const labelStyle = {
    fontWeight: '500',
    fontSize: '14px',
  };

  const inputStyle = {
    padding: '6px 10px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    color: 'black'
  };

  const buttonStyle = {
    padding: '8px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    marginTop: '8px',
  };

const diaOptions = [...new Set(baseItems.map(item => item.dia))].filter(Boolean);



return (
    <div style={containerStyle}>
      <div style={blockStyle}>
        <label style={labelStyle}>Сортувати за ціною:</label>
        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
          style={inputStyle}
        >
          <option value="asc">Від дешевших до дорожчих</option>
          <option value="desc">Від дорожчих до дешевших</option>
        </select>
      </div>

      <div style={blockStyle}>
        <label style={labelStyle}>Виліт ET від:</label>
        <input
          type="number"
          placeholder="40"
          value={filterEtFrom}
          onChange={handleEtFromChange}
          style={inputStyle}
          min={0}
        />
      </div>

      <div style={blockStyle}>
        <label style={labelStyle}>Виліт ET до:</label>
        <input
          type="number"
          placeholder="50"
          value={filterEtTo}
          onChange={handleEtToChange}
          style={inputStyle}
          min={0}
        />
      </div>

      <button onClick={handleClearEtFilter} style={buttonStyle}>
        Скинути фільтр ET
      </button>

     {/* dia */}

     <div style={blockStyle}>
  <label style={labelStyle}>DIA (ступиця):</label>
  {diaOptions.map((diaValue) => (
    <label key={diaValue}>
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
    style={buttonStyle}
  >
    Скинути DIA
  </button>
</div>


    </div>
  );
};

export default ShopFilters;

