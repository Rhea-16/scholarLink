import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0A2463] text-white py-16">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-poppins font-semibold text-xl mb-4">
              ScholarLink
            </h3>

            <p className="font-poppins font-semibold text-lg text-[#CBD5E1] leading-[125%]">
              Intelligent scholarship matching platform helping students
              discover funding opportunities based on their eligibility.
            </p>

            <div className="mt-8">
              <h4 className="font-poppins font-semibold text-xl mb-4">
                Contact Us
              </h4>

              <p className="font-poppins font-semibold text-lg text-[#CBD5E1] underline">
                support@scholarshiphub.com
              </p>

              <p className="font-poppins font-semibold text-lg text-[#CBD5E1] underline">
                +91 1800 123 456
              </p>

              <p className="font-poppins font-semibold text-lg text-[#CBD5E1] mt-2">
                Education Tower, Sector 62
                <br />
                Noida, Uttar Pradesh 201301
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-poppins font-semibold text-xl mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/top-scholarships"
                  className="font-poppins font-semibold text-lg text-[#CBD5E1] hover:text-white transition-colors"
                >
                  Top Scholarships
                </Link>
              </li>

              <li>
                <Link
                  to="/how-it-works"
                  className="font-poppins font-semibold text-lg text-[#CBD5E1] hover:text-white transition-colors"
                >
                  How It Works
                </Link>
              </li>

              <li>
                <Link
                  to="/faq"
                  className="font-poppins font-semibold text-lg text-[#CBD5E1] hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  to="/partners"
                  className="font-poppins font-semibold text-lg text-[#CBD5E1] hover:text-white transition-colors"
                >
                  Our Partners
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-poppins font-semibold text-xl mb-4">
              Resources
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/guide"
                  className="font-poppins font-semibold text-lg text-[#CBD5E1] underline hover:text-white transition-colors"
                >
                  Scholarship Guide
                </Link>
              </li>

              <li>
                <Link
                  to="/checklist"
                  className="font-poppins font-semibold text-lg text-[#CBD5E1] underline hover:text-white transition-colors"
                >
                  Document Checklist
                </Link>
              </li>

              <li>
                <Link
                  to="/tips"
                  className="font-poppins font-semibold text-lg text-[#CBD5E1] underline hover:text-white transition-colors"
                >
                  Application Tips
                </Link>
              </li>

              <li>
                <Link
                  to="/success"
                  className="font-poppins font-semibold text-lg text-[#CBD5E1] underline hover:text-white transition-colors"
                >
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
