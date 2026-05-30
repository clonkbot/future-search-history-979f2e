import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text } from '@react-three/drei'
import * as THREE from 'three'
import { TimelineProps, SearchEntry } from '../types'
import { SearchCard } from './SearchCard'

export function TimelineScene({ searches, isGenerating }: TimelineProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const [selectedSearch, setSelectedSearch] = useState<SearchEntry | null>(null)

  // Create a spiral layout for the timeline
  const positions = useMemo(() => {
    return searches.map((_, index) => {
      const t = index / Math.max(searches.length - 1, 1)
      const spiralRadius = 4 + t * 6
      const angle = t * Math.PI * 4 // 2 full rotations
      const y = -10 + t * 20 // Vertical spread

      return {
        x: Math.cos(angle) * spiralRadius,
        y: y,
        z: Math.sin(angle) * spiralRadius,
        rotation: angle
      }
    })
  }, [searches.length])

  // Gentle rotation animation
  useFrame((state) => {
    if (groupRef.current && !isGenerating) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  // Group searches by year
  const yearMarkers = useMemo(() => {
    const years = [...new Set(searches.map((s) => s.year))]
    return years.map((year) => {
      const yearSearches = searches.filter((s) => s.year === year)
      const firstIndex = searches.indexOf(yearSearches[0])
      return { year, position: positions[firstIndex] }
    })
  }, [searches, positions])

  return (
    <group ref={groupRef}>
      {/* Central timeline spine */}
      <mesh>
        <cylinderGeometry args={[0.02, 0.02, 30, 8]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Spiral guide lines */}
      {positions.map((pos, i) => {
        if (i === 0) return null
        const prevPos = positions[i - 1]
        const midX = (pos.x + prevPos.x) / 2
        const midY = (pos.y + prevPos.y) / 2
        const midZ = (pos.z + prevPos.z) / 2
        const distance = Math.sqrt(
          (pos.x - prevPos.x) ** 2 + (pos.y - prevPos.y) ** 2 + (pos.z - prevPos.z) ** 2
        )

        return (
          <mesh
            key={`line-${i}`}
            position={[midX, midY, midZ]}
          >
            <cylinderGeometry args={[0.005, 0.005, distance, 4]} />
            <meshBasicMaterial color="#00ff88" transparent opacity={0.15} />
          </mesh>
        )
      })}

      {/* Year markers */}
      {yearMarkers.map(({ year, position }) => (
        <Float key={year} speed={1} rotationIntensity={0} floatIntensity={0.2}>
          <group position={[0, position.y, 0]}>
            {/* Year ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.8, 0.01, 8, 32]} />
              <meshStandardMaterial
                color="#00ff88"
                emissive="#00ff88"
                emissiveIntensity={0.5}
                transparent
                opacity={0.5}
              />
            </mesh>

            {/* Year label */}
            <Text
              position={[1.2, 0, 0]}
              fontSize={0.3}
              color="#00ff88"
              anchorX="left"
              anchorY="middle"
              font="https://fonts.gstatic.com/s/orbitron/v29/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyGy6BoWgz.woff2"
            >
              {year.toString()}
            </Text>
          </group>
        </Float>
      ))}

      {/* Search cards */}
      {searches.map((search, index) => {
        const pos = positions[index]
        return (
          <SearchCard
            key={search.id}
            search={search}
            position={[pos.x, pos.y, pos.z]}
            rotation={pos.rotation}
            index={index}
            isSelected={selectedSearch?.id === search.id}
            onSelect={() => setSelectedSearch(selectedSearch?.id === search.id ? null : search)}
          />
        )
      })}

      {/* Ambient particles */}
      <ParticleField />
    </group>
  )
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null!)
  const particleCount = 200

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00ff88"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}
