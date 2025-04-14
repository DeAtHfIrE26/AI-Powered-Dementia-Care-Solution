import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { fadeIn, fadeInLeft, fadeInRight } from "@/lib/animations";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { contactFormSchema, type ContactFormData } from "@/lib/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

export default function CTASection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      message: "",
      joinWaitlist: false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      toast({
        title: "Request Submitted",
        description: "Thank you! Your request has been submitted successfully.",
        variant: "default",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      title: "Personalized Demo",
      description: "See MemoTag in action with a customized demonstration for your specific needs."
    },
    {
      title: "Expert Consultation",
      description: "Speak with our team of dementia care specialists and technology experts."
    },
    {
      title: "Early Access Program",
      description: "Join our waitlist to be among the first to implement MemoTag's innovative solution."
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary-500 to-secondary-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12">
          <motion.div 
            className="md:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInLeft}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-sans">Ready to Transform Dementia Care?</h2>
            <p className="text-lg mb-8 text-white/90">
              Get in touch with our team to learn how MemoTag can benefit your facility or loved ones. Request a demo or join our waitlist for early access.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start mb-6 last:mb-0">
                  <div className="mr-4 mt-1 text-amber-400">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-white/80">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInRight}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg text-slate-800 dark:text-slate-100 transition-colors duration-300">
              <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            {...field} 
                            className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="you@example.com" 
                            type="email" 
                            {...field} 
                            className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                              <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="healthcare_professional">Healthcare Professional</SelectItem>
                            <SelectItem value="care_facility_admin">Care Facility Administrator</SelectItem>
                            <SelectItem value="family_caregiver">Family Caregiver</SelectItem>
                            <SelectItem value="researcher">Researcher</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="I'm interested in learning more about MemoTag for..." 
                            rows={4} 
                            {...field}
                            className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="joinWaitlist"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-primary"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Add me to the waitlist for early access</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary-600 text-white transition-all transform hover:scale-105"
                  >
                    <span>Submit Request</span>
                    <svg className="ml-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
