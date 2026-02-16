import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

/**
 * SkillRadar Component - Mini Chart for Skills
 * Displays member skills in a radar chart format
 */
const SkillRadar = ({ skills }) => {
  // Convert skills object to array format for recharts
  const data = Object.entries(skills).map(([skill, value]) => ({
    skill,
    value,
    fullMark: 100,
  }));

  return (
    <div className="w-full h-full bg-matrix-black/95 rounded-lg p-2">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#00F0FF" strokeOpacity={0.3} />
          <PolarAngleAxis 
            dataKey="skill" 
            tick={{ fill: '#00F0FF', fontSize: 10 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]}
            tick={{ fill: '#8A2BE2', fontSize: 8 }}
          />
          <Radar
            name="Skills"
            dataKey="value"
            stroke="#00F0FF"
            fill="#00F0FF"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillRadar;
