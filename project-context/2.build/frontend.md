# Frontend MVP Development Plan

**Document Version:** 1.0  
**Date:** 2025-01-27  
**Status:** Phase 1 - Planning  
**Persona:** Frontend Developer (@frontend-eng)  
**Epic:** Frontend MVP Development

---

## 1. Executive Summary

### Purpose
This document outlines the frontend development plan for the Automated Employee Onboarding Workflow MVP. The frontend will provide a modern, accessible chat interface for new employees and HR teams to interact with the multi-agent onboarding system.

### Scope
**MVP Features (Phase 1):**
- Chat interface for conversational interaction with onboarding agents
- Real-time streaming responses from CrewAI agents
- Document upload interface (visual only, no backend connection)
- Onboarding status display (placeholder data)
- Responsive design for desktop and mobile
- Basic accessibility compliance (WCAG 2.1 AA)

**Deferred to Future Phases:**
- Full dashboard with analytics
- Advanced document management UI
- Real-time notifications system
- Multi-language support
- Advanced user preferences

### PRD Traceability
- **PRD Section 4:** Functional Requirements - Feature 5 (Onboarding Workflow Orchestration)
- **PRD Section 6:** User Experience Design - Interface Requirements
- **PRD Section 8:** Implementation Strategy - Phase 1 (MVP) - Basic User Interface

---

## 2. Technology Stack

### Core Framework
- **Next.js 14+** with App Router
  - Server Components for optimal performance
  - App Router for modern routing patterns
  - API Routes for backend integration (prepared, not connected in MVP)

### UI Libraries
- **assistant-ui** - Production-grade LLM chat interface
  - Streaming message handling
  - Tool component support
  - Built-in accessibility features
- **shadcn/ui** - Component library
  - Accessible, customizable components
  - Tailwind CSS based
  - TypeScript support

### Styling & Design
- **Tailwind CSS** - Utility-first CSS framework
  - Rapid development
  - Consistent design system
  - Responsive utilities
- **CSS Variables** - For theming and customization

### Type Safety & State Management
- **TypeScript** - End-to-end type safety
  - Strict mode enabled
  - Type definitions for all API contracts
- **Zustand** - Lightweight state management
  - Client-side state for UI interactions
  - Minimal boilerplate

### Development Tools
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **React DevTools** - Development debugging

---

## 3. Application Structure

### Directory Structure
```
frontend/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Main chat interface page
│   ├── api/                    # API routes (prepared, not connected)
│   │   └── chat/
│   │       └── route.ts        # CrewAI integration endpoint (stub)
│   └── globals.css             # Global styles and Tailwind imports
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── chat/                   # Chat-specific components
│   │   ├── ChatInterface.tsx   # Main chat container
│   │   ├── MessageList.tsx     # Message display component
│   │   ├── InputArea.tsx       # Message input component
│   │   └── AgentStatus.tsx     # Agent status indicator
│   ├── onboarding/             # Onboarding-specific components
│   │   ├── DocumentUpload.tsx  # Document upload UI (visual only)
│   │   ├── StatusCard.tsx      # Onboarding status display
│   │   └── ProgressIndicator.tsx # Progress visualization
│   └── placeholders/           # Future feature placeholders
│       ├── DashboardPlaceholder.tsx
│       ├── AnalyticsPlaceholder.tsx
│       └── SettingsPlaceholder.tsx
├── lib/
│   ├── utils.ts                # Utility functions
│   ├── types.ts                # TypeScript type definitions
│   └── constants.ts            # Application constants
├── hooks/                      # Custom React hooks
│   ├── useChat.ts              # Chat state management
│   └── useStreaming.ts         # Streaming response handling
├── store/                      # Zustand stores
│   └── chatStore.ts            # Chat state store
└── public/                     # Static assets
    ├── images/
    └── icons/
```

### Page Organization
- **`/`** - Main chat interface (default route)
- **`/onboarding`** - Onboarding status page (placeholder)
- **`/dashboard`** - Analytics dashboard (placeholder, future)

---

## 4. MVP Component Specifications

### 4.1 Chat Interface Components

#### ChatInterface.tsx
**Purpose:** Main container for the chat interface  
**Features:**
- Integrates assistant-ui for LLM interaction
- Handles streaming responses
- Manages conversation state
- Displays agent status indicators
- Responsive layout (mobile/desktop)

**Props:**
```typescript
interface ChatInterfaceProps {
  initialMessages?: Message[];
  onMessageSent?: (message: string) => void;
}
```

