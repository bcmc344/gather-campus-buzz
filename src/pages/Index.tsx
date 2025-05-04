
import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import EventCard from '@/components/EventCard';
import FilterBar from '@/components/FilterBar';
import EventModal from '@/components/EventModal';
import EventForm from '@/components/EventForm';
import { mockEvents } from '@/data/mockEvents';
import { Event, EventFilters, EventType } from '@/types/event';
import { addDays, isAfter, isBefore, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

const Index = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<EventFilters>({
    search: '',
    type: 'all',
    college: '',
    date: 'upcoming',
  });
  
  // Extract unique college names for filter dropdown
  const collegeOptions = useMemo(() => {
    return [...new Set(events.map(event => event.college))].sort();
  }, [events]);
  
  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };
  
  const handleAddEvent = () => {
    setIsFormOpen(true);
  };
  
  const handleFormSubmit = (newEvent: Omit<Event, 'id'>) => {
    const id = `event-${Date.now()}`;
    const eventWithId: Event = { id, ...newEvent };
    setEvents(prev => [eventWithId, ...prev]);
  };
  
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // Search filter
      if (filters.search && !event.name.toLowerCase().includes(filters.search.toLowerCase()) && 
          !event.description.toLowerCase().includes(filters.search.toLowerCase()) &&
          !event.college.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Event type filter
      if (filters.type !== 'all' && event.type !== filters.type) {
        return false;
      }
      
      // College filter
      if (filters.college && event.college !== filters.college) {
        return false;
      }
      
      // Date filter
      const eventDate = new Date(event.date);
      const today = new Date();
      
      if (filters.date === 'today') {
        return isAfter(eventDate, startOfDay(today)) && isBefore(eventDate, endOfDay(today));
      } else if (filters.date === 'this-week') {
        return isAfter(eventDate, startOfWeek(today)) && isBefore(eventDate, endOfWeek(today));
      } else if (filters.date === 'this-month') {
        return isAfter(eventDate, startOfMonth(today)) && isBefore(eventDate, endOfMonth(today));
      } else if (filters.date === 'upcoming') {
        return isAfter(eventDate, today);
      }
      
      // If date filter is 'all' or any other value, don't filter by date
      return true;
    });
  }, [events, filters]);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar onAddEvent={handleAddEvent} />
      
      <main className="container py-6 px-4 md:px-0">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Campus Events</h1>
          <p className="text-muted-foreground">
            Discover tech talks, hackathons, workshops, and more from colleges across the country.
          </p>
        </header>
        
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          collegeOptions={collegeOptions}
        />
        
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onClick={handleEventClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-lg font-medium mb-2">No events found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or add a new event.
            </p>
          </div>
        )}
      </main>
      
      <EventModal
        event={selectedEvent}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
      
      <EventForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default Index;
