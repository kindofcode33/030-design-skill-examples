import { useState, useEffect, useRef } from 'react'
import { FlaskConical, Leaf, ArrowRight, ChevronDown, HeartPulse, Search, X, Info, CheckCircle, AlertTriangle, Bell, Microscope, Dna } from 'lucide-react'

const SIDEBAR_SECTIONS = [
  {
    group: 'Foundation',
    items: [
      { id: 'philosophy', label: 'Philosophy' },
      { id: 'colors', label: 'Colors' },
      { id: 'typography', label: 'Typography' },
      { id: 'spacing', label: 'Spacing' },
      { id: 'icons', label: 'Icons' },
      { id: 'images', label: 'Images' },
      { id: 'brand-assets', label: 'Brand assets' },
    ],
  },
  {
    group: 'Components',
    items: [
      { id: 'buttons', label: 'Buttons' },
      { id: 'cards', label: 'Cards' },
      { id: 'card-image', label: 'Card with image' },
      { id: 'feature-block', label: 'Feature block' },
      { id: 'card-overlay', label: 'Card image overlay' },
      { id: 'section-cta', label: 'Section CTA (parallax)' },
      { id: 'stats-bar', label: 'Stats bar' },
      { id: 'related-links', label: 'Related links' },
      { id: 'highlights', label: 'Text highlights' },
      { id: 'block-quote', label: 'Block quote' },
    ],
  },
  {
    group: 'Navigation',
    items: [
      { id: 'inline-links', label: 'Inline links' },
      { id: 'tab-panel', label: 'Tabbed panel' },
      { id: 'sidebar-menu', label: 'Sidebar menu' },
      { id: 'breadcrumbs', label: 'Breadcrumbs' },
    ],
  },
  {
    group: 'Forms & Feedback',
    items: [
      { id: 'text-input', label: 'Text input' },
      { id: 'checkbox', label: 'Checkbox' },
      { id: 'alerts', label: 'System alerts' },
      { id: 'modal', label: 'Modal' },
      { id: 'table', label: 'Table' },
    ],
  },
  {
    group: 'Layout',
    items: [
      { id: 'hero', label: 'Hero' },
      { id: 'global-header', label: 'Global header' },
      { id: 'global-footer', label: 'Global footer' },
      { id: 'page-patterns', label: 'Page patterns' },
    ],
  },
  {
    group: 'Content',
    items: [
      { id: 'writing-style', label: 'Writing style' },
    ],
  },
]

function SectionTitle({ id, title, file }: { id: string; title: string; file: string }) {
  return (
    <div className="pt-32 mt-32 first:mt-0 first:pt-asu-9 scroll-mt-20">
      <h2 id={id} className="text-asu-h2 font-bold text-asu-gray-1 mb-1">
        {title}
      </h2>
      <p className="text-asu-body-xs text-asu-gray-3 mb-asu-3 font-mono">{file}</p>
    </div>
  )
}

function Swatch({ name, token, hex, className }: { name: string; token: string; hex?: string; className: string }) {
  return (
    <div className="flex flex-col items-start">
      <div className={`w-full h-16 rounded-none border border-asu-gray-4 ${className}`} />
      <p className="text-asu-body-sm font-bold text-asu-gray-1 mt-2">{name}</p>
      <p className="text-asu-body-xs text-asu-gray-3">{token}</p>
      {hex && <p className="text-asu-body-xs text-asu-gray-3 font-mono">{hex}</p>}
    </div>
  )
}

