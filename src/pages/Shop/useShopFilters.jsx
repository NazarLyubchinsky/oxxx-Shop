// hooks/useShopFilters.js
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useShopFilters = (items = []) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [sortOrder, setSortOrder] = useState('asc')

  const [filtered, setFiltered] = useState([])
  const [selectedDia, setSelectedDia] = useState(() => {
    const urlDia = searchParams.get('dia');
    return urlDia ? urlDia.split(',') : [];
  });

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

  const sortedItems = useMemo(() => {
    return [...filteredByDia].sort((a, b) => {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });
  }, [filteredByDia, sortOrder]);

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

  return {
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
  }
}
