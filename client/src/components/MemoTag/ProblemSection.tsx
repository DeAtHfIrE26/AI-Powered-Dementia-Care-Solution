import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";
import Image from "@/next/image";

export default function ProblemSection() {
  const problemCards = [
    {
      icon: "user-heart",
      title: "Rising Prevalence",
      description: "Over 55 million people worldwide live with dementia, with nearly 10 million new cases every year.",
      percentage: 78,
      percentageText: "78% increase expected by 2050"
    },
    {
      icon: "home-heart",
      title: "Caregiver Burden",
      description: "Family caregivers spend an average of 20-40 hours per week providing care, leading to significant emotional and financial strain.",
      percentage: 65,
      percentageText: "65% of caregivers report high stress levels"
    },
    {
      icon: "funds",
      title: "Economic Impact",
      description: "The global cost of dementia is estimated at $1.3 trillion annually and is projected to double by 2030.",
      percentage: 92,
      percentageText: "92% of costs are related to social and informal care"
    }
  ];

  const checkItems = [
    "Only 50% of dementia cases are diagnosed in high-income countries",
    "Less than 10% are diagnosed in low and middle-income countries",
    "Early intervention can slow progression by up to 30%"
  ];

  return (
    <section id="problem" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-sans">The Growing Challenge of Dementia Care</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            As our population ages, dementia is becoming a global health crisis that affects millions of families, caregivers, and healthcare systems.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {problemCards.map((card, index) => (
            <motion.div 
              key={index}
              className="bg-slate-50 dark:bg-slate-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              variants={fadeIn}
            >
              <div className="text-primary mb-4">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  {card.icon === "user-heart" && (
                    <path d="M12 2C9.38 2 7.25 4.13 7.25 6.75c0 2.57 2.01 4.65 4.63 4.74.08-.02.16-.02.24-.02h.02c2.5-.1 4.48-2.18 4.48-4.74C16.63 4.13 14.5 2 12 2zm0 7c-1.25 0-2.25-1.01-2.25-2.25S10.75 4.5 12 4.5s2.25 1.01 2.25 2.25S13.25 9 12 9z M16 14.5c-.41 0-.75.34-.75.75v2c0 .55-.45 1-1 1h-5.5c-.55 0-1-.45-1-1v-2c0-.41-.34-.75-.75-.75S6.25 14.84 6.25 15.25v2c0 1.38 1.12 2.5 2.5 2.5h5.5c1.38 0 2.5-1.12 2.5-2.5v-2c0-.41-.34-.75-.75-.75z M12 14c-3.92 0-7 1.87-7 4.25v1c0 .41.34.75.75.75s.75-.34.75-.75v-1c0-1.19 2.25-2.75 5.5-2.75 3.13 0 5.5 1.44 5.5 2.75v1c0 .41.34.75.75.75s.75-.34.75-.75v-1C19 15.87 15.92 14 12 14z"/>
                  )}
                  {card.icon === "home-heart" && (
                    <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zm-2 5.79V18h-3.52L12 20.48 9.52 18H6v-3.52L3.52 12 6 9.52V6h3.52L12 3.52 14.48 6H18v3.52L20.48 12 18 14.48z M12 6.5c-3.03 0-5.5 2.47-5.5 5.5s2.47 5.5 5.5 5.5 5.5-2.47 5.5-5.5-2.47-5.5-5.5-5.5zm0 9c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z M12 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
                  )}
                  {card.icon === "funds" && (
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z M13.49 5.48c.43-.28.99-.23 1.39.11.39.34.46.92.14 1.33-.71.92-1.63 1.68-2.59 2.24-.43.25-.99.21-1.4-.12-.39-.35-.46-.93-.13-1.34.71-.91 1.63-1.68 2.59-2.22z M15.11 7.3c-.19-.42-.05-.91.36-1.12 1.97-1.01 4.29-.51 5.82 1.02.33.33.35.86.03 1.18-.32.33-.86.35-1.19.02-1.17-1.17-2.92-1.27-4.25-.51-.41.21-.89.05-1.1-.36-.21-.41-.05-.89.36-1.1.08-.04.16-.08.25-.11.02-.01.2-.08.28-.11.02 0 .2-.07.28-.09.02-.01.06-.02.09-.03.11-.02.2-.05.32-.05.11-.01.2-.02.32-.02.11 0 .2.01.32.01.11.01.2.02.32.03.11.02.2.04.32.06.01 0 .01 0 .02.01-.03-.01-.06-.03-.08-.04-.08-.04-.15-.08-.23-.13zm-3.09 1.81c.18-.09.38-.17.58-.23.5-.15 1.04.11 1.24.6.19.49-.06 1.06-.56 1.25-.17.07-.35.11-.52.16-.8.24-1.56.63-2.25 1.12-.47.34-1.12.25-1.47-.22-.34-.47-.25-1.12.22-1.47.87-.63 1.8-1.08 2.76-1.21z M12 12c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                  )}
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                {card.description}
              </p>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mt-4">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${card.percentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                {card.percentageText}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-8 md:p-12 shadow-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Diagnostic Challenges</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Traditional dementia assessment methods are often subjective, inconsistent, and require specialized medical visits that many patients don't receive regularly enough.
              </p>
              <ul className="space-y-2 mb-6">
                {checkItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="text-primary shrink-0 mt-1 mr-2 h-5 w-5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="inline-flex items-center text-primary hover:text-primary-600 font-semibold transition-colors"
              >
                See how MemoTag solves this 
                <svg className="ml-1 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-80 bg-white dark:bg-slate-700 rounded-xl shadow-md overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1637059824899-a441006a6875?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Medical professional conducting cognitive assessment with elderly patient" 
                  className="w-full h-full object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
