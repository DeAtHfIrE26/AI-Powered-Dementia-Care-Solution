import { motion } from "framer-motion";
import { fadeIn, fadeInLeft, fadeInRight } from "@/lib/animations";
import Image from "@/next/image";

export default function SolutionSection() {
  const solutionSteps = [
    {
      number: 1,
      title: "Smart Physical Tracking",
      description: "MemoTag's discrete wearable device uses advanced location tracking to monitor movement patterns and detect wandering behaviors common in dementia patients.",
      features: [
        {
          icon: "map-pin",
          title: "Real-time Location",
          description: "Secure GPS tracking with geofencing capabilities"
        },
        {
          icon: "alert-triangle",
          title: "Instant Alerts",
          description: "Immediate notifications for unusual movements or boundary exits"
        },
        {
          icon: "battery-charging",
          title: "Long Battery Life",
          description: "7+ days of continuous tracking on a single charge"
        }
      ],
      image: "https://images.unsplash.com/photo-1557826188-7c136398d2a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Modern wearable health tracking device for seniors",
      direction: "right"
    },
    {
      number: 2,
      title: "AI Cognitive Monitoring",
      description: "Our proprietary AI algorithms analyze daily interactions to detect subtle cognitive changes that may indicate progression of dementia symptoms.",
      features: [
        {
          icon: "brain",
          title: "Pattern Recognition",
          description: "Identifies changes in routine behaviors and habits"
        },
        {
          icon: "line-chart",
          title: "Trend Analysis",
          description: "Tracks cognitive metrics over time to measure progression"
        },
        {
          icon: "heart-pulse",
          title: "Early Detection",
          description: "Identifies warning signs months before traditional methods"
        }
      ],
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Advanced AI-powered cognitive assessment dashboard",
      direction: "left"
    },
    {
      number: 3,
      title: "Integrated Care Platform",
      description: "A comprehensive dashboard for families and healthcare providers that combines tracking data with cognitive assessments to inform personalized care plans.",
      features: [
        {
          icon: "smartphone",
          title: "Mobile Application",
          description: "Easy-to-use interface for families and caregivers"
        },
        {
          icon: "users",
          title: "Care Team Collaboration",
          description: "Secure sharing of insights with authorized healthcare providers"
        },
        {
          icon: "clipboard-list",
          title: "Personalized Reports",
          description: "Detailed insights and care recommendations based on data"
        }
      ],
      image: "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      imageAlt: "Healthcare professional using integrated care platform dashboard",
      direction: "right"
    }
  ];

  const renderFeatureIcon = (iconName: string) => {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {iconName === "map-pin" && (
          <>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </>
        )}
        {iconName === "alert-triangle" && (
          <>
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </>
        )}
        {iconName === "battery-charging" && (
          <>
            <path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19"></path>
            <line x1="23" y1="13" x2="23" y2="11"></line>
            <polyline points="11 6 7 12 13 12 9 18"></polyline>
          </>
        )}
        {iconName === "brain" && (
          <>
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.5H4.5A2.5 2.5 0 0 1 2 17.5v-11A2.5 2.5 0 0 1 4.5 4h2.54A2.5 2.5 0 0 1 9.5 2z"></path>
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.5h2.54A2.5 2.5 0 0 0 22 17.5v-11A2.5 2.5 0 0 0 19.5 4h-2.54A2.5 2.5 0 0 0 14.5 2z"></path>
          </>
        )}
        {iconName === "line-chart" && (
          <>
            <line x1="22" y1="12" x2="2" y2="12"></line>
            <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
            <line x1="6" y1="16" x2="6.01" y2="16"></line>
            <line x1="10" y1="16" x2="10.01" y2="16"></line>
          </>
        )}
        {iconName === "heart-pulse" && (
          <>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </>
        )}
        {iconName === "smartphone" && (
          <>
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
            <line x1="12" y1="18" x2="12" y2="18.01"></line>
          </>
        )}
        {iconName === "users" && (
          <>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </>
        )}
        {iconName === "clipboard-list" && (
          <>
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            <line x1="9" y1="12" x2="15" y2="12"></line>
            <line x1="9" y1="16" x2="15" y2="16"></line>
            <line x1="9" y1="8" x2="9" y2="8.01"></line>
          </>
        )}
      </svg>
    );
  };

  return (
    <section id="solution" className="py-20 bg-gradient-to-br from-slate-50 to-primary-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-sans">How MemoTag Works</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            MemoTag combines AI-powered tracking technology with cognitive monitoring to provide a comprehensive dementia care solution.
          </p>
        </motion.div>

        {/* Solution Steps - ZigZag Layout */}
        {solutionSteps.map((step, index) => (
          <motion.div 
            key={index}
            className="flex flex-col md:flex-row items-center mb-20 last:mb-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={step.direction === "right" ? fadeInRight : fadeInLeft}
          >
            <div className={`md:w-1/2 ${step.direction === "right" ? "order-2 md:order-1" : "mb-8 md:mb-0"}`}>
              <div className={`${step.direction === "right" ? "md:pr-12" : "md:pl-12"}`}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white text-xl font-bold mb-6">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  {step.description}
                </p>
                <ul className="space-y-4">
                  {step.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="mr-4 text-primary">
                        {renderFeatureIcon(feature.icon)}
                      </div>
                      <div>
                        <h4 className="font-semibold">{feature.title}</h4>
                        <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={`md:w-1/2 mb-8 md:mb-0 ${step.direction === "right" ? "order-1 md:order-2" : ""}`}>
              <motion.div 
                className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg"
                whileHover={{ rotate: 0 }}
                initial={{ rotate: step.direction === "right" ? 2 : -2 }}
                transition={{ duration: 0.5 }}
              >
                <Image 
                  src={step.image} 
                  alt={step.imageAlt} 
                  className="w-full h-auto rounded-lg"
                  width={800}
                  height={600}
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
