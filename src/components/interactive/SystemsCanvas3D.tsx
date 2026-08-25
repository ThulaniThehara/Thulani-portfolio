import React, { useState, useRef, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

// Node Data Definition
export interface SystemNode {
  id: string;
  name: string;
  category: string;
  position: [number, number, number];
  color: string;
  accentColor: string;
  summary: string;
  techStack: string[];
  capabilities: string[];
  icon: string;
}

const SYSTEM_NODES: SystemNode[] = [
  {
    id: 'software',
    name: 'Software & Web Systems',
    category: 'Application Layer',
    position: [-2.2, 1.1, 0],
    color: '#2C3539',
    accentColor: '#C4A882',
    summary: 'Type-safe frontend architectures, modular UI design systems, and resilient client-side state management.',
    techStack: ['React 18/19', 'Astro', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'Zustand'],
    capabilities: ['Islands Architecture', 'Atomic Design Systems', 'Optimistic UI', 'Full-Stack Type Safety'],
    icon: '💻',
  },
  {
    id: 'cloud',
    name: 'Cloud & Serverless',
    category: 'Infrastructure Layer',
    position: [2.2, 1.1, 0],
    color: '#1C2529',
    accentColor: '#C4A882',
    summary: 'Distributed serverless backends, GraphQL APIs, event-driven message queues, and global edge compute.',
    techStack: ['AWS AppSync (GraphQL)', 'AWS Lambda', 'Amazon DynamoDB', 'Amazon SQS', 'Cloudflare Workers'],
    capabilities: ['Single-Table NoSQL Modeling', 'Event-Driven SQS Pipelines', 'Edge Caching (<10ms)', 'Cognito RBAC'],
    icon: '☁️',
  },
  {
    id: 'ai',
    name: 'Applied AI & LLMs',
    category: 'Intelligence Layer',
    position: [-1.7, -1.3, 0.4],
    color: '#3D4A4F',
    accentColor: '#C4A882',
    summary: 'Streaming conversational agents, retrieval-augmented generation (RAG), and deterministic tool execution loops.',
    techStack: ['OpenAI GPT-4', 'Python / FastAPI', 'LangChain', 'Pinecone Vector DB', 'Server-Sent Events'],
    capabilities: ['Phonetic Rhyme Guarantees', 'Constrained JSON Tool Calling', 'Context Window Pruning', 'Low-Latency Streaming'],
    icon: '🧠',
  },
  {
    id: 'iot',
    name: 'IoT & Hardware Systems',
    category: 'Physical Computing Layer',
    position: [1.7, -1.3, -0.4],
    color: '#C07856',
    accentColor: '#F2E0D5',
    summary: 'Real-time microcontroller firmware, analog sensor signal conditioning, and low-latency MQTT telemetry.',
    techStack: ['ESP32 Dual-Core', 'C / C++', 'FreeRTOS', 'BPW34 Photodiodes', 'MQTT Protocol', 'WebSockets'],
    capabilities: ['Microsecond Laser Pulse Capture', 'FreeRTOS Dual-Core Task Pinning', 'Hardware Analog RC Filters', 'Sub-50ms WebSockets'],
    icon: '⚡',
  },
];

// Connection line linking central hub to satellite nodes
const ConnectionBeam: React.FC<{
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  isActive: boolean;
  reducedMotion: boolean;
}> = ({ start, end, color, isActive, reducedMotion }) => {
  const lineRef = useRef<THREE.Line>(null);

  const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  useFrame((state) => {
    if (reducedMotion || !lineRef.current) return;
    const material = lineRef.current.material as THREE.LineBasicMaterial;
    if (isActive) {
      material.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 6) * 0.4;
    } else {
      material.opacity = 0.25;
    }
  });

  return (
    <line ref={lineRef as any} geometry={geometry}>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={isActive ? 0.9 : 0.25}
        linewidth={isActive ? 2 : 1}
      />
    </line>
  );
};

