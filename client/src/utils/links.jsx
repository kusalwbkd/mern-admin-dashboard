import React from 'react';

import { IoBarChartSharp } from 'react-icons/io5';
import { MdOutlineReviews, MdQueryStats } from 'react-icons/md';
import { FaProductHunt, FaShoppingCart, FaUsers, FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { MdAdminPanelSettings } from 'react-icons/md';

const links = [
  { text: 'add product', path: '.', icon: <FaWpforms /> },
  { text: 'all products', path: 'all-products', icon: <FaProductHunt /> },
  { text: 'orders', path: 'orders', icon:<FaShoppingCart /> },
 
  { text: 'stats', path: 'stats', icon: <IoBarChartSharp /> },
 
  { text: 'users', path: 'users', icon: <FaUsers/> },
];

export default links;

