
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useShopFilters = (items = []) => {
  const [searchParams, setSearchParams] = useSearchParams()

const [sortOrder, setSortOrder] = useState(() => {
  const urlSort = searchParams.get('sort');
  return urlSort === 'asc' || urlSort === 'desc' ? urlSort : 'desc';
});

  const [filtered, setFiltered] = useState([])
  const [selectedDia, setSelectedDia] = useState(() => {
    const urlDia = searchParams.get('dia');
    return urlDia ? urlDia.split(',') : [];
  });
  const initialNewOnly = (() => {
    const urlNew = searchParams.get('new');
    return urlNew === '1' || urlNew === 'true' || urlNew === 'on';
  })();

  const [showNewOnly, setShowNewOnly] = useState(initialNewOnly);
  const [showUsedItems, setShowUsedItems] = useState(() => {
    const urlUsed = searchParams.get('used');
    if (urlUsed !== null) {
      return urlUsed === '1' || urlUsed === 'true' || urlUsed === 'on';
    }
    return !initialNewOnly;
  });
  const [showPzOnly, setShowPzOnly] = useState(() => searchParams.get('supplier') === 'filled');

  const etFromParam = searchParams.get('etFrom') || ''
  const etToParam = searchParams.get('etTo') || ''

  const [filterEtFrom, setFilterEtFrom] = useState(etFromParam)
  const [filterEtTo, setFilterEtTo] = useState(etToParam)

  useEffect(() => {
    setFilterEtFrom(etFromParam)
    setFilterEtTo(etToParam)
  }, [etFromParam, etToParam])

 

  const baseItems = filtered.length ? filtered : items

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

  const filteredByDia = useMemo(() => {
    if (selectedDia.length === 0) return filteredByEt;
    return filteredByEt.filter(item => selectedDia.includes(item.dia));
  }, [filteredByEt, selectedDia]);

  const filteredByCondition = useMemo(() => {
    const isNewItem = item => /NEW/i.test(item.title || item.name || '');

    if (showNewOnly && showUsedItems) {
      return filteredByDia;
    }

    if (showNewOnly) {
      return filteredByDia.filter(item => isNewItem(item));
    }

    return filteredByDia.filter(item => !isNewItem(item));
  }, [filteredByDia, showNewOnly, showUsedItems]);

  const filteredBySupplier = useMemo(() => {
    if (!showPzOnly) return filteredByCondition;
    return filteredByDia.filter(item => String(item.supplier || '').trim().length > 0);
  }, [filteredByCondition, filteredByDia, showPzOnly]);

  const sortedItems = useMemo(() => {
    return [...filteredBySupplier].sort((a, b) => {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });
  }, [filteredBySupplier, sortOrder]);

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

  const handleClearDia = () => {
    setSelectedDia([])
    const params = Object.fromEntries(searchParams.entries())
    delete params.dia
    setSearchParams(params)
  }

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

  const applyProductFilters = (nextNewOnly, nextUsedOnly) => {
    let nextNew = Boolean(nextNewOnly);
    let nextUsed = Boolean(nextUsedOnly);

    if (!nextNew && !nextUsed) {
      nextUsed = true;
    }

    setShowNewOnly(nextNew);
    setShowUsedItems(nextUsed);

    const params = Object.fromEntries(searchParams.entries());

    if (nextNew) {
      params.new = '1';
    } else {
      delete params.new;
    }

    if (nextUsed) {
      params.used = '1';
    } else {
      delete params.used;
    }

    setSearchParams(params);
  };

  const toggleNewOnly = () => {
    if (showNewOnly) {
      applyProductFilters(false, true);
      return;
    }

    if (showUsedItems) {
      applyProductFilters(true, true);
    } else {
      applyProductFilters(true, false);
    }
  };

  const toggleUsedItems = () => {
    if (showUsedItems) {
      if (showNewOnly) {
        applyProductFilters(true, false);
      } else {
        applyProductFilters(false, true);
      }
      return;
    }

    applyProductFilters(showNewOnly, true);
  };

  const togglePzOnly = () => {
    const updated = !showPzOnly;
    setShowPzOnly(updated);
    const params = Object.fromEntries(searchParams.entries());

    if (updated) {
      params.supplier = 'filled';
    } else {
      delete params.supplier;
    }

    setSearchParams(params);
  };

  const updateSortOrder = (value) => {
  setSortOrder(value);
  const params = Object.fromEntries(searchParams.entries());
  if (value) {
    params.sort = value;
  } else {
    delete params.sort;
  }
  setSearchParams(params);
};
  return {
    sortOrder,
    setSortOrder: updateSortOrder,
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
    showNewOnly,
    toggleNewOnly,
    showUsedItems,
    toggleUsedItems,
    showPzOnly,
    togglePzOnly,
    filtered,
    setFiltered,
    sortedItems
  }
}
