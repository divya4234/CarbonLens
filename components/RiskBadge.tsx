/**
 * RiskBadge Component
 * 
 * Badge component displaying the risk level of a hotspot.
 * Uses color coding: Green (Low), Amber (Medium), Red (High).
 */

interface RiskBadgeProps {
  riskLevel: 'Low' | 'Medium' | 'High';
}

export default function RiskBadge({ riskLevel }: RiskBadgeProps) {
  const getRiskStyles = (level: string) => {
    switch (level) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRiskStyles(
        riskLevel
      )}`}
    >
      {riskLevel} Risk
    </span>
  );
}

