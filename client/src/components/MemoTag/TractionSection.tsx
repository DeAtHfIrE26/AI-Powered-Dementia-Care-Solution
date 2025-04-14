import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import Image from "@/next/image";

interface CounterProps {
  value: number;
  label: string;
  icon: string;
}

function Counter({ value, label, icon }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());
  const springCount = useSpring(count, { duration: 2000, bounce: 0 });
  
  if (isInView) {
    springCount.set(value);
  }

  return (
    <motion.div 
      ref={ref}
      className="bg-slate-50 dark:bg-slate-800 rounded-xl p-8 text-center shadow-md transition-all duration-300 hover:shadow-lg"
      whileHover={{ y: -4 }}
    >
      <div className="text-primary mb-2">
        <svg className="w-10 h-10 mx-auto" fill="currentColor" viewBox="0 0 24 24">
          {icon === "user-heart" && (
            <path d="M12 2C9.38 2 7.25 4.13 7.25 6.75c0 2.57 2.01 4.65 4.63 4.74.08-.02.16-.02.24-.02h.02c2.5-.1 4.48-2.18 4.48-4.74C16.63 4.13 14.5 2 12 2zm0 7c-1.25 0-2.25-1.01-2.25-2.25S10.75 4.5 12 4.5s2.25 1.01 2.25 2.25S13.25 9 12 9z M16 14.5c-.41 0-.75.34-.75.75v2c0 .55-.45 1-1 1h-5.5c-.55 0-1-.45-1-1v-2c0-.41-.34-.75-.75-.75S6.25 14.84 6.25 15.25v2c0 1.38 1.12 2.5 2.5 2.5h5.5c1.38 0 2.5-1.12 2.5-2.5v-2c0-.41-.34-.75-.75-.75z M12 14c-3.92 0-7 1.87-7 4.25v1c0 .41.34.75.75.75s.75-.34.75-.75v-1c0-1.19 2.25-2.75 5.5-2.75 3.13 0 5.5 1.44 5.5 2.75v1c0 .41.34.75.75.75s.75-.34.75-.75v-1C19 15.87 15.92 14 12 14z"/>
          )}
          {icon === "building" && (
            <path d="M19 2H9c-1.1 0-2 .9-2 2v5.8c-1.8.3-3 2-3 3.8v11c0 .6.4 1 1 1h6v-5h4v5h6c.6 0 1-.4 1-1v-11c0-1.8-1.2-3.5-3-3.8V4c0-1.1-.9-2-2-2zm0 2v5h-8V4h8zm0 13h-2v-3h-6v3H9v-5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v5z"/>
          )}
          {icon === "alert" && (
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          )}
          {icon === "time" && (
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
          )}
        </svg>
      </div>
      <motion.div className="text-4xl font-bold mb-2">
        {isInView ? <motion.span>{rounded}</motion.span> : "0"}
      </motion.div>
      <p className="text-slate-600 dark:text-slate-300">{label}</p>
    </motion.div>
  );
}

export default function TractionSection() {
  const metrics = [
    { 
      icon: "user-heart", 
      value: 2450, 
      label: "Active Users" 
    },
    { 
      icon: "building", 
      value: 82, 
      label: "Care Facilities" 
    },
    { 
      icon: "alert", 
      value: 5783, 
      label: "Critical Alerts Issued" 
    },
    { 
      icon: "time", 
      value: 14520, 
      label: "Caregiver Hours Saved" 
    }
  ];

  return (
    <section id="traction" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-sans">Our Impact</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            MemoTag is making a real difference in dementia care across healthcare facilities and families worldwide.
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {metrics.map((metric, index) => (
            <Counter 
              key={index} 
              value={metric.value} 
              label={metric.label} 
              icon={metric.icon} 
            />
          ))}
        </motion.div>

        {/* Testimonial */}
        <motion.div 
          className="bg-primary-50 dark:bg-slate-800 rounded-2xl p-8 md:p-12 shadow-lg mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3">
              <div className="w-32 h-32 mx-auto md:mx-0 rounded-full overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80" 
                  alt="Dr. Sarah Johnson, Neurologist" 
                  className="w-full h-full object-cover"
                  width={300}
                  height={300}
                />
              </div>
            </div>
            <div className="md:w-2/3 text-center md:text-left">
              <div className="text-primary mb-4">
                <svg className="w-10 h-10 md:w-12 md:h-12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z" />
                </svg>
              </div>
              <p className="text-lg italic mb-6 text-slate-600 dark:text-slate-300">
                "MemoTag has revolutionized how we monitor cognitive changes in our patients. The combination of physical tracking with AI-powered cognitive assessment provides insights we simply couldn't get before. It's allowing us to intervene earlier and provide more personalized care."
              </p>
              <div>
                <p className="font-bold">Dr. Sarah Johnson</p>
                <p className="text-slate-500 dark:text-slate-400">Director of Neurology, Westside Medical Center</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Partners */}
        <motion.div 
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h3 className="text-2xl font-bold mb-8">Our Partners</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {[1, 2, 3, 4].map((_, index) => (
              <motion.div 
                key={index}
                className="p-4 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div className="h-16 bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center">
                  <span className="text-slate-500 dark:text-slate-400 font-semibold">
                    {["Healthcare Partner", "Research Institute", "Tech Partner", "Foundation"][index]}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
