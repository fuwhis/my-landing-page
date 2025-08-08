import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export * from 'gsap';
export * from '@gsap/react';
export * from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);
