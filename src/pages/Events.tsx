import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";

interface Exhibition {
  title: string;
  location: string;
  year: number;
  type: 'Solo' | 'Group' | 'Invitational';
}

const EXHIBITIONS: Exhibition[] = [
  {
    title: 'Wilmette Art Fair',
    location: 'Wilmette IL',
    year: 2025,
    type: 'Invitational'
  },
  {
    title: 'Old Town Art Fair',
    location: 'Chicago IL',
    year: 2025,
    type: 'Invitational'
  },
  {
    title: 'Old Town Art Fair',
    location: 'Chicago IL',
    year: 2024,
    type: 'Invitational'
  },
  {
    title: 'Saatchi The Other Art Fair',
    location: 'Brooklyn, NY',
    year: 2024,
    type: 'Invitational'
  },
  {
    title: 'Titan Walls',
    location: 'Chicago IL',
    year: 2023,
    type: 'Group'
  },
  {
    title: 'Moments that we Missed',
    location: 'Compstomp Studios',
    year: 2023,
    type: 'Invitational'
  },
  {
    title: 'Saatchi The Other Art Fair',
    location: 'Chicago, IL',
    year: 2023,
    type: 'Invitational'
  },
  {
    title: 'TIME Magazine pieces Gallery',
    location: 'Black Dove Gallery Miami, FL',
    year: 2022,
    type: 'Invitational'
  },
  {
    title: 'The Photography Show, Fujifilm Printlife Exhibition',
    location: 'Birmingham, UK',
    year: 2022,
    type: 'Group'
  },
  {
    title: 'SuperChief Gallery',
    location: 'Los Angeles, CA',
    year: 2022,
    type: 'Group'
  },
  {
    title: 'Coinbase NFT Gallery',
    location: '',
    year: 2022,
    type: 'Invitational'
  },
  {
    title: 'Saatchi The Other Art Fair',
    location: 'Chicago, IL',
    year: 2022,
    type: 'Invitational'
  },
  {
    title: 'Superchief Gallery Art Basel',
    location: 'Miami, FL',
    year: 2021,
    type: 'Invitational'
  },
  {
    title: 'Saatchi The Other Art Fair',
    location: 'Brooklyn, NY',
    year: 2021,
    type: 'Invitational'
  },
  {
    title: 'Saatchi The Other Art Fair',
    location: 'Chicago, IL',
    year: 2021,
    type: 'Invitational'
  },
  {
    title: 'HUMANITY',
    location: 'J07 Gallery Metaverse',
    year: 2021,
    type: 'Invitational'
  },
  {
    title: 'In the Shadows',
    location: 'ImnotArt Gallery, Chicago, IL',
    year: 2021,
    type: 'Solo'
  },
  {
    title: 'Erasing Borders',
    location: 'Gallery Cafe. Chicago, IL',
    year: 2019,
    type: 'Solo'
  },
  {
    title: 'Conception Global Art Collective',
    location: 'Chicago, IL',
    year: 2018,
    type: 'Group'
  },
  {
    title: 'P&B Art Show',
    location: 'Chicago, IL',
    year: 2018,
    type: 'Group'
  },
  {
    title: 'RAW Artists',
    location: 'Chicago, IL',
    year: 2018,
    type: 'Group'
  }
];

interface Event {
  title: string;
  location: string;
  date: string;
  description: string;
}

const UPCOMING_EVENTS: Event[] = [
  {
    title: 'Beloveful Art Fair',
    location: 'Chicago, IL',
    date: '2023-10-15',
    description: 'Join us for an exclusive art fair featuring Beloveful\'s latest works.'
  },
  {
    title: 'Photography Workshop',
    location: 'Los Angeles, CA',
    date: '2023-11-20',
    description: 'Learn the art of photography with Beloveful in a hands-on workshop.'
  },
  {
    title: 'Art Exhibition',
    location: 'New York, NY',
    date: '2023-12-10',
    description: 'Experience Beloveful\'s art in a stunning exhibition at the Met.'
  }
];

