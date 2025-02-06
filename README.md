# React IFrame Portal with Tailwind CSS and shadcn/ui

A reverse-engineered implementation inspired by Anthropic's Claude Artifacts and Vercel's v0.dev blocks. This project demonstrates how these platforms achieve their isolated, interactive blocks using iframe manipulation with React Portals, styled with Tailwind CSS and enhanced with shadcn/ui components.

The implementation showcases the technical approach behind these platforms' ability to create dynamic, sandboxed UI components while maintaining consistent styling and interactivity across different contexts.

## Demo

![Demo of React IFrame Portal](/demo.gif)

## Features

- **React Portal Integration**: Seamlessly render components inside iframes using React Portals
- **Tailwind CSS Support**: Full Tailwind CSS styling capabilities within iframes
- **shadcn/ui Components**: Beautiful, accessible components that work flawlessly in iframe contexts
- **Dynamic Content Rendering**: Flexible content management within iframes
- **Responsive Design**: Fully responsive layouts that adapt to different iframe sizes

## Technical Overview

### Core Technologies
- Next.js 14+
- React Portal for iframe content rendering
- Tailwind CSS for styling
- shadcn/ui component library
- TypeScript for type safety

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── components/         # React components including iframe implementations
├── app/                # Next.js app directory
├── lib/                # Utility functions and helpers
└── styles/             # Global styles and Tailwind configuration
```

## Implementation Details

### IFrame Portal Implementation

The project uses React Portals to render content inside iframes, allowing for:
- Seamless state management between parent and iframe content
- Consistent styling using Tailwind CSS
- Event handling across iframe boundaries

### Styling with Tailwind CSS

Tailwind CSS is configured to work both in the main application and within iframes:
- Consistent design system across all contexts
- Utility-first CSS approach
- Custom theme configuration

### shadcn/ui Components

The project leverages shadcn/ui components for:
- Consistent UI elements across the application
- Accessible and customizable components
- Modern design patterns

## Usage Example

```jsx
import { CustomFrame } from '@/components/CustomFrame';

function MyComponent() {
  return (
    <CustomFrame>
      {/* Your content to be rendered in iframe */}
      <div className="p-4 bg-white">
        <h1 className="text-2xl font-bold">IFrame Content</h1>
      </div>
    </CustomFrame>
  );
}
```
