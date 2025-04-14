import { Button } from "@/components/ui/button";
import { smoothScrollTo } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeIn, fadeInLeft, fadeInRight } from "@/lib/animations";
import Image from "@/next/image";

export default function HeroSection() {
  return (
    <section className="pt-28 pb-20 bg-gradient-to-br from-white via-slate-50 to-primary-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-sans leading-tight">
              <span className="text-primary">AI</span> for Dementia Care
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-lg">
              MemoTag combines physical tracking and cognitive monitoring to transform how we care for those with dementia, bringing peace of mind to families and caregivers.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                size="lg"
                onClick={() => smoothScrollTo("contact")}
                className="transition-transform hover:scale-105"
              >
                Request Demo
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => smoothScrollTo("problem")}
              >
                Learn More
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
          >
            <motion.div 
              className="rounded-xl overflow-hidden shadow-xl"
              whileHover={{ rotate: 0 }}
              initial={{ rotate: 2 }}
              transition={{ duration: 0.5 }}
            >
              <Image 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Senior patient with healthcare professional using digital technology" 
                className="w-full h-auto"
                width={800}
                height={600}
                priority
              />
            </motion.div>
            <motion.div 
              className="absolute -bottom-5 -left-5 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg"
              whileHover={{ rotate: 0 }}
              initial={{ rotate: -3 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold">AI Monitoring Active</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-20 flex flex-wrap justify-center gap-8 opacity-80"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="text-center">
            <p className="text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Trusted by leading care facilities
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-x-10 gap-y-8">
              {/* These would be replaced with actual partner logos */}
              <div className="w-32 h-8 bg-slate-200 dark:bg-slate-700 rounded opacity-50"></div>
              <div className="w-32 h-8 bg-slate-200 dark:bg-slate-700 rounded opacity-50"></div>
              <div className="w-32 h-8 bg-slate-200 dark:bg-slate-700 rounded opacity-50"></div>
              <div className="w-32 h-8 bg-slate-200 dark:bg-slate-700 rounded opacity-50"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
