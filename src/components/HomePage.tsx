import { FlaskConical, Leaf, Microscope, Dna, GraduationCap, BookOpen, ArrowRight, ChevronDown, HeartPulse, Database, TreePine } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const STATS = [
  { number: '200+', label: 'Faculty researchers' },
  { number: '$95M', label: 'Annual research funding' },
  { number: '3,200', label: 'Enrolled students' },
  { number: '1,500+', label: 'Publications per year' },
]

const RESEARCH_AREAS = [
  {
    title: 'Genomics and bioinformatics',
    description:
      'Decoding the blueprint of life through computational analysis of DNA, RNA, and protein sequences to understand disease, evolution, and biodiversity.',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&h=400&fit=crop',
    alt: 'Researcher analyzing DNA sequences on a computer screen in a genomics lab',
    icon: Dna,
  },
  {
    title: 'Ecology and evolution',
    description:
      'Investigating how organisms interact with their environments and each other — from desert ecosystems to global biodiversity patterns shaped over millions of years.',
    image: 'https://images.unsplash.com/photo-1500829243541-74b677fecc30?w=600&h=400&fit=crop',
    alt: 'Ecologist studying plant diversity in a sunlit forest field site',
    icon: Leaf,
  },
  {
    title: 'Cell and molecular biology',
    description:
      'Revealing the molecular machinery that drives cellular processes — from gene regulation and protein folding to the mechanisms underlying cancer and neurodegeneration.',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&h=400&fit=crop',
    alt: 'Fluorescence microscopy image of stained cells in a biology laboratory',
    icon: Microscope,
  },
]

const PROGRAMS = [
  {
    degree: 'BS in biological sciences',
    description:
      'A comprehensive foundation in modern biology, preparing graduates for medical school, research careers, or industry positions in biotechnology.',
    icon: FlaskConical,
  },
  {
    degree: 'BS in conservation biology',
    description:
      "Training the next generation of environmental stewards through fieldwork, GIS mapping, and ecosystem management across Arizona's diverse biomes.",
    icon: Leaf,
  },
  {
    degree: 'MS in biology',
    description:
      'Advanced study combining coursework with original research, producing thesis-level contributions to peer-reviewed science within two years.',
    icon: GraduationCap,
  },
  {
    degree: 'PhD in evolutionary biology',
    description:
      "Doctoral training in one of the nation's top-ranked evolutionary biology programs, with access to world-class genomic facilities and field stations.",
    icon: BookOpen,
  },
]

const NEWS = [
  {
    date: 'May 12, 2026',
    title: 'ASU biologists discover high-altitude gene variant in Sonoran Desert lizards',
    excerpt:
      'A team led by Dr. Maria Vasquez identified a novel gene variant that allows chuckwallas to regulate body temperature at elevations above 4,000 feet.',
  },
  {
    date: 'April 28, 2026',
    title: 'Department receives $12M NIH grant for microbiome research center',
    excerpt:
      'The five-year award will fund a new interdisciplinary center studying gut-brain axis interactions and their role in neurodegenerative disease.',
  },
  {
    date: 'April 15, 2026',
    title: 'Undergraduate team wins national iGEM competition',
    excerpt:
      'Four ASU biology undergraduates earned gold medals at the International Genetically Engineered Machine competition in Boston.',
  },
]

const CAREER_SIDEBAR_ITEMS = [
  { label: 'Career overview', href: '#', active: true },
  {
    label: 'Healthcare and medicine',
    children: [
      { label: 'Medical school preparation', href: '#' },
      { label: 'Clinical research', href: '#' },
      { label: 'Public health', href: '#' },
    ],
  },
  {
    label: 'Research and academia',
    children: [
      { label: 'Graduate school pathways', href: '#' },
      { label: 'Postdoctoral positions', href: '#' },
    ],
  },
  { label: 'Biotechnology and industry', href: '#' },
  { label: 'Conservation and ecology', href: '#' },
  { label: 'Alumni success stories', href: '#' },
]

