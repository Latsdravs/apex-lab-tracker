'use client'

import React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { Button } from './Button'

const AlertDialog = AlertDialogPrimitive.Root
const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AlertDialogPrimitive.Portal>
    <AlertDialogPrimitive.Overlay className='fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0' />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 grid w-full max-w-lg gap-4 border border-border bg-card p-6 shadow-lg duration-200 sm:rounded-radius ${className}`}
      {...props}
    >
      {children}
    </AlertDialogPrimitive.Content>
  </AlertDialogPrimitive.Portal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`flex flex-col space-y-2 text-center sm:text-left ${className}`}
    {...props}
  />
)
AlertDialogHeader.displayName = 'AlertDialogHeader'

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={`text-lg font-semibold text-foreground ${className}`}
    {...props}
  />
))
AlertDialogTitle.displayName = 'AlertDialogTitle'

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={`text-sm text-muted-foreground ${className}`}
    {...props}
  />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`}
    {...props}
  />
)
AlertDialogFooter.displayName = 'AlertDialogFooter'

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel ref={ref} asChild>
    <Button
      variant='outline'
      className={`bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground ${className}`}
      {...props}
    />
  </AlertDialogPrimitive.Cancel>
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action ref={ref} asChild>
    <Button
      className={`bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground ${className}`}
      {...props}
    />
  </AlertDialogPrimitive.Action>
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
