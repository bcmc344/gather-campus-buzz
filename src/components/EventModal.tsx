
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, ExternalLink, MapPin, School } from 'lucide-react';
import { format } from 'date-fns';
import { Event } from '../types/event';

interface EventModalProps {
  event: Event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, open, onOpenChange }) => {
  if (!event) return null;

  const formattedDate = format(new Date(event.date), 'MMMM dd, yyyy - h:mm a');
  const formattedEndDate = event.endDate 
    ? format(new Date(event.endDate), 'MMMM dd, yyyy - h:mm a')
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{event.name}</DialogTitle>
          <div className="mt-2">
            <span className={`event-tag ${event.type}`}>
              {event.type.replace('-', ' ')}
            </span>
          </div>
          <DialogDescription className="mt-4">
            {event.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-2 space-y-4">
          {event.image && (
            <div className="w-full h-52 overflow-hidden rounded-md">
              <img 
                src={event.image} 
                alt={event.name} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="space-y-3 py-2">
            <div className="flex items-center text-sm">
              <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
              <div>
                <p><strong>Start:</strong> {formattedDate}</p>
                {formattedEndDate && <p><strong>End:</strong> {formattedEndDate}</p>}
              </div>
            </div>
            
            <div className="flex items-center text-sm">
              <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
              <p>{event.location}</p>
            </div>
            
            <div className="flex items-center text-sm">
              <School className="h-5 w-5 mr-3 text-muted-foreground" />
              <p>{event.college}</p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button asChild>
            <a href={event.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              View Event <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
