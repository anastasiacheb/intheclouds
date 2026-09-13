'use client';
import Image from 'next/image';
import { motion, useScroll, useTransform, motionValue, useInView, useAnimate, animate } from 'motion/react';
import { useRef, useEffect, useState } from 'react';

function useParallax(value, distance) {
  return useTransform(value, [0.05, 1], [-distance, distance], { clamp: false });
}

function ParallaxLayer({ y, children, className }) {
  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

function AnimatedLayer({ children, initial, animate, className, amount = 0.5, ready = true }) {
  const ref = useRef(null);
  const [scope, animateElement] = useAnimate();
  const isInView = useInView(ref, { amount });

  useEffect(() => {
    if (isInView && ready) {
      animateElement(scope.current, animate, { duration: 6 });
    } else if (!isInView) {
      animateElement(scope.current, initial, { duration: 1 });
    }
  }, [isInView, ready]);

  return (
    <motion.div
      ref={(node) => {
        ref.current = node;
        scope.current = node;
      }}
      initial={initial}
      className={className}>
      {children}
    </motion.div>
  );
}

function SlideOne({ progress }) {
  const yParallax = useParallax(progress, -400);
  const yInitial = useRef(motionValue(200)).current;
  const opacityInitial = useRef(motionValue(0)).current;

  const yCombined = useTransform([yInitial, yParallax], ([initial, para]) => initial + para);

  const [loaderComplete, setLoaderComplete] = useState(false);

  useEffect(() => {
    const yAnimation = animate(yInitial, 0, {
      delay: 0.4,
      duration: 0.64,
      ease: 'easeOut',
    });

    const opacityAnimation = animate(opacityInitial, 1, {
      delay: 0.4,
      duration: 0.64,
      ease: 'easeOut',
    });

    Promise.all([yAnimation.finished, opacityAnimation.finished]).then(() => {
      setLoaderComplete(true);
    });

    return () => {
      yAnimation.stop();
      opacityAnimation.stop();
    };
  }, [yInitial, opacityInitial]);

  return (
    <>
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-full w-full">
        <AnimatedLayer
          initial={{ scale: 1 }}
          animate={{ scale: 1.2 }}
          ready={loaderComplete}
          className="h-full w-full flex justify-center">
          <motion.div style={{ y: yCombined, opacity: opacityInitial }} className="h-full w-full flex justify-center">
            <Image
              src={`/images/carcloud_1.png`}
              alt="background"
              width={0}
              height={0}
              sizes="100vw"
              className="h-full w-auto object-contain"
            />
          </motion.div>
        </AnimatedLayer>
      </div>
      <div className="w-full lg:w-250 px-2 h-1/2 md:h-2/3 absolute top-1/2 -translate-y-2/3 md:top-10 md:translate-y-0 lg:top-1/2 lg:-translate-y-1/2 left-1/2 -translate-x-1/2 lg:h-fit">
        <motion.div style={{ y: yCombined, opacity: opacityInitial }} className="h-full lg:h-fit">
          <div className="w-full lg:w-250 px-2 h-full lg:h-fit  text-white flex flex-col justify-between gap-4">
            <div>
              <h1 className="font-medium uppercase text-base md:text-xl">get lost</h1>
              <h1 className="font-extrabold text-6xl md:text-9xl leading-[0.85]">
                in the <br />
                clouds
              </h1>
            </div>
            <p className="font-medium text-base md:text-xl text-right">
              Make a pipe dream come true <br />
              with this artistic parallax slider
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}

function SlideTwo({ progress }) {
  const yPlanet = useParallax(progress, -400);
  const yLand = useParallax(progress, 300);
  const yPeople = useParallax(progress, 300);
  const yText = useParallax(progress, -400);

  return (
    <>
      <div className="absolute top-[13vh] left-1/2 -translate-x-1/2 h-[55vh] w-full">
        <AnimatedLayer initial={{ scale: 1 }} animate={{ scale: 1.2 }} className="w-full flex justify-center">
          <motion.div style={{ y: yPlanet }}>
            <Image
              src="/images/planet_2.png"
              alt="background"
              width={0}
              height={0}
              sizes="100vw"
              className="h-[55vh] w-auto object-contain px-2"
            />
          </motion.div>
        </AnimatedLayer>
      </div>
      <AnimatedLayer initial={{ scale: 1 }} animate={{ scale: 1.2 }}>
        <motion.div style={{ y: yLand }}>
          <Image
            src={`/images/land_1.png`}
            alt="background"
            width={0}
            height={0}
            sizes="100vw"
            className="h-[31vh] w-auto max-h-64  absolute top-full left-1/2 -translate-x-1/2 -translate-y-full mt-10 object-cover"
          />
        </motion.div>
      </AnimatedLayer>
      <AnimatedLayer initial={{ scale: 1 }} animate={{ scale: 1.2 }}>
        <motion.div style={{ y: yPeople }}>
          <Image
            src={`/images/people_1.png`}
            alt="background"
            width={0}
            height={0}
            sizes="100vw"
            className="h-[37vh] w-auto max-h-75 absolute bottom-8 left-1/2 -translate-x-1/2 object-contain"
          />
        </motion.div>
      </AnimatedLayer>
      <div className="-translate-y-1/2 -translate-x-1/2 absolute top-1/2  left-1/2 w-full lg:w-250">
        <motion.div style={{ y: yText }}>
          <div className="lg:w-250 px-2 h-fit  text-white flex flex-col gap-4">
            <div>
              <h1 className="font-extrabold text-6xl md:text-9xl leading-[0.85]">
                to the <br />
                unknown
              </h1>
              <h1 className="font-medium uppercase text-base md:text-xl">and back</h1>
            </div>
            <p className="font-medium text-base md:text-xl text-right">
              Make a pipe dream come true <br />
              with this artistic parallax slider
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}

function SlideThree({ progress }) {
  const yPlanet = useParallax(progress, -400);
  const yLand = useParallax(progress, -400);
  const yPeople = useParallax(progress, -400);
  const yText = useParallax(progress, -400);

  return (
    <>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <motion.div style={{ y: yPlanet }}>
          <Image
            src={`/images/image_5.png`}
            alt="background"
            width={0}
            height={0}
            sizes="100vw"
            className="h-[35vh] w-auto max-h-72  object-cover scale-120"
          />
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-85">
        <motion.div style={{ y: yLand }} className="w-full">
          <Image
            src={`/images/image_2.png`}
            alt="background"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full max-w-85 object-contain"
          />
        </motion.div>
      </div>
      <div>
        <AnimatedLayer
          initial={{ scale: 1 }}
          animate={{ scale: 1.2 }}
          className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-full max-h-160">
          <motion.div style={{ y: yPeople }} className="h-full">
            <Image
              src={`/images/image_4.png`}
              alt="background"
              width={0}
              height={0}
              sizes="100vw"
              className="h-full w-auto max-h-160 object-contain"
            />
          </motion.div>
        </AnimatedLayer>
      </div>
      <div className="w-full lg:w-250 -translate-y-1/2 -translate-x-1/2 absolute top-1/2  left-1/2 ">
        <motion.div style={{ y: yText }}>
          <div className="w-full lg:w-250 px-2 h-fit  text-white flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div>
              <h1 className="font-medium uppercase text-base md:text-xl">go beyond</h1>
              <h1 className="font-extrabold text-6xl md:text-9xl leading-[0.85]">
                a sky <br />
                odyssey
              </h1>
            </div>
            <p className="font-medium text-base md:text-xl text-right">
              Make a pipe dream come true <br />
              with this artistic parallax slider
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}

function SlideFour({ progress }) {
  const yOther = useParallax(progress, -400);
  const yLand = useParallax(progress, 300);
  const yText = useParallax(progress, -400);

  return (
    <>
      <div className="absolute top-[5vh] left-1/2 -translate-x-1/2 h-[53vh] w-full">
        <AnimatedLayer initial={{ scale: 1 }} animate={{ scale: 1.2 }}>
          <motion.div style={{ y: yOther }} className="w-full h-[53vh] items-center flex justify-center">
            <Image
              src={`/images/cloud11.png`}
              alt="background"
              width={0}
              height={0}
              sizes="100vw"
              className="h-[53vh] w-auto  object-cover transform "
            />
          </motion.div>
        </AnimatedLayer>
      </div>
      <div>
        <AnimatedLayer
          initial={{ scale: 1 }}
          animate={{ scale: 1.5 }}
          className="absolute top-[32vh] right-1/2 -translate-x-90 ">
          <motion.div style={{ y: yOther }}>
            <Image
              src={`/images/cloud11.png`}
              alt="background"
              width={0}
              height={0}
              sizes="100vw"
              className="w-[18vw] min-w-75 h-auto transform object-cover "
            />
          </motion.div>
        </AnimatedLayer>
      </div>
      <div>
        <AnimatedLayer
          initial={{ x: 0 }}
          animate={{ x: -60 }}
          className="h-auto absolute top-[18vh] right-1/2 -translate-x-75">
          <motion.div style={{ y: yOther }}>
            <Image
              src={`/images/ufo.png`}
              alt="background"
              width={0}
              height={0}
              sizes="100vw"
              className="w-[9vw] min-w-37  object-cover "
            />
          </motion.div>
        </AnimatedLayer>
      </div>
      <div>
        <AnimatedLayer initial={{ x: 0 }} animate={{ x: 40 }} className="absolute top-[8vh] left-1/2 translate-x-70">
          <motion.div style={{ y: yOther }}>
            <Image
              src={`/images/ufo.png`}
              alt="background"
              width={0}
              height={0}
              sizes="100vw"
              className="w-[6vw] min-w-25 h-auto  object-cover "
            />
          </motion.div>
        </AnimatedLayer>
      </div>
      <div>
        <AnimatedLayer initial={{ y: 0 }} animate={{ y: -50 }} className="absolute top-[9vh] left-1/2 -translate-x-1/2">
          <motion.div style={{ y: yOther }}>
            <div className=" w-max flex flex-col items-center">
              <Image
                src={`/images/ufo.png`}
                alt="background"
                width={0}
                height={0}
                sizes="100vw"
                className="h-[20vh] w-auto max-h-39 object-cover px-2"
              />
              <motion.div
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{
                  duration: 0.25,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}>
                <Image
                  src={`/images/beam.png`}
                  alt="background"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-[77vh] w-auto max-h-200 object-cover px-2 -mt-4"
                />
              </motion.div>
            </div>
          </motion.div>
        </AnimatedLayer>
      </div>
      <AnimatedLayer initial={{ scale: 1 }} animate={{ scale: 1.2 }}>
        <motion.div style={{ y: yLand }}>
          <Image
            src={`/images/man-field_1.png`}
            alt="background"
            width={0}
            height={0}
            sizes="100vw"
            className="h-[44vh] w-auto absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-20 object-cover"
          />
        </motion.div>
      </AnimatedLayer>
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full lg:w-250">
        <motion.div style={{ y: yText }}>
          <div className="w-full lg:w-250 px-2 h-fit  text-white flex flex-col gap-4">
            <div>
              <h1 className="font-medium uppercase text-base md:text-xl text-black">we are not alone</h1>
              <h1 className="font-extrabold text-6xl md:text-9xl leading-[0.85] text-black">believe it's true</h1>
            </div>
            <p className="font-medium text-base md:text-xl text-right">
              Make a pipe dream come true <br />
              with this artistic parallax slider
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}

const Sliders = [
  { backgroundImage: 'sld1-bg1.png', content: (progress) => <SlideOne progress={progress} /> },
  { backgroundImage: 'sld3-bg_1.png', content: (progress) => <SlideTwo progress={progress} /> },
  { backgroundImage: 'image_3.png', content: (progress) => <SlideThree progress={progress} /> },
  { backgroundImage: 'sld4-bg.png', content: (progress) => <SlideFour progress={progress} /> },
];

function Slide({ backgroundImage, children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const [scope, animate] = useAnimate();
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      animate(scope.current, { scale: 1 }, { duration: 6 });
    } else {
      animate(scope.current, { scale: 1.2 }, { duration: 0 });
    }
  }, [isInView]);

  return (
    <section className="snap-start relative overflow-clip">
      <motion.div
        ref={(node) => {
          ref.current = node;
          scope.current = node;
        }}
        initial={{ scale: 1.2 }}
        className="w-dvw h-lvh flex items-center justify-center overflow-clip">
        <Image
          src={`/images/${backgroundImage}`}
          alt="background"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full object-cover"
        />
      </motion.div>
      {children(scrollYProgress)}
    </section>
  );
}

export default function Parallax() {
  return (
    <div>
      {Sliders.map((slider, index) => (
        <Slide key={index} backgroundImage={slider.backgroundImage}>
          {(progress) => slider.content(progress)}
        </Slide>
      ))}
    </div>
  );
}
