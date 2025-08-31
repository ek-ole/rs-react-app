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

<img width="1051" height="285" alt="before1" src="https://github.com/user-attachments/assets/ec6589f0-433d-41cf-9da0-6b18efa2f76d" />

<img width="820" height="828" alt="before2" src="https://github.com/user-attachments/assets/44e7f9d0-6b29-43d5-93f2-900ea8566175" />

<img width="1008" height="662" alt="before3" src="https://github.com/user-attachments/assets/2289bd45-9870-495d-9688-4ec86a5e6d0d" />

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

<img width="967" height="387" alt="usememo" src="https://github.com/user-attachments/assets/e6bd11c3-535f-4c06-b2b0-6bbf50022e2f" />


<img width="954" height="671" alt="usememo2" src="https://github.com/user-attachments/assets/38a81722-a762-48ca-a8f6-d2826df20782" />

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

<img width="900" height="381" alt="key" src="https://github.com/user-attachments/assets/95b7a44c-4da2-4b9c-b017-c1b53c1d275a" />

<img width="912" height="578" alt="key2" src="https://github.com/user-attachments/assets/81f064d0-833f-4671-8b5c-d813acc4cea2" />


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

<img width="968" height="354" alt="usecallback" src="https://github.com/user-attachments/assets/d908986a-8661-439f-b368-d158b95fe16a" />

<img width="969" height="636" alt="usecallback2" src="https://github.com/user-attachments/assets/9d6cd11e-2b48-42ec-bf25-ea9d0c0791aa" />


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
