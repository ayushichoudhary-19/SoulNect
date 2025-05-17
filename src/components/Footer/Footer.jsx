import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IconBrandGithub, IconBrandLinkedin, IconMail } from "../icons/TablerIcons";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-gray-900"
    >
      <div className="max-w-7xl border-t border-black/10  mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <img src="/assets/images/SoulNect-Logo.png" alt="SoulNect Logo" className="h-12 mb-4" />
            <p className="text-black/60 mb-4 max-w-md">
              A sanctuary for your emotional well-being, where soul meets connection in a journey of 
              self-discovery, mindfulness, and growth.
            </p>
            <div className="flex space-x-4 mt-4">
              <motion.a 
                href="https://github.com/ayushichoudhary-19" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-black/10 p-2 rounded-full hover:bg-black/20 transition-colors"
              >
                <IconBrandGithub size={20} />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/ayushi-choudhary-7688b91ba/" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-black/10 p-2 rounded-full hover:bg-black/20 transition-colors"
              >
                <IconBrandLinkedin size={20} />
              </motion.a>
              <motion.a 
                href="mailto:ayushichoudhary0016@gmail.com"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-black/10 p-2 rounded-full hover:bg-black/20 transition-colors"
              >
                <IconMail size={20} />
              </motion.a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Mood Log', 'My Journal', 'Community', 'Meditation'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/home' : `/${item.toLowerCase().replace(' ', '')}`} 
                    className="text-black/50 hover:text-black transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Contact</h3>
            <p className="text-black/70 mb-2">Have questions or feedback?</p>
            <motion.a 
              href="mailto:ayushichoudhary0016@gmail.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block bg-purple-600 px-4 py-2 rounded-lg text-white hover:bg-purple-700 transition-colors"
            >
              Contact Us
            </motion.a>
          </div>
        </div>
        <motion.div 
          className="flex justify-center mt-10 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.a
            href="https://www.linkedin.com/in/ayushi-choudhary-7688b91ba/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-6 py-3 bg-purple-100 rounded-full hover:bg-purple-200 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-purple-800 font-medium">Made with</span>
            <motion.span 
              className="text-red-500 mx-1"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ❤️
            </motion.span>
            <span className="text-purple-800 font-medium">by</span>
            <span className="text-purple-900 font-bold ml-1">Ayushi</span>
          </motion.a>
        </motion.div>
        
        <div className="border-t border-black/10 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-black/60 text-sm">
            © {currentYear} SoulNect. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-black/60 text-sm hover:text-black transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-black/60 text-sm hover:text-black transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
