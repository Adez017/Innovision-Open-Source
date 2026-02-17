import { ArrowDown, ArrowUp, Minus } from "lucide-react"

const contests = [
  {
    id: "1",
    name: "Weekly Contest 345",
    date: "Feb 18, 2024",
    rank: 2456,
    totalParticipants: 24680,
    rating: 1756,
    ratingChange: 12,
  },
  {
    id: "2",
    name: "Biweekly Contest 122",
    date: "Feb 3, 2024",
    rank: 3245,
    totalParticipants: 19876,
    rating: 1744,
    ratingChange: -8,
  },
  {
    id: "3",
    name: "Weekly Contest 344",
    date: "Jan 28, 2024",
    rank: 1876,
    totalParticipants: 22345,
    rating: 1752,
    ratingChange: 24,
  },
  {
    id: "4",
    name: "Biweekly Contest 121",
    date: "Jan 20, 2024",
    rank: 2134,
    totalParticipants: 18765,
    rating: 1728,
    ratingChange: 0,
  },
  {
    id: "5",
    name: "Weekly Contest 343",
    date: "Jan 14, 2024",
    rank: 3567,
    totalParticipants: 23456,
    rating: 1728,
    ratingChange: -15,
  },
]

export function ContestHistory() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left font-medium">Contest</th>
            <th className="px-4 py-2 text-left font-medium">Date</th>
            <th className="px-4 py-2 text-left font-medium">Rank</th>
            <th className="px-4 py-2 text-left font-medium">Rating</th>
            <th className="px-4 py-2 text-left font-medium">Change</th>
          </tr>
        </thead>
        <tbody>
          {contests.map((contest) => (
            <tr key={contest.id} className="border-b">
              <td className="px-4 py-3">
                <a href="#" className="hover:underline">
                  {contest.name}
                </a>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{contest.date}</td>
              <td className="px-4 py-3">
                {contest.rank} <span className="text-xs text-muted-foreground">/ {contest.totalParticipants}</span>
              </td>
              <td className="px-4 py-3">{contest.rating}</td>
              <td className="px-4 py-3">
                <div
                  className={`flex items-center ${contest.ratingChange > 0
                      ? "text-green-500"
                      : contest.ratingChange < 0
                        ? "text-red-500"
                        : "text-muted-foreground"
                    }`}
                >
                  {contest.ratingChange > 0 ? (
                    <ArrowUp className="mr-1 h-4 w-4" />
                  ) : contest.ratingChange < 0 ? (
                    <ArrowDown className="mr-1 h-4 w-4" />
                  ) : (
                    <Minus className="mr-1 h-4 w-4" />
                  )}
                  {Math.abs(contest.ratingChange)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}