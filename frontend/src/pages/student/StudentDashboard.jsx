import React from "react";

export default function StudentDashboard() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
      
      {/* LEFT 3 COLUMNS: MAIN CONTENT */}
      <div className="xl:col-span-3 space-y-6">
        
        {/* Hero Banner */}
        <div className="relative bg-[#5c3be6] rounded-2xl p-8 text-white overflow-hidden shadow-sm">
          <div className="max-w-md relative z-10">
            <span className="text-xs uppercase tracking-wider opacity-75 font-semibold">Online Course</span>
            <h1 className="text-3xl font-bold mt-2 mb-4 leading-tight">
              Sharpen Your Skills with Professional Online Courses
            </h1>
            <button className="bg-black text-white text-sm font-medium px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-opacity-80 transition">
              Join Now <span className="bg-white text-black rounded-full w-4 h-4 flex items-center justify-center text-xs">→</span>
            </button>
          </div>
          {/* Decorative Sparkle Graphic in background */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-20 text-8xl font-light select-none">✦</div>
        </div>

        {/* Categories / Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "UI/UX Design", lessons: "UX/UI Design", progress: 60, color: "bg-[#5c3be6]" },
            { title: "Branding", lessons: "UX/UI Design", progress: 60, color: "bg-pink-500" },
            { title: "Front-End", lessons: "UX/UI Design", progress: 60, color: "bg-blue-400" },
          ].map((cat, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xs text-gray-400 font-medium">{cat.lessons}</p>
                  <h4 className="font-bold text-gray-800 text-sm mt-0.5">{cat.title}</h4>
                </div>
                <button className="text-gray-400 hover:text-gray-600">•••</button>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1.5">
                  <span>Progress</span>
                  <span>{cat.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color}`} style={{ width: `${cat.progress}%` }}></div>
                </div>
                <button className="w-full mt-4 bg-gray-50 hover:bg-gray-100 text-[#5c3be6] text-xs font-semibold py-2 rounded-xl transition border border-gray-100">
                  View Syllabus
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Watching Carousel Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 text-lg">Continue Watching</h3>
            <div className="flex gap-2">
              <button className="w-7 h-7 rounded-full bg-white border flex items-center justify-center text-xs text-gray-500 hover:bg-gray-50">‹</button>
              <button className="w-7 h-7 rounded-full bg-[#5c3be6] text-white flex items-center justify-center text-xs hover:opacity-90">›</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Beginner's Guide to Becoming a Professional Front-End Developer", author: "Leonarda Samuel", tag: "Front-End", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&q=80" },
              { title: "Optimize User Experience with the Best UU/UX Design", author: "Reya Sahu", tag: "UI/UX Design", img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=300&q=80" },
              { title: "Reviving and Refocus Company Image", author: "Padhang Samo", tag: "Branding", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&q=80" },
            ].map((course, i) => (
              <div key={i} className="space-y-2 group cursor-pointer">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                  <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">{course.tag}</span>
                </div>
                <h4 className="font-bold text-xs text-gray-800 line-clamp-2 leading-tight hover:text-[#5c3be6] transition">{course.title}</h4>
                <p className="text-[11px] text-gray-400 font-medium">Mentor: {course.author}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Your Lesson Table */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 text-base">Your Lesson</h3>
            <button className="text-[#5c3be6] text-xs font-bold hover:underline">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  <th className="pb-3">Topic</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs font-medium text-gray-700">
                {[
                  { mentor: "Padhang Samo", code: "ENGJCSH", type: "Usual Lessons", date: "Apr 12, 2026", action: "Join Live", isLive: true },
                  { mentor: "Padhang Samo", code: "Mactox", type: "Usual Lessons", date: "Apr 14, 2026", action: "Access Recording", isLive: false },
                  { mentor: "Leonarda Samui", code: "ENGJCSH", type: "Usual Lessons", date: "Apr 16, 2026", action: "Access Recording", isLive: false },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition">
                    <td className="py-3 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden"><img src="https://i.pravatar.cc/100?img=12" alt="avatar"/></div>
                      <div>
                        <p className="font-bold text-gray-800 leading-none">{row.mentor}</p>
                        <span className="text-[10px] text-gray-400 font-normal">{row.code}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] bg-purple-50 text-purple-600 font-semibold">
                        <span className="w-1 h-1 rounded-full bg-purple-500"></span> {row.type}
                      </span>
                    </td>
                    <td className="py-3 text-gray-400">{row.date}</td>
                    <td className="py-3 text-right">
                      <button className={`px-4 py-1.5 rounded-lg font-bold text-[11px] transition ${row.isLive ? 'bg-[#5c3be6] text-white hover:bg-opacity-90' : 'bg-gray-50 border text-gray-600 hover:bg-gray-100'}`}>
                        {row.action}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* RIGHT 1 COLUMN: STATISTICS & MENTORS SIDEBAR */}
      <div className="space-y-6">
        
        {/* Statistics Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center relative">
          <button className="absolute right-4 top-4 text-gray-400">•••</button>
          <h3 className="font-bold text-gray-800 text-sm self-start mb-4">Statistics</h3>
          
          {/* Radial Progress */}
          <div className="relative w-28 h-28 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-gray-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="text-[#5c3be6]" strokeDasharray="60, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md">
              <img src="https://i.pravatar.cc/150?img=60" alt="Jason" className="w-full h-full object-cover" />
            </div>
            <span className="absolute -top-1 right-2 bg-[#5c3be6] text-white font-bold text-[9px] px-1.5 py-0.5 rounded-full">60%</span>
          </div>
          
          <h4 className="font-bold text-sm text-gray-800">Good Morning Jason 🔥</h4>
          <p className="text-[11px] text-gray-400 mt-1">Get your morning tutorial directly from your platform!</p>

          {/* Simple Chart Bar Graph */}
          <div className="w-full mt-6 pt-4 border-t border-gray-50">
            <div className="flex justify-between items-center text-xs mb-3">
              <span className="font-bold text-gray-800">Activity</span>
              <select className="text-[11px] bg-gray-50 border-0 rounded-md px-1.5 py-0.5 text-gray-500 font-semibold focus:ring-0 outline-none">
                <option>Current Week</option>
              </select>
            </div>
            <div className="flex justify-between items-end h-16 px-2 pt-2">
              {[20, 45, 75, 25].map((height, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5 w-full">
                  <div className="w-6 bg-gray-100 rounded-md h-16 relative overflow-hidden flex items-end">
                    <div className="w-full bg-[#5c3be6] rounded-md transition-all" style={{ height: `${height}%` }}></div>
                  </div>
                  <span className="text-[9px] text-gray-400 font-semibold">{['1-7 Aug', '7-15 Aug', '15-22 Aug', '22-30 Aug'][idx]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Your Mentor Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800 text-sm">Your Mentor</h3>
            <button className="text-gray-400">•••</button>
          </div>
          <div className="space-y-3">
            {[
              { name: "Padhang Ranti", role: "Mactox" },
              { name: "Zaki Komertoi", role: "Mactox" },
              { name: "Leonarda Samul", role: "Mactox" },
            ].map((mentor, i) => (
              <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-xl transition">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden"><img src={`https://i.pravatar.cc/100?img=${i+5}`} alt="mentor"/></div>
                  <div>
                    <h5 className="font-bold text-xs text-gray-800 leading-none">{mentor.name}</h5>
                    <span className="text-[10px] text-gray-400">{mentor.role}</span>
                  </div>
                </div>
                <button className="text-gray-700 bg-gray-50 border hover:bg-gray-100 font-bold text-[10px] px-3 py-1.5 rounded-lg transition">
                  Schedule Session
                </button>
              </div>
            ))}
          </div>
          <button className="w-full text-center text-[#5c3be6] text-xs font-bold pt-4 border-t border-gray-50 mt-4 hover:underline">
            View all Mentors
          </button>
        </div>

      </div>

    </div>
  );
}