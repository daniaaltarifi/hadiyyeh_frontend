import React from 'react'
import Products from '../Products';
import { useThemeHook } from '../../GlobalComponents/ThemeProvider';

function AllFragrance() {
    const [theme] = useThemeHook();
    return (
      <>
        <div className="all-bag-container ">
  
        <h3 className={theme? 'text-light we_help_you_home d-flex justify-content-center m-5': 'text-black we_help_you_home d-flex justify-content-center m-5'}>FRAGRANCES</h3>
          <Products />
        </div>
      </>
  )
}

export default AllFragrance