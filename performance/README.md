# Performance Optimization Report

## 📊 Summary

Performance optimizations were applied to the CO₂ data display component. The results showed significant performance improvements.

| Metric | Before Optimization | After Optimization | Improvement |
| :--- | :--- | :--- | :--- |
| **Commit Duration** | 17.2s | 1.0s | **x17.2 faster** |
| **Render Duration** | 178.3ms | 93.4ms | **x1.9 faster** |

## 🛠️ Applied Optimizations

1. **`useMemo`** - Memoization of heavy computations (filtering, sorting, available years/columns)
2. **Proper `key` props** - Using stable and unique keys in lists
3. **`useCallback`** - Memoization of handler functions (sorting, year change)
4. **`React.memo`** - Preventing unnecessary re-renders of child components (`CountryTable`, `TableHeader`, `TableToolbar`)

## 📈 Detailed Results

### 1. Baseline (Before any optimizations)

| Metric | Value |
| :--- | :--- |
| Commit Duration | 17.2s |
| Render Duration | 178.3ms |
| Layout Effects | 0.1ms |
| Passive Effects | 0.5ms |

**Screenshots:**
![Before Optimization - Flamegraph](/src/assets/before1.PNG)
![Before Optimization - Ranked](/src/assets/before2.PNG)
![Before Optimization - Ranked](/src/assets/before3.PNG)

---

### 2. After `useMemo` Optimization

| Metric | Value |
| :--- | :--- |
| Commit Duration | 2.2s |
| Render Duration | 116.4ms |
| Layout Effects | 0.1ms |
| Passive Effects | 0.1ms |

**Screenshots:**
![After useMemo - Flamegraph](/src/assets/usememo.PNG)
![After useMemo - Ranked](/src/assets/usememo2.PNG)

---

### 3. After Proper `key` props Optimization

| Metric | Value |
| :--- | :--- |
| Commit Duration | 1.9s |
| Render Duration | 126.2ms |
| Layout Effects | 4.3ms |
| Passive Effects | 0.1ms |

**Screenshots:**
![After Keys - Flamegraph](/src/assets/key.PNG)
![After Keys - Ranked](/src/assets/key2.PNG)

---

### 4. After `useCallback` Optimization

| Metric | Value |
| :--- | :--- |
| Commit Duration | 1.7s |
| Render Duration | 76.0ms |
| Layout Effects | <0.1ms |
| Passive Effects | 0.1ms |

**Screenshots:**
![After useCallback - Flamegraph](/src/assets/usecallback.PNG)
![After useCallback - Ranked](/src/assets/usecallback.PNG)

---

### 5. After `React.memo` Optimization (Final Result)

| Metric | Value |
| :--- | :--- |
| Commit Duration | 1.0s |
| Render Duration | 93.4ms |
| Layout Effects | 0.4ms |
| Passive Effects | 0.6ms |

**Screenshots:**
![After React.memo - Flamegraph](/src/assets/memo.PNG)
![After React.memo - Ranked](/src/assets/memo.PNG)

## ✅ Conclusion

The optimizations were highly effective, especially memoizing computations with `useMemo`. The combined application of all methods improved overall commit performance by **17.2 times**.

The use of proper `key` props ensured stable list rendering, `useCallback` eliminated unnecessary re-renders of child components caused by new function references, and `React.memo` prevented re-renders of pure components whose props remained unchanged.