**State Management:**
- Uses Zustand store for message history
- Local state for input and loading states

#### MessageList.tsx
**Purpose:** Displays conversation messages  
**Features:**
- Renders user and agent messages
- Shows typing indicators during streaming
- Displays tool execution results
- Scrolls to latest message automatically
- Accessible message structure (ARIA labels)

**Message Types:**
- User messages (text input)
- Agent messages (streaming text)
- Tool execution results
- System notifications

#### InputArea.tsx
**Purpose:** Message input and submission  
**Features:**
- Text input with character limit
- Send button (keyboard and mouse accessible)
- File upload button (visual only, disabled)
- Enter key to send
- Loading state during submission
- Input validation

**Accessibility:**
- ARIA labels for screen readers
- Keyboard navigation support
- Focus management

#### AgentStatus.tsx
**Purpose:** Displays current agent status  
**Features:**
- Shows active agent name
- Agent activity indicator
- Connection status (prepared for backend)
- Visual status badges

**Status Types:**
- Idle
- Processing
- Waiting for input
- Error state

### 4.2 Onboarding Components

#### DocumentUpload.tsx
**Purpose:** Visual interface for document upload (MVP: visual only)  
**Features:**
- Drag-and-drop area (visual only)
- File type indicators
- Upload progress display (mock)
- Document list preview
- Clear visual indication that upload is disabled

**Visual States:**
- Empty state with instructions
- File selected state
- Uploading state (mock animation)
- Success state (mock)

**Note:** No actual file upload functionality in MVP. Component displays UI only.

#### StatusCard.tsx
**Purpose:** Displays onboarding progress  
**Features:**
- Progress percentage display
- Task checklist (placeholder data)
- Status indicators for each task
- Visual progress bar
- Last updated timestamp

**Placeholder Data:**
- Mock onboarding tasks
- Mock completion status
- Mock timestamps

#### ProgressIndicator.tsx
**Purpose:** Visual progress representation  
**Features:**
- Circular or linear progress indicator
- Percentage display
- Color-coded status (pending/in-progress/complete)
- Animation for progress updates

### 4.3 Placeholder Components

#### DashboardPlaceholder.tsx
**Purpose:** Visual placeholder for future dashboard  
**Features:**
- "Coming Soon" message
- Visual mockup of dashboard layout
- Feature list of planned capabilities
- Link to documentation

#### AnalyticsPlaceholder.tsx
**Purpose:** Visual placeholder for analytics  
**Features:**
- Mock chart visualizations
- Placeholder metrics
- "Feature in development" indicator

#### SettingsPlaceholder.tsx
**Purpose:** Visual placeholder for settings  
**Features:**
- Settings categories list
- "Feature in development" indicator

---

## 5. assistant-ui Integration

### Configuration
```typescript
import { AssistantRuntimeProvider, useAssistantRuntime } from '@assistant-ui/react';

// Configure assistant-ui with CrewAI backend
const runtime = useAssistantRuntime({
  adapter: {
    // Prepared for CrewAI streaming adapter
    // Not connected in MVP
  },
});
```

### Custom Tool Components
**Purpose:** Display agent tool execution results  
**Components:**
- `DocumentVerificationTool.tsx` - Display document verification results
- `ITProvisioningTool.tsx` - Display IT provisioning status
- `TrainingAssignmentTool.tsx` - Display training assignments
- `StakeholderNotificationTool.tsx` - Display notification confirmations

**Note:** Tool components prepared but use mock data in MVP.

### Streaming Configuration
- Enable streaming for real-time responses
- Handle partial message updates
- Display typing indicators
- Error handling for stream interruptions

---

## 6. Styling & Design System

