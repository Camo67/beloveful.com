import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white py-12">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column - Navigation */}
          <div>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-black transition-opacity duration-300 hover:opacity-60">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-black transition-opacity duration-300 hover:opacity-60">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/workshops" className="text-black transition-opacity duration-300 hover:opacity-60">
                  Workshops
                </Link>
              </li>
              <li>
                <a 
                  href="https://lb.benchmarkemail.com//listbuilder/signupnew?IkfHTmyPVq92wBnn4lX%252FTf5pwVnAjsSIeL8KRSOgMpXtO5iNRn8gS049TyW7spdJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black transition-opacity duration-300 hover:opacity-60"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          {/* Right column - Actions */}
          <div className="md:text-right">
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://lb.benchmarkemail.com//listbuilder/signupnew?IkfHTmyPVq92wBnn4lX%252FTf5pwVnAjsSIeL8KRSOgMpXtO5iNRn8gS049TyW7spdJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black transition-opacity duration-300 hover:opacity-60"
                >
                  Join Newsletter
                </a>
              </li>
              <li>
                <Link to="/workshops" className="text-black transition-opacity duration-300 hover:opacity-60">
                  Book a Workshop
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.printinnovationlab.com/collections/beloveful"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black transition-opacity duration-300 hover:opacity-60"
                >
                  Print Shop
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            © 2025 Tony Menias, All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}