# AAMAD – AI-Assisted Multi-Agent Application Development Framework

**AAMAD** is an open, production-grade framework for building, deploying, and evolving multi-agent applications using best context engineering practices.  
It systematizes research-driven planning, modular AI agent workflows, and rapid MVP/devops pipelines for enterprise-ready AI solutions.

---

## Table of Contents

- [What is AAMAD?](#what-is-aamad)
- [AAMAD phases at a glance](#aamad-phases-at-a-glance)
- [Repository Structure](#repository-structure)
- [How to Use the Framework](#how-to-use-the-framework)
- [Phase 1: Define Workflow (Product Manager)](#phase-1-define-workflow-product-manager)
- [Phase 2: Build Workflow (Multi-Agent)](#phase-2-build-workflow-multi-agent)
- [Core Concepts](#core-concepts)
- [Contributing](#contributing)
- [License](#license)

---

## What is AAMAD?

AAMAD is a context engineering framework based on best practices in AI-assisted coding and multi-agent system development methodologies.  
It enables teams to:

- Launch projects with autonomous or collaborative AI agents
- Rapidly prototype MVPs with clear context boundaries
- Use production-ready architecture/design patterns
- Accelerate delivery, reduce manual overhead, and enable continuous iteration

---

## Current Project: Automated Employee Onboarding Workflow

This repository demonstrates AAMAD in action by building an **Automated Employee Onboarding Workflow** system - a multi-agent AI solution that orchestrates the entire employee onboarding process from offer acceptance through first-day readiness.

**Key Features:**
- Automated document collection and compliance verification
- IT access provisioning and system setup
- Training assignment and tracking
- Stakeholder communication and coordination
- Intelligent workflow orchestration using CrewAI

**Market Opportunity:**
- **$3.2 billion** onboarding solutions market growing at **12.5% CAGR**
- Target market: Mid-market companies (100-1000 employees)
- **70% reduction** in administrative time (15-20 hours → 4-6 hours per employee)
- **Positive ROI within 6 months** for companies onboarding 50+ employees annually
- **95%+ compliance rate** vs. industry average of 77%

**Project Status:** Phase 2 (Build) - Frontend MVP Complete  
**PRD Document:** [`project-context/1.define/prd.md`](project-context/1.define/prd.md)  
**MRD Document:** [`project-context/1.define/mrd.md`](project-context/1.define/mrd.md)  
**Frontend Plan:** [`project-context/2.build/frontend.md`](project-context/2.build/frontend.md)

The PRD defines a comprehensive multi-agent system with five specialized agents:
1. **Onboarding Orchestrator** - Supervises and coordinates the workflow
2. **Document Verification Agent** - Handles compliance and document validation
3. **IT Provisioning Agent** - Manages access and system provisioning
4. **Training Coordinator Agent** - Assigns and tracks training modules
5. **Stakeholder Coordinator Agent** - Facilitates communication and coordination

**Frontend MVP Status:** ✅ Complete & Running
- ✅ Chat interface with mock agent responses
- ✅ Onboarding status dashboard with placeholder data
- ✅ Document upload UI (visual only, no backend connection)
- ✅ Responsive design with Tailwind CSS
- ✅ Component library with shadcn/ui
- ✅ TypeScript throughout
- ✅ Zustand state management
- ✅ WCAG 2.1 AA accessibility compliance
- ✅ Character limit validation (2000 chars)
- ✅ Proper ARIA labels and semantic HTML

**Frontend Location:** [`frontend/`](frontend/) directory

**Frontend Documentation:**
- Development Plan: [`project-context/2.build/frontend.md`](project-context/2.build/frontend.md)
- UI/UX Review: [`project-context/2.build/frontend-ui-review.md`](project-context/2.build/frontend-ui-review.md)

**Quick Start:**
```bash
cd frontend
npm install
npm run dev
```
Then open `http://localhost:3000` in your browser.
Then open `http://localhost:3000` in your browser.

**Next Steps:** 
- Backend implementation (CrewAI agent orchestration)
- API integration connecting frontend to backend
- End-to-end testing and QA

---

## AAMAD phases at a glance

AAMAD organizes work into three phases: Define, Build, and Deliver, each with clear artifacts, personas, and rules to keep development auditable and reusable. 
The flow begins by defining context and templates, proceeds through multi‑agent build execution, and finishes with operational delivery.

```mermaid
flowchart LR
  %% AAMAD phases overview
  subgraph P1[DEFINE]
    D1H[ PERSONA ]:::hdr --> D1L["• Product Manager<br/>(@product-mgr)"]:::list
    D2H[TEMPLATES]:::hdr --> D2L["• Market Research<br/>• PRD"]:::list
  end

  subgraph P2[BUILD]
    B1H[AGENTS]:::hdr --> B1L["• Project Mgr<br/>• System Architect<br/>• Frontend Eng<br/>• Backend Eng<br/>• Integration Eng<br/>• QA Eng"]:::list
    B2H[RULES]:::hdr --> B2L["• core<br/>• development‑workflow<br/>• adapter‑crewai"]:::list
  end

  subgraph P3[DELIVER]
    L1H[AGENTS]:::hdr --> L1L["• DevOps Eng"]:::list
    L2H[RULES]:::hdr --> L2L["• continuous‑deploy<br/>• hosting‑environment<br/>• access‑control"]:::list
  end

  P1 --> P2 --> P3

  classDef hdr fill:#111,stroke:#555,color:#fff;
  classDef list fill:#222,stroke:#555,color:#fff;
``` 

- Phase 1: (Define)
    - Product Manager persona (`@product-mgr`) conducts prompt-driven discovery and context setup, supported by templates for Market Research Document (MRD) and Product Requirements Document (PRD), to standardize project scoping.

- Phase 2: (Build)
    - Multi‑agent execution by Project Manager, System Architect, Frontend Engineer, Backend Engineer, Integration Engineer, and QA Engineer, governed by core, development‑workflow, and CrewAI‑specific rules.

- Phase 3: (Deliver)
    - DevOps Engineer focuses on release and runtime concerns using rules for continuous deployment, hosting environment definitions, and access control.


---

## Repository Structure

    aamad/
    ├─ .cursor/
    │ ├─ agents/ # Agent persona markdown files (definitions & actions)
    │ ├─ prompts/ # Parameterized and phase-specific agent prompts
    │ ├─ rules/ # Architecture, workflow, and epics rules/patterns
    │ └─ templates/ # Generation templates for research, PRD, SAD, etc.
    ├─ project-context/
    │ ├─ 1.define/ # Project-specific PRD, SAD, research reports, etc.
    │ ├─ 2.build/ # Output artifacts for setup, frontend, backend, etc.
    │ └─ 3.deliver/ # QA logs, deploy configs, release notes, etc.
    ├─ CHECKLIST.md # Step-by-step execution guide
    └─ README.md # This file


**Framework artifacts** (in `.cursor/`) are reusable for any new project.  
**Project-context** contains all generated and instance-specific documentation for each app built with AAMAD.

---

## How to Use the Framework

1. **Clone this repository.**
   ```bash
   git clone https://github.com/Bagana-AI-Learn/aamad-hr
   ```
2. Confirm `.cursor/` contains the full agent, prompt, and rule set.
3. Follow the `CHECKLIST.md` to run using multi-agent autonomy — typically, via CursorAI or another coding agent platform.
4. Each agent persona executes its epic(s), producing separate markdown artifacts and code as they go.
5. Review, test, and launch the MVP, then iterate or scale with additional features.

---

## Install via pip / uv

Instead of cloning, you can install the full artifact bundle from PyPI:

```bash
pip install aamad
# or
uv install aamad
```

After installation, run the CLI to copy the artifacts into your project:

```bash
aamad init --dest /path/to/your/project
```

Flags:
- `--dest PATH` (defaults to current directory)
- `--overwrite` (allow replacing existing files)
- `--dry-run` (preview what would be written)

You can inspect the package contents without extracting them via `aamad bundle-info --verbose`.

---

## Phase 1: Define Stage (Product Manager)

The **Product Manager** persona (`@product-mgr`) orchestrates product vision, requirements discovery, and context boundaries for enterprise multi-agent applications. This persona owns the full product context and ensures all business needs are captured as explainable, auditable artifacts.

### Role & Responsibilities

- **Context & Requirements Synthesis:** Conduct prompt-driven product discovery and MRD/PRD authoring
- **Market Research:** Generate comprehensive Market Research Document (MRD) using `.cursor/templates/mrd-template.md`
- **Requirements Engineering:** Generate production-ready Product Requirements Document (PRD) using `.cursor/templates/prd-template.md`
- **Stakeholder Alignment:** Interface with research personas and stakeholders to align product, technical, and business context
- **Traceability:** Maintain explainability and traceability for all requirements artifacts, mapping epics, feature criteria, user personas, and KPIs
- **Handoff Management:** Approve context boundaries and artifacts for technical build phase

### PRD Template Structure

The PRD template (`.cursor/templates/prd-template.md`) guides generation of comprehensive Product Requirements Documents with the following sections:

1. **Executive Summary** - Research-backed problem statement, evidence-based solution overview, and strategic rationale
2. **Market Context & User Analysis** - Target market, user needs analysis, and competitive landscape
3. **Technical Requirements & Architecture** - CrewAI framework specifications, core agent definitions, integration requirements, and infrastructure specifications
4. **Functional Requirements** - Core features (P0), enhanced features (P1), and future features (P2) prioritized by user needs
5. **Non-Functional Requirements** - Performance, security & compliance, scalability & reliability requirements
6. **User Experience Design** - Interface requirements and agent interaction design patterns
7. **Success Metrics & KPIs** - Business, technical, and user experience metrics
8. **Implementation Strategy** - Development phases (MVP, Enhanced, Scale), resource requirements, and risk mitigation
9. **Launch & Go-to-Market Strategy** - Beta testing plan, market launch strategy, and success criteria

### Output Artifacts

Phase 1 outputs are stored in `project-context/1.define/`:

- `prd.md` - ✅ **Product Requirements Document** for Automated Employee Onboarding Workflow - [View PRD](project-context/1.define/prd.md)
- `mrd.md` - ✅ **Market Research Document** with comprehensive market analysis, competitive landscape, ROI analysis, and go/no-go recommendations - [View MRD](project-context/1.define/mrd.md)
- `context-summary.md` - Context handoff artifact summarizing key decisions and requirements (pending)
- Handoff checklist - Validation checklist ensuring completeness before build phase (pending)

### Success Criteria

- Requirements are complete, explainable, and meet business goals
- Each artifact has clear traceability to market data, research, and stakeholder feedback
- Handoff to the build phase is frictionless and auditable
- All requirements traceable to research findings with technical specifications feasible with CrewAI

### Collaboration Patterns

The Product Manager works closely with research, product, business, and architect personas as the initial context owner. Once scope is locked and artifacts are approved, all technical and build responsibilities are delegated to the build team.

---

## Phase 2: Build Stage (Multi-Agent)

Each role is embodied by an agent persona, defined in `.cursor/agents/`.  
Phase 2 is executed by running each epic in sequence after completing Phase 1:

- **Architecture:** Generate solution architecture document (`sad.md`) - ⏳ Pending
- **Setup:** Scaffold environment, install dependencies, and document (`setup.md`) - ⏳ Pending
- **Frontend:** Build UI + placeholders, document (`frontend.md`) - ✅ Complete & Rebuilt
- **Backend:** Implement backend, document (`backend.md`) - ⏳ Pending
- **Integration:** Wire up chat flow, verify, document (`integration.md`) - ⏳ Pending
- **Quality Assurance:** Test end-to-end, log results and limitations (`qa.md`) - ⏳ Pending

Artifacts are versioned and stored in `project-context/2.build` for traceability.

---

## Core Concepts

- **Persona-driven development:** Each workflow is owned and documented by a clear AI agent persona with a single responsibility principle.
- **Context artifacts:** All major actions, decisions, and documentation are stored as markdown artifacts, ensuring explainability and reproducibility.
- **Parallelizable epics:** Big tasks are broken into epics, making development faster and more autonomous while retaining control over quality.
- **Reusability:** Framework reusable for any project—simply drop in your PRD/SAD and let the agents execute.
- **Open, transparent, and community-driven:** All patterns and artifacts are readable, auditable, and extendable.

---

## Contributing

Contributions are welcome!  
- Open an issue for bugs/feature ideas/improvements.
- Submit pull requests with extended templates, new agent personas, or bug fixes.
- Help evolve the knowledge base and documentation for greater adoption.
- When modifying `.cursor/` or `project-context/`, run `python scripts/update_bundle.py` to refresh the packaged artifact bundle before publishing.

---

## License

Licensed under Apache License 2.0.

> Why Apache-2.0
>    Explicit patent grant and patent retaliation protect maintainers and users from patent disputes, which is valuable for AI/ML methods, agent protocols, and orchestration logic.
>    Permissive terms enable proprietary or closed-source usage while requiring attribution and change notices, which encourages integration into enterprise stacks.
>    Compared to MIT/BSD, Apache-2.0 clarifies modification notices and patent rights, reducing legal ambiguity for contributors and adopters.

---

> For detailed step-by-step Phase 2 execution, see [CHECKLIST.md].  
> For advanced reference and prompt engineering, see `.cursor/templates/` and `.cursor/rules/`.

