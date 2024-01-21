import React from 'react'
import { useState } from 'react';
import { createContext } from 'react';

const HistoryContext = createContext();

export function HistoryProvider({ children }) {
  const [domainHistory, setDomainHistory] = useState([]);

  function addToHistory(domain){
    setDomainHistory(prev => {
        return [domain, ...prev]
    })
  }
  function findLastPage(){
    let lastPage = '/'
    let running = true
    domainHistory.forEach(x => {
      const bool = x == "/SignIn" || x == "/Register"
      if(!bool && running){
        lastPage = x
        running = false
      }
    })
    return lastPage
  }
  return (
    <HistoryContext.Provider value={{ domainHistory, addToHistory, findLastPage }}>
      {children}
    </HistoryContext.Provider>
  )
}
export default HistoryContext