function ParallaxDemo() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    function handleScroll() {
      if (!sectionRef.current || !imgRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const scrollProgress = -rect.top / (rect.height + window.innerHeight)
      const translateY = scrollProgress * 300
      imgRef.current.style.transform = `translateY(${translateY}px) scale(1.3)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-asu-8 rounded-none">
      <img
        ref={imgRef}
        src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=1400&h=900&fit=crop"
        alt="University campus aerial view"
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
      />
      <div className="relative max-w-asu-content mx-auto px-asu-3">
        <div className="bg-white rounded-none p-asu-4 lg:w-1/2">
          <h2 className="text-asu-h2 font-bold text-asu-gray-1">Experience biology in the field</h2>
          <div className="text-asu-body text-asu-gray-2 mt-asu-2">
            <p>Our students access 2,400 acres of dedicated research stations. Field courses let you collect real data alongside <a href="#" className="font-bold text-asu-maroon underline hover:no-underline">faculty mentors</a> and contribute to active conservation projects.</p>
          </div>
          <div className="flex flex-wrap gap-asu-2 mt-asu-3">
            <a href="#" className="inline-block bg-asu-maroon text-white font-bold rounded-full px-asu-3 py-asu-2 hover:scale-105 transition-transform">
              Browse field courses
            </a>
            <a href="#" className="inline-block bg-asu-gold text-asu-gray-1 font-bold rounded-full px-asu-3 py-asu-2 hover:scale-105 transition-transform">
              Apply now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function DesignSystem() {
  const [active, setActive] = useState('philosophy')
  const [sidebarSearch, setSidebarSearch] = useState('')
  const [matchedSections, setMatchedSections] = useState<Set<string>>(new Set())

  const findMatchingSections = (query: string): Set<string> => {
    if (!query.trim()) return new Set()
    const q = query.toLowerCase()
    const allIds = SIDEBAR_SECTIONS.flatMap((g) => g.items.map((i) => i.id))
    const matches = new Set<string>()
    for (let i = 0; i < allIds.length; i++) {
      const sectionEl = document.getElementById(allIds[i])
      if (!sectionEl) continue
      // Get all content between this section heading and the next
      let content = sectionEl.textContent || ''
      let sibling = sectionEl.parentElement?.nextElementSibling
      const nextId = allIds[i + 1]
      while (sibling) {
        if (nextId && sibling.querySelector(`#${nextId}`)) break
        if (nextId && sibling.id === nextId) break
        content += ' ' + (sibling.textContent || '')
        sibling = sibling.nextElementSibling
      }
      if (content.toLowerCase().includes(q)) {
        matches.add(allIds[i])
      }
    }
    // Also match sidebar labels
    for (const group of SIDEBAR_SECTIONS) {
      for (const item of group.items) {
        if (item.label.toLowerCase().includes(q)) matches.add(item.id)
      }
    }
    return matches
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMatchedSections(findMatchingSections(sidebarSearch))
    }, 150)
    return () => clearTimeout(timeout)
  }, [sidebarSearch])

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const matches = findMatchingSections(sidebarSearch)
      if (matches.size > 0) {
        const firstMatch = Array.from(matches)[0]
        setActive(firstMatch)
        document.getElementById(firstMatch)?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const [activeTab, setActiveTab] = useState('tab1')
  const [showModal, setShowModal] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(true)
  const [textureModal, setTextureModal] = useState<string | null>(null)

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-64 h-screen bg-white border-r border-asu-gray-4 z-50 flex flex-col">
        <div className="sticky top-0 border-b border-asu-gray-4 bg-white z-10">
          <div className="p-asu-3 pb-asu-2">
            <img src={`${import.meta.env.BASE_URL}asu/logos/asu-logo.png`} alt="ASU Logo" className="h-10 mb-asu-2" />
            <p className="text-asu-body-xs font-bold text-asu-gray-3">ASU Design Skill</p>
            <h1 className="text-asu-h4 font-bold text-asu-gray-1">Visual Examples</h1>
          </div>
          <div className="px-asu-3 pb-asu-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-asu-gray-3" />
              <input
                type="text"
                placeholder="Search content..."
                value={sidebarSearch}
                onChange={(e) => setSidebarSearch(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="w-full pl-8 pr-8 py-1.5 text-asu-body-sm border border-asu-gray-4 rounded-none focus:outline-none focus:border-asu-gold"
              />
              {sidebarSearch && (
                <button
                  onClick={() => setSidebarSearch('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-asu-gray-3 hover:text-asu-gray-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
        <nav className="p-asu-2 flex-1 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {SIDEBAR_SECTIONS.map((group) => {
            const filteredItems = sidebarSearch.trim()
              ? group.items.filter((item) => matchedSections.has(item.id))
              : group.items
            if (filteredItems.length === 0) return null
            return (
            <div key={group.group} className="mb-asu-2">
              <p className="text-asu-body-xs font-bold text-asu-gray-1 px-asu-2 pt-asu-2 pb-1">{group.group}</p>
              {filteredItems.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    setActive(section.id)
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={`block py-1.5 px-asu-2 text-asu-body-sm no-underline rounded-none transition-colors ${
                    active === section.id
                      ? 'text-asu-gray-1 font-bold bg-asu-gray-7 border-l-[3px] border-l-asu-gold'
                      : 'text-asu-gray-2 hover:text-asu-gray-1 hover:bg-asu-gray-7 border-l-[3px] border-l-transparent'
                  }`}
                >
                  {section.label}
                </a>
              ))}
            </div>
            )
          })}
        </nav>
        <div className="p-asu-2 border-t border-asu-gray-4">
          <a href="/example-01" className="text-asu-body-sm text-asu-maroon underline hover:no-underline">
            View example page
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 px-asu-5 pb-asu-9 max-w-asu-content scroll-smooth">

        {/* ═══════════════ INTRO ═══════════════ */}
        <div className="pt-asu-9 pb-asu-8 max-w-2xl mb-asu-8">
          <h1 className="font-bold text-asu-gray-1 mb-asu-8" style={{ fontSize: '80px', letterSpacing: '-0.05em', lineHeight: '1' }}><span className="bg-black text-white px-asu-2 py-1 inline-block">ASU</span> <span className="bg-asu-gold px-asu-2 py-1 inline-block">Design Skill</span></h1>
          <p className="text-asu-body text-asu-gray-2 mb-asu-4">
            A Claude Code plugin that provides the ASU Unity Design System as AI-assistive skills. When active, Claude Code applies ASU brand standards — colors, typography, spacing, component specs, and writing style — to any UI work, and can bootstrap a project's theme and brand assets in one command.
          </p>
          <h2 className="text-asu-h3 font-bold text-asu-gray-1 mb-asu-3">What it does</h2>
          <p className="text-asu-body text-asu-gray-2 mb-asu-3">
            When you ask Claude Code to build or modify UI, the plugin ensures output follows ASU brand guidelines:
          </p>
          <ul className="space-y-2 text-asu-body text-asu-gray-2 mb-asu-4">
            <li><span className="font-bold text-asu-gray-1">Colors:</span> Maroon, Gold, grayscale, and approved combinations</li>
            <li><span className="font-bold text-asu-gray-1">Typography:</span> Arial font stack, proper heading scale, no italics, sentence case</li>
            <li><span className="font-bold text-asu-gray-1">Components:</span> Global header, footer, heroes, buttons, cards, tabs, modals, forms</li>
            <li><span className="font-bold text-asu-gray-1">Spacing:</span> 8px grid system with defined section spacing</li>
            <li><span className="font-bold text-asu-gray-1">Writing style:</span> ASU brand voice, capitalization rules, date/time formatting</li>
            <li><span className="font-bold text-asu-gray-1">Accessibility:</span> WCAG AA contrast, gold focus rings, semantic HTML</li>
          </ul>
          <p className="text-asu-body text-asu-gray-2">
            The plugin ships <span className="font-bold text-asu-gray-1">two skills</span> — one for knowledge (auto-loads when discussing UI), one for setup (a slash command).
          </p>
        </div>

        {/* ═══════════════ FOUNDATION ═══════════════ */}

        {/* Philosophy */}
        <SectionTitle id="philosophy" title="Design philosophy" file="guide-philosophy.md" />
        <div className="space-y-asu-3 max-w-2xl">
          <p className="text-asu-body text-asu-gray-2">
            ASU operates as a branded house with unified brand elements. The design system prioritizes clarity, confidence, and inclusivity over cleverness or aesthetic novelty.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-asu-3 mt-asu-3">
            <div className="border border-asu-gray-4 rounded-none p-asu-3">
              <p className="text-asu-body font-bold text-asu-gray-1">Bold and bright</p>
              <p className="text-asu-body-sm text-asu-gray-2 mt-1">Assertive, confident design. Headlines prominent and eye-catching.</p>
            </div>
            <div className="border border-asu-gray-4 rounded-none p-asu-3">
              <p className="text-asu-body font-bold text-asu-gray-1">Gold as differentiator</p>
              <p className="text-asu-body-sm text-asu-gray-2 mt-1">Gold for primary CTAs, accents, emphasis. Sets ASU apart from competitors.</p>
            </div>
            <div className="border border-asu-gray-4 rounded-none p-asu-3">
              <p className="text-asu-body font-bold text-asu-gray-1">Strong contrast</p>
              <p className="text-asu-body-sm text-asu-gray-2 mt-1">High contrast in color and size for readability and hierarchy.</p>
            </div>
            <div className="border border-asu-gray-4 rounded-none p-asu-3">
              <p className="text-asu-body font-bold text-asu-gray-1">Lead with real people</p>
              <p className="text-asu-body-sm text-asu-gray-2 mt-1">Default to a real person; if no human fits, a real place. Never stock or abstract.</p>
            </div>
          </div>
        </div>

        {/* Colors */}
        <SectionTitle id="colors" title="Colors" file="token-color.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          Primary brand colors must appear in every design. Secondary colors never appear without gold or maroon present.
        </p>
        <h3 className="text-asu-h4 font-bold text-asu-gray-1 mb-asu-2">Primary</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-asu-2 mb-asu-5">
          <Swatch name="Maroon" token="bg-asu-maroon" hex="#8C1D40" className="bg-asu-maroon" />
          <Swatch name="Gold" token="bg-asu-gold" hex="#FFC627" className="bg-asu-gold" />
          <Swatch name="Black (Gray 1)" token="bg-asu-gray-1" hex="#191919" className="bg-asu-gray-1" />
          <Swatch name="White" token="bg-white" hex="#FFFFFF" className="bg-white" />
          <Swatch name="Rich Black" token="bg-asu-rich-black" hex="#000000" className="bg-asu-rich-black" />
        </div>
        <h3 className="text-asu-h4 font-bold text-asu-gray-1 mb-asu-2">Grayscale</h3>
        <div className="grid grid-cols-2 md:grid-cols-7 gap-asu-2 mb-asu-5">
          <Swatch name="Gray 1" token="bg-asu-gray-1" hex="#191919" className="bg-asu-gray-1" />
          <Swatch name="Gray 2" token="bg-asu-gray-2" hex="#484848" className="bg-asu-gray-2" />
          <Swatch name="Gray 3" token="bg-asu-gray-3" hex="#747474" className="bg-asu-gray-3" />
          <Swatch name="Gray 4" token="bg-asu-gray-4" hex="#BFBFBF" className="bg-asu-gray-4" />
          <Swatch name="Gray 5" token="bg-asu-gray-5" hex="#D0D0D0" className="bg-asu-gray-5" />
          <Swatch name="Gray 6" token="bg-asu-gray-6" hex="#E8E8E8" className="bg-asu-gray-6" />
          <Swatch name="Gray 7" token="bg-asu-gray-7" hex="#FAFAFA" className="bg-asu-gray-7" />
        </div>
        <h3 className="text-asu-h4 font-bold text-asu-gray-1 mb-asu-2">System — Default</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-asu-2 mb-asu-4">
          <Swatch name="Error" token="bg-asu-error" hex="#CC2F2F" className="bg-asu-error" />
          <Swatch name="Warning" token="bg-asu-warning" hex="#BD4800" className="bg-asu-warning" />
          <Swatch name="Info" token="bg-asu-info" hex="#126877" className="bg-asu-info" />
          <Swatch name="Success" token="bg-asu-success" hex="#446D12" className="bg-asu-success" />
        </div>

        <h3 className="text-asu-h4 font-bold text-asu-gray-1 mb-asu-2">System — Text variants</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-asu-2 mb-asu-4">
          <Swatch name="Error text (light)" token="text-asu-error-text-light" hex="#B72A42" className="bg-[#B72A42]" />
          <Swatch name="Error text (dark)" token="text-asu-error-text-dark" hex="#FF7B8E" className="bg-[#FF7B8E]" />
          <Swatch name="Warning text (light)" token="text-asu-warning-text-light" hex="#8D4800" className="bg-[#8D4800]" />
          <Swatch name="Warning text (dark)" token="text-asu-warning-text-dark" hex="#FFB034" className="bg-[#FFB034]" />
        </div>

        <h3 className="text-asu-h4 font-bold text-asu-gray-1 mb-asu-2">System — Backgrounds</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-asu-2 mb-asu-4">
          <Swatch name="Error bg" token="bg-asu-error-bg" hex="#F7DDDD" className="bg-asu-error-bg" />
          <Swatch name="Warning bg" token="bg-asu-warning-bg" hex="#FFEADE" className="bg-asu-warning-bg" />
          <Swatch name="Info bg" token="bg-asu-info-bg" hex="#D6F0FA" className="bg-asu-info-bg" />
          <Swatch name="Success bg" token="bg-asu-success-bg" hex="#E9F5DB" className="bg-asu-success-bg" />
        </div>

        <h3 className="text-asu-h4 font-bold text-asu-gray-1 mb-asu-2">Additional system text</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-asu-2 mb-asu-4">
          <Swatch name="Success text" token="text-asu-success-text" hex="#446D12" className="bg-[#446D12]" />
          <Swatch name="Info text (blue)" token="text-asu-info-text-blue" hex="#008FF3" className="bg-[#008FF3]" />
        </div>

        <h3 className="text-asu-h4 font-bold text-asu-gray-1 mb-asu-2">Link visited states</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-asu-2 mb-asu-4">
          <Swatch name="Visited maroon" token="text-asu-visited-maroon" hex="#440E22" className="bg-[#440E22]" />
          <Swatch name="Visited gold" token="text-asu-visited-gold" hex="#D3A524" className="bg-[#D3A524]" />
        </div>


        {/* Typography */}
        <SectionTitle id="typography" title="Typography" file="token-typography.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          Arial-based font stack. Never use italics. All headings in sentence case. Roboto is not permitted.
        </p>
        <div className="space-y-asu-3 border border-asu-gray-4 rounded-none p-asu-4">
          <div>
            <p className="text-asu-body-xs text-asu-gray-3 mb-1">text-asu-h1-hero / font-black</p>
            <p className="text-asu-h1-hero font-black text-asu-gray-1">Hero heading</p>
          </div>
          <div>
            <p className="text-asu-body-xs text-asu-gray-3 mb-1">text-asu-h1 / font-bold</p>
            <p className="text-asu-h1 font-bold text-asu-gray-1">Heading level one</p>
          </div>
          <div>
            <p className="text-asu-body-xs text-asu-gray-3 mb-1">text-asu-h2 / font-bold</p>
            <p className="text-asu-h2 font-bold text-asu-gray-1">Heading level two</p>
          </div>
          <div>
            <p className="text-asu-body-xs text-asu-gray-3 mb-1">text-asu-h3 / font-bold</p>
            <p className="text-asu-h3 font-bold text-asu-gray-1">Heading level three</p>
          </div>
          <div>
            <p className="text-asu-body-xs text-asu-gray-3 mb-1">text-asu-h4 / font-semibold</p>
            <p className="text-asu-h4 font-semibold text-asu-gray-1">Heading level four</p>
          </div>
          <div>
            <p className="text-asu-body-xs text-asu-gray-3 mb-1">text-asu-h5 / font-semibold</p>
            <p className="text-asu-h5 font-semibold text-asu-gray-1">Heading level five</p>
          </div>
          <hr className="border-asu-gray-4" />
          <div>
            <p className="text-asu-body-xs text-asu-gray-3 mb-1">text-asu-body-lg</p>
            <p className="text-asu-body-lg text-asu-gray-1">Large body text for lead paragraphs</p>
          </div>
          <div>
            <p className="text-asu-body-xs text-asu-gray-3 mb-1">text-asu-body</p>
            <p className="text-asu-body text-asu-gray-1">Default body copy for all content</p>
          </div>
          <div>
            <p className="text-asu-body-xs text-asu-gray-3 mb-1">text-asu-body-sm</p>
            <p className="text-asu-body-sm text-asu-gray-1">Small body text for captions</p>
          </div>
          <div>
            <p className="text-asu-body-xs text-asu-gray-3 mb-1">text-asu-body-xs</p>
            <p className="text-asu-body-xs text-asu-gray-1">Extra small for disclaimers and fine print</p>
          </div>
        </div>

        {/* Spacing */}
        <SectionTitle id="spacing" title="Spacing" file="token-spacing.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          Base unit: 8px. Nine-step scale from asu-1 (8px) to asu-9 (96px). Never use arbitrary pixel values.
        </p>
        <div className="space-y-asu-2">
          {[
            { token: 'asu-1', label: '8px', desc: 'Minimum unit; tight internal spacing' },
            { token: 'asu-2', label: '16px', desc: 'Default internal component padding' },
            { token: 'asu-3', label: '24px', desc: 'Column gutters (desktop)' },
            { token: 'asu-4', label: '32px', desc: 'Mobile outside margins' },
            { token: 'asu-5', label: '40px', desc: 'Medium component spacing' },
            { token: 'asu-6', label: '48px', desc: 'Section spacing (mobile)' },
            { token: 'asu-7', label: '56px', desc: 'Large component separation' },
            { token: 'asu-8', label: '72px', desc: 'Large layout spacing' },
            { token: 'asu-9', label: '96px', desc: 'Section spacing (desktop)' },
          ].map((item) => (
            <div key={item.token} className="flex items-center gap-asu-3">
              <div className="h-6 bg-asu-gold rounded-none" style={{ width: item.label }} />
              <div>
                <span className="text-asu-body-sm font-bold text-asu-gray-1">{item.token}</span>
                <span className="text-asu-body-xs text-asu-gray-3 ml-2">{item.label}</span>
                <span className="text-asu-body-xs text-asu-gray-3 ml-2">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Icons */}
        <SectionTitle id="icons" title="Icons" file="media-icon.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          Lucide React for UI icons, Font Awesome Free for system alerts/social, ASU Awesome for brand-specific. Always aria-hidden unless the icon is the only element conveying meaning. Never use maroon or gold for card icons.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-asu-3">
          <div className="border border-asu-gray-4 rounded-none p-asu-3 flex flex-col items-center gap-2">
            <FlaskConical className="w-8 h-8 text-asu-gray-1" />
            <p className="text-asu-body-xs text-asu-gray-3">32px</p>
          </div>
          <div className="border border-asu-gray-4 rounded-none p-asu-3 flex flex-col items-center gap-2">
            <Search className="w-6 h-6 text-asu-gray-1" />
            <p className="text-asu-body-xs text-asu-gray-3">24px</p>
          </div>
          <div className="border border-asu-gray-4 rounded-none p-asu-3 flex flex-col items-center gap-2">
            <ChevronDown className="w-5 h-5 text-asu-gray-1" />
            <p className="text-asu-body-xs text-asu-gray-3">20px</p>
          </div>
          <div className="border border-asu-gray-4 rounded-none p-asu-3 flex flex-col items-center gap-2">
            <ArrowRight className="w-4 h-4 text-asu-gray-1" />
            <p className="text-asu-body-xs text-asu-gray-3">16px</p>
          </div>
          <div className="border border-asu-gray-4 rounded-none p-asu-3 flex flex-col items-center gap-2">
            <Search className="w-3 h-3 text-asu-gray-1" />
            <p className="text-asu-body-xs text-asu-gray-3">12px</p>
          </div>
        </div>

        {/* Images */}
        <SectionTitle id="images" title="Images" file="media-image.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          Always authentic photography (real people, real places). Alt text required on all non-decorative images. Max file size guidelines: hero 200KB, card 100KB. Use object-cover for consistent framing.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-asu-3">
          <div>
            <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop" alt="Professor teaching students in a laboratory" className="w-full aspect-[3/2] object-cover rounded-none" />
            <p className="text-asu-body-xs text-asu-gray-3 mt-2">3:2 ratio — standard content image</p>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=450&fit=crop" alt="Students walking on campus at sunset" className="w-full aspect-[4/3] object-cover rounded-none" />
            <p className="text-asu-body-xs text-asu-gray-3 mt-2">4:3 ratio — card images</p>
          </div>
        </div>

        {/* Brand Assets */}
        <SectionTitle id="brand-assets" title="Brand assets" file="assets/images/" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          All logos, background textures, and favicon from the skill's asset folder. Available after running <code className="text-asu-body-xs bg-asu-gray-7 px-1">/asu-design-init</code>.
        </p>

        <h3 className="text-asu-h4 font-bold text-asu-gray-1 mb-asu-2">Logos</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-asu-3 mb-asu-5">
          <div className="border border-asu-gray-4 rounded-none p-asu-3 flex flex-col items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}asu/logos/asu-logo.png`} alt="ASU logo primary" className="h-16 w-auto object-contain" />
            <p className="text-asu-body-xs text-asu-gray-3 font-mono text-center">/asu/logos/asu-logo.png</p>
          </div>
          <div className="border border-asu-gray-4 rounded-none p-asu-3 flex flex-col items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}asu/logos/asu-logo-horizontal.png`} alt="ASU logo horizontal" className="h-12 w-auto object-contain" />
            <p className="text-asu-body-xs text-asu-gray-3 font-mono text-center">/asu/logos/asu-logo-horizontal.png</p>
          </div>
          <div className="border border-asu-gray-4 rounded-none p-asu-3 flex flex-col items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}asu/logos/asu-vertical.svg`} alt="ASU logo vertical" className="h-16 w-auto object-contain" />
            <p className="text-asu-body-xs text-asu-gray-3 font-mono text-center">/asu/logos/asu-vertical.svg</p>
          </div>
          <div className="border border-asu-gray-4 rounded-none p-asu-3 bg-asu-gray-1 flex flex-col items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}asu/logos/asu-horizontal-white.svg`} alt="ASU logo white on dark" className="h-12 w-auto object-contain" />
            <p className="text-asu-body-xs text-asu-gray-5 font-mono text-center">/asu/logos/asu-horizontal-white.svg</p>
          </div>
          <div className="border border-asu-gray-4 rounded-none p-asu-3 flex flex-col items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}asu/logos/footer-rank.webp`} alt="Footer ranking badge" className="h-14 w-auto object-contain" />
            <p className="text-asu-body-xs text-asu-gray-3 font-mono text-center">/asu/logos/footer-rank.webp</p>
          </div>
          <div className="border border-asu-gray-4 rounded-none p-asu-3 flex flex-col items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}asu/favicon.png`} alt="Favicon" className="h-8 w-auto object-contain" />
            <p className="text-asu-body-xs text-asu-gray-3 font-mono text-center">/asu/favicon.png</p>
          </div>
        </div>

        <h3 className="text-asu-h4 font-bold text-asu-gray-1 mb-asu-2">Background textures</h3>
        <p className="text-asu-body-xs text-asu-gray-3 mb-asu-2">Click to view full texture</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-asu-3">
          {[
            '8VH07sBuRRJdzkV0NPlJwg.png',
            'gIYRGFq7o6-mPadTBNFszg.png',
            'h5fBqGHPdBnWNSjkXQUbHQ.png',
            'kGEioywJB_ruql2Fm2Rd0A.png',
            'mLEbpKwPjev6DHk1-K_XCQ.png',
            'TT-5nP-Di70s3AmoJDR4Ng.png',
          ].map((file) => (
            <button
              key={file}
              onClick={() => setTextureModal(`${import.meta.env.BASE_URL}asu/backgrounds/${file}`)}
              className="border border-asu-gray-4 rounded-none overflow-hidden text-left hover:border-asu-gold hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="h-24 bg-repeat" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}asu/backgrounds/${file})` }} />
              <p className="text-asu-body-xs text-asu-gray-3 font-mono p-2 border-t border-asu-gray-4">{file}</p>
            </button>
          ))}
        </div>

        {/* ═══════════════ LAYOUT ═══════════════ */}

        {/* Hero */}
        <SectionTitle id="hero" title="Hero" file="hero.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          Full-width image with gradient overlay. Content bottom-left, never centered. Three height variants. Uses flex items-end for vertical positioning.
        </p>
        <div className="space-y-asu-5">
          <div>
            <p className="text-asu-body-xs text-asu-gray-3 mb-2">Large — h-asu-hero-lg (648px)</p>
            <div className="relative h-[400px] overflow-hidden rounded-none flex items-end">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1400&h=800&fit=crop)' }} />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-asu-gray-1/80" />
              <div className="relative w-full max-w-asu-content mx-auto px-asu-3 pb-asu-5">
                <h1 className="text-asu-h1-hero font-black text-white">Hero headline here</h1>
                <p className="text-asu-body-lg text-white/90 mt-asu-2 max-w-2xl">Supporting text sits below the headline. Always left-aligned, never centered.</p>
                <div className="flex gap-asu-2 mt-asu-3">
                  <button className="bg-asu-gold text-asu-gray-1 font-bold px-6 py-3 rounded-full min-w-28 hover:scale-105 transition-transform">Apply now</button>
                  <button className="bg-white text-asu-gray-1 font-bold px-6 py-3 rounded-full min-w-28 hover:scale-105 transition-transform">Learn more</button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-asu-body-xs text-asu-gray-3 mb-2">Medium — h-asu-hero-md (512px)</p>
            <div className="relative h-[320px] overflow-hidden rounded-none flex items-end">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1562774053-701939374585?w=1400&h=600&fit=crop)' }} />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-asu-gray-1/80" />
              <div className="relative w-full max-w-asu-content mx-auto px-asu-3 pb-asu-5">
                <h1 className="text-asu-h1 font-bold text-white">Medium hero variant</h1>
                <p className="text-asu-body text-white/90 mt-asu-1 max-w-2xl">Shorter height for secondary landing pages.</p>
                <div className="flex gap-asu-2 mt-asu-3">
                  <button className="bg-asu-gold text-asu-gray-1 font-bold px-6 py-3 rounded-full min-w-28 hover:scale-105 transition-transform">Explore programs</button>
                  <button className="bg-white/20 text-white font-bold px-6 py-3 rounded-full min-w-28 border border-white hover:bg-white/30 transition-colors">Visit campus</button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-asu-body-xs text-asu-gray-3 mb-2">Small — h-asu-hero-sm (352px)</p>
            <div className="relative h-[220px] overflow-hidden rounded-none flex items-end">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&h=400&fit=crop)' }} />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-asu-gray-1/80" />
              <div className="relative w-full max-w-asu-content mx-auto px-asu-3 pb-asu-4">
                <h1 className="text-asu-h2 font-bold text-white">Small hero variant</h1>
                <div className="flex gap-asu-2 mt-asu-2">
                  <button className="bg-asu-gold text-asu-gray-1 font-bold px-5 py-2 rounded-full min-w-20 text-asu-body-sm hover:scale-105 transition-transform">Get started</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Header */}
        <SectionTitle id="global-header" title="Global header" file="header-global.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          Fixed position, full width. Two rows: grey utility bar (30px) and white main header with logo + nav. Gold underline on active nav item. Spacer div (h-[110px]) prevents content overlap.
        </p>
        <div className="border border-asu-gray-4 rounded-none overflow-hidden">
          <div className="bg-asu-gray-6 h-[30px] flex items-center justify-end px-asu-3 gap-asu-3">
            <span className="text-asu-body-xs text-asu-gray-2">ASU Home</span>
            <span className="text-asu-body-xs text-asu-gray-2">My ASU</span>
            <span className="text-asu-body-xs text-asu-gray-2">Colleges and Schools</span>
            <span className="text-asu-body-xs text-asu-gray-2">Sign In</span>
            <span className="text-asu-body-xs text-asu-gray-2 flex items-center gap-1">Search <Search className="w-3 h-3" /></span>
          </div>
          <div className="bg-white border-b border-asu-gray-5 px-asu-3 flex items-stretch">
            <div className="flex items-center flex-shrink-0 mr-asu-3 py-asu-2">
              <img src={`${import.meta.env.BASE_URL}asu/logos/asu-vertical.svg`} alt="ASU" className="h-16 w-auto" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-asu-h4 font-bold text-asu-gray-1 leading-[1.1]">Arizona State University</span>
              <nav className="flex items-stretch gap-asu-3 mt-1">
                <span className="text-asu-body text-asu-gray-1 py-asu-1 border-b-[5px] border-asu-gold">Link 01</span>
                <span className="text-asu-body text-asu-gray-2 py-asu-1 border-b-[5px] border-transparent">Link 02</span>
                <span className="text-asu-body text-asu-gray-2 py-asu-1 border-b-[5px] border-transparent">Link 03</span>
                <span className="text-asu-body text-asu-gray-2 py-asu-1 border-b-[5px] border-transparent">Link 04</span>
              </nav>
            </div>
          </div>
        </div>

        {/* Global Footer */}
        <SectionTitle id="global-footer" title="Global footer" file="footer-global.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          Three rows: dark endorsed (logo + social icons), gold innovation (utility links + rank badge), grey legal bar (colophon). Always full width, never constrain with max-width.
        </p>
        <div className="border border-asu-gray-4 rounded-none overflow-hidden">
          <div className="bg-asu-gray-1 h-24 flex items-center justify-between px-asu-3">
            <img src={`${import.meta.env.BASE_URL}asu/logos/asu-horizontal-white.svg`} alt="ASU" className="h-10 w-auto" />
            <div className="flex gap-asu-3">
              <div className="w-10 h-10 bg-asu-gray-2 flex items-center justify-center hover:bg-white/20 transition-colors"><span className="text-white text-xs font-bold">fb</span></div>
              <div className="w-10 h-10 bg-asu-gray-2 flex items-center justify-center hover:bg-white/20 transition-colors"><span className="text-white text-xs font-bold">ig</span></div>
              <div className="w-10 h-10 bg-asu-gray-2 flex items-center justify-center hover:bg-white/20 transition-colors"><span className="text-white text-xs font-bold">yt</span></div>
              <div className="w-10 h-10 bg-asu-gray-2 flex items-center justify-center hover:bg-white/20 transition-colors"><span className="text-white text-xs font-bold">li</span></div>
            </div>
          </div>
          <div className="bg-asu-gold h-[100px] flex items-center justify-between px-asu-3">
            <div className="flex items-center gap-asu-2 flex-wrap">
              <span className="text-asu-body text-asu-gray-1 font-bold">Maps and Locations</span>
              <span className="text-asu-body text-asu-gray-1 font-bold">Jobs</span>
              <span className="text-asu-body text-asu-gray-1 font-bold">Directory</span>
              <span className="text-asu-body text-asu-gray-1 font-bold">Contact ASU</span>
              <span className="text-asu-body text-asu-gray-1 font-bold">My ASU</span>
            </div>
            <img src={`${import.meta.env.BASE_URL}asu/logos/footer-rank.webp`} alt="Ranked #1 in innovation" className="h-[50px] w-auto" />
          </div>
          <div className="bg-asu-gray-6 h-14 flex items-center px-asu-3">
            <div className="flex items-center gap-asu-2 flex-wrap">
              <span className="text-asu-body text-asu-gray-2">Copyright and Trademark</span>
              <span className="text-asu-body text-asu-gray-2">Accessibility</span>
              <span className="text-asu-body text-asu-gray-2">Privacy</span>
              <span className="text-asu-body text-asu-gray-2">Terms of Use</span>
              <span className="text-asu-body text-asu-gray-2">Emergency</span>
            </div>
          </div>
        </div>

        {/* Page Patterns */}
        <SectionTitle id="page-patterns" title="Page patterns" file="pattern-page.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          Standard scaffold: Global Header (fixed) → Hero → content sections (py-asu-9) → Global Footer. Sections use max-w-asu-content centered. One H1 per page (in hero). H2 for sections.
        </p>
        <div className="border border-asu-gray-4 rounded-none overflow-hidden">
          <div className="bg-asu-gray-6 h-8 flex items-center px-asu-2">
            <span className="text-asu-body-xs text-asu-gray-3">Global header (fixed, z-50)</span>
          </div>
          <div className="relative h-28 flex items-end px-asu-2 pb-2 overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=200&fit=crop)' }} />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-asu-gray-1/80" />
            <span className="relative text-asu-body-xs text-white">Hero (h-asu-hero-lg) with H1</span>
          </div>
          <div className="bg-white py-asu-3 px-asu-2 border-b border-asu-gray-4">
            <span className="text-asu-body-xs text-asu-gray-3">Section 1 — py-asu-9, max-w-asu-content mx-auto</span>
          </div>
          <div className="bg-asu-gray-7 py-asu-3 px-asu-2 border-b border-asu-gray-4">
            <span className="text-asu-body-xs text-asu-gray-3">Section 2 — alternate background for visual rhythm</span>
          </div>
          <div className="bg-white py-asu-3 px-asu-2 border-b border-asu-gray-4">
            <span className="text-asu-body-xs text-asu-gray-3">Section 3 — every section has adjacent action (CTA)</span>
          </div>
          <div className="bg-asu-gray-1 h-12 flex items-center px-asu-2">
            <span className="text-asu-body-xs text-asu-gray-5">Global footer (3 rows: dark, gold, grey)</span>
          </div>
        </div>
        <div className="mt-asu-3 border border-asu-gray-4 rounded-none p-asu-3">
          <p className="text-asu-body-sm text-asu-gray-2">
            Full reference index: <code className="text-asu-body-xs bg-asu-gray-7 px-1">pattern-page.md</code> (page scaffold),
            <code className="text-asu-body-xs bg-asu-gray-7 px-1 ml-1">pattern-custom.md</code> (breadcrumbs, block quote),
            <code className="text-asu-body-xs bg-asu-gray-7 px-1 ml-1">nav-sidebar.md</code> (sidebar nav),
            <code className="text-asu-body-xs bg-asu-gray-7 px-1 ml-1">config-shadcn.md</code> (shadcn overrides),
            <code className="text-asu-body-xs bg-asu-gray-7 px-1 ml-1">token-tailwind-theme.md</code> (full token registry)
          </p>
        </div>

        {/* ═══════════════ COMPONENTS ═══════════════ */}

        {/* Buttons */}
        <SectionTitle id="buttons" title="Buttons" file="button.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          Pill-shaped (rounded-full). Maroon is default. Gold reserved for highest-priority CTA only. Hover scales 5%. Never use generic labels like "Learn more."
        </p>

        <h3 className="text-asu-h4 font-bold text-asu-gray-1 mb-asu-2">Colors</h3>
        <div className="flex flex-wrap items-center gap-asu-3 mb-asu-5">
          <div className="flex flex-col items-start gap-2">
            <button className="bg-asu-maroon text-white font-bold rounded-full px-6 py-3 min-w-28 hover:scale-105 transition-transform">View program details</button>
            <p className="text-asu-body-xs text-asu-gray-3">Maroon (default)</p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <button className="bg-asu-gold text-asu-gray-1 font-bold rounded-full px-6 py-3 min-w-28 hover:scale-105 transition-transform">Apply now</button>
            <p className="text-asu-body-xs text-asu-gray-3">Gold (high priority)</p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <button className="bg-asu-gray-1 text-white font-bold rounded-full px-6 py-3 min-w-28 hover:scale-105 transition-transform">Explore research</button>
            <p className="text-asu-body-xs text-asu-gray-3">Black</p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <button className="bg-asu-gray-6 text-asu-gray-1 font-bold rounded-full px-6 py-3 min-w-28 hover:scale-105 transition-transform">View details</button>
            <p className="text-asu-body-xs text-asu-gray-3">Gray (low emphasis)</p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <button className="bg-asu-maroon text-white font-bold rounded-full px-6 py-3 min-w-28 disabled:opacity-50" disabled>Unavailable</button>
            <p className="text-asu-body-xs text-asu-gray-3">Disabled (50%)</p>
          </div>
        </div>

        <h3 className="text-asu-h4 font-bold text-asu-gray-1 mb-asu-2">Sizes</h3>
        <div className="flex flex-wrap items-end gap-asu-4 mb-asu-5">
          <div className="flex flex-col items-start gap-2">
            <button className="bg-asu-maroon text-white font-bold rounded-full px-6 py-3 min-w-28 hover:scale-105 transition-transform">Default size</button>
            <p className="text-asu-body-xs text-asu-gray-3">Default — min-w-28 (112px)</p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <button className="bg-asu-maroon text-white font-bold rounded-full px-4 py-2 min-w-20 hover:scale-105 transition-transform">Small size</button>
            <p className="text-asu-body-xs text-asu-gray-3">Small — min-w-20 (80px)</p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <button className="bg-asu-maroon text-white font-bold rounded-full px-3 py-1.5 min-w-16 text-sm hover:scale-105 transition-transform">Extra small</button>
            <p className="text-asu-body-xs text-asu-gray-3">XS — min-w-16 (64px)</p>
          </div>
        </div>

        <h3 className="text-asu-h4 font-bold text-asu-gray-1 mb-asu-2">With icon (one per page, default size only)</h3>
        <button className="bg-asu-maroon text-white font-bold rounded-full px-6 py-3 min-w-28 hover:scale-105 transition-transform flex items-center gap-2">
          <ArrowRight className="w-4 h-4" /> Start application
        </button>

        {/* Cards */}
        <SectionTitle id="cards" title="Cards" file="card-content.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          Zero border radius always. Content cards include a Lucide icon by default (32px, black). Interactive cards get gold border + shadow on hover.
        </p>

        <h3 className="text-asu-h4 font-bold text-asu-gray-1 mb-asu-2">Content card (with icon)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-asu-3 mb-asu-5">
          <div className="bg-white border border-asu-gray-4 rounded-none p-asu-4 flex flex-col h-full">
            <HeartPulse className="w-8 h-8 text-asu-gray-1 mt-asu-1 mb-asu-3" aria-hidden="true" />
            <h3 className="text-asu-h3 font-bold text-asu-gray-1">Card heading</h3>
            <p className="text-asu-body text-asu-gray-2 mt-asu-2">Short description of the content. One to three sentences maximum.</p>
            <a href="#" className="inline-block mt-auto pt-asu-5 pb-asu-2 self-start no-underline">
              <span className="bg-asu-maroon text-white font-bold rounded-full px-asu-3 py-asu-2 inline-block hover:scale-105 transition-transform">Explore this topic</span>
            </a>
          </div>
          <div className="bg-white border border-asu-gray-4 rounded-none p-asu-4 flex flex-col h-full">
            <FlaskConical className="w-8 h-8 text-asu-gray-1 mt-asu-1 mb-asu-3" aria-hidden="true" />
            <h3 className="text-asu-h3 font-bold text-asu-gray-1">Another card</h3>
            <p className="text-asu-body text-asu-gray-2 mt-asu-2">Cards stretch to equal height within the grid row using h-full and flex-col layout.</p>
            <a href="#" className="inline-block mt-auto pt-asu-5 pb-asu-2 self-start no-underline">
              <span className="bg-asu-maroon text-white font-bold rounded-full px-asu-3 py-asu-2 inline-block hover:scale-105 transition-transform">View details</span>
            </a>
          </div>
          <div className="bg-white border border-asu-gray-4 rounded-none p-asu-4 flex flex-col h-full">
            <Leaf className="w-8 h-8 text-asu-gray-1 mt-asu-1 mb-asu-3" aria-hidden="true" />
            <h3 className="text-asu-h3 font-bold text-asu-gray-1">Third card</h3>
            <p className="text-asu-body text-asu-gray-2 mt-asu-2">Button pushed to bottom via mt-auto. Icon is always first element.</p>
            <a href="#" className="inline-block mt-auto pt-asu-5 pb-asu-2 self-start no-underline">
              <span className="bg-asu-maroon text-white font-bold rounded-full px-asu-3 py-asu-2 inline-block hover:scale-105 transition-transform">Read more about this</span>
            </a>
          </div>
        </div>

        <h3 className="text-asu-h4 font-bold text-asu-gray-1 mb-asu-2">Interactive / Link card</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-asu-3">
          <a href="#" className="group block bg-white border-2 border-asu-gray-5 rounded-none p-asu-3 transition-all duration-200 hover:border-asu-gold hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-asu-gold focus-visible:ring-offset-2 no-underline">
            <p className="text-asu-body font-bold text-asu-gray-1 mb-1">Interactive card</p>
            <p className="text-asu-body-sm text-asu-gray-2 mb-asu-2">Hover to see gold border and shadow effect.</p>
            <span className="inline-flex items-center text-asu-maroon font-bold text-sm group-hover:text-asu-gray-1 transition-colors">
              View details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </div>

        {/* Card with image */}
        <SectionTitle id="card-image" title="Card with image" file="card-image.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          Image on top (4:3), icon + heading inline, body copy, and text link with arrow at bottom. Used in grids for research areas, programs, or topics.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-asu-3">
          <div className="bg-white border border-asu-gray-4 rounded-none flex flex-col h-full overflow-hidden">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=450&fit=crop" alt="DNA double helix visualization" className="w-full aspect-[4/3] object-cover" loading="lazy" />
            <div className="p-asu-3 flex flex-col flex-1">
              <div className="flex items-center gap-asu-1">
                <Dna className="w-8 h-8 text-asu-gray-1" aria-hidden="true" />
                <h3 className="text-asu-h3 font-bold text-asu-gray-1">Genomics</h3>
              </div>
              <p className="text-asu-body text-asu-gray-2 mt-asu-2">Decoding the blueprint of life through computational analysis of DNA sequences.</p>
              <a href="#" className="mt-auto pt-asu-3 inline-flex items-center text-asu-body font-bold text-asu-gray-1 no-underline hover:underline">
                View research area <ArrowRight className="w-4 h-4 ml-asu-1" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="bg-white border border-asu-gray-4 rounded-none flex flex-col h-full overflow-hidden">
            <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=450&fit=crop" alt="Forest canopy sunlight" className="w-full aspect-[4/3] object-cover" loading="lazy" />
            <div className="p-asu-3 flex flex-col flex-1">
              <div className="flex items-center gap-asu-1">
                <Leaf className="w-8 h-8 text-asu-gray-1" aria-hidden="true" />
                <h3 className="text-asu-h3 font-bold text-asu-gray-1">Ecology</h3>
              </div>
              <p className="text-asu-body text-asu-gray-2 mt-asu-2">Investigating how organisms interact with their environments and each other.</p>
              <a href="#" className="mt-auto pt-asu-3 inline-flex items-center text-asu-body font-bold text-asu-gray-1 no-underline hover:underline">
                View research area <ArrowRight className="w-4 h-4 ml-asu-1" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="bg-white border border-asu-gray-4 rounded-none flex flex-col h-full overflow-hidden">
            <img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&h=450&fit=crop" alt="Fluorescent microscopy of cells" className="w-full aspect-[4/3] object-cover" loading="lazy" />
            <div className="p-asu-3 flex flex-col flex-1">
              <div className="flex items-center gap-asu-1">
                <Microscope className="w-8 h-8 text-asu-gray-1" aria-hidden="true" />
                <h3 className="text-asu-h3 font-bold text-asu-gray-1">Cell biology</h3>
              </div>
              <p className="text-asu-body text-asu-gray-2 mt-asu-2">Revealing the molecular machinery that drives cellular processes.</p>
              <a href="#" className="mt-auto pt-asu-3 inline-flex items-center text-asu-body font-bold text-asu-gray-1 no-underline hover:underline">
                View research area <ArrowRight className="w-4 h-4 ml-asu-1" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Feature block */}
        <SectionTitle id="feature-block" title="Feature block" file="block-feature.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          Image + text side by side. 50/50 split. Border-2, items-stretch, rounded-none. Image left by default, swap with flex-row-reverse.
        </p>
        <div className="flex flex-col md:flex-row items-stretch border-2 border-asu-gray-5 rounded-none">
          <div className="w-full md:w-1/2">
            <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop" alt="Professor lecturing to students in a university classroom" className="w-full h-full object-cover aspect-[4/3]" />
          </div>
          <div className="w-full md:w-1/2 p-asu-5">
            <h3 className="text-asu-h2 font-bold text-asu-gray-1">Feature heading</h3>
            <p className="text-asu-body text-asu-gray-2 mt-asu-2">One to two paragraphs of supporting copy. Keep it concise and action-oriented.</p>
            <a href="#" className="inline-block mt-asu-3 bg-asu-gold text-asu-gray-1 font-bold rounded-full px-asu-3 py-asu-2 no-underline hover:scale-105 transition-transform">Explore this feature</a>
          </div>
        </div>

        {/* Card image overlay */}
        <SectionTitle id="card-overlay" title="Card image overlay" file="card-image-overlay.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          Full-width background image with dark gradient overlay. White card (max-w-md) positioned bottom-left. Maroon CTA button.
        </p>
        <section className="relative py-asu-9 rounded-none overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'linear-gradient(rgba(25, 25, 25, 0) 0%, rgba(25, 25, 25, 0.79) 100%), url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=600&fit=crop)' }}
            role="img"
            aria-label="Students collaborating at a table"
          />
          <div className="relative px-asu-3">
            <div className="bg-white rounded-none p-asu-4 max-w-md">
              <h3 className="text-asu-h3 font-bold text-asu-gray-1">Card heading</h3>
              <p className="text-asu-body text-asu-gray-2 mt-asu-2">One to two sentences of supporting copy placed over the image.</p>
              <a href="#" className="inline-block mt-asu-3">
                <span className="bg-asu-maroon text-white font-bold rounded-full px-asu-3 py-asu-2 inline-block hover:scale-105 transition-transform">View this resource</span>
              </a>
            </div>
          </div>
        </section>

        {/* Section CTA with live parallax */}
        <SectionTitle id="section-cta" title="Section CTA (parallax)" file="section-cta.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          Full-width parallax background with white card (lg:w-1/2). JS scroll-driven parallax via useEffect: 300px travel distance, scale(1.3), passive scroll listener, will-change-transform for GPU compositing. Max 2 buttons.
        </p>
        <ParallaxDemo />
        <div className="mt-asu-3 border border-asu-gray-4 rounded-none p-asu-3">
          <p className="text-asu-body-sm text-asu-gray-2">Parallax formula: <code className="text-asu-body-xs bg-asu-gray-7 px-1">scrollProgress = -rect.top / (rect.height + window.innerHeight)</code> then <code className="text-asu-body-xs bg-asu-gray-7 px-1">transform: translateY(scrollProgress * 300px) scale(1.3)</code>. Uses <code className="text-asu-body-xs bg-asu-gray-7 px-1">useRef</code> to avoid re-renders. Works on iOS (unlike bg-fixed).</p>
        </div>

        {/* Stats bar */}
        <SectionTitle id="stats-bar" title="Stats bar" file="pattern-custom.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          Gold background. Numbers as bold black headlines. Labels get black highlight with white text. Never use maroon background.
        </p>
        <div className="w-full bg-asu-gold py-asu-5 rounded-none">
          <div className="px-asu-3 grid grid-cols-2 md:grid-cols-4 gap-asu-3">
            <div>
              <div className="text-asu-h2 font-black text-asu-gray-1">200+</div>
              <span className="bg-asu-gray-1 text-white text-asu-body font-bold px-asu-1 py-1 inline-block mt-asu-1">Faculty members</span>
            </div>
            <div>
              <div className="text-asu-h2 font-black text-asu-gray-1">$95M</div>
              <span className="bg-asu-gray-1 text-white text-asu-body font-bold px-asu-1 py-1 inline-block mt-asu-1">Research funding</span>
            </div>
            <div>
              <div className="text-asu-h2 font-black text-asu-gray-1">3,200</div>
              <span className="bg-asu-gray-1 text-white text-asu-body font-bold px-asu-1 py-1 inline-block mt-asu-1">Students enrolled</span>
            </div>
            <div>
              <div className="text-asu-h2 font-black text-asu-gray-1">1,500+</div>
              <span className="bg-asu-gray-1 text-white text-asu-body font-bold px-asu-1 py-1 inline-block mt-asu-1">Publications</span>
            </div>
          </div>
        </div>

        {/* Related links */}
        <SectionTitle id="related-links" title="Related links" file="nav-related-links.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          Heading above a bordered nav list. Links are black, no-underline, hover:underline. Border separates each item.
        </p>
        <div className="max-w-sm">
          <h3 className="text-asu-h3 font-bold text-asu-gray-1 pb-asu-2">Related links</h3>
          <nav aria-label="Related links" className="border border-asu-gray-4 rounded-none">
            <div className="py-asu-3 px-asu-3 border-b border-asu-gray-4">
              <a href="#" className="text-asu-body text-asu-gray-1 no-underline hover:underline">First link item</a>
            </div>
            <div className="py-asu-3 px-asu-3 border-b border-asu-gray-4">
              <a href="#" className="text-asu-body text-asu-gray-1 no-underline hover:underline">Second link item</a>
            </div>
            <div className="py-asu-3 px-asu-3">
              <a href="#" className="text-asu-body text-asu-gray-1 no-underline hover:underline">Third link item</a>
            </div>
          </nav>
        </div>

        {/* Text highlights */}
        <SectionTitle id="highlights" title="Text highlights" file="token-typography.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          Gold or black background fill on H1 through H4 only. Never on body copy. Used for emphasis on key words within headings.
        </p>
        <div className="space-y-asu-4">
          <div className="p-asu-4 bg-white border border-asu-gray-4 rounded-none">
            <p className="text-asu-body-xs text-asu-gray-3 mb-2">Gold highlight on white</p>
            <h2 className="text-asu-h2 font-bold text-asu-gray-1">The power of <span className="bg-asu-gold px-1">discovery</span></h2>
          </div>
          <div className="p-asu-4 bg-white border border-asu-gray-4 rounded-none">
            <p className="text-asu-body-xs text-asu-gray-3 mb-2">Black highlight on white</p>
            <h2 className="text-asu-h2 font-bold text-asu-gray-1">Built for <span className="bg-asu-gray-1 text-white px-1">innovation</span></h2>
          </div>
          <div className="p-asu-4 bg-asu-gray-1 rounded-none">
            <p className="text-asu-body-xs text-asu-gray-5 mb-2">Gold highlight on dark background</p>
            <h2 className="text-asu-h2 font-bold text-white">Shaping the <span className="bg-asu-gold text-asu-gray-1 px-1">future</span></h2>
          </div>
        </div>

        {/* Block Quote */}
        <SectionTitle id="block-quote" title="Block quote" file="pattern-custom.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          Full-width typographic statement for institutional quotes (charter, values). Hero H1 scale. Gold highlights on 1-3 key phrases. Light and dark variants with topographic background texture.
        </p>
        <div className="space-y-asu-4">
          <div className="py-12 rounded-none" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}asu/backgrounds/h5fBqGHPdBnWNSjkXQUbHQ.png)`, backgroundRepeat: 'repeat' }}>
            <div className="max-w-asu-content mx-auto px-6">
              <p className="text-sm font-bold text-asu-gray-1 mb-4">The ASU difference:</p>
              <h2 className="text-asu-h1-hero font-black text-asu-gray-1">
                We are measured not by whom we exclude, but by <span className="bg-asu-gold px-1">whom we include</span> and <span className="bg-asu-gold px-1">how they succeed</span>
              </h2>
              <p className="text-sm text-asu-gray-3 mt-6">Excerpt from ASU charter</p>
            </div>
          </div>
          <div className="py-12 bg-asu-gray-1 rounded-none" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}asu/backgrounds/gIYRGFq7o6-mPadTBNFszg.png)`, backgroundRepeat: 'repeat' }}>
            <div className="max-w-asu-content mx-auto px-6">
              <p className="text-sm font-bold text-asu-gold mb-4">The ASU difference:</p>
              <h2 className="text-asu-h1-hero font-black text-white">
                We are measured not by whom we exclude, but by <span className="bg-asu-gold text-asu-gray-1 px-1">whom we include</span> and <span className="bg-asu-gold text-asu-gray-1 px-1">how they succeed</span>
              </h2>
              <p className="text-sm text-asu-gray-5 mt-6">Excerpt from ASU charter</p>
            </div>
          </div>
        </div>

        {/* ═══════════════ NAVIGATION ═══════════════ */}

        {/* Inline Links */}
        <SectionTitle id="inline-links" title="Inline links" file="link-inline.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          Maroon on light backgrounds, gold on dark. Underlined by default, underline removed on hover. External links always include icon. Never use "click here" or "learn more."
        </p>
        <div className="space-y-asu-4">
          <div className="p-asu-4 bg-white border border-asu-gray-4 rounded-none">
            <p className="text-asu-body-xs text-asu-gray-3 mb-2">Internal link (light bg)</p>
            <p className="text-asu-body text-asu-gray-1">Visit the <a href="#" className="text-asu-maroon underline hover:no-underline">Biology Department research page</a> for current projects.</p>
          </div>
          <div className="p-asu-4 bg-asu-gray-1 rounded-none">
            <p className="text-asu-body-xs text-asu-gray-5 mb-2">Internal link (dark bg)</p>
            <p className="text-asu-body text-white">Explore <a href="#" className="text-asu-gold underline hover:no-underline">graduate program opportunities</a> in the life sciences.</p>
          </div>
          <div className="p-asu-4 bg-white border border-asu-gray-4 rounded-none">
            <p className="text-asu-body-xs text-asu-gray-3 mb-2">External link (includes icon)</p>
            <p className="text-asu-body text-asu-gray-1">Published in <a href="#" className="text-asu-maroon underline hover:no-underline inline-flex items-center gap-1">Nature Genetics <svg className="w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></a> in 2024.</p>
          </div>
        </div>

        {/* Tabbed Panel */}
        <SectionTitle id="tab-panel" title="Tabbed panel" file="tab-panel.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          2-9 tabs. Active tab: maroon text + maroon underline. Max 688px wide (7 cols), min 280px (3 cols). Same-context supplementary content only. Never for critical info or content that must be compared across tabs.
        </p>
        <div className="w-full max-w-[688px]">
          <div className="relative flex border-b border-asu-gray-4">
            {['tab1', 'tab2', 'tab3'].map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-asu-body whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab ? 'text-asu-maroon font-bold border-asu-maroon' : 'text-asu-gray-1 border-transparent hover:text-asu-maroon'
                }`}
              >
                {['Overview', 'Requirements', 'Faculty'][i]}
              </button>
            ))}
          </div>
          <div className="py-asu-3 text-asu-gray-1 text-asu-body">
            {activeTab === 'tab1' && <p>Tab panel content for the overview section. This can include long-form text, images, and multimedia.</p>}
            {activeTab === 'tab2' && <p>Degree requirements and prerequisite courses are listed here. Students should consult with their advisor.</p>}
            {activeTab === 'tab3' && <p>Faculty profiles, research interests, and contact information displayed in this panel.</p>}
          </div>
        </div>

        {/* Sidebar Menu */}
        <SectionTitle id="sidebar-menu" title="Sidebar menu" file="nav-sidebar.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          Vertical nav for in-section wayfinding. Gold left border on active item. Dropdown children on gray-7 background. Never replaces global header nav. Collapses to dropdown on mobile.
        </p>
        <div className="max-w-xs">
          <h3 className="text-asu-h3 font-bold text-asu-gray-1 mb-4">Biology programs</h3>
          <ul className="list-none m-0 p-0 border border-asu-gray-4 rounded-none bg-white">
            <li className="border-b border-asu-gray-6">
              <a href="#" className="block px-4 py-3 text-asu-body text-asu-gray-1 font-bold no-underline border-l-[5px] border-l-asu-gold hover:bg-asu-gray-7">Overview</a>
            </li>
            <li className="border-b border-asu-gray-6">
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="w-full flex items-center justify-between px-4 py-3 text-asu-body text-asu-gray-2 text-left hover:bg-asu-gray-7 border-l-[5px] border-l-transparent"
              >
                Curriculum
                <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${openDropdown ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown && (
                <ul className="list-none m-0 p-0 bg-asu-gray-7">
                  <li><a href="#" className="block px-4 py-2 pl-8 text-asu-body-sm text-asu-maroon underline hover:no-underline">Core courses</a></li>
                  <li><a href="#" className="block px-4 py-2 pl-8 text-asu-body-sm text-asu-maroon underline hover:no-underline">Elective tracks</a></li>
                </ul>
              )}
            </li>
            <li className="border-b border-asu-gray-6">
              <a href="#" className="block px-4 py-3 text-asu-body text-asu-gray-2 no-underline border-l-[5px] border-l-transparent hover:bg-asu-gray-7 hover:underline">Research opportunities</a>
            </li>
            <li className="border-b border-asu-gray-6">
              <a href="#" className="block px-4 py-3 text-asu-body text-asu-gray-2 no-underline border-l-[5px] border-l-transparent hover:bg-asu-gray-7 hover:underline">Faculty</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-3 text-asu-body text-asu-gray-2 no-underline border-l-[5px] border-l-transparent hover:bg-asu-gray-7 hover:underline">Contact</a>
            </li>
          </ul>
        </div>

        {/* Breadcrumbs */}
        <SectionTitle id="breadcrumbs" title="Breadcrumbs" file="pattern-custom.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          Horizontal navigation trail. Links are maroon, underlined, hover removes underline. Separator is forward slash. Last item is plain text (current page). Placed below hero/header, inside content container.
        </p>
        <nav aria-label="Breadcrumb" className="py-4 border border-asu-gray-4 rounded-none px-asu-3">
          <ol className="flex items-center gap-4 text-sm">
            <li className="flex items-center gap-4">
              <a href="#" className="text-asu-maroon underline hover:no-underline">Home</a>
            </li>
            <li className="flex items-center gap-4">
              <span className="text-asu-gray-3">/</span>
              <a href="#" className="text-asu-maroon underline hover:no-underline">College of Liberal Arts and Sciences</a>
            </li>
            <li className="flex items-center gap-4">
              <span className="text-asu-gray-3">/</span>
              <a href="#" className="text-asu-maroon underline hover:no-underline">School of Life Sciences</a>
            </li>
            <li className="flex items-center gap-4">
              <span className="text-asu-gray-3">/</span>
              <span className="text-asu-gray-1">Biology programs</span>
            </li>
          </ol>
        </nav>

        {/* ═══════════════ FORMS & FEEDBACK ═══════════════ */}

        {/* Text Input */}
        <SectionTitle id="text-input" title="Text input" file="form-text-input.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          Label always above field. Gold focus ring. Rounded-none. Required fields show bullet dot (•) before label. Validation bar + message below field, never inside. Five states: default, focused, success, error, disabled.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-asu-4 max-w-2xl">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-asu-gray-1">First name</label>
            <input type="text" placeholder="Enter your first name" className="w-full px-4 py-3 border border-asu-gray-5 rounded-none text-base bg-white text-asu-gray-1 placeholder:text-asu-gray-3 focus:outline-none focus:border-asu-gold focus:ring-2 focus:ring-asu-gold/10" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-asu-gray-1"><span className="text-asu-error mr-1">•</span>Email (required)</label>
            <input type="email" placeholder="name@asu.edu" className="w-full px-4 py-3 border border-asu-gray-5 rounded-none text-base bg-white text-asu-gray-1 placeholder:text-asu-gray-3 focus:outline-none focus:border-asu-gold focus:ring-2 focus:ring-asu-gold/10" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-asu-gray-1">With error</label>
            <input type="text" defaultValue="Invalid input" className="w-full px-4 py-3 border border-asu-error rounded-none text-base bg-white text-asu-gray-1 focus:outline-none focus:border-asu-error focus:ring-2 focus:ring-asu-error/10" />
            <div className="h-1 bg-asu-error rounded-none" />
            <p className="text-asu-error text-asu-body-xs flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> This field is required</p>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-asu-gray-3">Disabled field</label>
            <input type="text" placeholder="Not available" disabled className="w-full px-4 py-3 border border-asu-gray-5 rounded-none text-base bg-asu-gray-6 text-asu-gray-3 cursor-not-allowed" />
          </div>
        </div>
        <div className="mt-asu-4 max-w-md">
          <label className="text-sm font-semibold text-asu-gray-1 block mb-1">Textarea</label>
          <textarea placeholder="Add notes..." className="w-full p-4 border border-asu-gray-5 rounded-none text-base leading-relaxed resize-none focus:outline-none focus:border-asu-gold focus:ring-2 focus:ring-asu-gold/10 min-h-28" />
        </div>

        {/* Checkbox */}
        <SectionTitle id="checkbox" title="Checkbox" file="form-checkbox.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          Label above group. Options listed vertically. Validation messages between label and options. Use when multiple selections allowed; radio for single selection.
        </p>
        <div className="max-w-sm">
          <fieldset className="flex flex-col gap-2">
            <legend className="text-asu-gray-1 font-bold text-asu-body mb-1">Areas of interest</legend>
            <label className="flex items-start gap-2 cursor-pointer text-asu-gray-1 text-asu-body">
              <input type="checkbox" defaultChecked className="mt-0.5 w-4 h-4 border border-asu-gray-2 rounded-none focus:ring-2 focus:ring-asu-gold" />
              Molecular biology
            </label>
            <label className="flex items-start gap-2 cursor-pointer text-asu-gray-1 text-asu-body">
              <input type="checkbox" className="mt-0.5 w-4 h-4 border border-asu-gray-2 rounded-none focus:ring-2 focus:ring-asu-gold" />
              Ecology and evolution
            </label>
            <label className="flex items-start gap-2 cursor-pointer text-asu-gray-1 text-asu-body">
              <input type="checkbox" className="mt-0.5 w-4 h-4 border border-asu-gray-2 rounded-none focus:ring-2 focus:ring-asu-gold" />
              Genetics and genomics
            </label>
            <label className="flex items-start gap-2 cursor-pointer text-asu-gray-1 text-asu-body">
              <input type="checkbox" className="mt-0.5 w-4 h-4 border border-asu-gray-2 rounded-none focus:ring-2 focus:ring-asu-gold" />
              Neuroscience
            </label>
          </fieldset>
        </div>

        {/* System Alerts */}
        <SectionTitle id="alerts" title="System alerts" file="alert-system.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          Four types with fixed colors and icons. Animate in: fade + slide down 32px, 0.5s cubic-bezier(.19,1,.19,1). Always dismissible. Only one alert at a time. Never sticky.
        </p>
        <div className="space-y-asu-3">
          <div className="bg-asu-warning-bg border border-asu-warning rounded-none px-4 py-3 flex items-start gap-3">
            <Bell className="w-5 h-5 text-asu-warning-text-light mt-0.5 flex-shrink-0" />
            <p className="text-asu-warning-text-light text-asu-body flex-1">Warning: System maintenance scheduled for tonight at 11 PM.</p>
            <button className="text-asu-warning-text-light opacity-70 hover:opacity-100"><X className="w-4 h-4" /></button>
          </div>
          <div className="bg-asu-info-bg border border-asu-info rounded-none px-4 py-3 flex items-start gap-3">
            <Info className="w-5 h-5 text-asu-info mt-0.5 flex-shrink-0" />
            <p className="text-asu-gray-1 text-asu-body flex-1">Information: Registration opens Monday, August 19.</p>
            <button className="text-asu-gray-1 opacity-70 hover:opacity-100"><X className="w-4 h-4" /></button>
          </div>
          <div className="bg-asu-success-bg border border-asu-success rounded-none px-4 py-3 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-asu-success mt-0.5 flex-shrink-0" />
            <p className="text-asu-success text-asu-body flex-1">Your application has been submitted successfully.</p>
            <button className="text-asu-success opacity-70 hover:opacity-100"><X className="w-4 h-4" /></button>
          </div>
          <div className="bg-asu-error-bg border border-asu-error rounded-none px-4 py-3 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-asu-error mt-0.5 flex-shrink-0" />
            <p className="text-asu-error text-asu-body flex-1">Error: Unable to submit form. Check required fields and try again.</p>
            <button className="text-asu-error opacity-70 hover:opacity-100"><X className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Modal */}
        <SectionTitle id="modal" title="Modal" file="modal.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          Dark overlay (70% opacity) + centered white content block. Only for critical info. Fade in 0.1s linear. Close button top-right at 50% opacity, 100% on hover. Always provide two close controls.
        </p>
        <div className="relative border border-asu-gray-4 rounded-none p-asu-4 bg-asu-gray-5/30 flex items-center justify-center min-h-[300px]">
          <div className="relative bg-white rounded-none shadow-lg w-full max-w-md p-asu-5">
            <button className="absolute top-4 right-4 text-asu-gray-1 opacity-50 hover:opacity-100"><X className="w-5 h-5" /></button>
            <h2 className="text-asu-h3 font-bold text-asu-gray-1 mb-asu-2">Confirm deletion</h2>
            <p className="text-asu-body text-asu-gray-2 mb-asu-3">This action cannot be undone. Are you sure you want to remove this item?</p>
            <div className="flex gap-asu-2">
              <button className="bg-asu-maroon text-white font-bold rounded-full px-asu-3 py-asu-2 hover:scale-105 transition-transform">Delete permanently</button>
              <button className="bg-asu-gray-6 text-asu-gray-1 font-bold rounded-full px-asu-3 py-asu-2 hover:scale-105 transition-transform">Cancel</button>
            </div>
          </div>
        </div>
        <button onClick={() => setShowModal(true)} className="mt-asu-3 bg-asu-maroon text-white font-bold rounded-full px-asu-3 py-asu-2 hover:scale-105 transition-transform">
          Open live modal
        </button>

        {/* Table */}
        <SectionTitle id="table" title="Table" file="table.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          For dense reference data. Header row on gray-6. Rows highlight to gray-6 on hover. Spans 6-12 columns desktop, full width mobile. Sentence case headers. Cells max 3-4 lines.
        </p>
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse text-asu-body text-asu-gray-1">
            <thead>
              <tr className="bg-asu-gray-6 text-left">
                <th className="px-4 py-3 font-bold text-asu-gray-1 border-b border-asu-gray-4 whitespace-nowrap">Program</th>
                <th className="px-4 py-3 font-bold text-asu-gray-1 border-b border-asu-gray-4 whitespace-nowrap">Degree</th>
                <th className="px-4 py-3 font-bold text-asu-gray-1 border-b border-asu-gray-4 whitespace-nowrap">Credits</th>
                <th className="px-4 py-3 font-bold text-asu-gray-1 border-b border-asu-gray-4 whitespace-nowrap">Format</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white hover:bg-asu-gray-6 transition-colors border-b border-asu-gray-4">
                <td className="px-4 py-3">Biological sciences</td>
                <td className="px-4 py-3">BS</td>
                <td className="px-4 py-3">120</td>
                <td className="px-4 py-3">In person</td>
              </tr>
              <tr className="bg-white hover:bg-asu-gray-6 transition-colors border-b border-asu-gray-4">
                <td className="px-4 py-3">Molecular biosciences</td>
                <td className="px-4 py-3">PhD</td>
                <td className="px-4 py-3">84</td>
                <td className="px-4 py-3">In person</td>
              </tr>
              <tr className="bg-white hover:bg-asu-gray-6 transition-colors border-b border-asu-gray-4">
                <td className="px-4 py-3">Applied biological sciences</td>
                <td className="px-4 py-3">MS</td>
                <td className="px-4 py-3">30</td>
                <td className="px-4 py-3">Online</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ═══════════════ CONTENT ═══════════════ */}

        {/* Writing Style */}
        <SectionTitle id="writing-style" title="Writing style" file="guide-writing.md" />
        <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-2xl">
          Confident without being aggressive. Second person dominant ("you"). Short declarative sentences. Action verbs on CTAs. Never hedge or qualify.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-asu-3 max-w-2xl">
          <div className="border border-asu-gray-4 rounded-none p-asu-3">
            <p className="text-asu-body-xs text-asu-success font-bold mb-2">Do</p>
            <p className="text-asu-body text-asu-gray-1 font-bold">"Apply now"</p>
            <p className="text-asu-body text-asu-gray-1 font-bold">"Find your fit"</p>
            <p className="text-asu-body text-asu-gray-1 font-bold">"Join an academic community"</p>
          </div>
          <div className="border border-asu-gray-4 rounded-none p-asu-3">
            <p className="text-asu-body-xs text-asu-error font-bold mb-2">Don't</p>
            <p className="text-asu-body text-asu-gray-3 line-through">"Learn more"</p>
            <p className="text-asu-body text-asu-gray-3 line-through">"We invite you to consider joining"</p>
            <p className="text-asu-body text-asu-gray-3 line-through">"Click here for info"</p>
          </div>
        </div>
        <div className="mt-asu-4 border border-asu-gray-4 rounded-none p-asu-3 max-w-2xl">
          <h3 className="text-asu-h5 font-semibold text-asu-gray-1 mb-2">Key rules</h3>
          <ul className="text-asu-body-sm text-asu-gray-2 space-y-1 list-disc list-inside">
            <li>Headlines rarely longer than 10 words</li>
            <li>Sentence case always, never all caps</li>
            <li>No em dashes, en dashes, or hyphens as prefixes</li>
            <li>No punctuation in button labels</li>
            <li>Numbers get display scale, not paragraphs</li>
            <li>Belonging before prestige in student-facing contexts</li>
          </ul>
        </div>

      </main>

      {/* Live modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-asu-gray-1 opacity-70" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-none shadow-lg w-full max-w-md mx-4 p-asu-5 animate-[fadeIn_0.1s_linear]">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-asu-gray-1 opacity-50 hover:opacity-100 transition-opacity">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-asu-h3 font-bold text-asu-gray-1 mb-asu-2">Modal example</h2>
            <p className="text-asu-body text-asu-gray-2 mb-asu-3">This is a live modal demonstrating the overlay, content block, and close behavior.</p>
            <div className="flex gap-asu-2">
              <button onClick={() => setShowModal(false)} className="bg-asu-maroon text-white font-bold rounded-full px-asu-3 py-asu-2 hover:scale-105 transition-transform">Confirm action</button>
              <button onClick={() => setShowModal(false)} className="bg-asu-gray-6 text-asu-gray-1 font-bold rounded-full px-asu-3 py-asu-2 hover:scale-105 transition-transform">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Texture modal */}
      {textureModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-asu-4">
          <div className="absolute inset-0 bg-asu-gray-1 opacity-70" onClick={() => setTextureModal(null)} />
          <div className="relative bg-white rounded-none shadow-lg w-full max-w-3xl max-h-[90vh] overflow-hidden">
            <button onClick={() => setTextureModal(null)} className="absolute top-4 right-4 z-10 text-asu-gray-1 opacity-50 hover:opacity-100 transition-opacity bg-white rounded-full p-1">
              <X className="w-5 h-5" />
            </button>
            <div className="h-[70vh] bg-repeat" style={{ backgroundImage: `url(${textureModal})` }} />
            <div className="p-asu-3 border-t border-asu-gray-4">
              <p className="text-asu-body-sm font-mono text-asu-gray-2">{textureModal}</p>
            </div>
          </div>
        </div>
      )}

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-asu-gray-5 text-asu-gray-2 flex items-center justify-center shadow-lg hover:bg-asu-gold hover:text-asu-gray-1 transition-colors"
          aria-label="Scroll to top"
        >
          <ChevronDown className="w-5 h-5 rotate-180" />
        </button>
      )}
    </div>
  )
}
