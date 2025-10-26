import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CalendarProps {
  onSelectDate?: (date: Date | undefined) => void;
  selectedDate?: Date;
  className?: string;
  calendarId?: string;
}

export function CalendarComponent({
  onSelectDate,
  selectedDate,
  className,
  calendarId = "zz08011230de9f7af37169de9dbf574e3b7645706b02352eb08a17c13b60aab14fa1ecb5cda8c6b0b8df5e7960b4b7ff3d69be4a81"
}: CalendarProps) {
  const [date, setDate] = useState<Date | undefined>(selectedDate);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onSelectDate?.(selectedDate);
    setIsOpen(false);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
          />
          {calendarId && (
            <div className="border-t p-3 text-xs text-muted-foreground">
              Calendar ID: {calendarId.substring(0, 8)}...
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}