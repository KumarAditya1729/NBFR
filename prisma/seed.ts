import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with initial NBRF data...');

  // 1. Site Settings
  await prisma.siteSettings.create({
    data: {
      heroHeadline: "Nav Bihar Renaissance Foundation",
      heroSubheadline: "Bihar's pioneering think tank driving development through Research, Policy, Impact, and Action.",
      aboutText: "We identify developmental gaps across Bihar's social, economic, and cultural sectors — and provide data-driven recommendations to policymakers, institutions, and stakeholders.",
      contactEmail: "contact@nbrf.org.in",
      contactPhone: "+91 99999 99999",
      address: "Patna, Bihar, India",
    }
  });

  // 2. Timeline Events
  await prisma.timelineEvent.createMany({
    data: [
      { year: "2018", title: "Foundation Established", description: "NBRF was founded to provide data-driven policy recommendations for Bihar." },
      { year: "2020", title: "First Major Publication", description: "Released the State of Rural Livelihoods report." },
      { year: "2023", title: "Bihar Observatory Launch", description: "Launched the digital data observatory for 38 districts." }
    ]
  });

  // 3. Impact Stats
  await prisma.impactStat.createMany({
    data: [
      { label: "Districts Surveyed", value: "38", description: "Comprehensive coverage of Bihar", iconName: "Map" },
      { label: "Research Papers", value: "15+", description: "Peer-reviewed publications", iconName: "BookOpen" },
      { label: "Active Projects", value: "4", description: "Ongoing developmental initiatives", iconName: "Activity" }
    ]
  });

  // 4. Focus Areas
  await prisma.focusArea.createMany({
    data: [
      { title: "Economic Growth", description: "Analyzing macro-economic indicators and proposing growth strategies.", iconName: "TrendingUp" },
      { title: "Education Policy", description: "Evaluating foundational literacy and higher education infrastructure.", iconName: "GraduationCap" },
      { title: "Rural Livelihoods", description: "Studying agricultural economics and MSME clusters.", iconName: "Briefcase" }
    ]
  });

  // 5. Insights (Blog/News)
  await prisma.insight.createMany({
    data: [
      { title: "Bihar Budget 2024 Analysis", type: "Analysis", author: "NBRF Economics Team", date: "Mar 2024", excerpt: "A deep dive into the recent fiscal allocations.", slug: "bihar-budget-2024" },
      { title: "Flood Management Strategies", type: "Policy Brief", author: "NBRF Environment Cell", date: "Jan 2024", excerpt: "Mitigation strategies for North Bihar river basins.", slug: "flood-management-2024" }
    ]
  });

  // 6. Media Mentions
  await prisma.mediaMention.createMany({
    data: [
      { source: "The Hindu", headline: "NBRF proposes new agrarian model for Bihar", date: "Feb 2024", url: "#" },
      { source: "Times of India", headline: "Patna-based think tank launches data observatory", date: "Dec 2023", url: "#" }
    ]
  });

  // 7. Membership Programs
  await prisma.membershipProgram.createMany({
    data: [
      { title: "Student Fellowship", description: "For postgraduate students researching Bihar.", iconName: "User" },
      { title: "Professional Membership", description: "For academics and policymakers.", iconName: "Briefcase" }
    ]
  });

  // 8. Experts
  await prisma.expert.createMany({
    data: [
      { name: "Dr. Arvind Kumar", role: "Chief Economist", category: "management", bio: "Ph.D. in Development Economics." },
      { name: "Prof. Neha Singh", role: "Head of Policy", category: "board", bio: "Former advisor to state government." }
    ]
  });

  // 9. Research Verticals
  const ecoVertical = await prisma.researchVertical.create({
    data: { title: "Economic Policy", shortDescription: "Macro-economics and fiscal policy research.", iconName: "TrendingUp", slug: "economic-policy" }
  });
  
  const socialVertical = await prisma.researchVertical.create({
    data: { title: "Social Development", shortDescription: "Education, health, and gender equity.", iconName: "Users", slug: "social-development" }
  });

  // 10. Authors
  const author1 = await prisma.author.create({ data: { name: "Dr. Arvind Kumar", designation: "Chief Economist" } });
  
  // 11. Publications
  const pub1 = await prisma.publication.create({
    data: {
      title: "State of Rural Livelihoods in Bihar",
      slug: "state-of-rural-livelihoods-in-bihar-goal-2024",
      publicationType: "Research Report",
      abstract: "An empirical analysis of agricultural incomes and MSME employment.",
      publishDate: "2024-01-15",
      verticalId: ecoVertical.id,
      authors: {
        create: [ { authorId: author1.id } ]
      }
    }
  });

  // 12. District Factsheets
  await prisma.districtFactsheet.createMany({
    data: [
      { districtName: "Patna", slug: "patna", division: "Patna", headquarter: "Patna", areaSqKm: 3202, population: "58 Lakhs", literacyRate: "70.68%", sexRatio: "897", perCapitaIncome: "₹ 1,12,604", agricultureFocus: "Wheat, Maize", topOpportunity: "Services & IT" },
      { districtName: "Muzaffarpur", slug: "muzaffarpur", division: "Tirhut", headquarter: "Muzaffarpur", areaSqKm: 3172, population: "48 Lakhs", literacyRate: "63.43%", sexRatio: "900", perCapitaIncome: "₹ 30,000", agricultureFocus: "Litchi, Maize", topOpportunity: "Agro-processing" }
    ]
  });

  // 13. Datasets
  await prisma.biharDataset.createMany({
    data: [
      { indicatorName: "State GSDP Growth", slug: "state-gsdp", category: "Economy", year: "2023-24", valueString: "10.6%", numericValue: 10.6, unit: "%", sourceName: "Economic Survey" },
      { indicatorName: "Female Literacy", slug: "female-literacy", category: "Demographics", year: "2011", valueString: "51.5%", numericValue: 51.5, unit: "%", sourceName: "Census 2011" }
    ]
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
