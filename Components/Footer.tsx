import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t bg-white py-6">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-500 hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-500 hover:text-gray-900">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-500 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="text-gray-500 hover:text-gray-900">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/departments" className="text-gray-500 hover:text-gray-900">
                  Departments
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="text-gray-500 hover:text-gray-900">
                  Doctors
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-gray-500 hover:text-gray-900">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-500 hover:text-gray-900">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-500 hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-gray-500">Email: contact@carepulse.com</span>
              </li>
              <li>
                <span className="text-gray-500">Phone: (555) 123-4567</span>
              </li>
              <li>
                <span className="text-gray-500">Mon - Fri: 9:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-xs sm:text-sm text-gray-500">
          © {new Date().getFullYear()} CarePulse. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

