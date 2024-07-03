import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import { MdOutlineInventory2, MdReviews } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
import StatItem from './StatItem';
import { TfiMoney } from "react-icons/tfi";
const StatsContainer = ({ defaultStats }) => {
  

  const stats = [
    {
      title: 'Inventory Items',
      count: defaultStats?.inventory || 0,
      icon: <MdOutlineInventory2 />,
        color: '#6fd66a',
          bcg: '#b9f2b6'
    },
    {
      title: 'Product reviews',
      count: defaultStats?.reviewsCount || 0,
      icon: <MdReviews /> ,
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
  ];
  return (
    <section className='grid gap-x-8 md: grid-cols-2 lg:grid-cols-4 gap-y-8'>
      {stats.map((item) => {
        return <StatItem key={item.title} {...item} />;
      })}
    </section>
  );
};
export default StatsContainer;