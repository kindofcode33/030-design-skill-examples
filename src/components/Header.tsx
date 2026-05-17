import { Search } from 'lucide-react'

const UTILITY_LINKS = [
  { label: 'ASU Home', href: 'https://asu.edu' },
  { label: 'My ASU', href: '#' },
  { label: 'Colleges and Schools', href: '#' },
  { label: 'Sign In', href: '#' },
]

interface NavItem {
  label: string
  href?: string
}

interface HeaderProps {
  nav?: NavItem[]
  activeItem?: string
}

export default function Header({ nav = [], activeItem }: HeaderProps) {
  return (
    <>
      <header className="w-full fixed top-0 left-0 right-0 z-50">
        <div className="bg-asu-gray-6 h-[30px]">
          <div className="max-w-asu-content mx-auto px-asu-3 h-full flex items-center justify-end gap-asu-3">
            {UTILITY_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-asu-body-xs text-asu-gray-2 no-underline hidden md:inline"
              >
                {item.label}
              </a>
            ))}
            <button className="text-asu-body-xs text-asu-gray-2 bg-transparent border-none cursor-pointer flex items-center gap-1">
              Search
              <Search className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="bg-white border-b border-asu-gray-5">
          <div className="max-w-asu-content mx-auto px-asu-3 flex items-stretch">
            <a href="/" className="flex items-center flex-shrink-0 mr-asu-3">
              <img src={`${import.meta.env.BASE_URL}asu/logos/asu-vertical.svg`} alt="ASU" className="h-16 w-auto" />
            </a>

            <div className="flex flex-col justify-center">
              <a
                href="/"
                className="text-asu-h3 md:text-asu-h2-mobile font-bold text-asu-gray-1 leading-[1.1] pt-asu-2 no-underline hover:[text-decoration:underline]"
              >
                Arizona State University
              </a>

              {nav.length > 0 && (
                <nav className="flex items-stretch gap-asu-3">
                  <a
                    href="/"
                    className={`text-asu-gray-2 flex items-center no-underline py-asu-1 border-b-[5px] ${
                      !activeItem ? 'border-asu-gold' : 'border-transparent'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </a>
                  {nav.map((item) => (
                    <a
                      key={item.label}
                      href={item.href || '#'}
                      className={`text-asu-body font-normal no-underline flex items-center py-asu-1 border-b-[5px] visited:text-asu-gray-2 ${
                        item.label === activeItem
                          ? 'text-asu-gray-1 visited:text-asu-gray-1 border-asu-gold'
                          : 'text-asu-gray-2 border-transparent'
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="h-[110px]" />
    </>
  )
}
