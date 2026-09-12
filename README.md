# Digital Wallet Web App

A single-page digital wallet application that allows users to manage a balance, perform deposits/withdrawals, and view a persistent transaction history.

## Engineering Evolution
1. **Vanilla JavaScript (Initial Build):** Originally built using pure DOM manipulation (`document.getElementById`, `addEventListener`) and manual state tracking to understand core browser APIs.
2. **React Refactor:** Refactored to use React (via CDN) to leverage component-based architecture. Replaced manual DOM updates with `useState` for balance/transaction state, and `useEffect` to automatically sync state with `localStorage` (using `JSON.stringify` and `JSON.parse`).

## Features
- Input validation (prevents negative numbers and insufficient funds).
- Persistent state using browser `localStorage`.
- Color-coded transaction history (Green for Inflow, Red for Outflow).
