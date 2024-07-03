import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from 'recharts';
import { formatPrice } from '../utils';


const AreaChartComponent = ({ data }) => {

  return (
    <ResponsiveContainer width='100%' height={300}>
     
     <LineChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Line type='monotone' dataKey='sales' stroke='#2cb1bc' fill='#bef8fd' />
      </LineChart>
    </ResponsiveContainer>
    
  );
};

export default AreaChartComponent;