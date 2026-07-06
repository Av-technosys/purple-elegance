"use client";

import React from "react";
import type { PolicyData, PolicySection } from "@/data/policyData";

interface PolicyPageProps {
  policy: PolicyData;
}

export default function PolicyPage({ policy }: PolicyPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="border-b border-gray-200 bg-linear-to-b from-gray-50 to-white pt-16 pb-10  md:pt-25 md:pb-15">
        <div className="mx-auto max-w-225 px-4 sm:px-6 md:px-8">
          {/* Title */}
          <h1 className="font-heading text-center text-4xl sm:text-5xl md:text-6xl font-light text-[#140A05] tracking-tight mb-3">
            {policy.title}
          </h1>

          {/* Last Updated */}
          {policy.lastUpdated && (
            <p className="text-sm text-gray-600 text-center font-sans">
              Effective Date: {policy.lastUpdated}
            </p>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-225 px-4 sm:px-6 md:px-8">
          {/* Introduction */}
          {policy.introduction && (
            <div className="mb-12 sm:mb-16 md:mb-20">
              <p className="font-sans text-base sm:text-lg text-gray-700 leading-relaxed">
                {policy.introduction}
              </p>
            </div>
          )}

          {/* Sections */}
          <div className="space-y-12 sm:space-y-16 md:space-y-20">
            {policy.sections.map((section, index) => (
              <PolicySection key={index} section={section} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

interface SectionProps {
  section: PolicySection;
}

function PolicySection({ section }: SectionProps) {
  return (
    <div>
      {/* Section Heading */}
      <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-light text-[#140A05] tracking-tight mb-4 sm:mb-5 md:mb-6">
        {section.heading}
      </h2>

      {/* Section Content */}
      {section.content && (
        <p className="font-sans text-base sm:text-lg text-gray-700 leading-relaxed mb-5 sm:mb-6 md:mb-8">
          {section.content}
        </p>
      )}

      {/* Bullet Points */}
      {section.bulletPoints && section.bulletPoints.length > 0 && (
        <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 md:mb-10 list-none">
          {section.bulletPoints.map((point, idx) => (
            <li
              key={idx}
              className="font-sans text-base sm:text-lg text-gray-700 leading-relaxed flex items-start"
            >
              <span className="mr-3 sm:mr-4 shrink-0 text-[#140A05] font-light">
                •
              </span>
              <span>{point.text}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Numbered List */}
      {section.numberedList && section.numberedList.length > 0 && (
        <ol className="space-y-2 sm:space-y-3 list-none">
          {section.numberedList.map((item, idx) => (
            <li
              key={idx}
              className="font-sans text-base sm:text-lg text-gray-700 leading-relaxed flex items-start"
            >
              <span className="mr-3 sm:mr-4 shrink-0 font-light text-[#140A05] min-w-fit">
                {item.number || idx + 1}.
              </span>
              <span>{item.text}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
