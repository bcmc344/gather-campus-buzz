
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { format } from 'date-fns';
import { Calendar, MapPin } from 'lucide-react';
import { Event } from '../types/event';

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const formattedDate = format(new Date(event.date), 'MMM dd, yyyy');
  const displayImage = event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1470&auto=format&fit=crop';
  
  return (
    <Card 
      className="event-card cursor-pointer overflow-hidden flex flex-col h-full"
      onClick={() => onClick(event)}
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={displayImage} 
          alt={event.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`event-tag ${event.type}`}>
            {event.type.replace('-', ' ')}
          </span>
        </div>
      </div>
      
      <CardContent className="pt-4 flex-grow">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{event.name}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{event.description}</p>
        
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{formattedDate}</span>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="truncate">{event.location}</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 pb-4 px-6">
        <div className="w-full text-sm font-medium text-muted-foreground bg-muted rounded-full px-3 py-1 text-center">
          {event.college}
        </div>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