// Interactive Satellite Node Mesh
const SatelliteNodeMesh: React.FC<{
  node: SystemNode;
  isSelected: boolean;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
  reducedMotion: boolean;
}> = ({ node, isSelected, isHovered, onHover, onClick, reducedMotion }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reducedMotion) return;
    if (meshRef.current) {
      meshRef.current.rotation.y += isHovered || isSelected ? 0.03 : 0.01;
      meshRef.current.rotation.x += 0.005;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= 0.015;
    }
  });

  const scale = isSelected ? 1.35 : isHovered ? 1.2 : 1.0;

  return (
    <group position={node.position}>
      {/* Node Sphere */}
      <mesh
        ref={meshRef}
        scale={scale}
        onClick={(e) => {
          e.stopPropagation();
          onClick(node.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(node.id);
        }}
        onPointerOut={() => onHover(null)}
        cursor="pointer"
      >
        <sphereGeometry args={[0.38, 20, 20]} />
        <meshStandardMaterial
          color={node.color}
          roughness={0.2}
          metalness={0.6}
          emissive={node.color}
          emissiveIntensity={isSelected || isHovered ? 0.6 : 0.15}
        />
      </mesh>

      {/* Orbit Ring */}
      <mesh ref={ringRef} scale={scale * 1.35}>
        <ringGeometry args={[0.38, 0.42, 24]} />
        <meshBasicMaterial
          color={node.accentColor}
          side={THREE.DoubleSide}
          transparent
          opacity={isSelected || isHovered ? 0.8 : 0.3}
        />
      </mesh>

      {/* 3D Label Tag */}
      <Html position={[0, -0.65, 0]} center distanceFactor={8} zIndexRange={[100, 0]}>
        <button
          type="button"
          onClick={() => onClick(node.id)}
          className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold whitespace-nowrap transition-all cursor-pointer pointer-events-auto ${
            isSelected || isHovered
              ? 'bg-[var(--brand-deep-teal)] text-white shadow-xs scale-105'
              : 'bg-white/90 text-[var(--text-primary)] border border-[var(--border-subtle)] backdrop-blur-xs'
          }`}
        >
          {node.name.split(' ')[0]}
        </button>
      </Html>
    </group>
  );
};

// Central Core Node Mesh
const CentralCoreMesh: React.FC<{ reducedMotion: boolean }> = ({ reducedMotion }) => {
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.2;
      coreRef.current.rotation.x = t * 0.1;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.3;
    if (ring2Ref.current) ring2Ref.current.rotation.x = -t * 0.25;
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Core Sphere */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color="#2C3539"
          roughness={0.1}
          metalness={0.8}
          emissive="#C4A882"
          emissiveIntensity={0.4}
          wireframe
        />
      </mesh>

      {/* Concentric Rotating Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[0.85, 0.015, 12, 32]} />
        <meshBasicMaterial color="#C4A882" transparent opacity={0.5} />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.05, 0.012, 12, 32]} />
        <meshBasicMaterial color="#2C3539" transparent opacity={0.35} />
      </mesh>

      <Html position={[0, 0.9, 0]} center distanceFactor={8}>
        <span className="px-2.5 py-0.5 rounded-full bg-[var(--brand-deep-teal)] text-white text-[9px] font-mono font-extrabold uppercase tracking-widest shadow-xs">
          Core Matrix
        </span>
      </Html>
    </group>
  );
};

// 3D Scene Container
const Scene: React.FC<{
  selectedId: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
  reducedMotion: boolean;
}> = ({ selectedId, hoveredId, onHover, onClick, reducedMotion }) => {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <pointLight position={[-4, -4, 2]} intensity={0.6} color="#C4A882" />

      {/* Orbit Controls with bounded angles */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 2.5}
        autoRotate={!reducedMotion && !hoveredId && !selectedId}
        autoRotateSpeed={0.8}
      />

      {/* Central Core */}
      <CentralCoreMesh reducedMotion={reducedMotion} />

      {/* Beams and Satellite Nodes */}
      {SYSTEM_NODES.map((node) => {
        const isActive = selectedId === node.id || hoveredId === node.id;
        return (
          <React.Fragment key={node.id}>
            <ConnectionBeam
              start={[0, 0, 0]}
              end={node.position}
              color={node.color}
              isActive={isActive}
              reducedMotion={reducedMotion}
            />
            <Float speed={reducedMotion ? 0 : 2} rotationIntensity={0.2} floatIntensity={0.3}>
              <SatelliteNodeMesh
                node={node}
                isSelected={selectedId === node.id}
                isHovered={hoveredId === node.id}
                onHover={onHover}
                onClick={onClick}
                reducedMotion={reducedMotion}
              />
            </Float>
          </React.Fragment>
        );
      })}
    </>
  );
};

// Error Boundary Fallback component for WebGL failures
class WebGLErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Main Interactive Component Exported for Astro Island
export const SystemsCanvas3D: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('software');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const activeNode = SYSTEM_NODES.find((n) => n.id === (hoveredId || selectedId)) || SYSTEM_NODES[0];

  return (
    <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden shadow-sm">
      {/* Top Control & Tab Header */}
      <div className="p-4 sm:p-6 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--brand-deep-teal)] animate-pulse"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--brand-deep-teal)]">
              Interactive Systems Matrix
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Click or hover any 3D node to inspect architectural layers.
          </p>
        </div>

        {/* Accessible Keyboard Tab Buttons */}
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="System Node Selectors">
          {SYSTEM_NODES.map((node) => {
            const isCurrent = activeNode.id === node.id;
            return (
              <button
                key={node.id}
                type="button"
                role="tab"
                aria-selected={isCurrent}
                onClick={() => setSelectedId(node.id)}
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  isCurrent
                    ? 'bg-[var(--brand-deep-teal)] text-white shadow-xs scale-102'
                    : 'bg-white text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--brand-soft-teal)] hover:text-[var(--brand-deep-teal)]'
                }`}
              >
                <span className="mr-1">{node.icon}</span>
                <span>{node.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Visual & Information Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch min-h-[420px]">
        {/* 3D WebGL Canvas Viewport */}
        <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto bg-gradient-to-br from-[var(--bg-page)] via-white to-[var(--bg-page)] border-b lg:border-b-0 lg:border-r border-[var(--border-subtle)] flex items-center justify-center">
          {isClient ? (
            <WebGLErrorBoundary
              fallback={
                <div className="p-8 text-center text-xs text-[var(--text-muted)]">
                  WebGL 3D preview unavailable. Please utilize the interactive tabs above.
                </div>
              }
            >
              <Suspense
                fallback={
                  <div className="flex items-center justify-center gap-2 text-xs font-mono text-[var(--text-muted)]">
                    <span className="w-2 h-2 rounded-full bg-[var(--brand-deep-teal)] animate-ping"></span>
                    Initializing 3D Matrix...
                  </div>
                }
              >
                <Canvas
                  camera={{ position: [0, 0, 5.2], fov: 45 }}
                  dpr={[1, 1.5]}
                  gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
                  className="w-full h-full cursor-grab active:cursor-grabbing"
                >
                  <Scene
                    selectedId={selectedId}
                    hoveredId={hoveredId}
                    onHover={setHoveredId}
                    onClick={setSelectedId}
                    reducedMotion={reducedMotion}
                  />
                </Canvas>
              </Suspense>
            </WebGLErrorBoundary>
          ) : (
            <div className="flex items-center justify-center text-xs font-mono text-[var(--text-muted)]">
              Loading 3D Canvas...
            </div>
          )}

          <div className="absolute bottom-3 left-3 pointer-events-none text-[10px] font-mono text-[var(--text-subtle)] bg-white/80 backdrop-blur-xs px-2 py-1 rounded-md border border-[var(--border-subtle)]">
            Drag to Rotate • Click Node to Inspect
          </div>
        </div>

        {/* Selected Node Details (100% Accessible Text Alternative) */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[var(--bg-surface)]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[var(--bg-surface-teal-subtle)] text-[var(--brand-deep-teal)]">
                {activeNode.category}
              </span>
              <span className="text-xl">{activeNode.icon}</span>
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
                {activeNode.name}
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed mt-2">
                {activeNode.summary}
              </p>
            </div>

            {/* Core Capabilities */}
            <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Key Architectural Pillars:
              </span>
              <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
                {activeNode.capabilities.map((cap, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[var(--brand-deep-teal)] font-bold">›</span>
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technology Tag Pills */}
          <div className="space-y-2 pt-4 border-t border-[var(--border-subtle)]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] block">
              Core Tech Stack:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeNode.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-xs font-medium bg-[var(--bg-page)] text-[var(--text-secondary)] rounded-md border border-[var(--border-subtle)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemsCanvas3D;
