import React, { useState } from 'react';
import { Briefcase, ArrowRight, Check, MapPin, Building, Users, Sparkles } from 'lucide-react';
import { careersData } from '../data/careersData';
import { JobOpening } from '../types';
import { getAssetUrl } from '../utils/assets';

export const CareersSection: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantResumeNote, setApplicantResumeNote] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const departments = ['All', ...new Set(careersData.map((job) => job.department))];

  const filteredJobs = careersData.filter(
    (job) => selectedDept === 'All' || job.department === selectedDept
  );

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setSelectedJob(null);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantResumeNote('');
    }, 2200);
  };

  return (
    <section id="careers" className="pt-8 pb-14 lg:pt-10 lg:pb-16 bg-[#FFFDF8] border-b border-[#252927]/5 relative scroll-mt-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Careers Intro */}
        <div className="mb-12 grid items-center gap-8 lg:mb-14 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#6C7470] mb-3">
              <span className="text-[#EF777B]">Join Pamilyang Prince</span>
              <span aria-hidden="true">·</span>
              <span>Careers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#252927] leading-tight">
              Build a Brighter Everyday.
            </h2>
            <p className="mt-4 text-base text-[#6C7470] leading-relaxed">
              At Prince Retail, our people are the heart of everything we accomplish. Join a purpose-driven organization dedicated to serving grassroots Filipino communities, fostering mentorship, and empowering lifelong career advancement.
            </p>
            <a
              href="#job-listings"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#EF777B] px-6 py-3 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#e46468] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252927] cursor-pointer"
            >
              <span>Explore Careers</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="relative mx-auto aspect-[4/3] w-full max-w-xl lg:max-w-none">
            <div aria-hidden="true" className="careers-shadow absolute bottom-[5%] left-1/2 h-[7%] w-3/4 rounded-full bg-[#252927]/30 blur-xl" />
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
              <img
                src={getAssetUrl('assets/images/prince_careers_team.png')}
                alt="Prince Retail team members outside a store, with the message ‘Empowering Communities, Building Careers’"
                width={1672}
                height={941}
                loading="lazy"
                decoding="async"
                className="careers-float block h-auto w-full rounded-3xl shadow-2xl ring-1 ring-[#252927]/10"
              />
            </div>
          </div>
        </div>

        {/* Culture & Growth Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="p-7 rounded-3xl bg-white border border-[#252927]/8 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#FBE3DF] flex items-center justify-center text-[#EF777B] mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#252927] mb-2">
              People-First Culture
            </h3>
            <p className="text-xs sm:text-sm text-[#6C7470] leading-relaxed">
              We treat our team members like family. Progressive health coverage, educational subsidies, and family emergency assistance programs.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white border border-[#252927]/8 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#FFF0BF] flex items-center justify-center text-[#252927] mb-4">
              <Sparkles className="w-5 h-5 text-[#252927]" />
            </div>
            <h3 className="text-base font-bold text-[#252927] mb-2">
              Internal Promotion & Growth
            </h3>
            <p className="text-xs sm:text-sm text-[#6C7470] leading-relaxed">
              Over 70% of our branch managers and regional supervisors started as frontline store cashiers, stock assistants, and merchandisers.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white border border-[#252927]/8 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#DCEEE2] flex items-center justify-center text-[#252927] mb-4">
              <Building className="w-5 h-5 text-[#252927]" />
            </div>
            <h3 className="text-base font-bold text-[#252927] mb-2">
              Island-Wide Presence
            </h3>
            <p className="text-xs sm:text-sm text-[#6C7470] leading-relaxed">
              Career opportunities right in your hometown across Luzon, Visayas, and Mindanao without having to relocate to the capital.
            </p>
          </div>
        </div>

        {/* Job Listings with Department Filter */}
        <div id="job-listings" className="bg-white rounded-3xl border border-[#252927]/10 p-6 sm:p-8 shadow-xs">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#252927]/8">
            <div>
              <h3 className="text-lg font-bold text-[#252927]">Open Opportunities</h3>
              <p className="text-xs text-[#6C7470]">Find your place in our growing family</p>
            </div>

            {/* Department Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  aria-pressed={selectedDept === dept}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedDept === dept
                      ? 'bg-[#252927] text-white shadow-2xs'
                      : 'bg-[#FFFDF8] text-[#6C7470] hover:text-[#252927]'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Job List */}
          <div className="divide-y divide-[#252927]/6 pt-2">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FFFDF8] px-3 rounded-2xl transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold text-[#EF777B] uppercase tracking-wider">
                      {job.department}
                    </span>
                    {job.type && (
                      <>
                        <span aria-hidden="true" className="text-[#6C7470]">·</span>
                        <span className="text-xs text-[#6C7470] font-medium">{job.type}</span>
                      </>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-[#252927] mb-1">
                    {job.title}
                  </h4>

                  {job.location && (
                    <div className="flex items-center gap-1.5 text-xs text-[#6C7470] mb-2">
                      <MapPin className="w-3.5 h-3.5 text-[#6C7470]" />
                      <span>{job.location}</span>
                    </div>
                  )}

                  {job.description && (
                    <p className="text-xs text-[#6C7470] max-w-2xl leading-relaxed">
                      {job.description}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => setSelectedJob(job)}
                  className="px-5 py-2.5 rounded-xl bg-[#252927] hover:bg-[#343a37] text-white text-xs font-bold whitespace-nowrap transition-colors cursor-pointer self-start md:self-center"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#252927]/10 relative animate-scaleIn">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#EF777B]">
                  Job Application
                </span>
                <h3 className="text-xl font-extrabold text-[#252927] mt-0.5">
                  {selectedJob.title}
                </h3>
                <p className="text-xs text-[#6C7470]">{selectedJob.location ? `${selectedJob.location} · ` : ''}{selectedJob.department}</p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-[#252927] flex items-center justify-center text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {submittedSuccess ? (
              <div className="py-8 text-center">
                <div className="w-14 h-14 rounded-full bg-[#DCEEE2] text-emerald-700 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-[#252927]">Application Submitted!</h4>
                <p className="text-xs text-[#6C7470] mt-1">
                  Thank you for applying to Prince Retail. Our talent team will review your profile.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#252927] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="Juanita Santos"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#252927]/15 bg-[#FFFDF8] text-xs font-medium focus:outline-none focus:border-[#EF777B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#252927] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    placeholder="juanita.santos@email.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#252927]/15 bg-[#FFFDF8] text-xs font-medium focus:outline-none focus:border-[#EF777B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#252927] mb-1">Experience Summary & LinkedIn / Portfolio</label>
                  <textarea
                    rows={3}
                    required
                    value={applicantResumeNote}
                    onChange={(e) => setApplicantResumeNote(e.target.value)}
                    placeholder="Briefly describe your retail, logistics, or digital background..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#252927]/15 bg-[#FFFDF8] text-xs font-medium focus:outline-none focus:border-[#EF777B]"
                  ></textarea>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl bg-[#EF777B] hover:bg-[#e46468] text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#252927] text-xs font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
