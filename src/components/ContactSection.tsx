import { ContactForm } from "@/components/ContactForm";

const ContactSection = () => {
  return (
    <section className="py-20 md:py-28 px-6 bg-muted/30">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-light mb-16">Contact</h2>
        <ContactForm />
        
        <div className="mt-16 pt-16 border-t border-border">
          <div className="space-y-2 text-foreground/90">
            <p className="text-xl font-light">Vikram Jaglan</p>
            <p className="text-muted-foreground">Managing partner</p>
            <p className="text-muted-foreground">M - 9711753499</p>
            <a 
              href="mailto:vikram@creativehomedecorllp.com"
              className="text-muted-foreground hover:text-foreground transition-colors inline-block"
            >
              Mail - vikram@creativehomedecorllp.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
