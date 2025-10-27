import React, { useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';
import { gsap } from 'gsap';

// --- Child Component: TestimonialCard (No changes needed) ---
const TestimonialCard = React.forwardRef(({ testimonial }, ref) => {
    const cardRef = useRef(null);
    const spotlightRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        const spotlight = spotlightRef.current;
        if (!card || !spotlight) return;

        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            gsap.to(spotlight, { x: e.clientX - rect.left, y: e.clientY - rect.top, duration: 0.2, ease: 'power3.out' });
        };
        const handleMouseEnter = () => gsap.to(spotlight, { scale: 1, opacity: 1, duration: 0.3 });
        const handleMouseLeave = () => gsap.to(spotlight, { scale: 0, opacity: 0, duration: 0.3 });

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div ref={ref} className="testimonial-card-container w-[90vw] md:w-[480px] flex-shrink-0 p-4 h-full">
            <div ref={cardRef} className="relative h-full bg-slate-800/60 backdrop-blur-lg rounded-2xl p-8 flex flex-col border border-slate-700 overflow-hidden">
                <div ref={spotlightRef} className="absolute top-0 left-0 w-30 h-30 bg-[var(--theme-accent)]/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl scale-0 opacity-0 pointer-events-none" />
                <Quote className="h-10 w-10 text-[var(--theme-accent)] mb-6 z-10" />
                <p className="text-slate-300 text-lg italic mb-6 leading-relaxed flex-grow z-10 font-sans">
                    "{testimonial.quote}"
                </p>
                <div className="flex items-center mt-auto pt-6 border-t border-slate-700 z-10">
                    <img
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        className="w-16 h-16 rounded-full object-cover mr-5 border-2 border-[var(--theme-accent)]"
                    />
                    <div>
                        <p className="font-bold text-white text-lg font-serif">{testimonial.author}</p>
                        <p className="text-sm text-slate-400 font-sans">{testimonial.role}</p>
                    </div>
                </div>
            </div>
        </div>
    );
});


// --- Main Testimonials Component (ANIMATION ADDED & BACKGROUND REVERTED) ---
const Testimonials = () => {
    const sectionRef = useRef(null);
    const cardsWrapperRef = useRef(null);
    const animationTimeline = useRef(null);

    // Added more testimonials for a better scrolling experience
   const originalTestimonials = [
        { 
            id: 1, 
            quote: "Booking appointments used to be a hassle. With this app, I can see my doctor's availability and schedule a visit in seconds. It has saved me so much time and stress.", 
            author: "Sarah Johnson", 
            role: "Verified Patient", 
            avatar: "https://i.pravatar.cc/80?img=1" 
        },
        { 
            id: 2, 
            quote: "The video consultation feature is a lifesaver. I received a quick diagnosis and prescription from my doctor without even leaving my home. The quality was crystal clear.", 
            author: "Michael Chen", 
            role: "Remote Consultation User", 
            avatar: "https://i.pravatar.cc/80?img=3" 
        },
        { 
            id: 3, 
            quote: "Having all my medical records, prescriptions, and lab results in one secure place is amazing. It helps me feel more in control of my health journey.", 
            author: "Emily Rodriguez", 
            role: "Managing Chronic Condition", 
            avatar: "https://i.pravatar.cc/80?img=5" 
        },
        { 
            id: 4, 
            quote: "This app provides incredible peace of mind. Knowing that I can connect with a trusted professional for any health concern, big or small, is so reassuring for my family.", 
            author: "David Lee", 
            role: "Parent & Patient", 
            avatar: "https://i.pravatar.cc/80?img=7" 
        },
        { 
            id: 5, 
            quote: "Follow-up care has never been easier. My doctor checks on my progress through secure messaging, and I can ask questions without waiting for a new appointment. It feels truly patient-centric.", 
            author: "Jessica Williams", 
            role: "Post-Op Patient", 
            avatar: "https://i.pravatar.cc/80?img=9" 
        },
    ];
    // To create a seamless loop, we duplicate the testimonials.
    const testimonialsData = [...originalTestimonials, ...originalTestimonials.map(t => ({ ...t, id: t.id + originalTestimonials.length }))];


    useEffect(() => {
        const ctx = gsap.context(() => {
            const wrapper = cardsWrapperRef.current;
            if (!wrapper) return;

            const totalWidth = wrapper.offsetWidth / 2;
            const duration = 40; 

            gsap.set(wrapper, { x: 0 });

            animationTimeline.current = gsap.timeline({
                repeat: -1,
                defaults: { ease: 'none' }
            }).to(wrapper, {
                x: -totalWidth,
                duration: duration
            });


        }, sectionRef);

        return () => {
            animationTimeline.current?.kill();
            ctx.revert();
        };
    }, []);

    return (
        // REVERTED: The background color is now back to the original bg-slate-900
        <section ref={sectionRef} className="bg-white text-black relative overflow-hidden py-24 md:py-32">
            <div className="absolute inset-0 z-0 bg-grid-slate" />

            <div className="container mx-auto px-4 text-center mb-16 relative z-10">
                <h2 className="text-3xl md:text-5xl font-extrabold font-serif mb-6">
                    What Our <span className="text-[var(--theme-accent)]">Users Say</span>
                </h2>
                <p className="text-lg text-slate-300 max-w-3xl mx-auto font-sans">
                    Hear from students, alumni, and professors who are part of our community.
                </p>
            </div>

            <div className="w-full overflow-hidden">
                <div ref={cardsWrapperRef} className="flex items-center h-full w-max">
                    {testimonialsData.map((testimonial, index) => (
                        <TestimonialCard
                            key={`${testimonial.id}-${index}`}
                            testimonial={testimonial}
                        />
                    ))}
                </div>
            </div>
            <GlobalStyles />
        </section>
    );
};

// --- Inlined Global Styles (No changes needed here) ---
const GlobalStyles = () => (
    <style jsx global>{`
        /* Note: You might want to adjust the grid line color to match the darker slate background if needed */
        .bg-grid-slate {
            background-image: linear-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px),
                              linear-gradient(to right, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
            background-size: 4rem 4rem;
        }
    `}</style>
);

export default Testimonials;