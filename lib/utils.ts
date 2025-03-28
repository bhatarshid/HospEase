import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// Password validation with specific requirements
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const getImageSrc = (picture: any) => {
  if (!picture) {
    return '';
  }

  if (picture) {
    const buffer = Buffer.from(Object.values(picture).join(''));
    return `data:image/jpg;base64,${buffer.toString('base64')}`;
  }
  
  return '';
};

// Group timeslots by date
export const groupSlotsByDate = (slots: any[]) => {
  const groups: any = {};
  slots.forEach((slot: any) => {
    const dateStr = slot.startTime.toISOString().split('T')[0];
    if (!groups[dateStr]) {
      groups[dateStr] = [];
    }
    groups[dateStr].push({ id: slot.id, startTime: slot.startTime.toISOString() });
  });
  return groups;
};

// Function to format time in 12-hour format
export const formatTimeSlot = (dateTimeStr: string) => {
  const date = new Date(dateTimeStr);
  const startTime = date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  });

  return startTime
};

export const formatEndTimeSlot = (startTime: string) => {
  const date = new Date(startTime);
  const endDate = new Date(date.getTime() + 30 * 60000);
  const endTime = endDate.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  });

  return endTime
}

// Format date for display
export const formatDate = (dateTimeStr: string) => {
  const date = new Date(dateTimeStr);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};