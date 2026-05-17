/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, MeshDistortMaterial, MeshWobbleMaterial, Text, Sparkles, ContactShadows, Environment, useCursor } from '@react-three/drei';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  Monitor, 
  Layers, 
  Zap, 
  Send, 
  ChevronRight, 
  Award, 
  Clock, 
  Briefcase, 
  User, 
  Code,
  Github,
  Mail,
  ExternalLink,
  Gamepad2,
  Tv,
  Box,
  Instagram,
  X,
  School,
  History,
  Activity,
  FileText,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import * as THREE from 'three';

// --- 3D Components ---

function DynamicShape({ position, color, speed = 1, factor = 0.6 }: { position: [number, number, number], color: string, speed?: number, factor?: number }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = Math.cos(t / 4) / 2;
    mesh.current.rotation.y = Math.sin(t / 4) / 2;
    mesh.current.rotation.z = Math.sin(t / 4) / 2;
    mesh.current.position.y = position[1] + Math.sin(t * speed) * 0.2;
  });

  return (
    <Float speed={speed * 2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh
        ref={mesh}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <octahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color={hovered ? "#3b82f6" : color}
          speed={speed * 2}
          distort={factor}
          radius={1}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

function FloatingWireframe({ color }: { color: string }) {
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < 30; i++) {
      p.push(new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10));
    }
    return p;
  }, []);

  const mesh = useRef<THREE.Group>(null!);
  useFrame((state) => {
    mesh.current.rotation.y += 0.002;
    mesh.current.rotation.x += 0.001;
  });

  return (
    <group ref={mesh}>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.02, 0.02, 0.02]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#FFFCF5"]} />
      <ambientLight intensity={1.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={100} color="#FF4E00" />
      <pointLight position={[-10, -10, -10]} intensity={50} color="#4D96FF" />
      
      <Suspense fallback={null}>
        <DynamicShape position={[2, 0, 0]} color="#FFD93D" speed={1} factor={0.6} />
        <DynamicShape position={[-2, 1, -2]} color="#6BCB77" speed={0.8} factor={0.4} />
        <DynamicShape position={[0, -2, -3]} color="#4D96FF" speed={1.2} factor={0.5} />
        
        <FloatingWireframe color="#1A1A1A" />
        <Sparkles count={50} scale={10} size={1} speed={0.4} opacity={0.5} color="#FF4E00" />
        
        <ContactShadows position={[0, -4.5, 0]} opacity={0.2} scale={20} blur={2} far={4.5} />
        <Environment preset="city" />
      </Suspense>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
    </>
  );
}

// --- UI Components ---

const ResumeModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      <div 
        className="absolute inset-0 bg-dark/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white border-[4px] border-dark shadow-[12px_12px_0px_0px_#FF4E00] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b-[4px] border-dark flex justify-between items-center bg-cream">
           <div>
              <h2 className="text-4xl font-display font-[900] uppercase italic tracking-tight">C.V / Resume</h2>
              <p className="font-mono text-[10px] font-black opacity-40 uppercase tracking-[0.2em] mt-1">TAEWOOK KANG • 3D Specialist</p>
           </div>
           <button 
             onClick={onClose}
             className="w-12 h-12 bento-card bg-dark text-white flex items-center justify-center hover:bg-brand transition-colors"
           >
             <X size={24} />
           </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 font-bold text-dark custom-scrollbar">
           <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              
              {/* Left Column: Education & Certs */}
              <div className="md:col-span-4 space-y-12">
                 <section>
                    <div className="flex items-center gap-3 mb-6">
                       <School size={20} className="text-brand" />
                       <h3 className="text-xl font-display font-black uppercase italic">Education</h3>
                    </div>
                    <div className="space-y-6">
                       <div>
                          <div className="text-xs opacity-40 mb-1">2021.03 - 2026.03</div>
                          <div className="text-sm">한국영상대학교</div>
                          <div className="text-xs font-medium opacity-60">게임애니메이션학과 학사학위 전공심화과정 재학 / 전문학사 졸업</div>
                       </div>
                       <div>
                          <div className="text-xs opacity-40 mb-1">2018.03 - 2021.03</div>
                          <div className="text-sm">수원정보과학고등학교</div>
                          <div className="text-xs font-medium opacity-60">IT소프트웨어학과 졸업</div>
                       </div>
                    </div>
                 </section>

                 <section>
                    <div className="flex items-center gap-3 mb-6">
                       <FileText size={20} className="text-brand" />
                       <h3 className="text-xl font-display font-black uppercase italic">Certs</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                       {['컴퓨터활용능력(2급)', '자동차운전면허(1종 보통)', '정보처리기능사', '3D모델링지도사', '심리상담사(1급)'].map(cert => (
                         <div key={cert} className="flex items-center gap-2 p-3 bg-cream border-2 border-dark/10 text-xs">
                            <CheckCircle2 size={14} className="text-brand" />
                            {cert}
                         </div>
                       ))}
                    </div>
                 </section>

                 <section>
                    <div className="flex items-center gap-3 mb-6">
                       <Briefcase size={20} className="text-brand" />
                       <h3 className="text-xl font-display font-black uppercase italic">Military</h3>
                    </div>
                    <div className="p-4 bg-dark text-white rounded-sm">
                       <div className="text-[10px] opacity-40 uppercase mb-1">Status</div>
                       <div className="flex justify-between items-baseline">
                          <span className="text-lg">군필 (병장 만기제대)</span>
                          <span className="text-[10px] opacity-60">22.02.04 - 23.11.13</span>
                       </div>
                    </div>
                 </section>
              </div>

              {/* Right Column: Experience & Activities */}
              <div className="md:col-span-8 space-y-12">
                 <section>
                    <div className="flex items-center gap-3 mb-6">
                       <History size={20} className="text-brand" />
                       <h3 className="text-xl font-display font-black uppercase italic">Career & Projects</h3>
                    </div>
                    <div className="space-y-8 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-dark/5">
                      {[
                        {
                          date: '2025.11 - 2025.12',
                          title: '트니와프렌즈: 젤리트레일 | 시즌4',
                          role: '3D 애니메이션 제작 참여',
                          desc: '아이콘픽쳐스 협업 프로젝트 - 3D 애니메이션 제작 참여'
                        },
                        {
                          date: '2025.03 - 2025.05',
                          title: '캡스톤 디자인 [길건너 친구들]',
                          role: '3D 캐릭터 모델링 및 애니메이션',
                          desc: 'GAME PV movie 단편 제작 프로젝트'
                        },
                        {
                          date: '2025.01 - 2025.02',
                          title: '[스튜디오 질풍] 일 경험 프로젝트',
                          role: '생성형 AI 및 3D 배경 작업 연계',
                          desc: '백그라운드 AI 이미지 출력 및 전시 프로젝트'
                        },
                        {
                          date: '2024.04 - 2025.03',
                          title: '학생회 및 총무 활동',
                          role: '한국영상대학교 학생회 총무',
                          desc: '학과 행정 업무, 행사 제휴 계약 및 회계처리'
                        },
                        {
                          date: '2024.04 - 2025.03',
                          title: '창의종합설계 [HORIZON]',
                          role: 'PD/PM 매니지먼트 및 3D 애니메이션',
                          desc: '모델링, 애니메이션 제작 및 전시 굿즈 매니지먼트'
                        },
                        {
                          date: '2021.03 - 2021.07',
                          title: '29대 총학생회 회계부 차장',
                          role: '행정 및 회계 관리',
                          desc: '교내 행사 안건 행정 업무 및 장부 관리'
                        }
                      ].map((exp, i) => (
                         <div key={i} className="pl-8 relative">
                            <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-dark bg-white" />
                            <div className="text-[10px] opacity-40 mb-1">{exp.date}</div>
                            <h4 className="text-lg font-black leading-tight mb-1">{exp.title}</h4>
                            <div className="text-sm text-brand italic mb-2">{exp.role}</div>
                            <p className="text-xs opacity-60 leading-relaxed">{exp.desc}</p>
                         </div>
                       ))}
                    </div>
                 </section>

                 <section>
                    <div className="flex items-center gap-3 mb-6">
                       <Activity size={20} className="text-brand" />
                       <h3 className="text-xl font-display font-black uppercase italic">Major Activities</h3>
                    </div>
                    <div className="bento-card p-6 bg-cream border-dark/20 text-sm space-y-4">
                       <div>
                          <div className="text-xs opacity-40 mb-1">2024.08 - 2025.05</div>
                          <div className="font-black">채널박스 전공 동아리 (ChannelBox)</div>
                          <ul className="text-xs font-medium space-y-1 mt-2 list-disc list-inside opacity-70">
                             <li>아이콘픽쳐스 협업 3D애니메이션 '트윗츠' 숏폼 제작</li>
                             <li>트니와프렌즈: 젤리트레일 시즌4 제작 참여</li>
                             <li>졸업작품 전시회 및 PD/PM 매니지먼트 실습</li>
                          </ul>
                       </div>
                       <div className="pt-4 border-t-2 border-dark/5">
                          <div className="font-black">Exhibitions</div>
                          <p className="text-xs opacity-70 mt-1">
                             2021/2024 교내 과제전 3D/2D 캐릭터 디자인 전시<br />
                             2024 교외 전시회 [레이어9] 2D 캐릭터 디자인 전시
                          </p>
                       </div>
                    </div>
                 </section>
              </div>

           </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Strengths', href: '#strengths' },
    { name: 'Career', href: '#career' },
    { name: 'Projects', href: '#projects' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all duration-300">
      <div 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex items-center gap-2 group cursor-pointer"
      >
        <div className="w-10 h-10 border-2 border-dark flex items-center justify-center font-black text-xl group-hover:bg-brand group-hover:text-white transition-all shadow-[4px_4px_0px_0px_#1A1A1A]">
          K
        </div>
        <span className="font-display font-[900] text-2xl md:text-3xl hidden sm:block uppercase">KANG TAEUK.anim</span>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-8 items-center font-bold text-sm">
        {navLinks.map((item) => (
          <a 
            key={item.name} 
            href={item.href}
            className="text-dark hover:text-brand transition-colors px-2 py-1 relative group"
          >
            {item.name}
          </a>
        ))}
        <a 
          href="#contact" 
          className="tag bg-brand text-white hover:scale-105 transition-transform"
        >
          CONTACT
        </a>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center gap-4">
        <a 
          href="#contact" 
          className="tag bg-brand text-white text-[10px] px-3 py-1.5"
        >
          CONTACT
        </a>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 bento-card bg-white flex items-center justify-center border-2 border-dark"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={20} /> : <Layers size={20} />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-6 right-6 p-6 bg-white border-[4px] border-dark shadow-[8px_8px_0px_0px_#1A1A1A] md:hidden flex flex-col gap-4 z-40"
          >
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-display font-black uppercase italic hover:text-brand transition-colors"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-8 md:mb-12">
    {subtitle && (
      <motion.span 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="text-brand font-mono text-[10px] md:text-xs tracking-widest uppercase mb-2 block font-black"
      >
        {subtitle}
      </motion.span>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-3xl md:text-6xl font-display font-[900] uppercase italic"
    >
      {children}
    </motion.h2>
  </div>
);

// --- Content Sections ---

const Hero = () => (
  <section className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20">
    <div className="absolute inset-0 z-0">
      <Canvas shadows>
        <Scene />
      </Canvas>
    </div>
    
    <div className="container mx-auto px-6 z-10 pointer-events-none">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex justify-center gap-2 mb-8 pointer-events-auto">
             <span className="tag bg-white">MAYA</span>
             <span className="tag bg-white">ANIMATION</span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-display font-[900] leading-[0.8] mb-8 uppercase">
            <span className="block text-gradient">3D</span>
            <span className="block text-white bg-dark px-4 inline-block transform -rotate-2">ANIMATOR</span>
          </h1>
          
          <div className="max-w-2xl mx-auto bento-card p-6 bg-hero pointer-events-auto mb-10">
            <p className="text-dark text-lg md:text-2xl font-bold leading-tight">
              팀 파이프라인과 외주 실무를 경험하며,<br className="hidden md:block" />
              난이도 높은 연출부터 최종 컷의 마감까지 책임지는<br className="hidden md:block" />
              3D 애니메이터
            </p>
          </div>

        </motion.div>
      </div>
    </div>
  </section>
);

const About = ({ onOpenResume }: { onOpenResume: () => void }) => (
  <section id="about" className="py-20 md:py-32">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative perspective-container flex justify-center">
          <motion.div 
            initial={{ opacity: 0, rotateY: 20 }}
            whileInView={{ opacity: 1, rotateY: -5 }}
            className="w-full max-w-sm bento-card bg-white overflow-hidden relative group p-4 transform-gpu shadow-xl border-[4px] border-dark cursor-pointer ring-0 hover:ring-8 ring-brand/10 transition-all"
            onClick={onOpenResume}
          >
            <div className="w-full aspect-[3/4] border-[3px] border-dark relative overflow-hidden bg-cream mb-4">
               <img 
                 src="/src/assets/images/regenerated_image_1779010381300.png" 
                 alt="강태욱 증명사진"
                 className="w-full h-full object-cover"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] pointer-events-none" />
            </div>
            <div className="flex justify-between items-end border-t-2 border-dark/10 pt-3">
               <div>
                 <h3 className="font-display font-[900] text-2xl uppercase leading-none mb-1">강태욱</h3>
                 <p className="text-[10px] font-mono font-bold opacity-40 uppercase tracking-widest">3D Animator / Artist</p>
               </div>
               <div className="flex flex-col items-end gap-1">
                  <div className="text-[7px] font-bold text-dark/30 uppercase tracking-widest mb-1">CLICK TO VIEW CV</div>
                  <a 
                    href="https://www.instagram.com/uk_908_/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 px-3 py-2 bg-dark text-white text-[10px] font-black uppercase tracking-widest hover:bg-brand transition-colors shadow-[4px_4px_0px_0px_#FF4E00] transform hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Instagram size={14} />
                    Instagram
                  </a>
               </div>
            </div>
          </motion.div>
        </div>

        <div>
          <SectionTitle subtitle="Vision & Core">Who I am</SectionTitle>
          <div className="space-y-6 text-dark leading-relaxed text-lg font-medium">
            <p>
              마야(Maya)를 기반으로 복잡한 연출의 핵심 타이밍과 포징을 빠르게 파악해 내는 <span className="bg-hero px-1 font-bold">3D 애니메이터</span>입니다.
            </p>
            <p>
              팀 프로젝트 파이프라인부터 외주 실무까지 경험하며 환경에 구애받지 않는 실전 적응력을 키웠습니다.
            </p>
            <p>
              앞뒤 컷의 자연스러운 연결(Hook-up)과 최종 화면의 완성도를 최우선으로 생각하며 철저하게 마감을 준수합니다.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div 
                className="p-6 bento-card bg-project-1 cursor-pointer hover:bg-brand hover:text-white transition-colors group"
                onClick={onOpenResume}
              >
                 <div className="text-dark group-hover:text-white mb-2 font-black">STRIKE</div>
                 <div className="text-dark group-hover:text-white font-[900] text-xl uppercase italic">Resume</div>
                 <div className="text-[10px] uppercase tracking-widest font-black opacity-50 group-hover:opacity-100">Click for Detail</div>
              </div>
              <div 
                className="p-6 bento-card bg-hero cursor-pointer hover:bg-brand hover:text-white transition-all group"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                 <div className="text-dark group-hover:text-white mb-2 font-black">PORTFOLIO</div>
                 <div className="text-dark group-hover:text-white font-[900] text-xl uppercase italic">View Work</div>
                 <div className="text-[10px] uppercase tracking-widest font-black opacity-50 group-hover:opacity-100">See Projects</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const StrengthCard = ({ icon: Icon, title, description, delay, color }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className={`p-8 bento-card ${color} h-full`}
  >
    <div className="w-12 h-12 border-[3px] border-dark flex items-center justify-center text-dark mb-8 bg-white shadow-[4px_4px_0px_0px_#1A1A1A]">
      <Icon size={24} />
    </div>
    <h3 className="text-2xl font-display font-black mb-4 uppercase">{title}</h3>
    <p className="text-dark/80 leading-relaxed font-bold text-sm">
      {description}
    </p>
  </motion.div>
);

const Strengths = () => (
  <section id="strengths" className="py-20 md:py-32 bg-cream/50">
    <div className="container mx-auto px-6">
      <SectionTitle subtitle="Professional Edge">Core Strengths</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        <StrengthCard 
          icon={Layers}
          title="Animation Structuring"
          description="복잡한 시퀀스를 명확한 키포즈(Blocking)로 구조화합니다. 그래프 에디터와 레퍼런스 구조를 깔끔하게 관리하여 협업에 강합니다."
          delay={0.1}
          color="bg-white"
        />
        <StrengthCard 
          icon={Monitor}
          title="Production Delivery"
          description="최종 카메라 뷰와 렌더링 퀄리티를 고려한 제작 방식을 지향합니다. 철저한 일정 관리를 통해 프로젝트 마감을 완벽히 수행합니다."
          delay={0.2}
          color="bg-project-2"
        />
        <StrengthCard 
          icon={Zap}
          title="Optimization Focus"
          description="피드백을 직관적으로 해석하여 가장 효율적인 대안을 제시합니다. 실전 팁을 활용해 컷의 완성도를 타협 없이 높입니다."
          delay={0.3}
          color="bg-hero"
        />
      </div>
    </div>
  </section>
);

const ExperienceItem = ({ year, title, company, desc, tags, highlight }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    className="relative pl-12 pb-16 last:pb-0 group"
  >
    <div className="absolute left-0 top-0 w-[4px] h-full bg-dark/10" />
    <div className="absolute left-[-6px] top-2 w-4 h-4 border-2 border-dark bg-white group-hover:bg-brand transition-all duration-300 shadow-[2px_2px_0px_0px_#1A1A1A]" />
    
    <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-4">
      <span className="font-mono text-sm font-black bg-dark text-white px-2 py-0.5">{year}</span>
      <h3 className="text-2xl font-display font-black text-dark group-hover:text-brand transition-colors uppercase">
        {title}
        {highlight && <span className="ml-2 text-xs text-brand font-black italic">! {highlight}</span>}
      </h3>
      <span className="text-dark/50 font-black italic">@ {company}</span>
    </div>

    <div className="p-8 bento-card bg-white group-hover:bg-cream/50">
       <p className="text-dark/70 mb-6 leading-relaxed font-bold">
         {desc}
       </p>
       <div className="flex flex-wrap gap-2">
         {tags.map((tag: string) => (
           <span key={tag} className="tag bg-cream">{tag}</span>
         ))}
       </div>
    </div>
  </motion.div>
);

const Career = () => (
  <section id="career" className="py-20 md:py-32">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
        <div className="lg:sticky lg:top-32 h-fit">
          <SectionTitle subtitle="The Journey">Career Timeline</SectionTitle>
          <div className="bento-card p-8 bg-project-1 mb-8">
            <div className="flex items-center gap-4 mb-4">
               <div className="w-12 h-12 border-2 border-dark flex items-center justify-center bg-white shadow-[4px_4px_0px_0px_#1A1A1A]">
                  <Clock size={24} />
               </div>
               <div className="font-black text-sm uppercase">YEARS OF<br />INDUSTRY</div>
            </div>
            <div className="text-5xl font-display font-[900]">04+</div>
          </div>
          <p className="text-dark font-bold leading-relaxed">
            행정 실무부터 콘텐츠 제작까지 아우르는 하이브리드 커리어. 결과 중심적 사고를 3D 애니메이션 파이프라인에 적용합니다.
          </p>
        </div>
        <div className="lg:col-span-2">
          <div className="space-y-4">
            <ExperienceItem 
              year="2025.11 - 2025.12"
              title="트니와프렌즈: 젤리트레일 | 시즌4"
              company="ICON PICTURES"
              desc="3D 애니메이션 프로젝트 제작 참여"
              tags={["TV Series", "YouTube", "3D Animation"]}
            />
            <ExperienceItem 
              year="2025.03 - 2025.05"
              title="길건너 친구들 PV 제작"
              company="Capstone Project"
              desc="3D 애니메이션 제작 담당. 익살스럽고 다이내믹한 연출로 호평."
              tags={["3D Animation", "Visual Design"]}
              highlight="Lead Artist"
            />
             <ExperienceItem 
              year="2025.01 - 2025.02"
              title="스튜디오 질풍 일 경험"
              company="Studio Zilpung"
              desc="생성형 AI 이미지 출력 및 3D 배경 작업 연계 프로젝트. 최신 기술과 전통 3D의 하이브리드 워크플로우 경험."
              tags={["Generative AI", "3D Layout"]}
            />
            <ExperienceItem 
              year="2024.08 - 2025.05"
              title="트윗츠 숏폼 애니메이션"
              company="ICON PICTURES"
              desc="TV 시리즈 '트윗츠' 숏폼 제작 참여. 상이한 연출 요구사항들에 맞춰 컷의 완성도를 높이는 작업 수행."
              tags={["YouTube", "Shot-form", "Animation"]}
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ProjectCard = ({ title, type, desc, icon: Icon, color, year, image, link }: any) => {
  const CardContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className={`group bento-card ${color} p-2 h-[450px] md:h-[500px] flex flex-col relative overflow-hidden ${link ? 'cursor-pointer hover:shadow-[12px_12px_0px_0px_#1A1A1A] transition-all duration-300' : ''}`}
    >
      {image && (
        <div className="absolute inset-0 z-0">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90" />
        </div>
      )}
      
      <div className="p-6 flex justify-between items-start relative z-10">
         <span className="tag bg-white">{type}</span>
         <span className="font-mono font-black text-xs">{year}</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-12 relative z-10">
         {!image && (
           <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:scale-110 transition-transform duration-500">
              <Icon size={300} strokeWidth={0.5} />
           </div>
         )}
         <div className="w-16 h-16 border-[3px] border-dark bg-white rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_#1A1A1A] z-10 group-hover:bg-brand group-hover:text-white transition-colors">
            <Icon size={32} />
         </div>
      </div>

      <div className="p-8 bg-white border-t-[3px] border-dark mt-auto relative z-10">
         <h3 className="text-3xl font-display font-[900] uppercase mb-2 group-hover:text-brand transition-colors flex items-center gap-2">
           {title}
           {link && <ExternalLink size={20} className="opacity-40" />}
         </h3>
         <p className="text-dark/70 text-sm font-bold line-clamp-2">
           {desc}
         </p>
      </div>
    </motion.div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block">
        {CardContent}
      </a>
    );
  }

  return CardContent;
};

const Projects = () => (
  <section id="projects" className="pt-32 pb-12">
    <div className="container mx-auto px-6">
      <SectionTitle subtitle="Featured Works">Creative Portfolio</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <ProjectCard 
          title="Tuni&Friends"
          type="TV SERIES"
          desc="3D 애니메이션 프로젝트 제작 참여."
          icon={Tv}
          color="bg-hero"
          year="2025"
          image="/src/assets/images/regenerated_image_1779009980208.jpg"
          link="https://youtu.be/mCsemtexihs"
        />
        <ProjectCard 
          title={<span className="whitespace-nowrap">CROSSY FRIENDS</span>}
          type="GAME PV"
          desc={<>리깅부터 익살스러운 액션 연출까지.<br />@ Capstone Project</>}
          icon={Gamepad2}
          color="bg-project-1"
          year="2025"
          image="/src/assets/images/regenerated_image_1779006993997.jpg"
          link="https://www.instagram.com/reel/DO12zy-kpBU/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
        />
        <ProjectCard 
          title="Twitz"
          type="SHORT FORM"
          desc="글로벌 애니메이션 스튜디오 협업 프로덕션."
          icon={Tv}
          color="bg-project-2"
          year="2024"
          image="/src/assets/images/regenerated_image_1779009683424.jpg"
          link="https://www.youtube.com/shorts/iw9aO09WMp4?feature=share"
        />
      </div>
    </div>
  </section>
);

const Showcase = () => {
  const items = [
    { id: 1, image: "/src/assets/images/firerobo_showcase_1779012079327.png" },
    { id: 2, image: "/src/assets/images/teenieping_showcase_1779012224000_1779012243976.png" },
    { id: 3, image: "/src/assets/images/regenerated_image_1779012390015.jpg" },
    { id: 4, image: "/src/assets/images/regenerated_image_1779012390722.webp" },
  ];

  return (
    <section id="showcase" className="pt-8 pb-32 bg-cream/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bento-card bg-white aspect-[4/3] overflow-hidden group relative">
               {item.image ? (
                 <img 
                   src={item.image} 
                   alt={`Visual ${item.id}`}
                   className="w-full h-full object-cover blur-lg group-hover:scale-110 transition-all duration-700"
                   referrerPolicy="no-referrer"
                 />
               ) : (
                 <div className="absolute inset-0 bg-dark/5 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                   <div className="absolute inset-0 border-2 border-dashed border-dark/10 m-3 flex items-center justify-center">
                      <span className="text-[10px] uppercase font-black opacity-20 italic">Visual Space {item.id}</span>
                   </div>
                   <Monitor size={32} className="opacity-5 group-hover:opacity-10 transition-opacity" />
                 </div>
               )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formSent, setFormSent] = useState(false);
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF4E00', '#FFD93D', '#1A1A1A']
    });
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto bento-card bg-cream p-6 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
             <div>
                <SectionTitle subtitle="Connect">Let's build<br />something epic</SectionTitle>
                <div className="space-y-8 mt-12 font-bold">
                   <div className="flex items-center gap-6 group">
                      <div className="w-14 h-14 bento-card flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors">
                         <Mail size={24} />
                      </div>
                      <div>
                         <div className="text-xs uppercase tracking-widest opacity-50 font-black">Email Me</div>
                         <div className="text-xl">ktw5535@gmail.com</div>
                      </div>
                   </div>
                </div>
             </div>

             <AnimatePresence mode="wait">
               {!formSent ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onSubmit={handleSend} 
                    className="flex flex-col gap-6"
                   >
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest ml-1">Your Identity</label>
                       <input type="text" required placeholder="Name / Studio" className="w-full bg-white border-[3px] border-dark p-4 focus:outline-none focus:bg-hero transition-all font-bold placeholder:text-dark/30" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest ml-1">Return Email</label>
                       <input type="email" required placeholder="hello@world.com" className="w-full bg-white border-[3px] border-dark p-4 focus:outline-none focus:bg-hero transition-all font-bold placeholder:text-dark/30" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest ml-1">The Mission</label>
                       <textarea required placeholder="Project description..." className="w-full h-32 bg-white border-[3px] border-dark p-4 focus:outline-none focus:bg-hero transition-all font-bold placeholder:text-dark/30 resize-none" />
                    </div>
                    <button type="submit" className="bg-dark text-white p-6 font-black uppercase tracking-widest shadow-[6px_6px_0px_0px_#FF4E00] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_#FF4E00] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all">
                       Deploy Message
                    </button>
                  </motion.form>
               ) : (
                 <motion.div 
                   key="success"
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="flex flex-col items-center justify-center p-12 text-center"
                 >
                   <div className="w-24 h-24 bg-brand border-[3px] border-dark mb-8 flex items-center justify-center shadow-[6px_6px_0px_0px_#1A1A1A]">
                      <Send size={40} className="text-white" />
                   </div>
                   <h3 className="text-4xl font-display font-[900] uppercase mb-4">Success!</h3>
                   <p className="font-bold">Your message has been deployed.<br />I'll reach out shortly.</p>
                   <button 
                     onClick={() => setFormSent(false)}
                     className="mt-12 text-sm font-black underline hover:text-brand"
                   >
                     SEND ANOTHER
                   </button>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </div>


      </div>
    </section>
  );
};

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative selection:bg-brand selection:text-white">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand z-[100] origin-left"
        style={{ scaleX }}
      />
      
      <Navbar />
      
      <main>
        <Hero />
        <About onOpenResume={() => setIsResumeOpen(true)} />
        <Strengths />
        <Career />
        <Projects />
        <Showcase />
        <Contact />
      </main>

      <AnimatePresence>
        {isResumeOpen && (
          <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        )}
      </AnimatePresence>

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
         <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-brand/5 blur-[150px] rounded-full" />
         <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
