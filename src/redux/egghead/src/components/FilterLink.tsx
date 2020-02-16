import React from 'react';
import { NavLink as Link } from 'react-router-dom';

interface FilterLinkProps {
  children: string;
  filter: string;
}

const FilterLink: React.FC<FilterLinkProps> = ({ children, filter }: FilterLinkProps) => (
  <Link
    activeStyle={{ color: 'black', cursor: 'default', textDecoration: 'none' }}
    exact to={filter === 'all' ? '' : filter}
  >
    {children}
  </Link>
);

export default FilterLink;
