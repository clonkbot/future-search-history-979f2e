import { useState, Suspense, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Stars, Float } from '@react-three/drei'
import { TimelineScene } from './components/TimelineScene'
import { InputForm } from './components/InputForm'
import { SearchEntry } from './types'
import { generateSearchHistory } from './utils/generateSearches'

function App() {
  const [searches, setSearches] = useState<SearchEntry[]>([])
  const [isGenerated, setIsGenerated] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [userGoal, setUserGoal] = useState('')
  const [alternateTimeline, setAlternateTimeline] = useState<'persisted' | 'quit'>('persisted')

  const handleGenerate = useCallback((age: number, goal: string, years: number) => {
    setIsGenerating(true)
    setUserGoal(goal)

    // Simulate AI generation delay for effect
    setTimeout(() => {
      const history = generateSearchHistory(age, goal, years, alternateTimeline)
      setSearches(history)
      setIsGenerated(true)
      setIsGenerating(false)
    }, 1500)
  }, [alternateTimeline])

  const handleReset = useCallback(() => {
    setSearches([])
    setIsGenerated(false)
    setUserGoal('')
  }, [])

  const toggleTimeline = useCallback(() => {
    if (!isGenerated) return
    const newTimeline = alternateTimeline === 'persisted' ? 'quit' : 'persisted'
    setAlternateTimeline(newTimeline)
    setIsGenerating(true)

    setTimeout(() => {
      const history = generateSearchHistory(
        new Date().getFullYear() - 25, // Use stored age ideally
        userGoal,
        10,
        newTimeline
      )
      setSearches(history)
      setIsGenerating(false)
    }, 800)
  }, [alternateTimeline, isGenerated, userGoal])

  return (
    <div className="w-screen h-screen bg-black overflow-hidden relative" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.1) 2px, transparent 4px)',
          backgroundSize: '100% 4px'
        }}
      />

      {/* CRT glow effect */}
      <div
        className="absolute inset-0 pointer-events-none z-40"
        style={{
          boxShadow: 'inset 0 0 150px rgba(0,255,136,0.1), inset 0 0 50px rgba(0,255,136,0.05)',
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)'
        }}
      />

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, isGenerated ? 15 : 8], fov: 60 }}
        className="w-full h-full"
        dpr={[1, 2]}
      >
        <color attach="background" args={['#030708']} />
        <fog attach="fog" args={['#030708', 15, 50]} />

        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ff88" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00ccff" />

        <Suspense fallback={null}>
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />

          {!isGenerated && (
            <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
              <mesh position={[0, 0, -5]}>
                <torusGeometry args={[3, 0.02, 16, 100]} />
                <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.5} />
              </mesh>
            </Float>
          )}

          {isGenerated && (
            <TimelineScene searches={searches} isGenerating={isGenerating} />
          )}

          <Environment preset="night" />
        </Suspense>

        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
          minDistance={5}
          maxDistance={30}
          enablePan={false}
        />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none z-30">
        {/* Title */}
        <div className="absolute top-4 md:top-8 left-4 md:left-8 right-4 md:right-8">
          <h1
            className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter"
            style={{
              color: '#00ff88',
              textShadow: '0 0 20px rgba(0,255,136,0.8), 0 0 40px rgba(0,255,136,0.4), 0 0 60px rgba(0,255,136,0.2)',
              fontFamily: "'Orbitron', sans-serif"
            }}
          >
            FUTURE_ME.search_history
          </h1>
          <p className="text-xs md:text-sm text-emerald-400/60 mt-1 md:mt-2 tracking-widest uppercase">
            Temporal Search Archive // {new Date().getFullYear()}&ndash;{new Date().getFullYear() + 20}
          </p>
        </div>

        {/* Input Form or Timeline Info */}
        <div className="absolute bottom-16 md:bottom-20 left-4 md:left-8 right-4 md:right-8 pointer-events-auto">
          {!isGenerated ? (
            <InputForm onGenerate={handleGenerate} isGenerating={isGenerating} />
          ) : (
            <div className="max-w-xl">
              <div className="bg-black/80 backdrop-blur-sm border border-emerald-500/30 rounded-lg p-3 md:p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
                  <div>
                    <p className="text-emerald-400 text-xs md:text-sm uppercase tracking-wider mb-1">Viewing Timeline</p>
                    <p className="text-white text-sm md:text-lg" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      {userGoal}
                    </p>
                    <p className="text-emerald-500/60 text-xs mt-1">
                      {alternateTimeline === 'persisted' ? '// You kept going' : '// You gave up'}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={toggleTimeline}
                      className="px-3 py-2 md:px-4 md:py-2 bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 rounded text-xs md:text-sm hover:bg-emerald-500/20 transition-all hover:border-emerald-400 min-h-[44px]"
                    >
                      {alternateTimeline === 'persisted' ? 'See: What if I quit?' : 'See: What if I kept going?'}
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-3 py-2 md:px-4 md:py-2 bg-red-500/10 border border-red-500/50 text-red-400 rounded text-xs md:text-sm hover:bg-red-500/20 transition-all hover:border-red-400 min-h-[44px]"
                    >
                      New Timeline
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-emerald-500/40 text-xs mt-2 text-center md:text-left">
                Drag to orbit // Scroll to zoom // Click search entries for details
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Loading overlay */}
      {isGenerating && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="text-center">
            <div
              className="w-16 h-16 md:w-20 md:h-20 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin mx-auto"
            />
            <p
              className="text-emerald-400 mt-4 text-sm md:text-lg tracking-wider animate-pulse"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              ACCESSING TEMPORAL DATA...
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="absolute bottom-3 md:bottom-4 left-0 right-0 text-center z-30">
        <p className="text-emerald-600/40 text-[10px] md:text-xs tracking-wide">
          Requested by @soulsnipes23 &middot; Built by @clonkbot
        </p>
      </footer>
    </div>
  )
}

export default App
