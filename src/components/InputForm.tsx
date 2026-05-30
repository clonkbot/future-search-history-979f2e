import { useState } from 'react'

interface InputFormProps {
  onGenerate: (age: number, goal: string, years: number) => void
  isGenerating: boolean
}

export function InputForm({ onGenerate, isGenerating }: InputFormProps) {
  const [age, setAge] = useState(25)
  const [goal, setGoal] = useState('')
  const [years, setYears] = useState(5)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (goal.trim()) {
      onGenerate(age, goal, years)
    }
  }

  const presetGoals = [
    'Start my own business',
    'Become an indie game developer',
    'Learn to play guitar',
    'Run a marathon',
    'Write a novel',
    'Get my PhD'
  ]

  return (
    <form onSubmit={handleSubmit} className="max-w-lg">
      <div
        className="bg-black/80 backdrop-blur-md border border-emerald-500/30 rounded-xl p-4 md:p-6 space-y-4 md:space-y-5"
        style={{ boxShadow: '0 0 40px rgba(0,255,136,0.1), inset 0 1px 0 rgba(0,255,136,0.1)' }}
      >
        <div className="text-center mb-4 md:mb-6">
          <h2
            className="text-lg md:text-xl text-emerald-400 mb-1 md:mb-2"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Initialize Time Query
          </h2>
          <p className="text-emerald-500/50 text-xs md:text-sm">
            Enter your parameters to view your future search history
          </p>
        </div>

        {/* Age Input */}
        <div>
          <label className="block text-emerald-400/70 text-xs uppercase tracking-wider mb-1 md:mb-2">
            Current Age
          </label>
          <input
            type="number"
            inputMode="numeric"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value) || 18)}
            min={13}
            max={99}
            className="w-full bg-black/50 border border-emerald-500/30 rounded-lg px-3 py-3 md:px-4 text-emerald-300 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400/50 transition-all text-sm md:text-base min-h-[44px]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          />
        </div>

        {/* Goal Input */}
        <div>
          <label className="block text-emerald-400/70 text-xs uppercase tracking-wider mb-1 md:mb-2">
            Your Goal
          </label>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g., become an indie game developer"
            className="w-full bg-black/50 border border-emerald-500/30 rounded-lg px-3 py-3 md:px-4 text-emerald-300 placeholder:text-emerald-700/50 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400/50 transition-all text-sm md:text-base min-h-[44px]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          />

          {/* Preset chips */}
          <div className="flex flex-wrap gap-1 md:gap-2 mt-2 md:mt-3">
            {presetGoals.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setGoal(preset)}
                className="px-2 py-1.5 md:px-3 md:py-1 text-[10px] md:text-xs text-emerald-500/70 border border-emerald-500/20 rounded-full hover:border-emerald-400/50 hover:text-emerald-400 transition-all min-h-[32px] md:min-h-0"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Time Horizon */}
        <div>
          <label className="block text-emerald-400/70 text-xs uppercase tracking-wider mb-1 md:mb-2">
            Time Horizon: {years} {years === 1 ? 'year' : 'years'}
          </label>
          <div className="flex gap-2">
            <input
              type="range"
              min={1}
              max={20}
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value))}
              className="flex-1 accent-emerald-400 h-8 md:h-auto"
            />
            <div className="flex gap-1">
              {[1, 5, 10, 20].map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setYears(y)}
                  className={`px-2 py-1.5 md:px-2 md:py-1 text-xs rounded min-w-[36px] min-h-[36px] md:min-h-0 ${
                    years === y
                      ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400'
                      : 'bg-black/50 text-emerald-500/50 border border-emerald-500/20 hover:border-emerald-400/50'
                  } transition-all`}
                >
                  {y}y
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!goal.trim() || isGenerating}
          className="w-full py-4 md:py-3 mt-2 bg-emerald-500/20 border border-emerald-400 text-emerald-300 rounded-lg font-semibold uppercase tracking-wider text-sm hover:bg-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all relative overflow-hidden group min-h-[52px]"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          <span className="relative z-10">
            {isGenerating ? 'Accessing Timeline...' : 'Generate Future'}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </button>
      </div>
    </form>
  )
}