### Design Tokens
**Colors:**
- Primary: Blue (#3B82F6)
- Secondary: Gray (#6B7280)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Error: Red (#EF4444)
- Background: White/Light Gray
- Text: Dark Gray (#111827)

**Typography:**
- Font Family: System fonts (Inter preferred)
- Heading Sizes: 2xl, xl, lg, base
- Body: base (16px)
- Line Height: 1.5-1.75

**Spacing:**
- Base unit: 4px
- Scale: 4, 8, 12, 16, 24, 32, 48, 64px

**Border Radius:**
- Small: 4px
- Medium: 8px
- Large: 12px
- Full: 9999px

### Component Styles
- Consistent button styles (primary, secondary, ghost)
- Input field styling with focus states
- Card components with shadow and border
- Responsive grid layouts
- Mobile-first breakpoints

### Responsive Design
**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Mobile Optimizations:**
- Touch-friendly button sizes (min 44x44px)
- Full-width inputs on mobile
- Collapsible navigation
- Optimized chat interface for small screens

---

## 7. Accessibility Requirements

### WCAG 2.1 AA Compliance
**Perceivable:**
- Color contrast ratio minimum 4.5:1 for text
- Text alternatives for images
- Captions for audio/video (if applicable)

**Operable:**
- Keyboard navigation for all interactive elements
- No keyboard traps
- Focus indicators visible
- Sufficient time for interactions

**Understandable:**
- Clear labels and instructions
- Error messages are descriptive
- Consistent navigation patterns
- Language of page declared

**Robust:**
- Valid HTML markup
- ARIA labels where needed
- Screen reader compatibility
- Semantic HTML structure

### Implementation Checklist
- [ ] All interactive elements keyboard accessible
- [ ] ARIA labels on form inputs
- [ ] Focus management in modals/dialogs
- [ ] Skip navigation links
- [ ] Alt text for images
- [ ] Color not sole indicator of status
- [ ] Screen reader testing completed

---

## 8. Implementation Steps

### Phase 1.1: Project Setup (Week 1)
1. **Initialize Next.js Project**
   - Create Next.js 14+ project with TypeScript
   - Configure Tailwind CSS
   - Set up ESLint and Prettier
   - Configure path aliases

2. **Install Dependencies**
   - assistant-ui packages
   - shadcn/ui components
   - Zustand for state management
   - Additional UI libraries as needed

3. **Project Structure**
   - Create directory structure
   - Set up component folders
   - Configure TypeScript paths
   - Set up environment variables (prepared)

### Phase 1.2: Core Chat Interface (Week 2)
1. **Chat Components**
   - Implement ChatInterface component
   - Create MessageList component
   - Build InputArea component
   - Add AgentStatus component

2. **assistant-ui Integration**
   - Configure assistant-ui runtime
   - Set up streaming adapter (mock)
   - Implement message handling
   - Add tool component placeholders

3. **State Management**
   - Set up Zustand store
   - Implement message state
   - Add loading/error states
   - Create custom hooks

### Phase 1.3: Onboarding Components (Week 3)
1. **Document Upload UI**
   - Create DocumentUpload component
   - Add drag-and-drop visual (disabled)
   - Implement file list display
   - Add mock upload states

2. **Status Components**
   - Build StatusCard component
   - Create ProgressIndicator component
   - Add placeholder data structure
   - Implement visual states

3. **Layout Integration**
   - Integrate components into main layout
   - Add navigation structure
   - Implement responsive layouts

### Phase 1.4: Styling & Polish (Week 4)
1. **Design System Implementation**
   - Apply design tokens
   - Style all components consistently
   - Add hover/focus states
   - Implement animations

2. **Responsive Design**
   - Mobile optimization
   - Tablet layout adjustments
   - Desktop enhancements
   - Cross-browser testing

3. **Accessibility**
   - Add ARIA labels
   - Implement keyboard navigation
   - Test with screen readers
   - Fix accessibility issues

### Phase 1.5: Placeholders & Documentation (Week 5)
1. **Placeholder Components**
   - Create DashboardPlaceholder
   - Build AnalyticsPlaceholder
   - Add SettingsPlaceholder
   - Link to future features

2. **Documentation**
   - Component documentation
   - Usage examples
   - Development guidelines
   - Accessibility notes

3. **Testing & Validation**
   - Visual regression testing
   - Accessibility audit
   - Cross-browser testing
   - Performance optimization

---

## 9. Type Definitions

### Core Types
```typescript
// Message types
interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  toolCalls?: ToolCall[];
}

interface ToolCall {
  id: string;
  name: string;
  arguments: Record<string, any>;
  result?: any;
}

// Onboarding types
interface OnboardingStatus {
  employeeId: string;
  progress: number;
  tasks: OnboardingTask[];
  lastUpdated: Date;
}

interface OnboardingTask {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'complete' | 'error';
  category: 'documents' | 'it' | 'training' | 'coordination';
  dueDate?: Date;
}

// Agent types
interface AgentStatus {
  agentId: string;
  name: string;
  status: 'idle' | 'processing' | 'waiting' | 'error';
  currentTask?: string;
}
```

---

## 10. Mock Data & Placeholders

### Mock Onboarding Data
```typescript
const mockOnboardingStatus: OnboardingStatus = {
  employeeId: 'EMP-001',
  progress: 45,
  tasks: [
    {
      id: 'task-1',
      name: 'Complete I-9 Form',
      status: 'complete',
      category: 'documents',
      dueDate: new Date('2025-02-01'),
    },
    {
      id: 'task-2',
      name: 'Submit W-4 Form',
      status: 'in-progress',
      category: 'documents',
      dueDate: new Date('2025-02-01'),
    },
    {
      id: 'task-3',
      name: 'IT Access Provisioning',
      status: 'pending',
      category: 'it',
      dueDate: new Date('2025-02-05'),
    },
    // ... more tasks
  ],
  lastUpdated: new Date(),
};
```

### Mock Agent Responses
- Predefined responses for common queries
- Mock tool execution results
- Simulated streaming behavior
- Error state examples

---

## 11. Testing Strategy

### Unit Testing
- Component rendering tests
- Hook testing
- Utility function tests
- Type validation

### Integration Testing
- Component interaction tests
- State management tests
- Form submission tests
- Navigation tests

### E2E Testing (Prepared)
- User flow tests (prepared, not implemented in MVP)
- Chat interaction tests
- Document upload flow (visual only)

### Accessibility Testing
- Screen reader testing
- Keyboard navigation testing
- Color contrast validation
- ARIA label verification

### Visual Regression Testing
- Component snapshot tests
- Responsive layout tests
- Cross-browser visual tests

---

## 12. Performance Considerations

### Optimization Strategies
- Code splitting for routes
- Lazy loading for heavy components
- Image optimization
- Font optimization
- CSS purging (Tailwind)

### Performance Targets
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

### Monitoring (Prepared)
- Performance metrics collection (prepared)
- Error tracking setup (prepared)
- Analytics integration (prepared)

---

## 13. Future Enhancements (Post-MVP)

### Phase 2 Features
- Real backend integration
- Actual document upload functionality
- Real-time status updates
- Advanced dashboard with analytics
- User preferences and settings
- Multi-language support

### Phase 3 Features
- Advanced analytics visualization
- Customizable workflows
- Mobile app (React Native)
- Offline support (PWA)
- Advanced accessibility features

---

## 14. Assumptions

1. **Backend Integration:** Frontend prepared for backend connection but not connected in MVP
2. **API Contracts:** API endpoint structure assumed based on PRD requirements
3. **Design System:** shadcn/ui and Tailwind provide sufficient component coverage
4. **Browser Support:** Modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)
5. **Accessibility:** WCAG 2.1 AA compliance sufficient for MVP
6. **Performance:** Client-side performance targets achievable with Next.js optimizations

---

## 15. Open Questions

1. **Specific Design Mockups:** Are there design mockups or style guide references?
2. **Brand Colors:** What are the exact brand colors and design tokens?
3. **Content:** Who provides copy and content for UI elements?
4. **Analytics:** What analytics events need to be tracked in MVP?
5. **Error Handling:** What are the specific error messages and handling patterns?
6. **Loading States:** What are the expected loading time ranges for different operations?

---

## 16. Dependencies & Prerequisites

### Required Before Development
- [ ] Next.js project initialized
- [ ] Design system/tokens defined
- [ ] API contract specifications (for future integration)
- [ ] Content/copy provided
- [ ] Accessibility requirements finalized

### External Dependencies
- assistant-ui package availability and stability
- shadcn/ui component compatibility
- Next.js 14+ App Router stability
- TypeScript version compatibility

---

## 17. Risk Mitigation

### Technical Risks
1. **assistant-ui Integration Complexity**
   - **Risk:** Integration challenges with CrewAI backend
   - **Mitigation:** Use mock adapter in MVP, prepare adapter structure

2. **Performance Issues**
   - **Risk:** Streaming performance on low-end devices
   - **Mitigation:** Optimize rendering, implement virtualization if needed

3. **Accessibility Compliance**
   - **Risk:** Missing WCAG requirements
   - **Mitigation:** Early accessibility testing, use accessible component libraries

### Scope Risks
1. **Feature Creep**
   - **Risk:** Adding non-MVP features
   - **Mitigation:** Strict adherence to MVP scope, use placeholders for future features

2. **Backend Dependency**
   - **Risk:** Frontend blocked by backend delays
   - **Mitigation:** Mock data and API structure, independent development

---

## 18. Success Criteria

### MVP Completion Criteria
- [ ] Chat interface fully functional with mock data
- [ ] All MVP components implemented and styled
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] WCAG 2.1 AA compliance achieved
- [ ] Performance targets met
- [ ] Code quality standards met (ESLint, TypeScript)
- [ ] Documentation complete
- [ ] Placeholder components for future features created

### Quality Gates
- All components render without errors
- No accessibility violations (automated testing)
- Performance metrics within targets
- Cross-browser compatibility verified
- Code review completed

---

## 19. Traceability Matrix

| PRD Requirement | Frontend Component | Status |
|----------------|-------------------|--------|
| PRD 4.1 - Document Collection UI | DocumentUpload.tsx | MVP: Visual Only |
| PRD 4.2 - IT Provisioning Status | StatusCard.tsx | MVP: Placeholder |
| PRD 4.3 - Training Assignment Display | StatusCard.tsx | MVP: Placeholder |
| PRD 4.4 - Stakeholder Communication | ChatInterface.tsx | MVP: Chat Interface |
| PRD 4.5 - Workflow Orchestration UI | ChatInterface.tsx | MVP: Chat Interface |
| PRD 6.1 - Web Portal | Next.js App | MVP: Chat Interface |
| PRD 6.2 - Responsive Design | Tailwind Responsive | MVP: Implemented |
| PRD 6.3 - Accessibility | WCAG 2.1 AA | MVP: Target |
| PRD 8.1 - Basic User Interface | All Components | MVP: Implemented |

---

## 20. Audit

**Timestamp:** 2025-01-27  
**Persona ID:** frontend-eng  
**Action:** Frontend MVP Development Plan Generation & Implementation  
**Model:** GPT-4  
**Temperature:** 0.3  
**Artifact:** project-context/2.build/frontend.md  
**Status:** Complete - Implementation Finished  
**PRD Reference:** project-context/1.define/prd.md  
**Branch:** phase-1-frontend-mvp

**Key Decisions:**
- Selected Next.js 14+ with App Router for modern React patterns
- Implemented shadcn/ui + Tailwind for rapid, accessible component development
- MVP scope limited to chat interface with visual placeholders
- Prepared for backend integration without connecting in MVP
- Focused on accessibility (WCAG 2.1 AA) from the start
- Used Zustand for lightweight state management

**Implementation Status:** ✅ Complete

**Completed Components:**
1. ✅ Project structure initialized (Next.js 14+, TypeScript, Tailwind)
2. ✅ UI component library (Button, Input, Card from shadcn/ui)
3. ✅ Chat interface components:
   - ChatInterface.tsx - Main chat container
   - MessageList.tsx - Message display
   - InputArea.tsx - Message input with send functionality
   - AgentStatus.tsx - Agent status indicator
4. ✅ Onboarding components:
   - DocumentUpload.tsx - Visual upload interface (disabled in MVP)
   - StatusCard.tsx - Onboarding progress display
   - ProgressIndicator.tsx - Progress visualization
5. ✅ Placeholder components:
   - DashboardPlaceholder.tsx
   - AnalyticsPlaceholder.tsx
   - SettingsPlaceholder.tsx
6. ✅ State management (Zustand store)
7. ✅ Type definitions and mock data
8. ✅ App pages (main chat, onboarding dashboard)
9. ✅ API route stub (prepared for backend integration)

**Files Created:**
- `frontend/` - Complete Next.js project structure
- All components, pages, and configuration files as specified in plan

**Next Steps:**
1. Install dependencies: `cd frontend && npm install`
2. Run development server: `npm run dev`
3. Test components and UI interactions
4. Proceed to backend implementation phase
5. Connect frontend to CrewAI backend in integration phase

---

## Sources

- **PRD:** project-context/1.define/prd.md
- **Frontend Engineer Agent:** .cursor/agents/frontend-eng.md
- **SAD Template:** .cursor/templates/sad-template.md
- **AAMAD Core Rules:** .cursor/rules/aamad-core.mdc
- **CrewAI Adapter Rules:** .cursor/rules/adapter-crewai.mdc

---

## Assumptions

1. Backend API structure will follow RESTful patterns with streaming support
2. CrewAI agents will provide streaming responses compatible with assistant-ui
3. Design tokens and brand guidelines will be provided or can be derived from PRD
4. Content and copy will be provided by product/content team
5. Browser support limited to modern browsers (latest 2 versions)

---

## Open Questions

1. Are there existing design mockups or style guides to reference?
2. What are the specific brand colors and design tokens?
3. Who will provide UI copy and content?
4. What analytics events need to be tracked in the MVP?
5. What are the expected API response formats for future integration?
6. Are there specific accessibility requirements beyond WCAG 2.1 AA?
