import { createContext, useState } from "react";
import {initilState } from "../constants";

export const store_data = createContext(null);

export default function Context({ children }) {
    const [store, setstore] = useState(initilState);
    
    return (
      <store_data.Provider value={{ store, setstore }}>
        {children}
      </store_data.Provider>
    );
  }