import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";

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

  return (
    <div className="min-h-screen">
      <Header variant="default" />
      
      <PageContainer className="max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light mb-8 text-black dark:text-white">Events</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Exhibitions and art fairs showcasing photography that captures the beauty and rhythm of life across cultures and continents.
          </p>
        </div>

        {/* Upcoming Exhibitions */}
        {upcomingExhibitions.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-light mb-8 text-center text-black dark:text-white">
              Upcoming Exhibitions
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg p-6 mb-8">
              <div className="space-y-4">
                {upcomingExhibitions.map((exhibition, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex-1 mb-2 sm:mb-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(exhibition.type)}`}>
                          {exhibition.type}
                        </span>
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">
                          {exhibition.title}
                        </h3>
                      </div>
                      {exhibition.location && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {exhibition.location}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {exhibition.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* All Exhibitions by Year */}
        <div>
          <h2 className="text-2xl md:text-3xl font-light mb-8 text-center text-black dark:text-white">
            Exhibition History
          </h2>
          
          <div className="space-y-8">
            {sortedYears.map(year => (
              <div key={year} className="border-l-2 border-gray-200 dark:border-gray-700 pl-6">
                <div className="relative">
                  <div className="absolute -left-8 w-4 h-4 bg-black dark:bg-white rounded-full"></div>
                  <h3 className="text-xl font-semibold mb-4 text-black dark:text-white">
                    {year}
                  </h3>
                  <div className="space-y-3">
                    {exhibitionsByYear[year].map((exhibition, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
                      >
                        <div className="flex-1 mb-2 sm:mb-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(exhibition.type)}`}>
                              {exhibition.type}
                            </span>
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                              {exhibition.title}
                            </h4>
                          </div>
                          {exhibition.location && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {exhibition.location}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
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