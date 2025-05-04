
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface NavbarProps {
  onAddEvent: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAddEvent }) => {
  return (
    <nav className="w-full bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Campus Buzz
        </h1>
        <span className="text-muted-foreground text-sm md:text-base">College Event Aggregator</span>
      </div>
      <Button onClick={onAddEvent} className="flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        <span className="hidden md:inline">Add Event</span>
      </Button>
    </nav>
  );
};

export default Navbar;
