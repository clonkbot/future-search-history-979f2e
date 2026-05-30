import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { SearchEntry } from '../types'

interface SearchCardProps {
  search: SearchEntry
  position: [number, number, number]
  rotation: number
  index: number
  isSelected: boolean
  onSelect: () => void
}

const categoryColors: Record<SearchEntry['category'], string> = {
  learning: '#00ff88',
  struggle: '#ff6b6b',
  milestone: '#ffd93d',
  growth: '#6bcfff',
  crisis: '#ff9f43'
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function SearchCard({
  search,
  position,
  rotation,
  index,
  isSelected,
  onSelect
}: SearchCardProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)

  const color = categoryColors[search.category]

  // Hover and selection animation
  useFrame((state) => {
    if (!groupRef.current) return

    // Gentle floating motion
    const offset = Math.sin(state.clock.elapsedTime * 0.5 + index * 0.5) * 0.1
    groupRef.current.position.y = position[1] + offset

    // Scale on hover/select
    const targetScale = isSelected ? 1.3 : hovered ? 1.1 : 1
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)

    // Billboard effect - face camera
    groupRef.current.lookAt(state.camera.position)
  })

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'default'
      }}
    >
      {/* Card background */}
      <RoundedBox args={[2, 0.8, 0.05]} radius={0.05} smoothness={4}>
        <meshStandardMaterial
          color="#0a1a14"
          emissive={color}
          emissiveIntensity={hovered || isSelected ? 0.15 : 0.05}
          transparent
          opacity={0.9}
        />
      </RoundedBox>

      {/* Glowing border */}
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[2.05, 0.85]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered || isSelected ? 0.3 : 0.1}
        />
      </mesh>

      {/* HTML content overlay */}
      <Html
        center
        distanceFactor={5}
        style={{
          width: '200px',
          pointerEvents: 'none',
          transform: 'translateZ(10px)'
        }}
      >
        <div
          className="text-center"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            textShadow: `0 0 10px ${color}`
          }}
        >
          {/* Date */}
          <div
            className="text-[8px] uppercase tracking-widest mb-0.5"
            style={{ color: color, opacity: 0.7 }}
          >
            {monthNames[search.month - 1]} {search.year}
          </div>

          {/* Search query */}
          <div
            className="text-[10px] leading-tight"
            style={{ color: '#e0f5ea' }}
          >
            "{search.query}"
          </div>
        </div>
      </Html>

      {/* Category indicator dot */}
      <mesh position={[-0.9, 0.3, 0.03]}>
        <circleGeometry args={[0.04, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Expanded view when selected */}
      {isSelected && search.journalEntry && (
        <Html
          center
          distanceFactor={5}
          position={[0, -0.7, 0]}
          style={{
            width: '220px',
            pointerEvents: 'none'
          }}
        >
          <div
            className="bg-black/90 border rounded-lg p-3 mt-2"
            style={{
              borderColor: color,
              fontFamily: "'IBM Plex Mono', monospace",
              boxShadow: `0 0 20px ${color}40`
            }}
          >
            <div
              className="text-[8px] uppercase tracking-widest mb-1"
              style={{ color: color }}
            >
              Journal Entry
            </div>
            <div
              className="text-[9px] leading-relaxed italic"
              style={{ color: '#c0d9cc' }}
            >
              {search.journalEntry}
            </div>
          </div>
        </Html>
      )}

      {/* Connection line to center */}
      <mesh position={[-position[0] / 2, 0, -position[2] / 2]}>
        <cylinderGeometry
          args={[
            0.003,
            0.003,
            Math.sqrt(position[0] ** 2 + position[2] ** 2),
            4
          ]}
        />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
    </group>
  )
}