export default function Events() {
  // Group exhibitions by year
  const exhibitionsByYear = EXHIBITIONS.reduce((acc, exhibition) => {
    if (!acc[exhibition.year]) {
      acc[exhibition.year] = [];
    }
    acc[exhibition.year].push(exhibition);
    return acc;
  }, {} as Record<number, Exhibition[]>);

  // Sort years in descending order
  const sortedYears = Object.keys(exhibitionsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  // Get upcoming exhibitions (2025 and later)
  const upcomingExhibitions = EXHIBITIONS.filter(ex => ex.year >= 2025);

  const getTypeColor = (type: Exhibition['type']) => {
    switch (type) {
      case 'Solo':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Group':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Invitational':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const heroImage = {
    src: "/Website%20beloveful.com/Erasing%20Borders/Tony%20Menias%20-%20Two%20Girls%20in%20Window.jpg",
    alt: "Photography Events and Exhibitions"
  };

  const calendarEmbedUrl =
    import.meta.env.VITE_EVENTS_CALENDAR_EMBED ??
    "https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FChicago&src=YmVsb3ZlZnVsLmV2ZW50c0BleGFtcGxlLmNvbQ";

  const scrollToEvents = () => {
    const element = document.getElementById('events-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Header variant="default" />

      <PageContainer className="space-y-16">
        <div className="text-center space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">Events</p>
        </div>

          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-light text-black dark:text-white">
              Events & Exhibitions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upcoming events, past exhibitions, and opportunities to experience Beloveful's work in person.
            </p>
          </div>


          {/* Upcoming Events */}
          <div>
            <h2 className="text-2xl font-light mb-6 text-black dark:text-white">Upcoming Events</h2>
            <div className="space-y-4">
              {UPCOMING_EVENTS.map((event, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-bold">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                    <br />
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-lg text-black dark:text-white">{event.title}</h3>
                    <p className="text-muted-foreground">{event.location}</p>
                    <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                  </div>
                  <Button variant="outline" className="flex-shrink-0">
                    Details
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Zoho Calendar Embed */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6">
            <div className="text-center space-y-3">
              <h2 className="text-xl font-semibold text-black dark:text-white">Schedule a Viewing</h2>
              <p className="text-muted-foreground">
                View my availability and schedule a private viewing or upcoming event
              </p>
              
              {/* Zoho Calendar Embed */}
              <div className="max-w-5xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                  <iframe 
                    src="https://calendar.zoho.com/zc/ui/embed/#calendar=zz08011230de9f7af37169de9dbf574e3b7645706b02352eb08a17c13b60aab14fa1ecb5cda8c6b0b8df5e7960b4b7ff3d69be4a81&title=workshop%40beloveful.com&type=1&language=en&timezone=America%2FNew_York&showTitle=1&showTimezone=1&view=month&showDetail=0&theme=1&eventColorType=light&calendarColor=%23bfbf4d" 
                    width="100%" 
                    height="600" 
                    frameBorder="0" 
                    scrolling="no"
                    title="workshop@beloveful.com">
                  </iframe>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                After selecting a date, you'll be able to book your preferred time slot
              </p>
            </div>
          </div>


          {/* Past Exhibitions */}
          <div>
            <div className="space-y-1">
              <h2 className="text-2xl font-light text-black dark:text-white">Past Exhibitions</h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                A selection of exhibitions and shows from recent years.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {EXHIBITIONS.map((exhibition, index) => (
                <div key={index} className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-medium text-black dark:text-white">{exhibition.title}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                      {exhibition.year}
                    </span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {exhibition.location}
                  </p>
                  <div className="text-sm">
                    <span className={`px-2 py-1 rounded-full ${
                      exhibition.type === 'Solo' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                        : exhibition.type === 'Group' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                    }`}>
                      {exhibition.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {EXHIBITIONS.filter(ex => ex.type === 'Solo').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Solo Exhibitions
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {EXHIBITIONS.filter(ex => ex.type === 'Invitational').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Invitational
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {EXHIBITIONS.filter(ex => ex.type === 'Group').length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Group Shows
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="mt-16 bg-gray-50 dark:bg-gray-900 rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-6 text-center text-black dark:text-white">
              Exhibition Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-black dark:text-white">
                  {EXHIBITIONS.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Exhibitions
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {EXHIBITIONS.filter(ex => ex.type === 'Solo').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Solo Shows
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {EXHIBITIONS.filter(ex => ex.type === 'Invitational').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Invitational
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {EXHIBITIONS.filter(ex => ex.type === 'Group').length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Group Shows
                </div>
              </div>
            </div>
          </div>
      </PageContainer>

      <FooterStrip />
    </div>
  );
}
