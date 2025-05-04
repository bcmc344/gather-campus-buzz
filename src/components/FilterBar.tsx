
import React, { useState } from 'react';
import { Search, Filter, Calendar as CalendarIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EventFilters } from '../types/event';

interface FilterBarProps {
  filters: EventFilters;
  onFilterChange: (filters: EventFilters) => void;
  collegeOptions: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange, collegeOptions }) => {
  const [searchInput, setSearchInput] = useState(filters.search);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({ ...filters, search: searchInput });
  };
  
  const handleTypeChange = (type: EventFilters['type']) => {
    onFilterChange({ ...filters, type });
  };
  
  const handleCollegeChange = (college: string) => {
    onFilterChange({ ...filters, college });
  };
  
  const handleDateFilterChange = (date: EventFilters['date']) => {
    onFilterChange({ ...filters, date });
  };
  
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm mb-6 animate-fade-in">
      <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchInput}
            onChange={handleSearchChange}
            className="pl-9"
          />
        </div>
        <Button type="submit">Search</Button>
      </form>
      
      <div className="flex flex-wrap gap-2 md:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4 mr-1" />
              Event Type: {filters.type === 'all' ? 'All' : filters.type}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Filter by type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handleTypeChange('all')}>
                All Types
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTypeChange('hackathon')}>
                Hackathon
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTypeChange('workshop')}>
                Workshop
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTypeChange('tech-talk')}>
                Tech Talk
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleTypeChange('career-fair')}>
                Career Fair
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4 mr-1" />
              When: {filters.date === 'all' ? 'All Dates' : filters.date}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Filter by date</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handleDateFilterChange('all')}>
                All Dates
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDateFilterChange('today')}>
                Today
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDateFilterChange('this-week')}>
                This Week
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDateFilterChange('this-month')}>
                This Month
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDateFilterChange('upcoming')}>
                Upcoming
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              College: {filters.college || 'All'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filter by college</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="max-h-64 overflow-y-auto">
              <DropdownMenuItem onClick={() => handleCollegeChange('')}>
                All Colleges
              </DropdownMenuItem>
              {collegeOptions.map((college) => (
                <DropdownMenuItem 
                  key={college} 
                  onClick={() => handleCollegeChange(college)}
                >
                  {college}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FilterBar;
