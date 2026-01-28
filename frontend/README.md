# Frontend MVP - Employee Onboarding Workflow

This is the frontend MVP for the Automated Employee Onboarding Workflow system, built with Next.js 14+, TypeScript, and Tailwind CSS.

## Technology Stack

- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for accessible components
- **Zustand** for state management
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Main chat interface
│   ├── onboarding/        # Onboarding dashboard page
│   ├── api/               # API routes (stubs)
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── chat/              # Chat interface components
│   ├── onboarding/        # Onboarding components
│   └── placeholders/      # Future feature placeholders
├── lib/                   # Utilities and types
├── store/                 # Zustand stores
└── public/                # Static assets
```

## MVP Features

### ✅ Implemented

- Chat interface with mock agent responses
- Onboarding status dashboard with placeholder data
- Document upload UI (visual only, no backend connection)
- Responsive design for mobile/tablet/desktop
- Component library with shadcn/ui
- TypeScript throughout
- Zustand state management

### ⏳ Deferred to Future Phases

- Backend integration (CrewAI connection)
- Real document upload functionality
- Real-time status updates
- Advanced dashboard with analytics
- User preferences and settings
- Multi-language support

## Development Notes

### Backend Integration

The frontend is prepared for backend integration but not connected in MVP:
- API route stub at `app/api/chat/route.ts`
- Mock data and responses for development
- Type definitions ready for API contracts

### Accessibility

Components are built with accessibility in mind:
- ARIA labels where appropriate
- Keyboard navigation support
- Semantic HTML structure
- Focus management

### Styling

- Tailwind CSS utility classes
- Design tokens defined in `tailwind.config.ts`
- Responsive breakpoints: mobile (<640px), tablet (640-1024px), desktop (>1024px)

## Next Steps

1. **Backend Implementation** - Connect CrewAI agents
2. **API Integration** - Wire up chat endpoint
3. **Testing** - Add unit and integration tests
4. **Documentation** - Expand component documentation

## References

- [Frontend Development Plan](../project-context/2.build/frontend.md)
- [Product Requirements Document](../project-context/1.define/prd.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
