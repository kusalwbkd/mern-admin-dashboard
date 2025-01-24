import React from 'react'
import StatItem from './StatItem';
import { MdOutlineInventory2 } from 'react-icons/md';
import { FaClipboardList, FaRegUser } from 'react-icons/fa';
import { FcSalesPerformance } from 'react-icons/fc';
import { CgDanger } from "react-icons/cg";
const TotalStatsContainer = ({ defaultStats }) => {

  const stats = [
    {
      title: 'Number of Products',
      count: defaultStats?.totalProducts || 0,
      icon: <MdOutlineInventory2 />,
      color: '#6fd66a',
      bcg: '#b9f2b6'
    },
    {
      title: 'Number of Users',
      count: defaultStats?.numOfUsers || 0,
      icon: <FaRegUser />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'Items Sold',
      count: defaultStats?.total_Sale_items || 0,
      icon: <FcSalesPerformance />,
      color: '#f59e0b',
      bcg: '#fef3c7',
    },
    {
      title: 'Total Revenue',
      count: defaultStats?.price || 0,

      color: '#3017d1',

    },
    {
      title: 'Number of Orders',
      count: defaultStats?.numOfOrders || 0,
      icon: <FaClipboardList />,
      color: '#964B00',
      bcg: '#C4A484'

    },
    {
      title: 'Inventrory Out Items',
      count: defaultStats?.outOfInventoryItems || 0,
      icon: <CgDanger />,
      color: ' #FF0000',
      bcg: '#FF7F7F'

    },
  ];
  return (
    <section className='grid gap-x-8 md: grid-cols-2 lg:grid-cols-3 gap-y-8'>
      {stats.map((item) => {
        return <StatItem key={item.title} {...item} />;
      })}
    </section>
  )
}

export default TotalStatsContainer