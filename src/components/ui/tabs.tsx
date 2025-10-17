import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      // Modern minimalist flat design - completely remove container effects
      "flex w-full justify-center gap-1 overflow-x-auto p-0 m-0",
      // Remove all shadows and borders
      "[--tw-ring-color:transparent] [--tw-ring-offset-color:transparent]",
      "[--tw-ring-offset-shadow:none] [--tw-ring-shadow:none]", 
      "[--tw-shadow:none] [--tw-shadow-colored:none] [--tw-drop-shadow:none]",
      "border-0 border-transparent bg-transparent",
      className,
    )}
    style={{
      // Additional CSS custom properties for complete shadow removal
      '--tw-ring-color': 'transparent',
      '--tw-ring-offset-color': 'transparent',
      '--tw-ring-offset-shadow': 'none',
      '--tw-ring-shadow': 'none',
      '--tw-shadow': 'none',
      '--tw-shadow-colored': 'none',
      '--tw-drop-shadow': 'none',
      '--tw-border-spacing-x': '0',
      '--tw-border-spacing-y': '0',
    } as React.CSSProperties}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // Clean minimalist trigger design - flat and borderless
      "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium",
      // Smooth transitions for professional feel
      "transition-all duration-200 ease-in-out", 
      // Remove all shadow and ring effects
      "[--tw-ring-color:transparent] [--tw-ring-offset-color:transparent]",
      "[--tw-ring-offset-shadow:none] [--tw-ring-shadow:none]",
      "[--tw-shadow:none] [--tw-shadow-colored:none] [--tw-drop-shadow:none]",
      "border-0 border-transparent bg-transparent",
      // Active state: subtle background, no shadows
      "data-[state=active]:bg-neutral-100 data-[state=active]:text-neutral-900",
      "dark:data-[state=active]:bg-neutral-800 dark:data-[state=active]:text-neutral-100",
      // Focus state: clean outline without rings
      "focus-visible:outline-none focus-visible:bg-neutral-50",
      "dark:focus-visible:bg-neutral-900",
      // Disabled state
      "disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    style={{
      // Enforce shadow removal at the style level
      '--tw-ring-color': 'transparent',
      '--tw-ring-offset-color': 'transparent', 
      '--tw-ring-offset-shadow': 'none',
      '--tw-ring-shadow': 'none',
      '--tw-shadow': 'none',
      '--tw-shadow-colored': 'none',
      '--tw-drop-shadow': 'none',
      borderWidth: '0',
      borderColor: 'transparent',
      boxShadow: 'none',
    } as React.CSSProperties}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
