"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./ui/Container";

// Register GSAP plugin once
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const ARTICLES = [
    {
        id: 1,
        date: "04.11.2025",
        title: "Room With A View au Taipei Performing Arts Center",
        image: "/images/post1.png",
        category: "SPECTACLE"
    },
    {
        id: 2,
        date: "27.10.2025",
        title: "L'ÉTUDE au BNM avec l'ENSA-M",
        image: "/images/post2.png",
        category: "WORKSHOP"
    },
    {
        id: 3,
        date: "15.09.2025",
        title: "Nouvelle Saison 2025/2026",
        image: "/images/post1.png",
        category: "ACTUALITÉ"
    }
];

function ArticleCard({ article, isLast }) {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current || !imageRef.current) return;

        // Clear any existing ScrollTriggers for this element
        ScrollTrigger.getAll().forEach(t => {
            if (t.trigger === containerRef.current) {
                t.kill();
            }
        });

        // Create animation after a short delay
        const timer = setTimeout(() => {
            const ctx = gsap.context(() => {
                // Image moves up only 350px (to title middle)
                triggerRef.current = ScrollTrigger.create({
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=80%",
                    pin: true,
                    scrub: 0.3,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        // Move image up based on scroll progress
                        // Max movement is 350px (to title middle area)
                        const progress = self.progress;
                        gsap.set(imageRef.current, {
                            y: -350 * progress
                        });
                    }
                });
            }, containerRef);

            return () => ctx.revert();
        }, 150);

        return () => {
            clearTimeout(timer);
            if (triggerRef.current) {
                triggerRef.current.kill();
            }
        };
    }, []);

    return (
        <article
            ref={containerRef}
            style={{
                position: 'relative',
                height: '100vh',
                backgroundColor: '#fff',
                overflow: 'hidden'
            }}
        >
            {/* Title Section */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                paddingTop: '100px',
                zIndex: 1,
                backgroundColor: '#fff'
            }}>
                <Container>
                    <div style={{ textAlign: 'center' }}>
                        <span style={{
                            display: 'inline-block',
                            fontSize: '0.875rem',
                            fontFamily: 'monospace',
                            border: '1px solid #000',
                            padding: '4px 12px',
                            borderRadius: '4px',
                            marginBottom: '24px'
                        }}>
                            {article.date}
                        </span>
                        <h2 className="text-jumbo text-headline">
                            {article.title}
                        </h2>
                    </div>
                </Container>
            </div>

            {/* Image - starts below and moves up to title middle */}
            <div
                ref={imageRef}
                style={{
                    position: 'absolute',
                    top: '60%',
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    backgroundColor: '#fff',
                    paddingTop: '20px'
                }}
            >
                <Container>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{
                            width: '100%',
                            maxWidth: '700px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
                        }}>
                            <img
                                src={article.image}
                                alt={article.title}
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                        </div>
                    </div>
                </Container>
            </div>
        </article>
    );
}

export default function NewsSection() {
    useEffect(() => {
        // Refresh ScrollTrigger after all articles mount
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 300);

        return () => {
            clearTimeout(timer);
            // Clean up all ScrollTriggers on unmount
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section style={{ backgroundColor: '#fff' }}>
            <Container>
                <div className="dashed-border-t" style={{ padding: '32px 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <span style={{
                            border: '1px solid #000',
                            padding: '4px 8px',
                            fontSize: '0.75rem'
                        }}>ACTUALITÉS</span>
                    </div>
                </div>
            </Container>

            {ARTICLES.map((article, index) => (
                <ArticleCard
                    key={article.id}
                    article={article}
                    isLast={index === ARTICLES.length - 1}
                />
            ))}
        </section>
    );
}
