import React, { useState } from 'react'
import BarChartComponent from './BarChartComponent';
import AreaChartComponent from './AreaChartComponent';


const ChartsContainer = ({monthlyItemSales,monthlySalesCost}) => {
  const [countChart, setCountChart] = useState(true);

  return (
    <section className=' mt-16 text-center'>
      <h4 className=' text-center mb-3'> Monthly Sales and Count Charts</h4>
      <button type='button' className=' bg-transparent border-transparent capitalize text-emerald-500 text-xl cursor-pointer' onClick={() => setCountChart(!countChart)}>
        {countChart ? 'Sales Chart' : 'Count Chart'}
      </button>
      {countChart ? <BarChartComponent data={monthlyItemSales} /> : <AreaChartComponent data={monthlySalesCost} />}
    </section>
  )
}

export default ChartsContainer