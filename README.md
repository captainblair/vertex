Vertex Marketplace: Blueprint Edition
Vertex is a high-end, multi-vendor e-commerce platform engineered for premium architectural aesthetics and technical superiority. The Blueprint Edition focuses on "Architectural Symmetry," providing a curated studio gallery experience for elite products.

📐 Design Philosophy: The Blueprint Standard
The application follows a minimalist, industrial-grade aesthetic inspired by modern architectural principles and luxury brands like Leica and Bang & Olufsen.

🏗️ 1. The Kinetic Hero: "Constant Bold Glide"
Motion Logic: Constant vertical floating animation for headlines (Y-axis: +/- 15px).
Typography: Bold, high-contrast white text (z-index: 20) with a technical drop-shadow for razor-sharp readability against the "untouchable" hero imagery.
Architectural Seams: A clean 1px horizontal zinc-200 line provides a "hard cut" transition from the cinematic hero to the studio archive.
🏛️ 2. The Studio Gallery: "Architectural Symmetry"
Uniform Place Cards: Every product card is identical in size, ensuring a rhythmic, predictable grid.
Strict Aspect Ratios: Product imagery is locked to a 4:5 portrait aspect ratio with object-cover or technical object-contain for electronics.
The Blueprint Grid: The background uses a technical off-white (#F5F5F7) overlaid with 0.5px vertical and horizontal ledger lines (80px square grid).
The Plinth Effect: Each card features a razor-thin border and subtle shadow. Hovering triggers a tactile "lift" (Y: -6px) and a deepened shadow.
⚡ 3. Premium Interactions
Silent Actions: "Add to Bag" buttons are hidden by default to maintain grid purity. On hover, a sleek Zinc-900 bar slides up with the specific SKU price.
Department Sub-Nav: A sticky horizontal category bar featuring a "Liquid Capsule" indicator that slides smoothly between technical verticals (Electronics, Apparel, Lifestyle).
🔒 Security & M-PESA Integration: "The Vault"
The payment experience is designed as a high-security node interaction.

Minimalist Vault UI: A clean inset panel for payment details.
Visual Trust Protocols:
Animated lock iconography during session initialization.
Technical transaction progress tracking: ENCRYPTED → SENT → VERIFIED.
Real-time feedback via the Daraja API (Simulated).
Mobile Handshake: Optimized for 254-region mobile nodes, ensuring the STK push process feels industrial and secure.
🛠️ Technical Architecture
Core Stack
Framework: React 19
State Management: Zustand 5 (Master Node pattern)
Styling: Tailwind CSS (Utility-first architectural design)
Animation: Framer Motion 11 (Cubic-bezier liquid transitions)
Icons: Lucide React (Thin-stroke technical set)
Internal Modules
Admin Command Center: A master-node dashboard for global SKU registration, announcement syncing, and sales archival.
Buyer Home: The cinematic storefront featuring the kinetic hero and symmetry grid.
Settlement System: The checkout interface housing the M-PESA "Vault" logic.
Global UI Nodes: Drawers for Cart, Profile, and Refinement (Filters) to keep the main viewport clean.
📱 Mobile Experience: "Extreme Good" Preservation
The mobile layout maintains a search-dominant bottom-dock navigation while adopting the Blueprint Edition's uniform grid logic (2-column symmetry). The Kinetic Hero glide is optimized for mobile refresh rates.

📋 Data Structures
Product Registry: Includes ID, Title, Description, Price (KSh), Stock, Category, and Featured Status.
User Roles: Strictly partitioned into BUYER and ADMIN roles using Supabase-ready logic.
Order Archive: Tracks transaction IDs, settlement status, and buyer node IDs.
Vertex: Establishing the new standard for technical commerce.