function CareersSidebar() {
  const [openDropdowns, setOpenDropdowns] = useState<Set<number>>(new Set())

  function toggleDropdown(index: number) {
    setOpenDropdowns((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  return (
    <nav className="w-full">
      <h3 className="text-asu-h3 font-bold text-asu-gray-1 mb-4">Career paths</h3>
      <ul className="list-none m-0 p-0 border border-asu-gray-4 rounded-none bg-white">
        {CAREER_SIDEBAR_ITEMS.map((item, index) => (
          <li key={item.label} className="border-b border-asu-gray-6 last:border-b-0">
            {item.children ? (
              <>
                <button
                  onClick={() => toggleDropdown(index)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-asu-body text-left transition-colors hover:bg-asu-gray-7 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-asu-gold focus-visible:ring-inset ${
                    item.active
                      ? 'text-asu-gray-1 font-bold border-l-[5px] border-l-asu-gold'
                      : 'text-asu-gray-2 border-l-[5px] border-l-transparent'
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    className={`w-4 h-4 flex-shrink-0 transition-transform ${
                      openDropdowns.has(index) ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openDropdowns.has(index) && (
                  <ul className="list-none m-0 p-0 bg-asu-gray-7">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <a
                          href={child.href || '#'}
                          className="block px-4 py-2 pl-8 text-asu-body-sm text-asu-maroon underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-asu-gold focus-visible:ring-inset transition-colors"
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <a
                href={item.href || '#'}
                className={`block px-4 py-3 text-asu-body transition-colors hover:bg-asu-gray-7 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-asu-gold focus-visible:ring-inset ${
                  item.active
                    ? 'text-asu-gray-1 font-bold border-l-[5px] border-l-asu-gold'
                    : 'text-asu-gray-2 no-underline border-l-[5px] border-l-transparent'
                }`}
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

function ParallaxSection() {
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
        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&h=1200&fit=crop"
        alt="University students in graduation caps and gowns celebrating on campus"
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
      />
      <div className="relative max-w-asu-content mx-auto px-asu-3">
        <div className="bg-white rounded-none p-asu-4 lg:w-1/2">
          <h2 className="text-asu-h2 font-bold text-asu-gray-1">
            Experience biology in the field
          </h2>
          <div className="text-asu-body text-asu-gray-2 mt-asu-2">
            <p>
              Our students access 2,400 acres of dedicated research stations across Arizona, from the Sonoran Desert floor to high-elevation pine forests. Field courses let you collect real data alongside faculty mentors and contribute to{' '}
              <a href="#" className="font-bold text-asu-maroon underline hover:no-underline">
                active conservation projects
              </a>{' '}
              that protect threatened species and ecosystems.
            </p>
          </div>
          <div className="flex flex-wrap gap-asu-2 mt-asu-3">
            <a
              href="#"
              className="inline-block bg-asu-maroon text-white font-bold rounded-full px-asu-3 py-asu-2 hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-asu-gold focus-visible:ring-offset-2"
            >
              Browse field courses
            </a>
            <a
              href="#"
              className="inline-block bg-asu-maroon text-white font-bold rounded-full px-asu-3 py-asu-2 hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-asu-gold focus-visible:ring-offset-2"
            >
              View research stations
            </a>
            <a
              href="#"
              className="inline-block bg-asu-gold text-asu-gray-1 font-bold rounded-full px-asu-3 py-asu-2 hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-asu-gold focus-visible:ring-offset-2"
            >
              Apply now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative w-full h-asu-hero-lg overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1920&h=800&fit=crop"
          alt="Modern biology research laboratory with advanced scientific equipment and blue lighting"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-asu-gray-1/80" />
        <div className="relative h-full flex items-end">
          <div className="w-full max-w-asu-content mx-auto px-asu-3 pb-asu-8">
            <p className="text-sm font-bold text-asu-gold mb-2">
              School of Life Sciences
            </p>
            <h1 className="text-asu-h1-hero font-black text-white mb-asu-2 max-w-2xl">
              Discover. Research. Transform.
            </h1>
            <p className="text-asu-body-lg text-white/90 max-w-xl mb-asu-4">
              At ASU Biology, 200+ faculty and 3,200 students push the boundaries of life science — from desert ecology to precision genomics — solving problems that shape human health and our planet.
            </p>
            <a
              href="#programs"
              className="inline-block bg-asu-gold text-asu-gray-1 font-bold rounded-full px-asu-3 py-asu-2 min-w-28 hover:scale-105 transition-transform no-underline"
            >
              Explore our programs
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="w-full bg-asu-gold py-asu-5">
        <div className="max-w-asu-content mx-auto px-asu-3 grid grid-cols-2 md:grid-cols-4 gap-asu-3">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="text-asu-h2 font-black text-asu-gray-1">
                {stat.number}
              </div>
              <span className="bg-asu-gray-1 text-white text-asu-body font-bold px-asu-1 py-1 inline-block mt-asu-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Block quote */}
      <section
        className="py-asu-6 md:py-asu-9"
        style={{ backgroundImage: 'url(/asu/backgrounds/h5fBqGHPdBnWNSjkXQUbHQ.png)', backgroundRepeat: 'repeat' }}
      >
        <div className="max-w-asu-content mx-auto px-asu-3">
          <p className="text-sm font-bold text-asu-gray-1 mb-asu-2">Our mission</p>
          <h2 className="text-asu-h1-hero font-black text-asu-gray-1">
            Nothing in biology makes sense except in the light of{' '}
            <span className="bg-asu-gold px-1">evolution</span>
          </h2>
          <p className="text-sm text-asu-gray-3 mt-asu-3">
            Theodosius Dobzhansky, 1973
          </p>
        </div>
      </section>

      {/* Course information */}
      <section className="w-full py-asu-9">
        <div className="max-w-asu-content mx-auto px-asu-3">
          <div className="grid md:grid-cols-2 gap-asu-6 items-start">
            <div>
              <p className="flex items-center gap-3 text-sm font-bold text-asu-gray-1 mb-2">
                <span className="w-1 h-5 bg-asu-gold" />
                Course catalog
              </p>
              <h2 className="text-asu-h2 font-bold text-asu-gray-1 mb-asu-3">
                Courses designed for the next generation of biologists
              </h2>
              <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-xl">
                From introductory cell biology to advanced bioinformatics, our 120+ courses span every major discipline in the life sciences. Each course integrates hands-on lab work with current research, ensuring graduates are prepared for careers in medicine, industry, and academia.
              </p>
              <p className="text-asu-body text-asu-gray-2 mb-asu-4 max-w-xl">
                Students gain access to state-of-the-art facilities including genomic sequencing labs, electron microscopy suites, and 2,400 acres of desert field stations — all within their first two years.
              </p>
              <a
                href="#"
                className="inline-block bg-asu-gold text-asu-gray-1 font-bold rounded-full px-asu-3 py-asu-2 min-w-28 hover:scale-105 transition-transform no-underline"
              >
                Browse all courses
              </a>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=600&h=500&fit=crop"
                alt="Biology students conducting a hands-on experiment in a modern university laboratory"
                className="w-full h-auto object-cover rounded-none border-2 border-asu-gray-5"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature block + Careers section */}
      <section className="w-full py-asu-9 bg-asu-gray-7">
        <div className="max-w-asu-content mx-auto px-asu-3">
          <div className="flex flex-col md:flex-row items-stretch border-2 border-asu-gray-5 rounded-none">
            <div className="w-full md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=600&fit=crop"
                alt="Researcher analyzing genomic data on multiple monitors in a bioinformatics lab"
                className="w-full h-full object-cover aspect-[4/3]"
                loading="lazy"
              />
            </div>
            <div className="w-full md:w-1/2 p-asu-5">
              <h3 className="text-asu-h2 font-bold text-asu-gray-1">Research that changes lives</h3>
              <p className="text-asu-body text-asu-gray-2 mt-asu-2">
                Our faculty lead over 400 active research projects spanning cancer genomics, desert ecology, synthetic biology, and neuroscience. Students join labs as early as their freshman year, co-authoring publications and presenting at national conferences.
              </p>
              <a
                href="#"
                className="inline-block mt-asu-3 bg-asu-gold text-asu-gray-1 font-bold rounded-full px-asu-3 py-asu-2 no-underline hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-asu-gold focus-visible:ring-offset-2"
              >
                Explore faculty research labs
              </a>
            </div>
          </div>

          {/* Top jobs in biology */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-asu-3 mt-asu-9">
            <div className="bg-white border border-asu-gray-4 rounded-none p-asu-4 flex flex-col h-full">
              <HeartPulse className="w-8 h-8 text-asu-gray-1 mt-asu-1 mb-asu-3" aria-hidden="true" />
              <h3 className="text-asu-h3 font-bold text-asu-gray-1">
                Biomedical scientist
              </h3>
              <p className="text-asu-body text-asu-gray-2 mt-asu-2">
                Design and conduct experiments to understand disease mechanisms, develop therapies, and advance precision medicine. Median salary exceeds $100,000 with strong projected growth through 2034.
              </p>
              <a href="#" className="inline-block mt-auto pt-asu-5 pb-asu-2 self-start no-underline">
                <span className="bg-asu-maroon text-white font-bold rounded-full px-asu-3 py-asu-2 inline-block hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-asu-gold focus-visible:ring-offset-2">
                  Explore this career
                </span>
              </a>
            </div>
            <div className="bg-white border border-asu-gray-4 rounded-none p-asu-4 flex flex-col h-full">
              <Database className="w-8 h-8 text-asu-gray-1 mt-asu-1 mb-asu-3" aria-hidden="true" />
              <h3 className="text-asu-h3 font-bold text-asu-gray-1">
                Bioinformatics analyst
              </h3>
              <p className="text-asu-body text-asu-gray-2 mt-asu-2">
                Apply computational tools to genomic datasets, build pipelines for DNA sequencing analysis, and translate raw biological data into actionable insights for research teams and pharmaceutical companies.
              </p>
              <a href="#" className="inline-block mt-auto pt-asu-5 pb-asu-2 self-start no-underline">
                <span className="bg-asu-maroon text-white font-bold rounded-full px-asu-3 py-asu-2 inline-block hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-asu-gold focus-visible:ring-offset-2">
                  Explore this career
                </span>
              </a>
            </div>
            <div className="bg-white border border-asu-gray-4 rounded-none p-asu-4 flex flex-col h-full">
              <TreePine className="w-8 h-8 text-asu-gray-1 mt-asu-1 mb-asu-3" aria-hidden="true" />
              <h3 className="text-asu-h3 font-bold text-asu-gray-1">
                Environmental consultant
              </h3>
              <p className="text-asu-body text-asu-gray-2 mt-asu-2">
                Assess environmental impact for development projects, design habitat restoration plans, and ensure regulatory compliance. Biology graduates bring essential fieldwork skills and ecological knowledge to this growing sector.
              </p>
              <a href="#" className="inline-block mt-auto pt-asu-5 pb-asu-2 self-start no-underline">
                <span className="bg-asu-maroon text-white font-bold rounded-full px-asu-3 py-asu-2 inline-block hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-asu-gold focus-visible:ring-offset-2">
                  Explore this career
                </span>
              </a>
            </div>
          </div>

          {/* Careers + Sidebar */}
          <div className="grid md:grid-cols-3 gap-asu-6 mt-asu-9">
            <div className="md:col-span-2">
              <p className="flex items-center gap-3 text-sm font-bold text-asu-gray-1 mb-2">
                <span className="w-1 h-5 bg-asu-gold" />
                Careers in biology
              </p>
              <h2 className="text-asu-h2 font-bold text-asu-gray-1 mb-asu-3">
                Where a biology degree takes you
              </h2>
              <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-xl">
                ASU biology graduates enter some of the fastest growing fields in science and medicine. With a foundation in molecular techniques, data analysis, and field research, our alumni work at institutions ranging from Mayo Clinic and NIH to biotech startups and conservation organizations across the globe.
              </p>
              <p className="text-asu-body text-asu-gray-2 mb-asu-3 max-w-xl">
                Within five years of graduation, 89% of our PhD students hold tenure-track or industry research positions. Our undergraduate placement rate into medical, dental, and veterinary programs exceeds the national average by 22%.
              </p>
              <p className="text-asu-body text-asu-gray-2 mb-asu-4 max-w-xl">
                Whether your goal is clinical medicine, environmental policy, pharmaceutical development, or academic research, the Department of Biology provides the mentorship, lab experience, and professional network to get you there.
              </p>
              <a
                href="#"
                className="inline-block bg-asu-maroon text-white font-bold rounded-full px-asu-3 py-asu-2 min-w-28 hover:scale-105 transition-transform no-underline"
              >
                View career outcomes data
              </a>
            </div>
            <div>
              <CareersSidebar />
            </div>
          </div>

          {/* Bio facts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-asu-3 mt-asu-9">
            <div className="bg-white border border-asu-gray-4 rounded-none p-asu-4 flex flex-col h-full">
              <Dna className="w-8 h-8 text-asu-gray-1 mt-asu-1 mb-asu-3" aria-hidden="true" />
              <h3 className="text-asu-h3 font-bold text-asu-gray-1">
                Your DNA stretches to the sun and back
              </h3>
              <p className="text-asu-body text-asu-gray-2 mt-asu-2">
                If you uncoiled all the DNA in a single human body and laid it end to end, it would stretch roughly 600 times the distance from Earth to the Sun. Every cell carries about two meters of tightly packed genetic information.
              </p>
              <a href="#" className="inline-block mt-auto pt-asu-5 pb-asu-2 self-start no-underline">
                <span className="bg-asu-maroon text-white font-bold rounded-full px-asu-3 py-asu-2 inline-block hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-asu-gold focus-visible:ring-offset-2">
                  Explore genetics research
                </span>
              </a>
            </div>
            <div className="bg-white border border-asu-gray-4 rounded-none p-asu-4 flex flex-col h-full">
              <Microscope className="w-8 h-8 text-asu-gray-1 mt-asu-1 mb-asu-3" aria-hidden="true" />
              <h3 className="text-asu-h3 font-bold text-asu-gray-1">
                You carry 38 trillion microbes
              </h3>
              <p className="text-asu-body text-asu-gray-2 mt-asu-2">
                The human body hosts approximately 38 trillion bacterial cells, slightly outnumbering your own human cells. This microbiome influences digestion, immunity, and even mood through the gut-brain axis.
              </p>
              <a href="#" className="inline-block mt-auto pt-asu-5 pb-asu-2 self-start no-underline">
                <span className="bg-asu-maroon text-white font-bold rounded-full px-asu-3 py-asu-2 inline-block hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-asu-gold focus-visible:ring-offset-2">
                  Explore microbiome studies
                </span>
              </a>
            </div>
            <div className="bg-white border border-asu-gray-4 rounded-none p-asu-4 flex flex-col h-full">
              <Leaf className="w-8 h-8 text-asu-gray-1 mt-asu-1 mb-asu-3" aria-hidden="true" />
              <h3 className="text-asu-h3 font-bold text-asu-gray-1">
                Forests produce 28% of Earth's oxygen
              </h3>
              <p className="text-asu-body text-asu-gray-2 mt-asu-2">
                Terrestrial plants generate roughly 28% of atmospheric oxygen through photosynthesis, with the remaining majority produced by marine phytoplankton. Understanding these systems is critical to climate science.
              </p>
              <a href="#" className="inline-block mt-auto pt-asu-5 pb-asu-2 self-start no-underline">
                <span className="bg-asu-maroon text-white font-bold rounded-full px-asu-3 py-asu-2 inline-block hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-asu-gold focus-visible:ring-offset-2">
                  Explore ecology research
                </span>
              </a>
            </div>
          </div>

          {/* Financial aid — Card and Image */}
          <section className="relative py-asu-9 rounded-none overflow-hidden mt-asu-9">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'linear-gradient(rgba(25, 25, 25, 0) 0%, rgba(25, 25, 25, 0.79) 100%), url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&h=800&fit=crop)' }}
              role="img"
              aria-label="University students collaborating around a table in a bright campus study space"
            />
            <div className="relative max-w-asu-content mx-auto px-asu-3">
              <div className="bg-white rounded-none p-asu-4 max-w-md">
                <h3 className="text-asu-h3 font-bold text-asu-gray-1">
                  Funding your future in biology
                </h3>
                <p className="text-asu-body text-asu-gray-2 mt-asu-2">
                  ASU awards over $18 million annually in biology-specific scholarships, fellowships, and research assistantships. More than 60% of our students receive financial aid.
                </p>
                <a href="#" className="inline-block mt-asu-3">
                  <span className="bg-asu-maroon text-white font-bold rounded-full px-asu-3 py-asu-2 inline-block hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-asu-gold focus-visible:ring-offset-2">
                    View scholarships and aid options
                  </span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Research highlights */}
      <section className="w-full py-asu-9">
        <div className="max-w-asu-content mx-auto px-asu-3">
          <p className="flex items-center gap-3 text-sm font-bold text-asu-gray-1 mb-2">
            <span className="w-1 h-5 bg-asu-gold" />
            Our research
          </p>
          <h2 className="text-asu-h2 font-bold text-asu-gray-1 mb-asu-6">
            Advancing knowledge across the life sciences
          </h2>

          <div className="grid md:grid-cols-3 gap-asu-3">
            {RESEARCH_AREAS.map((area) => (
              <a
                key={area.title}
                href="#"
                className="group block bg-white border-2 border-asu-gray-5 rounded-none overflow-hidden transition-all duration-200 hover:border-asu-gold hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-asu-gold focus-visible:ring-offset-2 no-underline"
              >
                <img
                  src={area.image}
                  alt={area.alt}
                  className="w-full h-48 object-cover"
                />
                <div className="p-asu-3">
                  <div className="flex items-center gap-2 mb-2">
                    <area.icon className="w-5 h-5 text-asu-maroon" />
                    <h3 className="text-asu-h4 font-bold text-asu-gray-1">
                      {area.title}
                    </h3>
                  </div>
                  <p className="text-asu-body-sm text-asu-gray-2 mb-asu-2">
                    {area.description}
                  </p>
                  <span className="inline-flex items-center text-asu-maroon font-bold text-sm group-hover:text-asu-gray-1 transition-colors">
                    View research area
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA — Field stations */}
      <ParallaxSection />

      {/* Block quote — dark */}
      <section
        className="py-asu-6 md:py-asu-9 bg-asu-gray-1"
        style={{ backgroundImage: 'url(/asu/backgrounds/gIYRGFq7o6-mPadTBNFszg.png)', backgroundRepeat: 'repeat' }}
      >
        <div className="max-w-asu-content mx-auto px-asu-3">
          <p className="text-sm font-bold text-asu-gold mb-asu-2">Why it matters</p>
          <h2 className="text-asu-h1-hero font-black text-white">
            The study of biology is the study of{' '}
            <span className="bg-asu-gold text-asu-gray-1 px-1">life itself</span> and every answer reveals{' '}
            <span className="bg-asu-gold text-asu-gray-1 px-1">ten new questions</span>
          </h2>
          <p className="text-sm text-asu-gray-5 mt-asu-3">
            ASU School of Life Sciences
          </p>
        </div>
      </section>

      {/* Programs and degrees */}
      <section id="programs" className="w-full bg-asu-gray-7 py-asu-9">
        <div className="max-w-asu-content mx-auto px-asu-3">
          <p className="flex items-center gap-3 text-sm font-bold text-asu-gray-1 mb-2">
            <span className="w-1 h-5 bg-asu-gold" />
            Academics
          </p>
          <h2 className="text-asu-h2 font-bold text-asu-gray-1 mb-asu-6">
            Programs built for discovery
          </h2>

          <div className="grid md:grid-cols-2 gap-asu-3">
            {PROGRAMS.map((program) => {
              const Icon = program.icon
              return (
                <div
                  key={program.degree}
                  className="bg-white border border-asu-gray-4 rounded-none p-asu-4 flex flex-col h-full"
                >
                  <Icon className="w-8 h-8 text-asu-gray-1 mt-asu-1 mb-asu-3" aria-hidden="true" />
                  <h3 className="text-asu-h3 font-bold text-asu-gray-1">
                    {program.degree}
                  </h3>
                  <p className="text-asu-body text-asu-gray-2 mt-asu-2">
                    {program.description}
                  </p>
                  <a
                    href="#"
                    className="inline-block mt-auto pt-asu-5 pb-asu-2 self-start no-underline"
                  >
                    <span className="bg-asu-maroon text-white font-bold rounded-full px-asu-3 py-asu-2 inline-block hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-asu-gold focus-visible:ring-offset-2">
                      View program details
                    </span>
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* News and events */}
      <section className="w-full py-asu-9">
        <div className="max-w-asu-content mx-auto px-asu-3">
          <p className="flex items-center gap-3 text-sm font-bold text-asu-gray-1 mb-2">
            <span className="w-1 h-5 bg-asu-gold" />
            What's happening
          </p>
          <h2 className="text-asu-h2 font-bold text-asu-gray-1 mb-asu-6">
            News and events
          </h2>

          <div className="grid md:grid-cols-3 gap-asu-6">
            {/* News column */}
            <div className="md:col-span-2">
              <h3 className="text-asu-h4 font-bold text-asu-gray-1 mb-asu-3">
                Recent news
              </h3>
              <div className="space-y-asu-4">
                {NEWS.map((item) => (
                  <article key={item.title} className="border-b border-asu-gray-5 pb-asu-3">
                    <time className="text-asu-body-xs text-asu-gray-3 font-bold">
                      {item.date}
                    </time>
                    <h4 className="text-asu-body font-bold text-asu-gray-1 mt-1 mb-1">
                      <a href="#" className="text-asu-maroon underline hover:text-asu-gray-1">
                        {item.title}
                      </a>
                    </h4>
                    <p className="text-asu-body-sm text-asu-gray-2">
                      {item.excerpt}
                    </p>
                  </article>
                ))}
              </div>
              <a
                href="#"
                className="inline-block mt-asu-3 bg-asu-maroon text-white font-bold rounded-full px-asu-3 py-asu-2 min-w-28 hover:scale-105 transition-transform no-underline"
              >
                View all news
              </a>
            </div>

            {/* Related links */}
            <div className="rounded-none bg-white">
              <h3 className="text-asu-h3 font-bold text-asu-gray-1 pb-asu-2">
                Related links
              </h3>
              <nav aria-label="Related links" className="border border-asu-gray-4 rounded-none">
                <div className="py-asu-3 px-asu-3 border-b border-asu-gray-4">
                  <a href="#" className="text-asu-body text-asu-gray-1 no-underline hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-asu-gold focus-visible:ring-offset-2">
                    Biology department seminar series
                  </a>
                </div>
                <div className="py-asu-3 px-asu-3 border-b border-asu-gray-4">
                  <a href="#" className="text-asu-body text-asu-gray-1 no-underline hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-asu-gold focus-visible:ring-offset-2">
                    Graduate student research awards
                  </a>
                </div>
                <div className="py-asu-3 px-asu-3 border-b border-asu-gray-4">
                  <a href="#" className="text-asu-body text-asu-gray-1 no-underline hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-asu-gold focus-visible:ring-offset-2">
                    Undergraduate research opportunities
                  </a>
                </div>
                <div className="py-asu-3 px-asu-3 border-b border-asu-gray-4">
                  <a href="#" className="text-asu-body text-asu-gray-1 no-underline hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-asu-gold focus-visible:ring-offset-2">
                    Faculty publications database
                  </a>
                </div>
                <div className="py-asu-3 px-asu-3 border-b border-asu-gray-4">
                  <a href="#" className="text-asu-body text-asu-gray-1 no-underline hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-asu-gold focus-visible:ring-offset-2">
                    School of Life Sciences homepage
                  </a>
                </div>
                <div className="py-asu-3 px-asu-3">
                  <a href="#" className="text-asu-body text-asu-gray-1 no-underline hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-asu-gold focus-visible:ring-offset-2">
                    ASU Research Enterprise directory
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
