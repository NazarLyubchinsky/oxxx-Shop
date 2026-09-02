import { renderHook, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useShopFilters } from './useShopFilters';

describe('useShopFilters NEW and used filters', () => {
  const items = [
    { title: 'R21*8.0J PC*139.7 ET45 216801 NEW', price: 100 },
    { title: 'R17 7J ET40 5x114.3 wheel', price: 90 },
    { title: 'R16 6J ET35 5x114.3 used wheel', price: 80 },
  ];

  it('shows used items by default', () => {
    const wrapper = ({ children }) => (
      <MemoryRouter initialEntries={['/shop']}>
        {children}
      </MemoryRouter>
    );

    const { result } = renderHook(() => useShopFilters(items), { wrapper });

    expect(result.current.showUsedItems).toBe(true);
    expect(result.current.showNewOnly).toBe(false);
    expect(result.current.sortedItems).toHaveLength(2);
  });

  it('shows all items when NEW is added to active used items', () => {
    const wrapper = ({ children }) => (
      <MemoryRouter initialEntries={['/shop']}>
        {children}
      </MemoryRouter>
    );

    const { result } = renderHook(() => useShopFilters(items), { wrapper });

    act(() => {
      result.current.toggleNewOnly();
    });

    expect(result.current.showUsedItems).toBe(true);
    expect(result.current.showNewOnly).toBe(true);
    expect(result.current.sortedItems).toHaveLength(3);
  });

  it('shows only NEW items when USED is turned off while NEW stays active', () => {
    const wrapper = ({ children }) => (
      <MemoryRouter initialEntries={['/shop']}>
        {children}
      </MemoryRouter>
    );

    const { result } = renderHook(() => useShopFilters(items), { wrapper });

    act(() => {
      result.current.toggleNewOnly();
    });

    act(() => {
      result.current.toggleUsedItems();
    });

    expect(result.current.showUsedItems).toBe(false);
    expect(result.current.showNewOnly).toBe(true);
    expect(result.current.sortedItems).toHaveLength(1);
    expect(result.current.sortedItems[0].title).toMatch(/NEW/i);
  });

  it('shows all items again when USED is turned back on', () => {
    const wrapper = ({ children }) => (
      <MemoryRouter initialEntries={['/shop']}>
        {children}
      </MemoryRouter>
    );

    const { result } = renderHook(() => useShopFilters(items), { wrapper });

    act(() => {
      result.current.toggleNewOnly();
    });

    act(() => {
      result.current.toggleUsedItems();
    });

    act(() => {
      result.current.toggleUsedItems();
    });

    expect(result.current.showUsedItems).toBe(true);
    expect(result.current.showNewOnly).toBe(true);
    expect(result.current.sortedItems).toHaveLength(3);
  });

  it('returns to used-only when NEW is turned off again', () => {
    const wrapper = ({ children }) => (
      <MemoryRouter initialEntries={['/shop']}>
        {children}
      </MemoryRouter>
    );

    const { result } = renderHook(() => useShopFilters(items), { wrapper });

    act(() => {
      result.current.toggleNewOnly();
    });

    act(() => {
      result.current.toggleNewOnly();
    });

    expect(result.current.showUsedItems).toBe(true);
    expect(result.current.showNewOnly).toBe(false);
    expect(result.current.sortedItems).toHaveLength(2);
  });
});
